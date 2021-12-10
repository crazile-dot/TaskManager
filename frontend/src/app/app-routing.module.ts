import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewStoryComponent } from './pages/new-story/new-story.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { EditStoryComponent } from './pages/edit-story/edit-story.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'edit-project/:board_id', component: EditProjectComponent },
  { path: 'edit-story/:board_id/:story_id', component: EditStoryComponent },
  { path: 'edit-task/:board_id/:story_id/:task_id', component: EditTaskComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/:board_id', component: DashboardComponent },
  { path: 'dashboard/:board_id/stories', component: TaskViewComponent },
  { path: 'dashboard/:board_id/stories/:storyId', component: TaskViewComponent },
  { path: 'dashboard/:board_id/stories/:storyId/tasks/:taskId', component: TaskViewComponent },
  { path: 'new-story/:board_id', component: NewStoryComponent },
  { path: 'new-task/:board_id/:story_id', component: NewTaskComponent },
  { path: 'new-project', component: NewProjectComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
