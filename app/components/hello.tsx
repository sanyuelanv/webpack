import * as React from "react";
import * as style from "./hello.css"
import flare from '../assets/flare.png'

export interface HelloProps {
    compiler: string
    framework: string
}

export const Hello = ({ compiler, framework }: HelloProps) => {
    return (
        <React.Fragment>
            <h1 className={style.text}> {compiler} and {framework}!</h1>
            <img src={flare}></img>
        </React.Fragment>

    )
}