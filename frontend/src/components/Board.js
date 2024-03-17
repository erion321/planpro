import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBoard,
  getBoards,
  selectBoard,
} from "../features/boards/boardSlice";

export default function Board() {
  const [board, setBoard] = useState("");

  const { selectedTeam } = useSelector((state) => state.teams);
  const { boards } = useSelector((state) => state.boards);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const boardData = { name: board, team_id: selectedTeam.id };
    dispatch(createBoard(boardData));
  };

  useEffect(() => {
    dispatch(getBoards());
  }, [selectedTeam]);

  return (
    <div className="b border-r border-t p-2">
      <form className="flex gap-4">
        <input
          className="border rounded-md  px-1 py-0.5"
          type="text"
          placeholder="Board Name"
          value={board}
          onChange={(e) => setBoard(e.target.value)}
        />
        <button onClick={handleSubmit}>Create Board</button>
      </form>
      <div>
        {boards.map((board, index) => {
          const { id } = board;
          return (
            <h1 key={index} onClick={() => dispatch(selectBoard(id))}>
              {board.name}
            </h1>
          );
        })}
      </div>
    </div>
  );
}
