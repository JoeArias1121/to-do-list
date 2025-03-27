"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Tasks() {
  const [user, setUser] = useState<string | null>(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem("email");
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const loggedInUser = "123@gmail.com"
    if (loggedInUser === "123@gmail.com") {
      setUser(loggedInUser as string)
    } else {
      router.push('/login')
    }
  }, [])

  const logOut = () => {
    sessionStorage.removeItem("email");
    router.push('/login');
  }

  const addTask = (e: any) => {
    fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: newTask }),
    })
  }

  return (
    <>
      <button onClick={logOut}>Logout</button>
      <h1>Tasks</h1>
      {user ? <p>Welcome {user}</p> : <p>Loading...</p>}
      <h2>Add a new task</h2>
      <form onSubmit={addTask}>
        <input type="text" placeholder="Task title" value={newTask} onChange={e => setNewTask(e.target.value)} />
        <button type="submit">Add task</button>
      </form>
      <ol>
        {tasks.map((task: any) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ol>
    </>
  );
}