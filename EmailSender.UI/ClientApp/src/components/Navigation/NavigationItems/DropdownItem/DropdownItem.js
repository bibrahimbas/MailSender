import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';

const navigationItem = (props) => {
    return (
            <div className="btn-group">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {props.name}
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                    {props.items
                          .map(navigationItem => { return <NavigationItem 
                                                            link={navigationItem.link} 
                                                            name={navigationItem.name} 
                                                            key={navigationItem.name} /> }) }
                </div>
            </div>
    )
}

export default navigationItem;