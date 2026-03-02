import React, { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [habit, setHabit] = useState("");
  const [streak, setStreak] = useState(0);
  const [lastCompleted, setLastCompleted] = useState<string | null>(null);
  const [todos, setTodos] = useState<{ text: string; done: boolean }[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [happiness, setHappiness] = useState(0);

  const today = new Date().toDateString();

  const completeHabit = () => {
    if (lastCompleted === today) return;
    setStreak(streak + 1);
    setLastCompleted(today);
  };

  const addTask = () => {
    if (!taskInput.trim()) return;
    setTodos([...todos, { text: taskInput, done: false }]);
    setTaskInput("");
  };

  const toggleTask = (index: number) => {
    const updated = [...todos];
    if (!updated[index].done) {
      setHappiness((prev) => Math.min(prev + 10, 100));
    }
    updated[index].done = true;
    setTodos(updated);
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        backgroundColor: "#f5e6d3",
        padding: "40px",
        fontFamily: "sans-serif",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
      }}
    >
      {/* Habit Tracker */}
      <div
        style={{
          background: "#fff8ee",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#5c4033" }}>🌱 Tiny Habit Tracker</h2>

        <input
          type="text"
          placeholder="Enter your daily habit"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "10px",
            border: "1px solid #c4a484",
          }}
        />

        <button
          onClick={completeHabit}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#8b5e3c",
            color: "white",
            cursor: "pointer",
          }}
        >
          Mark Habit Complete
        </button>

        <motion.div
          key={streak}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#5c4033",
          }}
        >
          🔥 {streak} Day Streak
        </motion.div>
      </div>

      {/* Todo + Capybara */}
      <div
        style={{
          background: "#fff8ee",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#5c4033" }}>📝 Todo + Capybara</h2>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Add a task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #c4a484",
            }}
          />
          <button
            onClick={addTask}
            style={{
              padding: "10px 15px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#8b5e3c",
              color: "white",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        <div style={{ marginTop: "15px" }}>
          {todos.map((todo, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTask(index)}
              />
              <span
                style={{
                  marginLeft: "8px",
                  textDecoration: todo.done ? "line-through" : "none",
                  color: "#5c4033",
                }}
              >
                {todo.text}
              </span>
            </div>
          ))}
        </div>

        {/* Capybara */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <motion.img
            key={happiness}
            src="https://i.imgur.com/9Qx4K6R.png"
            alt="Capybara"
            style={{ width: "160px" }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 + happiness / 500 }}
            transition={{ type: "spring", stiffness: 120 }}
          />

          <div
            style={{
              background: "#e6d3b3",
              borderRadius: "20px",
              height: "10px",
              marginTop: "20px",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                background: "#8b5e3c",
                height: "10px",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${happiness}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <p style={{ marginTop: "10px", color: "#5c4033" }}>
            Capybara Happiness: {happiness}%
          </p>
        </div>
      </div>
    </div>
  );
}