import React, { useEffect, useState } from "react";
import { FormInput, TaskCard, TaskList } from "./index";
import { TodoProvider } from "../context";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleTodo }}
    >
      <div className=" w-full p-4 md:w-[500px] m-auto ">
        <FormInput />
        <h2 className="text-slate-400 my-5">
          <span className="font-bold text-slate-600 ">Task for</span> ●{" "}
          {formattedDate}
        </h2>
        <TaskList />
        <TaskCard />
      </div>
    </TodoProvider>
  );
};

export default Todo;
