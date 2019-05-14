import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import './Header.css';

const header = (props) => {
    return (
        <div className="Header">
            <Logo />
            <NavigationItems />
        </div>
    );
}

export default header;