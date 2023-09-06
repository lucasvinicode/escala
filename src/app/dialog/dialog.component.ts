import {Component, Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  dialogForm = new FormGroup({
    names: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
  }

  // Handle date change events if needed
  handleDateChange(event: MatDatepickerInputEvent<Date>): void {
    console.log('Selected date:', event.value);
  }

  onSubmit() {
    if (this.dialogForm.valid) {
      this.dialogRef.close(this.dialogForm.value);
    }
  }  
}