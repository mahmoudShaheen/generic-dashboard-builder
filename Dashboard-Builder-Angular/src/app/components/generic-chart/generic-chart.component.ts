import { Component, Input, OnInit } from "@angular/core";
import { DashboardService } from "../../services/dashboard.service";

@Component({
	selector: "app-generic-chart",
	templateUrl: "./generic-chart.component.html"
})
export class GenericChartComponent implements OnInit {

	@Input() genericChartType: string;
	@Input() genericChartLink: string;
	
	chartReady:boolean;

	constructor(private _ds: DashboardService){
	}

	public genericChartOptions:any = {
		responsive: true
	};
	public genericChartLegend:boolean = true;

	public genericChartData:Array<any> = new Array<any>();
	public genericChartLabels:Array<any> = new Array<any>();
	 

	ngOnInit(): void{
		//Get Data using Link
		this._ds.getData(this.genericChartLink).subscribe(data => {
			// We fill our dashboardCollection with returned Observable
			var chartData:Array<any> = [];
			Object.keys(data.values).forEach(function (key){
				chartData.push({data: data.values[key], label: key})
			});
			this.genericChartData = (chartData);
			this.genericChartLabels = (data.labels);
			this.chartReady = true;
		});
	}
}