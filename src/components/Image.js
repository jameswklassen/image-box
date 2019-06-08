import React, { Component } from 'react';


import { 
    Icon,
    Button,
} from 'semantic-ui-react'

const Image = props => {

    return(
        <div>
            <Button
                icon
                onClick={ () => props.onClose(props.image) }
            >
                <Icon name='close' />
            </Button>
            <a href={props.link}>
                <img src={props.link} alt={props.link}/>
            </a>
        </div>
    );
}

export default Image;