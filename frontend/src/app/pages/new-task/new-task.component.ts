import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  selectedStoryId: string;
  selectedProjectId: string;
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        this.selectedProjectId = params.board_id;
        this.selectedStoryId = params.story_id;
      }
    )
  }

  createTask(title: string) {
    this.taskService.createTask(title, "da fare", this.selectedProjectId, this.selectedStoryId).subscribe((task: Task) => {
      this.router.navigate(['/dashboard/' + this.selectedProjectId + '/stories/' + this.selectedStoryId]);
    })
  }

}
