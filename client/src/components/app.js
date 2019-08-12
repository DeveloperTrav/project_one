import React from "react";
import MainNav from "./partials/main_nav";
import Routes from "./router";

export default function App() {
    return (
        <div className="App">
            <Routes />
            <MainNav />
        </div>
    );
}