import React, { Component } from 'react';

import { 
	Container,
	Segment,
	Header,
	Divider,
	Button,
	Loader,
	Message,
} from 'semantic-ui-react'

import { uploadImage, removeImage, getImages } from '../databse/ImageRepository';

import 'semantic-ui-css/semantic.min.css'
import './ImageLibrary.scss';

import ImageGrid from './ImageGrid';


class ImageLibrary extends Component {

	constructor(props) {
		super(props);
		this.state = {
			imagesToUpload: null,
			images: [],
			imagesLoading: true,
			imageUploading: false,
			imageDeleting: false,
		}
	}

	componentDidMount() {
		getImages().then((result) => {
			console.log(result);
			this.setState({
				imagesLoading: false,
				images: result
			});
		});
	}


	handleUpload = () => {
		const { imagesToUpload } = this.state;

		if (!imagesToUpload) {
			return
		}

		this.setState({ imageUploading: true })

		// Iterate through all images 
		Array.from(imagesToUpload).forEach(image => {
			// Start uploading the image to firebase storage
			uploadImage(image).then(result => {
				console.log(`uploaded ${result.name}`)

				// add the image we uploaded to the array of images
				this.setState(prevState => ({
					images: [...prevState.images, result ],
					imageUploading: false
				}));
			});
		});

		this.setState({
			imagesToUpload: null,
		});
	}

	handleRemove = image => {
		removeImage(image).then(() => {
			console.log(`removed ${image.name}`);

			let filteredImages = this.state.images.filter(value => {
				return value.link !== image.link;
			});

			// add the image we uploaded to the array of images
			this.setState({ images: [...filteredImages] });
		})
	}

	// when files are added from the 'add files' button, store them
	handleChange = event => {
		if(event.target.files[0]) {
			const imagesToUpload = event.target.files;
			this.setState(() => ({ imagesToUpload }));
		}
	}

	render() {
		console.log('rendering');
		console.log(this.state.images);
		const { images, imagesToUpload, imageUploading } = this.state;

		return (
			<Container text>
					<Header as="h1" textAlign="center">
						Super Cool Photo Thing
					</Header>

					<Segment textAlign="center">
						<Header as="h2">
							Choose your photos
						</Header>

						<input type="file" multiple onChange={this.handleChange}></input>
						<Divider/>
						<Button
							primary={imagesToUpload}
							disabled={!imagesToUpload}
							loading={imageUploading}
							onClick={this.handleUpload}
						>
							{ imagesToUpload ? 'Upload images' : 'No images selected' } 
						</Button>
					</Segment>
					<Segment>
						<ImageGrid
							columns={4}
							imageUploading={imageUploading}
							images={images}
							handleRemove={this.handleRemove}
						/>
					</Segment>


			</Container>
		);
	}
}

export default ImageLibrary;