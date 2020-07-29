import React from "react";
import classes from './Cross.module.scss'

const Cross = props => {
    return (
        <div className={classes.Cross} onClick={props.onClick}>
        </div>
    )
}

export default Cross;