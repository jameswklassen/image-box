import React from 'react';
import { 
    Grid,
    Dimmer,
    Loader,
} from 'semantic-ui-react';

import Image from './Image';

const ImageGrid = props => {
    const { images, handleRemove, columns, imagesLoading, imageDeleting } = props;

    return (
        <Grid
            columns={columns}
            verticalAlign='bottom'
        >
            <Dimmer inverted active={imagesLoading || imageDeleting}>
                <Loader inverted content={`${ imagesLoading ? 'Images Loading' : 'Image deleting'}`}/>
            </Dimmer>
            {
                images.map(image => {
                    return(
                        <Grid.Column>
                            <Image
                                image={image}
                                onClose={handleRemove}
                                link={image.link}
                            />
                        </Grid.Column>
                    ); 
                })
            }
        </Grid>
    );
}

export default ImageGrid;

