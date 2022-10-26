import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassifiedListingComponent } from './pages/classified-listing/classified-listing.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { CreateClassifiedComponent } from './pages/create-classified/create-classified.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'create', component: CreateClassifiedComponent, canActivate: [AuthGuard] },
  { path: '', component: ClassifiedListingComponent, canActivate: [AuthGuard] }
];


@NgModule({
  declarations: [
    ClassifiedListingComponent,
    CreateClassifiedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class ClassifiedsModule { }
