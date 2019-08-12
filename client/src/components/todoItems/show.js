import React, { useState, useEffect } from "react";
import Axios from "axios";

function Show(props) {
    const [todoItem, setTodoItem] = useState([]);

    useEffect(() => {
        Axios.get(`/api/todoItems/${props.match.params.id}`)
            .then(result => {
                console.log(result);
                setTodoItem(result.data);
            })
            .catch(err => console.error(err));
    }, [props]);

    return (
        <div className="container">
            <header>
                <h1>{todoItem && todoItem.title}</h1>
            </header>

            <div>
                {todoItem && todoItem.content}
            </div>
        </div>
    );
}

export default Show;