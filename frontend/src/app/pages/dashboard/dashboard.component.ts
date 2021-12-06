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

    this.taskService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;

    })
  }

  /*onStoryClick(story: Story) {
    // we want to set the story to completed
    this.taskService.storyComplete(story).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successfully!");
      story.story_state = !story.story_state;
    })
  }*/

}
