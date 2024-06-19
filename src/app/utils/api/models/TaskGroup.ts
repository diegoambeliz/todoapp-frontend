import { TaskView } from "./Task";

export interface TaskGroupView {
  status: string;
  tasks: TaskView[];
}
