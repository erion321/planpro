import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, getTasks, selectTask } from "../features/tasks/taskSlice";

export default function Task({ columnId }) {
  const [task, setTask] = useState("");

  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { name: task, column_id: columnId };
    dispatch(createTask(taskData));
  };

  console.log(columnId);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <div className="b border-r border-t p-2">
      <form className="flex gap-4">
        <input
          className="border rounded-md  px-1 py-0.5"
          type="text"
          placeholder="Task Name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleSubmit}>Create Task</button>
      </form>
      <div>
        {tasks &&
          tasks.map((task, index) => {
            const { id, column_id } = task;
            console.log({ column_id, columnId });
            if (columnId === column_id) {
              return (
                <h1 key={index} onClick={() => dispatch(selectTask(id))}>
                  {task.name}
                </h1>
              );
            }
          })}
      </div>
    </div>
  );
}
