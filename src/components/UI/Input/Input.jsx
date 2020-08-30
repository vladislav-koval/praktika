import React from "react";
import classes from "./Input.module.scss";

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched;
}

const Input = props => {
    const inputType = props.type || 'text';
    const cls = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`;

    if (inputType === 'date') {
        cls.push(classes.date);
    }
    if (isInvalid(props)) {
        cls.push(classes.invalid);
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input type={inputType}
                   name={props.name}
                   id={htmlFor}
                   value={props.value}
                   onChange={props.onChange}
                   min={props.min}
                   max={props.max}
                   disabled={props.disabled}
            />

            {isInvalid(props) ? <span>{props.errorMessage}</span> : null}

        </div>
    );
};

export default Input;
