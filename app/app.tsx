import * as React from "react";
import * as ReactDOM from "react-dom";
import './app.common.css';

import { Hello } from "./components/hello";

console.log(__DEV__)
ReactDOM.render(
    <Hello
        compiler="TypeScript"
        framework="React"
    />,
    document.getElementById("main")
);