import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeInboxComponent } from './home-inbox/home-inbox.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailResolverService } from './email-resolver.service';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: HomeInboxComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: ':id', 
        component: EmailShowComponent, 
        resolve: {
          email: EmailResolverService
        }
      },
      { path: '', component: PlaceholderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
