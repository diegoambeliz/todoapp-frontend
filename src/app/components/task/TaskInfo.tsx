import { TaskView } from "@/app/utils/api/models/Task";
import { IconClock, IconEdit, IconTrash } from "@tabler/icons-react";
import { format } from "date-fns";

export default function TaskInfo({
  task,
  onEdit,
  onDelete,
}: {
  task: TaskView;
  onEdit: any;
  onDelete: any;
}) {
  return (
    <div className="p-3 flex flex-col">
      <p>{task.description}</p>
      <div className="my-2">
        <span className="flex w-fit text-sm rounded-md text-gray-400 bg-gray-200 p-1 px-2 my-1">
          <IconClock color="gray" stroke={1} size={20} className="me-1"></IconClock>
          {format(task.deadline, "MM/dd/yyyy")}
        </span>
      </div>
      <hr className="my-2" />
      <section className="mt-2">
        <button className="mx-1 hover:bg-gray-200 rounded-md" onClick={onEdit}>
          <IconEdit size={20} color="grey" className="hover:text-gray-600" stroke={1} />
        </button>
        <button className="mx-1 hover:bg-gray-200 rounded-md" onClick={() => onDelete(task.id)}>
          <IconTrash size={20} color="grey" stroke={1} />
        </button>
      </section>
    </div>
  );
}
