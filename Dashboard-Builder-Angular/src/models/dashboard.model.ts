export type WidgetModel = {
    title: string;
    rows: number;
    cols: number;
    x: number;
    y: number;
    link: string;
    type: string;
};

export type DashboardModel = {
    id: number;
    name: string;
    canvas: Array<WidgetModel>;
};

export type CreateDashboardModel = {
    name: string;
    canvas: Array<WidgetModel>;

};

export interface DataModel {
    labels: string[];
    values: Map<string, number[]>;
};
