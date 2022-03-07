import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'dashboard-modal',
  templateUrl: './dashboard-modal.component.html'
})
export class DashboardModalComponent {  
  inputForm: FormGroup;
  constructor() {
    this.initForm();
  }

  initForm() {
    this.inputForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });
  }
  
  /**
   * @Input & @Output decorators allow communication between Child and Parent component
   * @Input allow Parent component to send data
   * @Output allow Child component to emit an Event to Parent component
   */

  // Receive true or false from Parent component
  @Input() modal: boolean;

  // Tell to parent component that modal is close
  @Output() closeModal = new EventEmitter<string>();

  toggle() {
    this.closeModal.emit(this.inputForm.controls["name"].value);
  }
}
