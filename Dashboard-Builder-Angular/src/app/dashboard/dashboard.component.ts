// GRIDSTER & ANGULAR
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GridsterConfig, GridsterItem, GridsterItemComponentInterface } from "angular-gridster2";
import { DashboardService } from "../services/dashboard.service";
import { DashboardModel, WidgetModel } from "../../models/dashboard.model";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {
	constructor(private _route: ActivatedRoute, private _ds: DashboardService) {}

	protected modal: boolean;
	protected editModal: boolean;
	protected dashboard: DashboardModel = {id: 1, name: "Dashboard", canvas:[]};

	protected options: GridsterConfig;

	ngOnInit() {
		this.options = {
			gridType: "scrollVertical",
			enableEmptyCellDrop: true,
			pushItems: true,
			swap: true,
			pushDirections: { north: true, east: true, south: true, west: true },
			resizable: { enabled: true },
			itemChangeCallback: this.itemChange.bind(this),
			draggable: {
				enabled: true,
				ignoreContent: true,
				dropOverItems: true,
				dragHandleClass: "drag-handler",
				ignoreContentClass: "no-drag",
			},
			displayGrid: "always",
			minCols: 32,
			minRows: 18,
		};
		this.getData();
	}
	
	changedOptions() {
		this.options.api.optionsChanged();
	}

	getData() {
		// We get the id in get current router dashboard/:id
		this._route.params.subscribe(params => {
			// We make a get request with the dashboard id
			this._ds.getDashboard(params["id"]).subscribe(dashboard => {
				// We fill our dashboardCollection with returned Observable
				this.dashboard = dashboard;
			});
		});
	}

	closeModal(item: WidgetModel){
		this.modal = !this.modal;
		item.cols = 17;
		item.rows = 10;
		item.x = 0;
		item.y = 0;
		this.addWidget(item);
		console.log(item);
	}

	removeWidget(item) {
		this.dashboard.canvas.splice(
			this.dashboard.canvas.indexOf(item),
			1
		);
		this.itemChange();
	}

	editWidget:WidgetModel;
	editModel(item: WidgetModel){
		this.editWidget = item;
		this.editModal = !this.editModal;
	}
	closeEditModal(item: WidgetModel){
		this.editModal = !this.editModal;
		this.itemChange();
		//this.reload();
	}

	addWidget(widget: WidgetModel){
		this.dashboard.canvas.push(widget);
		this.itemChange();
	}

	itemChange() {
		this._ds.updateDashboard(this.dashboard).subscribe(x=> this.reload());
	}
	
	reload(){ 
		this.ngOnInit();
	}
}
