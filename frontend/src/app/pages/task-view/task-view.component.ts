import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Params } from '@angular/router';
import { Story } from 'src/app/models/story.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  tasks: Task[] = [];
  stories: Story[] = [];
  
  value: boolean = false;
  selectedStoryId: string;
  selectedProjectId: string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.board_id) {
          this.selectedProjectId = params.board_id;
         /* this.taskService.getStoriesList(params.board_id).subscribe((stories: Story[]) => {
            this.stories = stories;
          })
        } else {
          this.stories = undefined;
        }*/
      }
    })

    this.taskService.getStories(this.selectedProjectId).subscribe((stories: Story[]) => {
      this.stories = stories['body'];
    })
  }

  onTaskClick(task: Task) {
    // we want to set the story to completed
    this.taskService.taskComplete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successfully!");
      task.task_state = !task.task_state;
    })
  }

  onStoryClick(storyId: string) {
    this.value = true;
    this.selectedStoryId = storyId;
    this.taskService.getTasks(this.selectedStoryId, this.selectedProjectId).subscribe((tasks: Task[]) => {
      this.tasks = tasks['body'];
    })

  }

  onDeletStoryClick() {
    this.taskService.deleteStory(this.selectedStoryId, this. selectedProjectId).subscribe((res: any) => {
      this.router.navigate(['/dashboard/' + this.selectedStoryId + '/stories']);
    })
  }

}
