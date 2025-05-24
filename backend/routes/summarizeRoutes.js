import express from "express";
import {
  generateSummary,
  GetPendingListTodos,
  SendSummaryToSlack
} from "../controllers/todoController.js";

const Summarizerouter = express.Router();

Summarizerouter.get("/", GetPendingListTodos);
Summarizerouter.post("/", generateSummary);
Summarizerouter.post("/slack", SendSummaryToSlack);

export default Summarizerouter;
