import { DashboardService } from '../../services/dashboard.service';
import { DashboardModel } from "../../../models/dashboard.model";
import { Component, OnInit } from "@angular/core";
import { Routes, Router } from '@angular/router';

@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {

	constructor(private _ds: DashboardService, private _router: Router) {};

	// Components variables
	protected toggle: boolean = true;
	protected modal: boolean;
	protected dashboardCollection: DashboardModel[];

	// On component init we store Widget Marketplace in a WidgetModel array
	ngOnInit(): void {
		this.getDashboards();
	}
	
	// Method call when toggle button is clicked in navbar
	toggleMenu(): void {
		// this.toggle = !this.toggle;
	}

	closeModal(e: string){
		this.modal = !this.modal;
		this.createDashboard(e);
		console.log(e);
	}

	getDashboards(){
		// We make get request to get all dashboards from our REST API
		this._ds.getDashboards().subscribe(dashboards => {
			this.dashboardCollection = dashboards;
		});
	}

	createDashboard(dashboardName: string){
		this._ds.createDashboard(dashboardName).subscribe(x=> {
			this.getDashboards();
			this._router.navigateByUrl("/dashboard/"+ x.id);
		});
	}

	deleteDashboard(dashboardId: number){
		this._ds.deleteDashboard(dashboardId).subscribe(x=> {
			this.getDashboards();
			this._router.navigateByUrl("/");
		});
	}

	reload(){ 
		this.ngOnInit();
	}
}
