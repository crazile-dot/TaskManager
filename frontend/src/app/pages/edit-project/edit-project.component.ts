import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  projectId: string;
  project: Project;
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.projectId = params.board_id;
        this.taskService.getProjectById(this.projectId).subscribe((project: Project) => {
          this.project = project['body'];
        })
      })
  }

  updateProject(title: string, expiration: string, description: string, attachment: string) {
    this.taskService.updateProject(this.projectId, title, expiration, description, attachment).subscribe(() => {
      this.router.navigate(['/dashboard/' + this.projectId]);
    })
  }

}
