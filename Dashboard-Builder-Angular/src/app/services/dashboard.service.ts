import { WidgetModel, DashboardModel, DataModel, CreateDashboardModel } from '../../models/dashboard.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
	providedIn: "root"
})
export class DashboardService {

	baseLink:string = "http://localhost:8080/";
	dashboardLink:string = this.baseLink + "api/dashboards/";
	dataLink:string = this.baseLink + "api/chart/";

	constructor(private _http: HttpClient) {}

	// Get Chart Data
	getData(link: string): Observable<DataModel> {
		return this._http.get<DataModel>(link);
	}

	// Return Array of DashboardModel
	getDashboards(): Observable<Array<DashboardModel>> {
		return this._http.get<Array<DashboardModel>>(this.dashboardLink);
	}

	// Return an object
	getDashboard(id: number): Observable<DashboardModel> {
		return this._http.get<DashboardModel>(this.dashboardLink + id.toString());
	}

	// Create Dasgboard
	createDashboard(dashboardName: string): Observable<DashboardModel> {
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
		var dashboard: CreateDashboardModel ={name: dashboardName, canvas:[] }
		return this._http.post<DashboardModel>(this.dashboardLink, dashboard, httpOptions);
	}

	// Delete Dasgboard
	deleteDashboard(dashboardId: number): Observable<any> {
		return this._http.delete<any>(this.dashboardLink + dashboardId);
	}

	// Update json
	updateDashboard(params: DashboardModel): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
		return this._http.put<DashboardModel>(this.dashboardLink + params.id.toString(), params, httpOptions);
	}
}
