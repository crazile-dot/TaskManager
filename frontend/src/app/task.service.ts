import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Story } from './models/story.model';
import { Task } from './models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  apiGatewayUri = 'https://t2sels74kg.execute-api.us-east-1.amazonaws.com/prod';

  signIn() {
    return this.webReqService.call('');
  }

  getTasks(storyId: string, projectId: string) {
    return this.webReqService.get(this.apiGatewayUri + '/boardapi/' + projectId + '/storyapi/' + storyId + '/detailtaskapi?story=' + storyId);
  }

  getStories(projectId: string) {
    return this.webReqService.get(this.apiGatewayUri + '/boardapi/' + projectId + '/detailstoryapi?project=' + projectId);
  }

  getProjects() {
    return this.webReqService.get(this.apiGatewayUri + '/boardapi');
  }

  createTask(title: string, expiration: string, attachment: string, task_state: string, projectId: string, storyId: string) {
    // We want to send a web request to create a task
    return this.webReqService.post(this.apiGatewayUri + '/boardapi/' + projectId + '/storyapi/' + storyId, { title, expiration, attachment, task_state });
  }

  createStory(title: string, expiration: string, description: string, projectId: string, score: string, story_state: string, priority: string) {
    return this.webReqService.post(this.apiGatewayUri + '/boardapi/' + projectId + '/storyapi/', {title, expiration, description, project_id: projectId, score, story_state, priority});
  }

  createProject(title: string, expiration: string, description: string, attachment: string) {
    return this.webReqService.post(this.apiGatewayUri + '/boardapi', {title, expiration, description, attachment});
  }

  updateList(id: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`lists/${id}`, { title });
  }

  updateTask(listId: string, taskId: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  }

  deleteTask(listId: string, taskId: string) {
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  deleteList(id: string) {
    return this.webReqService.delete(`lists/${id}`);
  }

  getTasksList(storyId: string) {
    return this.webReqService.get(this.apiGatewayUri + '/storyapi' + '/' + storyId);
  }

  getStoriesList(projectId: string) {
    return this.webReqService.get(this.apiGatewayUri + '/boardapi/detailstoryapi' + '?project=' + projectId);
  }

 /* storyComplete(story: Story) {
    return this.webReqService.patch(`lists/${story.project}/tasks/${story._id}`, {
      completed: !story.story_state
    });
  }*/

  taskComplete(task: Task) {
    return this.webReqService.patch(`lists/${task.story_id}/tasks/${task._id}`, {
      completed: !task.task_state
    });
  }

}
