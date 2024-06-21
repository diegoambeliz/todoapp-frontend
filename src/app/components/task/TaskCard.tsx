"use client";

import { TaskView } from "@/app/utils/api/models/Task";
import { useState } from "react";
import TaskEditForm from "./TaskEditForm";
import TaskInfo from "./TaskInfo";
import { useDraggable } from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';

function TaskViewShifter({ task, status, isEditing, updateTask, onUpdated, onEdit, onDelete, onCancelEdit }: { task: TaskView, status: string; isEditing: boolean, updateTask: any, onUpdated: any, onEdit: any, onDelete: any, onCancelEdit: any }) {
  if (isEditing) return <TaskEditForm updateTask={updateTask} task={task} status={status} onUpdated={onUpdated} onCancelEdit={onCancelEdit}></TaskEditForm>;

  return <TaskInfo task={task} onEdit={onEdit} onDelete={onDelete}></TaskInfo>;
}

export default function TaskCard({
  id,
  task,
  status,
  color,
  updateTask,
  onDelete
}: {
  id: string,
  task: TaskView;
  status: string;
  color: string;
  updateTask: any;
  onDelete: any;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
    data: task
  });

  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={`border bg-gray-100 my-1 rounded-m border-b-4 border-b-${color}-500`}>
      <TaskViewShifter task={task} status={status} isEditing={isEditing} updateTask={updateTask} onUpdated={() => setIsEditing(false)} onDelete={onDelete} onEdit={() => setIsEditing(true)} onCancelEdit={() => setIsEditing(false)}></TaskViewShifter>
    </div>
  );
}
