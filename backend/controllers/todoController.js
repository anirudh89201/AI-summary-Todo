import { WebClient } from "@slack/web-api";
import { addTodo,DeleteTodoModel,getListTodos,getPendingTodos,summarizeTodos,UpdateStatus } from "../models/TodoModel.js";
export const getTodos = async (req, res) => {
    // Fetch todos from Supabase (or mock data)
    const data = await getListTodos();
    if(!data) return res.status(500).json(data);
    return res.status(200).json(data);
};
const slackToken = process.env.SLACK_BOT_TOKEN;
const slackChannel = process.env.SLACK_CHANNEL_ID;
const slackClient = new WebClient(slackToken);
export const createTodo = async (req, res) => {
    const task = req.body;
    if (!task) return res.status(400).json({ error: "Task is required" });
    const status = await addTodo(task);
    if(status){
        return res.status(201).json({"message":"Successfully added.."})
    }else{

        res.status(401).json({"Message":"Unauthorized method"});
    }
    // Add todo to Supabase (or mock response)
};

export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const response = await DeleteTodoModel(id);
    if(response) return res.status(200).json({"message":"Data Deleted Successfully.."});
    return res.status(403).json({"message":"unauthorized data has been reached.."});
};

export const updateTodos = async(req,res) => {
    const {id} = req.params;
    const response = await UpdateStatus(id);
    if(response) return res.status(200).json({"message":"Status Changed Successfully."})
    return res.status(401).json({"message":"Unable to change the status."});
}
export const GetPendingListTodos = async(req,res) => {
    const response = await getPendingTodos();
    if(response) return res.status(200).json(response)
    else return res.status(401).json({"message":"Unable to fetch the pending data"})
}
export const generateSummary = async (req, res) => {
    const { todos } = req.body;

    try {
        const summary = await summarizeTodos(todos); // pass the array directly
        if (summary) {
            res.status(200).json({ summary });
        } else {
            res.status(500).json({ message: 'Failed to generate summary' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error generating summary', error: error.message });
    }
};
export const SendSummaryToSlack = async(req,res) => {
    const {summary} = req.body; 
    try {
    // Send summary to Slack
    await slackClient.chat.postMessage({
      channel: slackChannel, // channel ID or name
      text: `📝 *Todo Summary:*\n\n${summary}`,
    });

    return res.status(200).json({ message: "Summary sent to Slack!", summary });

  } catch (error) {
    console.error("Error generating/sending summary:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
