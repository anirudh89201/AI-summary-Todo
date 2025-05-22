import express from "express";
import {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodos,
    GetPendingListTodos
} from "../controllers/todoController.js";

const router = express.Router();

router.get('/', getTodos);          // GET /todos
router.post('/', createTodo);       // POST /todos
router.delete('/:id', deleteTodo);  // DELETE /todos/:id
router.patch('/:id',updateTodos);
export default router;
