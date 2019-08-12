import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import DatePicker from "react-datepicker/es";
import Dropdown from "react-dropdown";

function Edit(props) {
    const [inputs, setInputs] = useState({});
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        Axios.get(`/api/todoItems/${props.match.params.id}`)
            .then(result => {
                setInputs({
                    user: result.data.user,
                    name: result.data.name,
                    description: result.data.description,
                    dueDate: result.data.dueDate,
                    priority: result.data.priority,
                    actions: result.data.actions
                });
            })
            .catch(err => console.error(err));
    }, [props]);

    function handleSubmit(event) {
        event.preventDefault();

        Axios.post(
            '/api/todoItems/update',
            {
                id: props.match.params.id,
                todoItem: {
                    user: inputs.user,
                    name: inputs.name,
                    description: inputs.description,
                    dueDate: inputs.dueDate,
                    priority: inputs.priority,
                    actions: inputs.actions
                }
            }
        )
            .then(resp => {
                console.log(resp);
                setRedirect(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleInputChange(event) {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;

        setInputs(inputs => {
            return {
                ...inputs, [name]: value
            }
        });
    }

    if (redirect) {
        return <Redirect to="/todoItems" />;
    }

    return (
        <div className="container">
            <header>
                <h1>New Item</h1>
            </header>
            <div>
                <form action="/todoItems" method="POST" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" name="name" required="required" onChange={handleInputChange} defaultValue={inputs.name}/>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" name="description" onChange={handleInputChange} defaultValue={inputs.description}/>
                    </div>

                    <div className="form-group">
                        <label>Due Date</label>
                        <DatePicker selected={this.state.date} onChange={handleInputChange} name="dueDate" defaultValue={inputs.dueDate}/>
                    </div>

                    <div className="form-group">
                        <label>Priority</label>
                        <Dropdown options={options} onChange={handleInputChange} value={options} placeholder="Select an option" defaultValue={inputs.priority}/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-dark" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;