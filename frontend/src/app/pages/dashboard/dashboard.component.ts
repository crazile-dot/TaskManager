import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Params } from '@angular/router';
import { Story } from 'src/app/models/story.model';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  projects: Project[] = [];
  stories: Story[] = [];
  
  value: boolean = false;
  selectedProjectId: string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.board_id) {
          this.selectedProjectId = params.board_id;
      }
    })

    this.taskService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;

    })
  }

  onProjectClick(projectId: string) {
    this.value = true;
    this.selectedProjectId = projectId;
  }

  onDeletProjectClick() {
    this.taskService.deleteProject(this.selectedProjectId).subscribe((res: any) => {
      this.router.navigate(['/dashboard']);
    })
  }

}
