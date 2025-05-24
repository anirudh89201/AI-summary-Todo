import express from "express";
import router from "./routes/todoRoutes.js";
import cors from "cors"
import dotenv from "dotenv"
import { createClient } from '@supabase/supabase-js'
import Summarizerouter from "./routes/summarizeRoutes.js";
dotenv.config();
const supabaseUrl = 'https://fzdevpgjfnahbxrfrcfq.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)
const app = express();
app.use(express.json());
app.options('*',cors())
app.use('/todos', router);
app.use("/summarize",Summarizerouter)
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World.." });
});

const port = process.env.PORT || 3000; // fix: env variable name should be uppercase
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
