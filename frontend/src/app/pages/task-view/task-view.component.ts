import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Params } from '@angular/router';
import { Story } from 'src/app/models/story.model';
import { Task } from 'src/app/models/task.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  tasks: Task[] = [];
  stories: Story[] = [];
  temp: Story[] = [];

  deletingTasks: Task[] = [];
  
  value: boolean = false;
  check: boolean;

  selectedStoryId: string;
  selectedProjectId: string;
  selectedTaskId: string;

  ngOnInit() {
    this.check = false;
    this.route.params.subscribe(
      (params: Params) => {
        if (params.board_id) {
          this.selectedProjectId = params.board_id;
      }
    })

    this.taskService.getStories(this.selectedProjectId).subscribe((stories: Story[]) => {
      this.stories = stories['body']['Items'];
    })
  }

  onTaskClick(task: Task) {
    if (this.check == false) {
      this.selectedTaskId = task.id;
      // we want to set the task to completed
      this.taskService.taskComplete(this.selectedProjectId, this.selectedStoryId, this.selectedTaskId, task.title, "completato").subscribe((res: Task) => {
        // the task has been set to completed successfully
        console.log("Task completato!");
      })
    }
  }

  onStoryClick(storyId: string) {
    this.value = true;
    this.selectedStoryId = storyId;
    this.temp = [];
    for(let i=0; i<this.stories.length; i++) {
      if (this.stories[i].id == this.selectedStoryId)
        this.temp.push(this.stories[i]);
    }    
    this.taskService.getTasks(this.selectedStoryId, this.selectedProjectId).subscribe((tasks: Task[]) => {
      this.tasks = tasks['body'];
    });

  }

  onDeleteStoryClick(storyId: string) {
    for (let i=0; i<this.tasks.length; i++) {
      this.onDeleteTaskClick(this.tasks[i].id);
    }
    this.taskService.deleteStory(storyId, this. selectedProjectId).subscribe((res: any) => {
      this.stories = this.stories.filter(val => val.id !== storyId);
      this.router.navigate(['/dashboard/' + this.selectedProjectId + '/stories/' + this.selectedStoryId]);
    });
  }

  onDeleteTaskClick(taskId: string) {
    this.check = true;
    this.taskService.deleteTask(this.selectedProjectId, this.selectedStoryId, taskId).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val.id !== taskId);
    });
  }

  signOut() {
    window.location.href = environment.logout;
  }

}
