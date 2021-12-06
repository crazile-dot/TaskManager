import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Story } from 'src/app/models/story.model';
import { strictEqual } from 'assert';

@Component({
  selector: 'app-new-story',
  templateUrl: './new-story.component.html',
  styleUrls: ['./new-story.component.scss']
})

export class NewStoryComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  selectedProjectId: string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params.board_id);
        this.selectedProjectId = params.board_id;
      })
  }

  
  createStory(title: string, expiration: string, description: string, projectId: string, score: string, story_state: string, priority: string) {
    this.taskService.createStory(title, expiration, description, projectId, score, story_state, priority).subscribe((story: Story) => {
      console.log(story.title);
      this.router.navigate(['/dashboard/' + this.selectedProjectId + '/stories']); 
    });
    
  }

}