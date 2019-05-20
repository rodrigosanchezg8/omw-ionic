import {Component, OnInit} from '@angular/core';
import {Chart, ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {FeedbackService} from "../../services/feedback.service";
import {Storage} from "@ionic/storage";
import {User} from "../../models/user";
import {ResponseService} from "../../services/response.service";

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.page.html',
    styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

    public currentUser: User;
    public segmentValues = {
        FOR_USER: 0,
        FOR_COMPANY: 1
    };
    public monthPerformance = {
        text: '',
        color: '',
        prediction: 0
    };
    public segmentValue = this.segmentValues.FOR_USER;
    public currentMonth = new Date().getMonth();
    public selectedMonth = {value: this.currentMonth + 1, offset: 0};
    public months: any[];

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
    public scatterChartColors = [{backgroundColor: ["#e84351", "#434a54", "#3ebf9b", "#4d86dc", "#f3af37"]}]

    constructor(private feedbackService: FeedbackService,
                private storage: Storage,
                private responsesService: ResponseService) {
    }

    async ngOnInit() {
        this.currentUser = await this.storage.get('user') as User;
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

    async segmentChanged(value) {
        this.segmentValue = value;
        await this.triggerLinearRegression();
    }

    async monthChanged(value) {
        this.selectedMonth.offset = this.months.find(m => m.value === value).offset;
        await this.triggerLinearRegression();
    }

    async triggerLinearRegression() {

        this.monthPerformance.color = '';
        this.monthPerformance.text = '';
        this.monthPerformance.prediction = 0;

        let serviceRes;
        if (this.currentUser.role.name === 'client')
            serviceRes = await this.feedbackService.getClientLinearRegression(this.currentUser.id,
                this.selectedMonth.offset, this.segmentValue);
        else if (this.currentUser.role.name === 'admin') {
            serviceRes = await this.feedbackService.getClientLinearRegression(this.currentUser.id,
                this.selectedMonth.offset, this.segmentValue);
        } else {
            this.responsesService.presentResponse({message: 'El rol no permite ver retroalimentación'})
            return;
        }

        if (serviceRes.status === 'failed') {
            this.responsesService.presentResponse(serviceRes);
            return;
        }

        await this.gatherSeriesXY(serviceRes.regression_info);
        if (serviceRes.regression_info.correlation_rate_x1 >= .90) {
            this.monthPerformance.text = 'Muy alta correlación';
            this.monthPerformance.color = 'green';
        } else if (serviceRes.regression_info.monthPrediction >= .70) {
            this.monthPerformance.text = 'Alta correlación';
            this.monthPerformance.color = 'green';
        } else if (serviceRes.regression_info.monthPrediction >= .50) {
            this.monthPerformance.text = 'Correlación moderada';
            this.monthPerformance.color = 'orange';
        } else if (serviceRes.regression_info.monthPrediction >= .30) {
            this.monthPerformance.text = 'Baja correlación';
            this.monthPerformance.color = 'yellow';
        } else {
            this.monthPerformance.text = 'Muy baja correlación';
            this.monthPerformance.color = 'red';
        }
    }

    async gatherSeriesXY(regressionInfo) {
        if (!regressionInfo || (regressionInfo.deliveries_monthly_count.length !== 12 &&
            regressionInfo.months_axis.length !== 12)) {
            this.responsesService.presentResponse({message: 'Hubo un problema calculando la información.'});
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
}
