import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Story } from './models/story.model';
import { Task } from './models/task.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  apiGatewayUri = 'https://t2sels74kg.execute-api.us-east-1.amazonaws.com/prod';

  getTasks(storyId: string, projectId: string) {
    return this.webReqService.get(this.apiGatewayUri + '/boardapi/' + projectId + '/storyapi/' + storyId + '/taskapi?story=' + storyId);
  }

  getStories(projectId: string) {
    return this.webReqService.get(this.apiGatewayUri + '/boardapi/' + projectId +  '/storyapi?project=' + projectId);
  }

  getProjects() {
    return this.webReqService.get(this.apiGatewayUri + '/boardapi');
  }

  getTaskById(projectId: string, storyId: string, taskId: string) {
    return this.webReqService.get(this.apiGatewayUri + '/boardapi/' + projectId + '/storyapi/' + storyId + '/taskapi/' + taskId);
  }

  getStoryById(projectId: string, storyId: string) {
    return this.webReqService.get(this.apiGatewayUri + '/boardapi/' + projectId + '/storyapi/' + storyId);
  }

  getProjectById(projectId: string) {
    return this.webReqService.get(this.apiGatewayUri + '/boardapi/' + projectId);
  }

  createTask(title: string, task_state: string, project: string, story_id: string) {
    // We want to send a web request to create a task
    return this.webReqService.post(this.apiGatewayUri + '/boardapi/' + project + '/storyapi/' + story_id + '/taskapi/', { title, task_state, story: story_id });
  }

  createStory(title: string, expiration: string, description: string, project_id: string, score: string, story_state: string, priority: string) {
    return this.webReqService.post(this.apiGatewayUri + '/boardapi/' + project_id + '/storyapi', {title, expiration, description, project_id, score, story_state, priority});
  }

  createProject(title: string, expiration: string, description: string, attachment: string) {
    return this.webReqService.post(this.apiGatewayUri + '/boardapi', {title, expiration, description, attachment});
  }

  updateTaskName(title: string, project: string, story: string, task: string) {
    return this.webReqService.patch(this.apiGatewayUri + '/boardapi/' + project + '/storyapi/' + story + '/taskapi/' + task, { title });
  }

  updateStory(id: string, title: string, expiration: string, description: string, project_id: string, score: string, story_state: string, priority: string) {
    //return this.webReqService.put(this.apiGatewayUri + '/boardapi/' + project_id + '/storyapi/' + id, { title, expiration, description, project_id, score, story_state, priority });
    return this.webReqService.patch(this.apiGatewayUri + '/boardapi/' + project_id + '/storyapi/' + id, { title, expiration, description, project_id, score, story_state, priority });
  }

  updateProject(id: string, title: string, expiration: string, description: string, attachment: string) {
    return this.webReqService.patch(this.apiGatewayUri + '/boardapi/' + id, { title, expiration, description, attachment });
  }

  deleteTask(projectId: string, storyId: string, taskId: string) {
    return this.webReqService.delete(this.apiGatewayUri + '/boardapi/' + projectId + '/storyapi/' + storyId + '/taskapi/' + taskId);
  }

  deleteStory(storyId: string, projectId: string) {
    return this.webReqService.delete(this.apiGatewayUri + '/boardapi/' + projectId + '/storyapi/' + storyId);
  }
  
  deleteProject(id: string) {
    return this.webReqService.delete(this.apiGatewayUri + '/boardapi/' + id);
  }

  taskComplete(project: string, story:string, task: string, title: string, task_state: string) {
    return this.webReqService.put(this.apiGatewayUri + '/boardapi/' + project + '/storyapi/' + story + '/taskapi/' + task, { title, task_state, story });
  }

}
