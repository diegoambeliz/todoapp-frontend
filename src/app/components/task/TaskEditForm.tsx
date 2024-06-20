import { TaskEdit, TaskView } from "@/app/utils/api/models/Task";
import { useRef, useState } from "react";
import { format } from 'date-fns'

export default function TaskEditForm({task, status, updateTask, onUpdated, onCancelEdit}:{task: TaskView, status: string, updateTask: any, onUpdated: any, onCancelEdit: any}) {

  const [taskToEdit, setTaskToEdit] = useState<TaskEdit>({...task, status});

  const ref = useRef<HTMLFormElement>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTaskToEdit({
      ...taskToEdit,
      [name]: value,
    });
  };

  function updateTaskData(formData: FormData){
    const strDate = taskToEdit.deadline;
    const deadline = new Date(strDate).toISOString();

    const sendTask = { ...taskToEdit };
    sendTask.deadline = deadline;

    updateTask(sendTask);

    onUpdated();
  }

  return (
    <div>
      <form ref={ref} action={updateTaskData}>
      <textarea
        required
        value={taskToEdit.description}
        onChange={handleChange}
        name="description"
        placeholder="Description"
      ></textarea>

      <input
        required
        name="deadline"
        value={taskToEdit.deadline ? format(taskToEdit.deadline, 'yyyy-MM-dd') : ""}
        onChange={handleChange}
        type="date"
      />

      <button type="submit">Modify</button>
      <button type="button" onClick={onCancelEdit}>Cancel</button>
    </form>

    </div>
  );
}
