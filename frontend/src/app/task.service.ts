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

  updateProject(id: string, title: string, expiration: string, description: string, attachment: string) {
    return this.webReqService.put(this.apiGatewayUri + '/boardapi' + id, { title, expiration, description, attachment });
  }

  updateStory(id: string, title: string, expiration: string, description: string, project: string, score: string, story_state: string, priority: string) {
    return this.webReqService.put(this.apiGatewayUri + '/boardapi' + project + '/storyapi/' + id, { title, expiration, description, project, score, story_state, priority });
  }

  updateTask(title: string, task_state: string, project: string, story: string) {
    return this.webReqService.put(this.apiGatewayUri + '/boardapi/' + project + '/storyapi/' + story + '/taskapi/', { title, task_state, project, story });
  }

  deleteProject(id: string) {
    return this.webReqService.delete(this.apiGatewayUri + '/boardapi/' + id);
  }

  deleteStory(storyId: string, projectId: string) {
    return this.webReqService.delete(this.apiGatewayUri + '/boardapi/' + projectId + '/storyapi/' + storyId);
  }

  deleteTask(listId: string, taskId: string) {
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
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
    return this.webReqService.put(`lists/${task.story_id}/tasks/${task._id}`, {
      completed: !task.task_state
    });
  }

}
