import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TaskViewComponent } from "./pages/task-view/task-view.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NewStoryComponent } from "./pages/new-story/new-story.component";
import { NewTaskComponent } from "./pages/new-task/new-task.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { WebReqInterceptor } from "./web-req.interceptor";
import { SignupPageComponent } from "./pages/signup-page/signup-page.component";
import { EditListComponent } from "./pages/edit-list/edit-list.component";
import { EditTaskComponent } from "./pages/edit-task/edit-task.component";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { NewProjectComponent } from './pages/new-project/new-project.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewStoryComponent,
    NewTaskComponent,
    LoginPageComponent,
    SignupPageComponent,
    EditListComponent,
    EditTaskComponent,
    HomepageComponent,
    DashboardComponent,
    NewProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
