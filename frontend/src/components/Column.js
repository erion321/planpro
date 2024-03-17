import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createColumns, getColumns } from "../features/columns/columnSlice";
import { selectBoard } from "../features/boards/boardSlice";
import Task from "./Task";

export default function Column() {
  const [column, setColumn] = useState("");

  const { columns } = useSelector((state) => state.columns);
  const { selectedBoard } = useSelector((state) => state.boards);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createColumns(column));
  };

  useEffect(() => {
    dispatch(getColumns());
  }, [selectedBoard]);

  useEffect(() => {
    dispatch(selectBoard());
  }, []);

  return (
    <div className="flex">
      <div className="flex gap-2">
        {columns.map((column, index) => {
          const { id } = column;
          return (
            <div key={index}>
              <h1>{column.name}</h1>
              <Task columnId={id} />
            </div>
          );
        })}
      </div>
      <form className="flex items-center gap-6">
        <input
          className="px-1 py-2 border rounded-md"
          type="text"
          placeholder="Column name"
          value={column}
          onChange={(e) => setColumn(e.target.value)}
        />
        <button onClick={handleSubmit}>Create a column</button>
      </form>
    </div>
  );
}
