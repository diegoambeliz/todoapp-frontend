'use client'

import { useEffect, useRef, useState } from "react";
import TodoCard from "../todo-card/TodoCard";
import { TaskGroupView } from "@/app/utils/api/models/TaskGroup";
import { TaskCreate, TaskEdit } from "@/app/utils/api/models/Task";
import { taskCreate, taskGetAll, taskRemove, taskUpdate } from "@/app/utils/api/task-api";



export default function TodoBoard({apiUrl}:{apiUrl:string}) {
  const [tasksGroups, setTasksGroups] = useState<TaskGroupView[]>();

  function fetchData(){
    taskGetAll(apiUrl).then(res => {
        if(res)
            setTasksGroups(res);
    })
  }

  async function create(data: TaskCreate){
    const result = await taskCreate(apiUrl, data);

    fetchData();
  }

  const update = async (task: TaskEdit) => {
    const result = await taskUpdate(apiUrl, task);

    fetchData();
  }

  async function remove(id: string){
    const result = await taskRemove(apiUrl, id);

    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      <TodoCard
        title="To do"
        status="todo"
        tasks={
          tasksGroups
            ? tasksGroups.find((x) => x.status == "todo")?.tasks || []
            : []
        }
        updateTask={update}
        onSubmit={(data: TaskCreate) => create(data)}
        onDelete={(id: string) => remove(id)}
      ></TodoCard>
      {/* <TodoCard title="Doing"></TodoCard>
    <TodoCard title="Done"></TodoCard> */}
    </div>
  );
}
