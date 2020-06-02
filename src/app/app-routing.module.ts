import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ConsultDoctorComponent } from './components/consult-doctor/consult-doctor.component';
import { SurgeryComponent } from './components/surgery/surgery.component';
import { AppointmentHomeComponent } from './components/appointment-home/appointment-home.component';


const routes: Routes = [
  { path: '', component:  LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'agendar', component: ScheduleComponent },
  { path: 'consultar-especialista', component: ConsultDoctorComponent },
  { path: 'cirugia', component: SurgeryComponent },
  { path: 'medico-en-casa', component: AppointmentHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
