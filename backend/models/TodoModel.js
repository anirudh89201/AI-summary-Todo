import axios from 'axios';
// import { supabase } from "../db.js";
import OpenAI from "openai"
import dotenv from "dotenv";
import { supabase } from "../index.js";
let todos = [];
let id = 0;
dotenv.config();
export const addTodo = async(task)=>{
    console.log(task)
    const {data,error} = await supabase.from('todos').insert([{
        title:task.title,
        description:task.description,
        completed:task.completed??false
    }
    ])
    console.log(data)
    if(error){
        console.error(error)
        return false;
    }
    return true;
}

export const getListTodos = async()=> {
    const { data,error} = await supabase.from('todos').select('*').order('id',{ascending:true})
    if(error) throw error
    return data
}
export const DeleteTodoModel = async(id)=>{
    const {data,error} = await supabase.from('todos').delete().eq('id',id)
    if(error){
        console.error("Error deleting todo:",error)
        return false;
    }
    return true;
}

export const UpdateStatus = async(id) => {
    const {data,error} = await supabase.from('todos').update({completed:true}).eq('id',id)
    if(error){
        return false;
    }
    return true;
}
export const getPendingTodos = async() => {
    const {data,error} = await supabase.from('todos').select('id,title,description,completed').eq('completed',false);
    if(error) return error;
    return data;
}

export const summarizeTodos = async (todos) => {
  if (!todos || !Array.isArray(todos) || todos.length === 0) {
    throw new Error("No todos provided for summarization.");
  }

 const prompt = `You will be provided with a list of pending TODO tasks. Each task includes a title and a description.

Tasks:
${todos.map((t, index) => `${index + 1}. Title: ${t.title}\n   Description: ${t.description}`).join('\n\n')}
`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo-1106', // or other OpenRouter-supported model
       messages:[
  {
    role: 'system',
    content: `You are a highly intelligent assistant that specializes in analyzing and summarizing task lists.

Given a set of TODO tasks, you must generate a **detailed summary (at least 100 words)** that:
- Clearly separates and identifies each task.
- Expands on the task’s purpose, urgency, and potential impact.
- Suggests logical next steps.
- Uses a formal yet natural tone, without simply copying the task text.

The summary should demonstrate deep understanding and reflect the sophistication of an advanced AI system.`,
  },
  {
    role: 'user',
    content: prompt,
  }
],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', // or your actual site
          'X-Title': 'Todo Summary Assistant',
        },
      }
    );
 
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenRouter error:', error.response?.data || error.message);
    throw error;
  }
};
