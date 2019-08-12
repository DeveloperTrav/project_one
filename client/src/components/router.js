import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Login from "./sessions/login";
import Logout from "./sessions/logout";
import Register from "./sessions/register";
import TodoItemIndex from "./todoItems/index";
import TodoItemNew from "./todoItems/new";
import TodoItemShow from "./todoItems/show";
import TodoItemEdit from "./todoItems/edit";
import TodoItemDestroy from "./todoItems/destroy";

function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/todoItems/new" component={TodoItemNew}/>
            <Route exact path="/todoItems" component={TodoItemIndex}/>
            <Route exact path="/todoItems/:id" component={TodoItemShow}/>
            <Route exact path="/todoItems/:id/edit" component={TodoItemEdit}/>
            <Route exact path="/todoItems/:id/destroy" component={TodoItemDestroy}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path= "/logout" componenet={Logout}/>
        </Switch>
    )
}

export default Routes;
