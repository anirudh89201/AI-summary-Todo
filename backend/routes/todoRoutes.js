import express from "express";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodos
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodos);

export default router;
