import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, getTasks, selectTask } from "../features/tasks/taskSlice";
import TaskModal from "./TaskModal";

export default function Task({ columnId }) {
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [openTask, setOpenTask] = useState(false);

  const { tasks, selectedTask } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setCreateTaskModal(true);
  };

  useEffect(() => {
    dispatch(getTasks());
    dispatch(selectTask());
  }, []);

  return (
    <div className="border-r border-t p-2">
      <button onClick={handleSubmit}>Create Task</button>
      {createTaskModal && (
        <TaskModal
          setCreateTaskModal={setCreateTaskModal}
          columnId={columnId}
        />
      )}
      <div>
        {tasks &&
          tasks.map((task, index) => {
            const { id, column_id } = task;

            if (columnId === column_id) {
              return (
                <h1 key={index} onClick={() => dispatch(selectTask(id))}>
                  {task.name}
                </h1>
              );
            }
          })}
      </div>
      {/*   {selectedTask && (
        <div className="absolute  bg-red-400 bg-opacity-50 top-0 left-0 w-full h-full grid place-content-center">
          <div className="relative bg-white flex flex-col gap-4 p-10 rounded-md">
            <h2>{selectedTask.name}</h2>
            <p>{selectedTask.description}</p>
            <div>
              {selectedTask.assignedto.map((member) => {
                const parseMember = JSON.parse(member);
                return <h2>{parseMember.name}</h2>;
              })}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
