import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { WidgetModel } from 'src/models/dashboard.model';

@Component({
  selector: 'app-widget-modal',
  templateUrl: './widget-modal.component.html'
})
export class WidgetModalComponent implements OnInit {
  inputForm: FormGroup;
  chartTypes: string[] = [
    'line',
    'pie',
    'radar',
    'bar',
    'doughnut',
    'polarArea',
  ]
  /**
   * @Input & @Output decorators allow communication between Child and Parent component
   * @Input allow Parent component to send data
   * @Output allow Child component to emit an Event to Parent component
   */

  // Receive true or false from Parent component
  @Input() modal: boolean;

  // Tell to parent component that modal is close
  @Output() closeModal = new EventEmitter<WidgetModel>();
  constructor() {
    this.initForm();
  }

  ngOnInit(): void {
    this.inputForm.controls["type"].setValue(this.chartTypes[0]);
  }

  initForm() {
    this.inputForm = new FormGroup({
      title: new FormControl("chart", [Validators.required]),
      link: new FormControl("http://localhost:8080/api/Charts/timeseries", [Validators.required]),
      type: new FormControl(null),
    });
  }

  toggle() {
    var widget: WidgetModel = {
      title: this.inputForm.controls["title"].value,
      link: this.inputForm.controls["link"].value,
      type: this.inputForm.controls["type"].value,
      cols:0,
      rows:0,
      x:0,
      y:0,
    };
    this.closeModal.emit(widget);
  }
}
