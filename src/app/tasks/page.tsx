"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  title: string;
  completed?: boolean;
};

export default function Tasks() {
  const [user, setUser] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
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

  const addTask = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: newTask }),
    });
    const data = await res.json();
    console.log(data);
    if (data) {
      setTasks((prevTasks: Task[]) => [...prevTasks, data]);
      console.log("task created")
      setNewTask("");
    } else {
      console.log("no task created")
    }
  }

  const deleteTask = async (id: number) => {
    const res = await fetch("/api/tasks", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    
    const task = await res.json();
    if (task) {
      console.log(task);
      setTasks((prevTasks: Task[]) => prevTasks.filter((task) => task.id !== id));
    } else {
      console.log("no task deleted")
    }
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
        {tasks?.map((task: Task) => (
          <div key={task.id} className="task">
            <li>{task.title}</li>
            <button className="delete" onClick={() => deleteTask(task.id)}>X</button>
          </div>
        ))}
      </ol>
    </>
  );
}