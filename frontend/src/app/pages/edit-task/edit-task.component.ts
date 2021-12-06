import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  projectId: string;
  storyId: string;
  taskId: string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.projectId = params.board_id;
        this.storyId = params.story_id;
      }
    )
  }

  updateTask(title: string, state: string, project: string, story: string) {
    this.taskService.updateTask(title, state, this.projectId, this.storyId).subscribe(() => {
      this.router.navigate(['/dashboard/' + this.projectId + '/stories', this.projectId]);
    })
  }

}
