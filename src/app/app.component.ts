import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  signedin$ = new BehaviorSubject<boolean>(false);
  
  constructor(private authService: AuthService){
    this.signedin$ = this.authService.signedin$; //creating a reference
  }

  ngOnInit(){
    this.authService.checkAuth().subscribe(() => {});
/*     this.authService.signedin$.subscribe((signedin) => {
      this.signedin = signedin;
    }) */
  }
}
