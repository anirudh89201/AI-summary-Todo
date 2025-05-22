import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/getTodo">Todo App</Link>
                <Link className="btn btn-primary" to="/add">Add Todo</Link>
                <Link className="btn btn-primary" to="/summarize">Summarize Todos</Link>
            </div>
        </nav>
    );
}