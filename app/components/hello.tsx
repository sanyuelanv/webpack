import * as React from "react";
import * as Style from "./hello.css"

export interface HelloProps {
    compiler: string
    framework: string
}

export const Hello = ({ compiler, framework }: HelloProps) => {
    return <h1 className={Style.text}> {compiler} and {framework}!</h1>;
}