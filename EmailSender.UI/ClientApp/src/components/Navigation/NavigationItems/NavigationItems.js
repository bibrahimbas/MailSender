import React from 'react';
import './NavigationItems.css'
import DropdownItem from '../NavigationItems/DropdownItem/DropdownItem';

const dropdownItems = [
    {   name: 'Email Menu' , 
        items: [ 
            { name: 'New E-Mail', link: '/email-sender' }, 
                    { name: 'Inbox', link: '/'}, 
                    { name: 'Spam', link: '/'  }
                ] 
    }
];
const navigationItems = () => (
    <div className="NavigationItems">
        {dropdownItems.map(item => { return <DropdownItem 
                                                name={item.name} 
                                                items={item.items}
                                                key={item.name} /> }) }
    </div>
);

export default navigationItems;