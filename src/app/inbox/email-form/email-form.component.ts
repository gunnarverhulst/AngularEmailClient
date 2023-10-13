import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Email } from '../email';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent {

  @Input() email: Email | undefined;
  emailForm: any;

  @Output() emailSubmit = new EventEmitter();

  ngOnInit(){

    this.emailForm = new FormGroup({
      to: new FormControl(this.email?.to, [Validators.required, Validators.email]),
      from: new FormControl({value: this.email?.from, disabled: true}),
      subject: new FormControl(this.email?.subject, [Validators.required]),
      text: new FormControl(this.email?.text, [Validators.required]),
    })
  }

  onSubmit(){
    if(this.emailForm.invalid){
      return;
    }

    this.emailSubmit.emit(this.emailForm.value);
  }

/*   findInvalidControls() {
    console.log(this.emailForm.controls.length);
    const controls = this.emailForm.controls;
    for (const control in controls) {
        if (controls[control].invalid) {
            console.log('invalid', controls[control].value)
        }
    }
  } */

}
