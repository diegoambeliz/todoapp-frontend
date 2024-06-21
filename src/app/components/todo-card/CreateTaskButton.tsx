import { IconPlus } from "@tabler/icons-react";

export default function CreateTaskButton({onClick} : {onClick: any}) {
  return <button className="text-gray-400 hover:bg-gray-100 flex justify-center items-center my-1 transition-all rounded-md h-10" onClick={onClick}><IconPlus></IconPlus> Create a new task</button>;
}
