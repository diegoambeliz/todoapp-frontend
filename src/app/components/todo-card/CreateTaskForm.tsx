"use client";

import { TaskCreate } from "@/app/utils/api/models/Task";
import { useRef, useState } from "react";

export default function CreateTaskForm({
  status,
  onSubmit,
  onCancel,
}: {
  status: string;
  onSubmit: any;
  onCancel: any;
}) {
  const ref = useRef<HTMLFormElement>(null);

  const [task, setTask] = useState<TaskCreate>({
    description: "",
    deadline: "",
    status,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (formData: FormData) => {
    const strDate = task.deadline;
    const deadline = new Date(strDate).toISOString();

    const sendTask = { ...task };
    sendTask.deadline = deadline;
    onSubmit(sendTask);

    ref.current?.reset();

    setTask({
      description: "",
      deadline: "",
      status,
    });
  };

  return (
    <form ref={ref} action={handleSubmit}>
      <textarea
        required
        value={task.description}
        onChange={handleChange}
        name="description"
        placeholder="Description"
      ></textarea>

      <input
        required
        name="deadline"
        value={task.deadline}
        onChange={handleChange}
        type="date"
      />

      <button type="submit">Create</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
