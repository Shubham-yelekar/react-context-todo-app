import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useTodo } from "../context";
const FormInput = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    const trimmed = todo.trim();
    if (!trimmed) return;
    addTodo({ todo: trimmed, completed: false });
    console.log(trimmed);
    setTodo("");
  };

  return (
    <>
      <form onSubmit={add} className="bg-white flex">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="New task for today"
        />
        <button
          type="submit"
          className="flex items-center cursor-pointer text-[#F6E7D5] bg-[#4B841B] "
        >
          <IoMdAdd />
          New Task
        </button>
      </form>
    </>
  );
};

export default FormInput;
