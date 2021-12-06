import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  signIn() {
    window.location.href = environment.loginURL;
  }


}
