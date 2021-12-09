import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Story } from 'src/app/models/story.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.scss']
})
export class EditStoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  projectId: string;
  storyId: string;
  story: Story;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.projectId = params.board_id;
        this.storyId = params.story_id;
        this.taskService.getStoryById(this.projectId, this.storyId).subscribe((story: Story) => {
          this.story = story['body'];
          console.log(this.story);
        })
      }
    )
  }

  updateStory(title: string, expiration: string, description: string, score: string, state: string, priority: string) {
    this.taskService.updateStory(this.storyId, title, expiration, description, this.projectId, score, state, priority).subscribe(() => {
      this.router.navigate(['/dashboard/' + this.projectId + '/stories/', this.storyId]);
    })
  }

}
