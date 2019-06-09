import React from 'react';
import { 
    Grid,
    Dimmer,
    Loader,
    Header,
    Icon,
} from 'semantic-ui-react';

import Image from './Image';

const renderHeader = images => {
    if (images.length > 0) {
        return(
            <Header as='h2' textAlign='center'>
                Image Library
            </Header>
        );
    } else {
        return(
            <Header as='h2' icon textAlign='center'>
                <Icon name='file image outline'/>
                No Images
                <Header.Subheader>Upload an image using the panel to the left</Header.Subheader>
            </Header>
        );
    }
}
const renderImages = (images, handleDelete) => {
    if( images.length > 0) {
        return (
            images.map(image => {
                return(
                    <Grid.Column>
                        <Image
                            image={image}
                            onClose={handleDelete}
                            link={image.link}
                        />
                    </Grid.Column>
                ); 
            })
        );
    }
}
const ImageGrid = props => {
    const { images, handleDelete, columns, imagesLoading, imageDeleting } = props;

    return (
        <React.Fragment>
            { renderHeader(images) }
            
            <Grid
            columns={columns}
            verticalAlign='bottom'
            >
                <Dimmer inverted active={imagesLoading || imageDeleting}>
                    <Loader inverted content={`${ imagesLoading ? 'Images Loading' : 'Image deleting'}`}/>
                </Dimmer>
                { renderImages(images, handleDelete) }
            </Grid>
            
        </React.Fragment>
    );
}

export default ImageGrid;

