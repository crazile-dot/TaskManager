import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
  }

  createProject(title: string, expiration: string, description: string, attachment: string) {
    this.taskService.createProject(title, expiration, description, attachment).subscribe((project: Project) => {
      this.router.navigate([ '/dashboard' ]); 
    });
  }
}
