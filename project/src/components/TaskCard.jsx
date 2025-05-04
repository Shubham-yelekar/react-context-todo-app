import React, { useEffect, useState } from "react";
import { useTodo } from "../context";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { IoIosSave } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

const TaskCard = ({ task }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodo();

  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(task?.todo || "");

  const handleSave = () => {
    updateTodo(task.id, { ...task, todo: input });
    setEdit((prev) => !prev);
  };

  return task ? (
    <div
      className={`cursor-pointer p-2 flex justify-between items-center rounded-full transition-colors duration-300 ${
        task.completed ? "bg-green-100" : "bg-[#F6E7D5]"
      }`}
    >
      {edit ? (
        <>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent h-full px-2 focus:outline-none focus-within:bg-slate-50"
          />
          <button className="action-button" onClick={handleSave}>
            <IoIosSave />
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-1 items-center justify-start gap-2 relative">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTodo(task.id)}
              name="task"
              id={task.id}
              className="absolute opacity-0 bg-slate-200 cursor-pointer left-0 w-full h-[110%]"
            />
            <div
              className={`checkmark ${
                task.completed ? "text-green-200 bg-[#4B841B]" : "text-gray-400"
              }`}
            >
              <FaCheck />
            </div>
            <label
              htmlFor={task.id}
              name="task"
              className={`text-base ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.todo}
            </label>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="action-button"
              onClick={() => deleteTodo(task.id)}
            >
              <MdDelete />
            </button>
            {!task.completed && (
              <button
                className="action-button"
                onClick={() => setEdit((prev) => !prev)}
              >
                <AiFillEdit />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  ) : null;
};

export default TaskCard;
