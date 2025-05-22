import { Route,BrowserRouter as Router, Routes } from "react-router-dom"
import { TodoForm } from "./components/TodoForm"
import { Navbar } from "./components/navbar"
import { TodoList } from "./components/TodoList"
import { Summarize } from "./components/Summarize"
function App() {
  return (
     <Router>
      <div className="container mt-4">
        <Navbar/>
        <Routes>
          <Route path="/" element={<TodoList/>}></Route>
          <Route path="/getTodo" element={<TodoList/>}></Route>
          <Route path="/add" element={<TodoForm />} />
          <Route path="/summarize" element={<Summarize/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
