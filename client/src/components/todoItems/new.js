import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Axios from "axios";

const options = ['Low priority', 'Medium priority', 'High priority'];

function New() {
    const [inputs, setInputs] = useState({});
    const [redirect, setRedirect] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = date => {
        setStartDate(date);
    };

    function handleSubmit(event) {
        event.preventDefault();

        Axios.post(
            '/api/todoItems',
            {
                todoITem: {
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
                        <input className="form-control" name="name" required="required" onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" name="description" onChange={handleInputChange}/>
                    </div>

                    <div className="form-group">
                        <label>Due Date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Priority</label>
                        <Dropdown options={options} onChange={handleInputChange} value={options} placeholder="Select an option" />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-dark" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default New;