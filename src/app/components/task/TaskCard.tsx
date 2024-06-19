"use client";

import { TaskView } from "@/app/utils/api/models/Task";
import { useState } from "react";
import TaskEditForm from "./TaskEditForm";
import TaskInfo from "./TaskInfo";

function TaskViewShifter({ task, status, isEditing, updateTask, onUpdated, onEdit, onDelete, onCancelEdit }: { task: TaskView, status: string; isEditing: boolean, updateTask: any, onUpdated: any, onEdit: any, onDelete: any, onCancelEdit: any }) {
  if (isEditing) return <TaskEditForm updateTask={updateTask} task={task} status={status} onUpdated={onUpdated} onCancelEdit={onCancelEdit}></TaskEditForm>;

  return <TaskInfo task={task} onEdit={onEdit} onDelete={onDelete}></TaskInfo>;
}

export default function TaskCard({
  task,
  status,
  updateTask,
  onDelete
}: {
  task: TaskView;
  status: string;
  updateTask: any;
  onDelete: any;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="border border-sky-500">
      <TaskViewShifter task={task} status={status} isEditing={isEditing} updateTask={updateTask} onUpdated={() => setIsEditing(false)} onDelete={onDelete} onEdit={() => setIsEditing(true)} onCancelEdit={() => setIsEditing(false)}></TaskViewShifter>
    </div>
  );
}
