import * as internal from "assert";
import { Task } from "src/app/models/task.model";

export class Story {
    id: string;
    title: string;
    expiration: string;
    description: string;
    project_id: string;
    project_name: string;
    score: number;
    story_state: string;
    priority: string;
}