import React, { useState } from "react";
import Styles from "./Bored.module.css";

const randomYays = [
  "Great job!",
  "Yes!",
  "Amazing!",
  "Well done!",
  "Awesome!",
  "Nice!",
  "Keep it up!",
  "Fantastic!",
  "Good job!",
  "You did it!",
  "You rock!",
  "Great!",
];

// Sample static todos list with initial buttonText
const todosList = [
  { id: 1, description: "Take a 5-minute walk", times_done: 0, buttonText: "I did this" },
  { id: 2, description: "Drink a glass of water", times_done: 0, buttonText: "I did this" },
  { id: 3, description: "Do 10 pushups", times_done: 0, buttonText: "I did this" },
  { id: 4, description: "Read a page of a book", times_done: 0, buttonText: "I did this" },
  { id: 5, description: "Clean your desk", times_done: 0, buttonText: "I did this" },
  { id: 6, description: "Stop scrolling through SNS", times_done: 0, buttonText: "I did this" },
  { id: 7, description: "Go outside. Touch Some Grass🌿", times_done: 0, buttonText: "I did this" },
  { id: 8, description: "Delete Instagram", times_done: 0, buttonText: "I did this" },
  { id: 9, description: "Draw the Scenery outside Your Window", times_done: 0, buttonText: "I did this" },
  { id: 10, description: "Do Yoga or Stretching for 30 minutes", times_done: 0, buttonText: "I did this" },
  { id: 11, description: "Call a Friend or Family Member", times_done: 0, buttonText: "I did this" },
  { id: 12, description: "Cook or Bake something", times_done: 0, buttonText: "I did this" },
];

export const Bored = () => {
  const [todos, setTodos] = useState(todosList); // Initialize with static ToDos

  const getRandomEntry = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const handleComplete = (id) => {
    // Update the times_done count and button text for the specific todo
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          times_done: todo.times_done + 1,
          buttonText: getRandomEntry(randomYays),
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className={Styles.pageContainer}>
      <h1 className={Styles.title}>Bored?</h1>
      <p className={Styles.subtitle}>Want to stop procrastinating or feel like your mind is too cluttered and don't know what to do ?</p>
      <h2 className={Styles.heading}>Find Something ToDo</h2>
      <p className={Styles.subheading}>What people are currently ToDoing</p>
      <div className={Styles.todosContainer}>
        {todos.map((todo) => (
          <div key={todo.id} className={Styles.todoItem}>
            <p className={Styles.description}>{todo.description}</p>
            <p className={Styles.completed}>
              Completed {todo.times_done} {todo.times_done === 1 ? "time" : "times"}
            </p>
            <button
              className={Styles.button}
              onClick={() => handleComplete(todo.id)}
            >
              {todo.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bored;
