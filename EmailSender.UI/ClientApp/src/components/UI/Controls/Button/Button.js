import React from 'react'

const button = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-3">

                </div>
                <div className="col-9">
                    <button className="btn btn-warning btn-primary btn-lg btn-block Button">{props.text}</button>
                </div>
            </div>
        </div>

    );
}

export default button;