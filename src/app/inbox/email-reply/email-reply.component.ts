import { Component, Input } from '@angular/core';
import { Email } from '../email';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent {

  showModal = false;
  @Input() email: Email = {
    id: '',
    to: '',
    subject: '',
    html: '',
    text: '',
    from: ''
  };


  constructor(private emailService: EmailService) { }

  ngOnCHanges() {
    const text = this.email.text.replace(/\n/gi,'\n>');
    this.email = {
      ...this.email,
      from: this.email?.to,
      to: this.email?.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n------------- ${this.email.from} wrote:\n> ${text}`
    }
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }

}
