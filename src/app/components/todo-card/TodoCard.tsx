"use client";

import { TaskView } from "@/app/utils/api/models/Task";
import CreateTaskButton from "./CreateTaskButton";
import CreateTaskForm from "./CreateTaskForm";
import { useState } from "react";
import TaskCard from "../task/TaskCard";
import { useDroppable } from "@dnd-kit/core";

export default function TodoCard({
  title,
  children,
  status,
  onSubmit,
}: {
  title: string;
  children: any,
  status: string;
  onSubmit: any;
}) {
  const [isCreating, setIsCreating] = useState(false);

  const {isOver, setNodeRef} = useDroppable({
    id: status,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <article ref={setNodeRef} className="flex flex-col m-5 w-1/3 min-h-[40rem] bg-white rounded-md p-4 shadow-md">
      <h2>{title}</h2>

      {children}

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
