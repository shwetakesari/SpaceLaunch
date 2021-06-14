import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpaceLaunchComponent } from './launch/space-launch/space-launch.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'launch/launch',
    pathMatch: 'full'
  },
  {
    path: 'launch/launch',
    component: SpaceLaunchComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
