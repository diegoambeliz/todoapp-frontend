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
    <form
      className="bg-gray-100 border my-1 flex flex-col p-2 rounded-md"
      ref={ref}
      action={handleSubmit}
    >
      <textarea
        maxLength={250}
        required
        value={task.description}
        onChange={handleChange}
        name="description"
        placeholder="Description"
        className="p-2 mb-2 rounded-md border-gray-500 resize-none min-h-28"
      ></textarea>

      <input
        required
        name="deadline"
        className="p-2 w-fit rounded-md"
        value={task.deadline}
        onChange={handleChange}
        type="date"
      />
      <div className="flex mt-3 h-10 justify-end w-full">
        <button className="me-2 bg-blue-600 hover:bg-blue-700 px-5 rounded-md text-white" type="submit">Create</button>
        <button className="px-5 hover:bg-gray-200 rounded-md" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
