import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  selectedProjectId: string;
  selectedStoryId: string;
  selectedTaskId: string;

  task: Task;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedProjectId = params.board_id;
        this.selectedStoryId = params.story_id;
        this.selectedTaskId = params.task_id;
        this.taskService.getTaskById(this.selectedProjectId, this.selectedStoryId, this.selectedTaskId).subscribe((task: Task) => {
          this.task = task['body'];
        })
      }
    )
  }

  updateTaskName(title: string) {
    this.taskService.updateTaskName(title, this.selectedProjectId, this.selectedStoryId, this.selectedTaskId).subscribe(() => {
      this.router.navigate(['/dashboard/' + this.selectedProjectId + '/stories', this.selectedStoryId]);
    })
  }

}
