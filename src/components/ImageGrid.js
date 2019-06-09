import React from 'react';
import { 
    Grid,
    Icon,
    Button,
    Loader,
} from 'semantic-ui-react';

import Image from './Image';

const ImageGrid = props => {
    const { images, handleRemove, columns, imagesLoading } = props;
    console.log('imagegrid', images);

    if (imagesLoading) {
        return <Loader active inline='centered'/>
    }

    return (
        <Grid
            columns={columns}
        >
            {
                images.map(image => {
                    console.log(image);
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

