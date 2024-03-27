import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, getTasks, selectTask } from "../features/tasks/taskSlice";

export default function TaskModal({ columnId, setCreateTaskModal }) {
  const [task, setTask] = useState({
    name: "",
    description: "",
    assignTo: [],
  });

  const { selectedTeam } = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const submitTask = (e) => {
    e.preventDefault();
    const createTaskData = { task, column_id: columnId };
    dispatch(createTask(createTaskData));
    setTask({ name: "", description: "", assignTo: [] });
  };

  const assignTaskTo = (parseMember) => {
    if (task.assignTo.some((obj) => obj.id === parseMember.id)) {
      return console.log(`Task already assigned to ${parseMember.name}`);
    }

    setTask({
      ...task,
      assignTo: [...task.assignTo, parseMember],
    });
  };

  const removeTaskFrom = (member) => {
    console.log(member);
    setTask({
      ...task,
      assignTo: task.assignTo.filter((member) => member.id !== member.id),
    });
  };

  return (
    <div className="absolute bg-red-400 bg-opacity-50 top-0 left-0 w-full h-full grid place-content-center">
      <form className="relative bg-white flex flex-col gap-4 p-10 rounded-md">
        <button
          onClick={() => setCreateTaskModal(false)}
          className="absolute top-2 right-4"
        >
          X
        </button>
        <input
          className="border rounded-md  px-1 py-0.5"
          type="text"
          placeholder="Task Name"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          cols="30"
          rows="4"
          className="p-1"
        ></textarea>
        <div>
          <div>
            {task.assignTo.map((member) => {
              return (
                <div>
                  <h2>{member.name}</h2>
                  <button type="button" onClick={() => removeTaskFrom(member)}>
                    X
                  </button>
                </div>
              );
            })}
          </div>
          <h2>Assign to</h2>
          {selectedTeam.members ? (
            selectedTeam.members.map((member) => {
              const parseMember = JSON.parse(member);
              return (
                <h2 onClick={() => assignTaskTo(parseMember)}>
                  {parseMember.name}
                </h2>
              );
            })
          ) : (
            <h2>No members in this team</h2>
          )}
        </div>
        <button
          onClick={submitTask}
          type="submit"
          className="border rounded-md font-medium self-center py-1 px-4"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
