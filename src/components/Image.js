import React from 'react';
import { 
    Icon,
    Button,
} from 'semantic-ui-react';

import './Image.scss';

const Image = props => {
    const { image, link } = props;

    return(
        <div className='image-box__image'>
            <a href={link}>
                <img src={link} alt={link}/>
            </a>
            <p className='image-box__image-name'>{ image.name }</p>

            { renderTags(image.tags) }

            <Button
                icon
                size='mini'
                labelPosition='left'
                onClick={ () => props.onClose(image) }
                loading={ props.imageDeleting }
            >
                <Icon name='trash' />
                Delete
            </Button>
        </div>
    );
}

const renderTags = tags => {
    if (tags.length > 0) {
        return (
            <p className='image-box__image-tags'>
                <Icon name='tags'/>
                {
                    tags.map((tag, index) => {
                        return index < tags.length - 1 ? `${tag}, ` : tag;
                    })
                }
            </p>
        );
    }
}

export default Image;