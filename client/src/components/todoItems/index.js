import React, { useState, useEffect } from "react";
import Axios from "axios";

function Index() {
    const [todoItems, setTodoItems] = useState([]);

    useEffect(() => {
        Axios.get('/api/todoItems')
            .then(result => {
                setTodoItems(result.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <header>
                <h1>All Items</h1>
            </header>

            <div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>priority</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {todoItems.map(todoItem => (
                        <tr key={todoItem.id}>
                            <td>
                                <a href={`/todoItems/${todoItem._id}`}>{todoItem.user}</a></td>
                            <td>{todoItem.user.firstName} {todoItem.author.lastName}</td>
                            <td>{todoItem.description}</td>
                            <td>{todoItem.dueDate}</td>
                            <td>{todoItem.priority}</td>
                            <td>{todoItem.action}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Index;