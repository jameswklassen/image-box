import React from 'react';
import { 
  Divider,
  Header,
  Button,
  Item,
  Input,
  Grid, 
  Dimmer,
  Loader,
} from 'semantic-ui-react';

const renderHeader = (images, onFileChange) => {
  return (
    <React.Fragment>
      <Header as="h2">
        { images ? 'Review upload selection' : 'Choose photos to upload' }
      </Header>
  
      <input type="file" multiple onChange={onFileChange}></input>
      <Divider/>
    </React.Fragment>
  );
}

const renderGrid = (images, uploading, onTagChange) => {
  if (images) {
    return (
      <React.Fragment>
        <Grid columns={2} verticalAlign='bottom' > 
          <Dimmer inverted active={uploading}>
            <Loader inverted content={`Uploading ${images.length} ${images.length !== 1 ? 'images' : 'image'}`} />
          </Dimmer>
          {
            images.map((object, index) => {
              return (
                <Item>
                  <Item.Image
                    size='tiny'
                    src={URL.createObjectURL(object.image)}
                  />
                  <Item.Content>
                    <Item.Header>
                      { object.image.name }
                    </Item.Header>
                    <Input
                      placeholder='Enter tags'
                      onChange={onTagChange}
                      id={index}
                    />
                  </Item.Content>
                </Item>
              )
            }) 
          } 
        </Grid>
        <Divider/>
      </React.Fragment>
    );
  }
};

const renderUploadButton = (images, handleUpload) => {
  return (
    <Button
      primary={images}
      disabled={!images}
      onClick={handleUpload}
    >
      { images ? `Upload ${images.length} ${images.length !== 1 ? 'images' : 'image'}` : 'No images selected' } 
    </Button>
  );
};

const UploadWidget = props => {
  const { images, imagesUploading, handleUpload, onFileChange, onTagChange} = props;
  return (
    <React.Fragment>
      { renderHeader(images, onFileChange)}
      { renderGrid(images, imagesUploading, onTagChange) }
      { renderUploadButton(images, handleUpload)}
    </React.Fragment>
  );
}

export default UploadWidget;