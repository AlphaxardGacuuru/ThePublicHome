import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Index from "@/pages/index";

const App = () => {
    const GLOBAL_STATE = {};

    const routes = [
        {
            path: "/",
            component: <Index {...GLOBAL_STATE} />,
        },
    ];

    return (
        <BrowserRouter>
            {routes.map((route, key) => (
                <Route
                    key={key}
                    path={route.path}
                    exact
                    component={() => route.component}
                />
            ))}
        </BrowserRouter>
    );
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
