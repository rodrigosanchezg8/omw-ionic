import {Component, OnInit} from '@angular/core';
import {Chart, ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {FeedbackService} from "../../services/feedback.service";
import {Storage} from "@ionic/storage";
import {User} from "../../models/user";
import {ResponseService} from "../../services/response.service";
import {LocationsService} from "../../services/locations.service";

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.page.html',
    styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

    public currentUser: User;

    public entityValues = {
        FOR_USER: '0',
        FOR_COMPANY: '1'
    };
    public entityValue = this.entityValues.FOR_USER;

    public fromValues = {
        RECEIVER: '0',
        SENDER: '1',
        ALL: null
    };
    public fromValue = this.fromValues.ALL;

    public months: any[];
    public monthPerformance = {
        text: '',
        color: '',
        prediction: 0
    };
    public currentMonth = new Date().getMonth();
    public selectedMonth = {value: this.currentMonth + 1, offset: 0};

    public scatterChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            xAxes: [{
                type: 'time'
            }]
        }
    };
    public scatterChartDataSets: ChartDataSets[];
    public scatterChartType: ChartType = 'line';
    public scatterChartColors = [{backgroundColor: ["#e84351", "#434a54", "#3ebf9b", "#4d86dc", "#f3af37"]}];

    public cities: string[] = [];
    public selectedCity: number;

    constructor(private feedbackService: FeedbackService,
                private locationService: LocationsService,
                private storage: Storage,
                private responsesService: ResponseService) {
    }

    async ngOnInit() {
        this.currentUser = await this.storage.get('user') as User;
        if (this.currentUser.role.name === 'admin') {
            this.cities = await this.locationService.getCurrentRegisteredCities() as string[];
        }
        await this.setupMonthsOffsets();
        await this.triggerLinearRegression();
    }

    setupMonthsOffsets() {
        const currentYear = new Date().getFullYear();
        this.months = [
            {'name': 'Enero', value: 0},
            {'name': 'Febrero', value: 1},
            {'name': 'Marzo', value: 2},
            {'name': 'Abril', value: 3},
            {'name': 'Mayo', value: 4},
            {'name': 'Junio', value: 5},
            {'name': 'Julio', value: 6},
            {'name': 'Agosto', value: 7},
            {'name': 'Septiembre', value: 8},
            {'name': 'Octubre', value: 9},
            {'name': 'Noviembre', value: 10},
            {'name': 'Diciembre', value: 11}
        ];
        const totalMonths = this.months.length - 1;
        for (let month of this.months) {
            if (month.value < this.currentMonth) {
                month.offset = totalMonths - this.currentMonth + month.value + 1;
                month.name += ` (${currentYear + 1})`;
            } else {
                month.offset = (totalMonths - this.currentMonth + month.value) - 11
            }
        }
    }

    async entityChanged(value) {
        this.entityValue = value;
        await this.triggerLinearRegression();
    }

    async fromChanged(value) {
        this.fromValue = value;
        console.log(this.fromValue);
        await this.triggerLinearRegression();
    }

    async cityChanged(value) {
        this.selectedCity = value;
        console.log(this.selectedCity);
        await this.triggerLinearRegression();
    }

    async monthChanged(value) {
        this.selectedMonth.offset = this.months.find(m => m.value === value).offset;
        await this.triggerLinearRegression();
    }

    async triggerLinearRegression() {
        if (!this.selectedMonth || !this.entityValue)
            return;

        this.monthPerformance.color = '';
        this.monthPerformance.text = '';
        this.monthPerformance.prediction = 0;

        let serviceRes;
        if (this.currentUser.role.name === 'client') {

            serviceRes = await this.feedbackService.getDeliveriesMonthLinearRegression(this.currentUser.id,
                this.selectedMonth.offset, this.entityValue);

        } else if (this.currentUser.role.name === 'admin') {

            if (this.selectedCity === undefined)
                return;

            const selectedCityName = this.cities.find((c, i) => i === this.selectedCity);
            serviceRes = await this.feedbackService.getCitiesMonthLinearRegression(
                this.selectedMonth.offset, selectedCityName, this.entityValue, this.fromValue);

        } else {
            this.responsesService.presentResponse({message: 'El rol no permite ver retroalimentación'})
            return;
        }

        if (serviceRes.status === 'failed') {
            this.responsesService.presentResponse(serviceRes);
            return;
        }

        await this.gatherSeriesXY(serviceRes.regression_info);
        this.setPerformance(serviceRes.regression_info)
    }

    async gatherSeriesXY(regressionInfo) {
        if (!regressionInfo || (regressionInfo.deliveries_monthly_count.length !== 12 &&
            regressionInfo.months_axis.length !== 12)) {
            this.responsesService.presentResponse({
                message: 'Hubo un problema calculando la información, es probable que no existan suficientes ventas.'
            });
            return;
        }

        this.monthPerformance.prediction = regressionInfo.prediction_value;

        let scatterData = [];
        let regressionLineData = [];
        for (let i = 0; i < regressionInfo.deliveries_monthly_count.length; i++) {
            scatterData[i] = {
                x: regressionInfo.months_axis[i],
                y: regressionInfo.deliveries_monthly_count[i],
            };
            regressionLineData[i] = {
                x: regressionInfo.months_axis[i],
                y: regressionInfo.prediction_function[i],
            };
        }

        this.scatterChartDataSets = [
            {
                data: scatterData,
                label: 'Entregas sobre tiempo',
                backgroundColor: '#e84351',
                type: "scatter",
                fill: "false",
                pointBackgroundColor: '#e84351',
                pointRadius: 10,
            },
            {
                data: regressionLineData,
                label: 'Linea de regresión lineal',
                type: "line",
                fill: "false",
                backgroundColor: '#4EA7E8',
                pointBackgroundColor: '#4EA7E8',
                pointRadius: 10,
            }
        ];
    }

    setPerformance(regression_info) {
        if (regression_info.correlation_rate_x1 >= .90) {
            this.monthPerformance.text = 'Muy alta correlación';
            this.monthPerformance.color = 'green';
        } else if (regression_info.monthPrediction >= .70) {
            this.monthPerformance.text = 'Alta correlación';
            this.monthPerformance.color = 'green';
        } else if (regression_info.monthPrediction >= .50) {
            this.monthPerformance.text = 'Correlación moderada';
            this.monthPerformance.color = 'orange';
        } else if (regression_info.monthPrediction >= .30) {
            this.monthPerformance.text = 'Baja correlación';
            this.monthPerformance.color = 'yellow';
        } else {
            this.monthPerformance.text = 'Muy baja correlación';
            this.monthPerformance.color = 'red';
        }
    }

    canUseCompany() {
        return this.currentUser && this.currentUser.role &&
            ((this.currentUser.role.name === 'client' && this.currentUser.company) ||
                (this.currentUser.role.name === 'admin'));
    }

}
