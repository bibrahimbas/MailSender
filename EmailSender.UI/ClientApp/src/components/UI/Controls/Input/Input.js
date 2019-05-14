import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = ['form-control', 'Input']
    let validationError = null;

    if (props.invalid) {
        inputClasses.push('Invalid');
        validationError = <p className="Error">Please enter a valid value !</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                value={props.value == null ? "" : props.value}
                onChange={props.changed}
                onBlur={props.blured} />;
            break;
        case ('textArea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                value={props.value == null ? "" : props.value}
                onChange={props.changed}
                onBlur={props.blured}
                rows={props.rows}/>;
            break;
        default:
            break;
    }

    return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <label className="Label">{props.label}</label>
                    </div>
                    <div className="col-9">
                    {inputElement}
                    {validationError}
                    </div>
                </div>
            </div>
    );
}

export default input;