import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Params } from '@angular/router';
import { Story } from 'src/app/models/story.model';
import { Project } from 'src/app/models/project.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  projects: Project[] = [];
  stories: Story[] = [];
  tasks: Task[] = [];
  temp: Project[] = [];
  
  value: boolean = false;
  selectedProjectId: string;
  storyId: string;
  taskId: string;

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
    this.temp = [];
    for(let i=0; i<this.projects.length; i++) {
      if (this.projects[i].id == this.selectedProjectId)
        this.temp.push(this.projects[i]);
    }    
  }

  onDeleteProjectClick(projectId: string) {
    this.taskService.getStories(projectId).subscribe((stories: Story[]) => {
      this.stories = stories['body']['Items'];
      for (let i=0; i<this.stories.length; i++) {
        this.storyId = this.stories[i].id;
        this.taskService.getTasks(this.storyId, projectId).subscribe((tasks: Task[]) => {
          this.tasks = tasks['body'];
          for (let j=0; j<this.tasks.length; j++) {
            this.taskId = this.tasks[j].id;
            this.taskService.deleteTask(projectId, this.storyId, this.taskId).subscribe((res: any) => {
              console.log(res);
              //this.tasks = this.tasks.filter(val => val.id !== this.taskId);
            })
          }
        })
        this.taskService.deleteStory(this.storyId, this.selectedProjectId).subscribe((res: any) => {
          console.log(res);
          //this.stories = this.stories.filter(val => val.id !== this.storyId);
        })
      }
      this.taskService.deleteProject(projectId).subscribe((res: any) => {
        this.router.navigate(['/dashboard']);
      });
    })
    
  }

}
