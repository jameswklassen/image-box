import React from 'react';
import { 
    Grid,
    Dimmer,
    Loader,
    Header,
    Icon,
    Button,
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

const renderDeleteAllButton = handleDeleteAll => {
    return (
        <Button
            icon
            labelPosition='left'
            color='red'
            onClick={handleDeleteAll}
        >
            <Icon name='trash' />
            Delete all
        </Button>
    );
}

const ImageGrid = props => {
    const { images, handleDelete, handleDeleteAll, columns, imagesLoading, imageDeleting } = props;

    return (
        <React.Fragment>
            { renderHeader(images) }
            { images.length > 0 ? renderDeleteAllButton(handleDeleteAll) : '' }
            <Grid
            columns={columns}
            verticalAlign='bottom'
            >
                <Dimmer inverted active={imagesLoading || imageDeleting}>
                    <Loader inverted content={`${ imagesLoading ? 'Images Loading' : 'Deleting'}`}/>
                </Dimmer>

                { renderImages(images, handleDelete) }
            </Grid>
            
        </React.Fragment>
    );
}

export default ImageGrid;

