import { TaskEdit, TaskView } from "@/app/utils/api/models/Task";
import { useRef, useState } from "react";
import { format } from "date-fns";

export default function TaskEditForm({
  task,
  status,
  updateTask,
  onUpdated,
  onCancelEdit,
}: {
  task: TaskView;
  status: string;
  updateTask: any;
  onUpdated: any;
  onCancelEdit: any;
}) {
  const [taskToEdit, setTaskToEdit] = useState<TaskEdit>({ ...task, status });

  const ref = useRef<HTMLFormElement>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTaskToEdit({
      ...taskToEdit,
      [name]: value,
    });
  };

  function updateTaskData(formData: FormData) {
    const strDate = taskToEdit.deadline;
    const deadline = new Date(strDate).toISOString();

    const sendTask = { ...taskToEdit };
    sendTask.deadline = deadline;

    updateTask(sendTask);

    onUpdated();
  }

  return (
    <div>
      <form className="flex flex-col p-2" ref={ref} action={updateTaskData}>
        <textarea
          required
          value={taskToEdit.description}
          onChange={handleChange}
          name="description"
          placeholder="Description"
          className="p-2 mb-2 rounded-md border-gray-500 resize-none min-h-28"
          maxLength={250}
        ></textarea>

        <input
          required
          name="deadline"
          className="p-2 w-fit rounded-md"
          value={
            taskToEdit.deadline ? format(taskToEdit.deadline, "yyyy-MM-dd") : ""
          }
          onChange={handleChange}
          type="date"
        />
<div className="flex mt-3 h-10 justify-end w-full">

        <button className="me-2 bg-blue-600 hover:bg-blue-700 px-5 rounded-md text-white" type="submit">Save</button>
        <button className="px-5 hover:bg-gray-200 rounded-md" type="button" onClick={onCancelEdit}>
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
}
