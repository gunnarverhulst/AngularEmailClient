import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent {

  email: Email = {
    id: '',
    to: '',
    subject: '',
    html: '',
    text: '',
    from: ''
  };

  constructor(private route: ActivatedRoute){
    //this.email = this.route.snapshot.data['email'];
    this.route.data.subscribe(({email}) => {
      this.email = email;
    })
  }

}
