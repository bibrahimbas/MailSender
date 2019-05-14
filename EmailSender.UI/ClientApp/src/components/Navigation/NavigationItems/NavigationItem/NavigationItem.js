import React from 'react';

const navigationItem = (props) => {
    return (
        <div>
            <a className="dropdown-item" href={props.link}>{props.name}</a>
        </div>
    )
}

export default navigationItem;