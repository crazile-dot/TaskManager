import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TaskViewComponent } from "./pages/task-view/task-view.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NewStoryComponent } from "./pages/new-story/new-story.component";
import { NewTaskComponent } from "./pages/new-task/new-task.component";
import { WebReqInterceptor } from "./web-req.interceptor";
import { EditProjectComponent } from "./pages/edit-project/edit-project.component";
import { EditTaskComponent } from "./pages/edit-task/edit-task.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { EditStoryComponent } from './pages/edit-story/edit-story.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewStoryComponent,
    NewTaskComponent,
    EditProjectComponent,
    EditTaskComponent,
    DashboardComponent,
    NewProjectComponent,
    EditStoryComponent
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
