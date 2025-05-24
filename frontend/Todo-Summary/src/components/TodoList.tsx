import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import type { ITodoModel } from "../Models/TodoModel";
const backendurl = import.meta.env.VITE_APP_URL;

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<ITodoModel[]>([]);

  const fetchTodos = async () => {
      try {
        const response = await axios.get(`${backendurl}/todos`);
        console.log(response.data);
        setTodos(response.data); 
      } catch (error) {
        console.error("Failed to fetch todos", error);
        toast.error("Failed to load todos");
      }
    };
  useEffect(() => {
    
    fetchTodos();
  }, []);

  // Delete Todo
  const handleDelete = async (id: string | number | undefined) => {
    if(id==null) toast("No Id is present for the task..");
    try {
      const response = await axios.delete(`${backendurl}/todos/${id}`);
      if (response.status === 200) {
        await fetchTodos();
        toast.success("Deleted Successfully..");
    } else {
        toast.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo", error);
      toast.error("Error deleting todo");
    }
  };
  const markAsCompleted = async(id: string | number | undefined) => {
    if(id==null) toast("No Id is present for the task..")
        try{
        const response = await axios.patch(`${backendurl}/todos/${id}`);
        if(response.status == 200){
            toast("Updated Successfully");
            await fetchTodos();
        }else{
            toast.error("Failed to Update")
        }
    }catch(error){
        console.error("Errror deleting todo",error);

    }
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Todo List</h3>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map(todo => (

              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>
                {todo.completed ? (
                    <span className="badge bg-success">Completed</span>
                ) : (
                    <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => markAsCompleted(todo.id)}
                    >
                    Mark as Completed
                    </button>
                )}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                No todos found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastContainer autoClose={2000} />
    </div>
  );
};
