"use client";

import { TaskView } from "@/app/utils/api/models/Task";
import CreateTaskButton from "./CreateTaskButton";
import CreateTaskForm from "./CreateTaskForm";
import { useState } from "react";
import TaskCard from "../task/TaskCard";

export default function TodoCard({
  title,
  tasks,
  status,
  updateTask,
  onSubmit,
  onDelete
}: {
  title: string;
  tasks: TaskView[];
  status: string;
  updateTask: any;
  onSubmit: any;
  onDelete: any;
}) {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <article className="flex flex-col">
      <h2>{title}</h2>

      {tasks.map((x) => {
        return <TaskCard status={status} updateTask={updateTask} onDelete={onDelete} key={x.id} task={x}></TaskCard>;
      })}

      {isCreating ? (
        <CreateTaskForm
          status={status}
          onSubmit={onSubmit}
          onCancel={() => {
            setIsCreating(false);
          }}
        ></CreateTaskForm>
      ) : (
        <CreateTaskButton
          onClick={() => {
            setIsCreating(true);
          }}
        ></CreateTaskButton>
      )}
    </article>
  );
}
