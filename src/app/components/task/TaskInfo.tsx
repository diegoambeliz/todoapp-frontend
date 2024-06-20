import { TaskView } from "@/app/utils/api/models/Task";
import { format } from "date-fns";

export default function TaskInfo({task, onEdit, onDelete} : {task: TaskView, onEdit: any, onDelete: any}) {
    return <div className="p-3 flex flex-col">
        <p>{task.description}</p>
        <span>{format(task.deadline, 'MM/dd/yyyy')}</span>
        <section>
          <button className="mx-3 bg-green-300" onClick={onEdit}>Edit</button>
          <button className="mx-3 bg-green-300" onClick={() => onDelete(task.id)}>Remove</button>
        </section>
    </div>;
  }
  