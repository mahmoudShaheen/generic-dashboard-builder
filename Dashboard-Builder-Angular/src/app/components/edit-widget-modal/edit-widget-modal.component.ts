import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { WidgetModel } from 'src/models/dashboard.model';

@Component({
  selector: 'app-edit-widget-modal',
  templateUrl: './edit-widget-modal.component.html'
})
export class EditWidgetModalComponent implements OnInit {
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

  @Input() model: WidgetModel;

  // Tell to parent component that modal is close
  @Output() closeModal = new EventEmitter<WidgetModel>();
  constructor() {
    this.initForm();
  }

  ngOnInit(): void {
    console.log(this.model);
    this.inputForm.controls["title"].setValue(this.model.title);
    this.inputForm.controls["link"].setValue(this.model.link);
    this.inputForm.controls["type"].setValue(this.model.type);
  }

  initForm() {
    this.inputForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      link: new FormControl(null, [Validators.required]),
      type: new FormControl(null),
    });
  }

  toggle() {
    this.model.title = this.inputForm.controls["title"].value;
    this.model.link = this.inputForm.controls["link"].value;
    this.model.type = this.inputForm.controls["type"].value;
    this.closeModal.emit(this.model);
  }
}
