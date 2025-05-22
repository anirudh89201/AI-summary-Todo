import React from 'react';
import type { ITodoModel } from '../Models/TodoModel';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
export const TodoForm: React.FC = () => {
 const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formElement = e.currentTarget; // ✅ Cache the form element
  const form = new FormData(formElement);

  const dict: ITodoModel = {
    title: (form.get('title') as string) || '',
    description: (form.get('description') as string) || '',
    completed: false,
  };

  try {
    const response = await axios.post('https://ai-summary-todo.onrender.com:3000/todos', dict);

    if (response.status === 201) {
      toast("Successfully added");
      formElement.reset(); // ✅ Use cached form reference
    } else if (response.status === 401) {
      toast("Unauthorized: Unable to add Data");
    } else {
      toast(`Unexpected response: ${response.status}`);
    }
  } catch (error: unknown) {
    console.error("Error submitting todo", error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        toast(`Error: ${error.response.status} - ${error.response.data?.error || error.message}`);
      } else if (error.request) {
        toast("No response from server. Please check your connection.");
      } else {
        toast("An unexpected error occurred.");
      }
    } else {
      toast("An unexpected error occurred.");
    }
  }
};


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6"> {/* This controls width */}
          <div className="card my-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3 text-center">Add New Todo</h5>
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    placeholder="Enter task title"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="Enter task description"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">Add Todo</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000}/>
    </div>
  );
};
