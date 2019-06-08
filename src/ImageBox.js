import React, { Component } from 'react';
import ImageLibrary from './components/ImageLibrary';

import { uploadImage, removeImage, getImages, removeAllImages } from './databse/ImageRepository';

class ImageBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      imagesToUpload: null,
      images: [],
      imagesLoading: true,
      imagesUploading: false,
      imageDeleting: false,
    }
  }

  componentDidMount() {
    getImages().then((result) => {
      this.setState({
        imagesLoading: false,
        images: result
      });
    });
  }

    handleUpload = () => {
    const { imagesToUpload } = this.state;

    if (!imagesToUpload)
      return;

    this.setState({ imagesUploading: true })

    imagesToUpload.forEach(image => {
      // Start uploading the image to firebase storage
      uploadImage(image).then(result => {
        console.log(`uploaded ${result.name}`)

        // when the upload is complete
        // add the new image to the global array
        this.setState(prevState => ({
          images: [...prevState.images, result ],
          imagesUploading: false,
          imagesToUpload: null,
        }));
      });
    });
  }

  handleDelete = image => {

    this.setState({ imageDeleting: true })

    removeImage(image).then(() => {
      console.log(`removed ${image.name}`);

      // remove the image from the state array
      let filteredImages = this.state.images.filter(value => {
        return value.link !== image.link;
      });

      // update state
      this.setState({
        images: [...filteredImages],
        imageDeleting: false,
      });
    })
  }

  handleDeleteAll = () => {
    this.setState({ imageDeleting: true })

    removeAllImages().then(() => {
      console.log('Removed all images');

      this.setState({
        images: [],
        imageDeleting: false,
      })
    })
  }

  onFileChange = event => {
    const files = event.target.files;

    // if no files, don't do anything
    if (!files[0])
      return;

    let imagesToUpload = [];

    // iterate over all files and store in a temp array
    Array.from(files).forEach(image => {
      imagesToUpload.push({
        image,
        tags: [],
      })
    });

    this.setState(() => ({ imagesToUpload }));
  }

  onTagChange = event => {
    this.setTag(parseInt(event.target.id), event.target.value);
  }

  setTag = (id, tag) => {
    if (tag === '')
      return;

    const { imagesToUpload } = this.state;
    
    imagesToUpload[id].tags = tag.replace(/\s/g,'').split(',');
    this.setState({ imagesToUpload });
  }

  render() {
    return (
      <ImageLibrary
        handleUpload={this.handleUpload}
        handleDelete={this.handleDelete}
        handleDeleteAll={this.handleDeleteAll}
        onFileChange={this.onFileChange}
        onTagChange={this.onTagChange}
        setTag={this.setTag}
        imagesToUpload={this.state.imagesToUpload}
        images={this.state.images}
        imagesLoading={this.state.imagesLoading}
        imagesUploading={this.state.imagesUploading}
        imageDeleting={this.state.imageDeleting}
      />
    )
  }
}

export default ImageBox;