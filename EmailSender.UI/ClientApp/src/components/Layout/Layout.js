import React from 'react';
import Header from '../Header/Header';
import { Route } from 'react-router-dom';
import EmailForm from '../../containers/EmailForm/EmailForm';

const layout = (props) => {
    return (
        <div>
            <Header />
            <div className="row">
                <div className="col-lg-6">
                    <Route path="/email-sender" component={EmailForm} />
                </div>
            </div>
        </div>
    );
}

export default layout;