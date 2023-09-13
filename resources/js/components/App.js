import React, { useState, useEffect, useRef } from "react";

const App = () => {
    return <div>App</div>;
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}