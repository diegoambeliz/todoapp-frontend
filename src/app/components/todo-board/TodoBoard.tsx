"use client";

import { useEffect, useRef, useState } from "react";
import TodoCard from "../todo-card/TodoCard";
import { TaskGroupView } from "@/app/utils/api/models/TaskGroup";
import { TaskCreate, TaskEdit, TaskView } from "@/app/utils/api/models/Task";
import {
  taskCreate,
  taskGetAll,
  taskRemove,
  taskUpdate,
} from "@/app/utils/api/task-api";
import TaskCard from "../task/TaskCard";
import { Active, DndContext, DragEndEvent, MouseSensor, Over, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";

export default function TodoBoard({ apiUrl }: { apiUrl: string }) {
  const [tasksGroups, setTasksGroups] = useState<TaskGroupView[]>();

  function fetchData() {
    taskGetAll(apiUrl).then((res) => {
      if (res) setTasksGroups(res);
    });
  }

  async function create(data: TaskCreate) {
    const result = await taskCreate(apiUrl, data);

    fetchData();
  }

  const update = async (task: TaskEdit) => {
    const result = await taskUpdate(apiUrl, task);

    fetchData();
  };

  async function remove(id: string) {
    const result = await taskRemove(apiUrl, id);

    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [parent, setParent] = useState<any>(null);

  function handleDragEnd({ over, active }: { over: any; active: any }) {
    setParent(over ? over.id : null);

    const task: TaskView = active.data.current as any;

    const taskEdit: TaskEdit = {
      id: task.id,
      description: task.description,
      deadline: task.deadline,
      status: over.id as any,
    };

    update(taskEdit);
  }

  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const mouseSensor = useSensor(MouseSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      distance: 15
    },
  });

  const sensors = useSensors(
    mouseSensor,
    touchSensor
  );

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex w-full">
        <TodoCard
          title="To Do"
          status="todo"
          onSubmit={(data: TaskCreate) => create(data)}
        >
          {tasksGroups
            ? tasksGroups
                .find((x) => x.status == "todo")
                ?.tasks.map((x, index) => {
                  return (
                    <TaskCard
                      id={"todo" + index}
                      status="todo"
                      color="red"
                      updateTask={update}
                      onDelete={(id: string) => remove(id)}
                      key={x.id}
                      task={x}
                    ></TaskCard>
                  );
                })
            : null}
        </TodoCard>

        <TodoCard
          title="Doing"
          status="doing"
          onSubmit={(data: TaskCreate) => create(data)}
        >
          {tasksGroups
            ? tasksGroups
                .find((x) => x.status == "doing")
                ?.tasks.map((x, index) => {
                  return (
                    <TaskCard
                      id={"doing" + index}
                      status="doing"
                      color="blue"
                      updateTask={update}
                      onDelete={(id: string) => remove(id)}
                      key={x.id}
                      task={x}
                    ></TaskCard>
                  );
                })
            : null}
        </TodoCard>

        <TodoCard
          title="Done"
          status="done"
          onSubmit={(data: TaskCreate) => create(data)}
        >
          {tasksGroups
            ? tasksGroups
                .find((x) => x.status == "done")
                ?.tasks.map((x, index) => {
                  return (
                    <TaskCard
                      id={"done" + index}
                      status="done"
                      color="green"
                      updateTask={update}
                      onDelete={(id: string) => remove(id)}
                      key={x.id}
                      task={x}
                    ></TaskCard>
                  );
                })
            : null}
        </TodoCard>
      </div>
    </DndContext>
  );
}

{
  /* //   <TodoCard
    //     title="To do"
    //     status="todo"
    //     tasks={
    //       tasksGroups
    //         ? tasksGroups.find((x) => x.status == "todo")?.tasks || []
    //         : []
    //     }
    //     updateTask={update}
    //     onSubmit={(data: TaskCreate) => create(data)}
    //     onDelete={(id: string) => remove(id)}
    //   ></TodoCard> */
}
