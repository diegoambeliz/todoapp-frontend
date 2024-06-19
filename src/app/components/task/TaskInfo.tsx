import { TaskView } from "@/app/utils/api/models/Task";

export default function TaskInfo({task, onEdit, onDelete} : {task: TaskView, onEdit: any, onDelete: any}) {
    return <div className="p-3">
        {task.description}
          <button className="mx-3 bg-green-300" onClick={onEdit}>Edit</button>
          <button className="mx-3 bg-green-300" onClick={() => onDelete(task.id)}>Remove</button>
    </div>;
  }
  