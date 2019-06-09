import React from 'react';
import { 
    Icon,
    Button,
} from 'semantic-ui-react';


const Image = props => {
    const { image, link } = props;

    return(
        <div>
            <Button
                icon
                labelPosition='left'
                onClick={ () => props.onClose(image) }
            >
                <Icon name='trash' />
                Delete Image
            </Button>
            <a href={link}>
                <img src={link} alt={link}/>
            </a>
        </div>
    );
}

export default Image;