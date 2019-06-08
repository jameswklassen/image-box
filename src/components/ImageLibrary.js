import React, { Component } from 'react';

import { 
	Container,
	Segment,
	Header,
	Divider,
	Button,
	Grid,
} from 'semantic-ui-react'

import { uploadImage, removeImage, getImages } from '../databse/ImageRepository';
import Image from './Image';

import { IMAGE_UPLOAD_STATUS } from '../common/constants'

import 'semantic-ui-css/semantic.min.css'
import './ImageLibrary.scss';


class ImageLibrary extends Component {

	constructor(props) {
		super(props);
		this.state = {
			imagesToUpload: null,
			images: [],
		}
	}

	componentDidMount() {
		getImages().then((result) => {
			this.setState({ images: result});
		})
	}

	handleUpload = () => {
		const { imagesToUpload } = this.state;

		if (!imagesToUpload) {
			return
		}


		// Iterate through all images 
		Array.from(imagesToUpload).forEach(image => {
			// Start uploading the image to firebase storage
			uploadImage(image).then(result => {
				console.log(`uploaded ${result.name}`)

				// add the image we uploaded to the array of images
				this.setState(prevState => ({
					images: [...prevState.images, result ]
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


	renderImages = () => {
		console.log('render images');

		if (this.state.images && this.state.images.length !== 0) {
			const images = this.state.images.map(image => {
				console.log(image.name, image.link)
				return(
					<Grid.Column>
						<Image
							image={image}
							onClose={this.handleRemove}
							link={image.link}
						/>
					</Grid.Column>
				); 
			});
			return images;
		}
	}

	render() {
		const { imagesToUpload } = this.state;

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
							onClick={this.handleUpload}
						>
							{ imagesToUpload ? 'Upload images' : 'No images selected' } 
						</Button>
					</Segment>


					{
						imagesToUpload ? 
							Array.from(imagesToUpload).forEach(image => {
								return(<p>{image.link}</p>)
							}) : 
							null
					}
					

					<Grid
						columns={5}
					>
						{ this.renderImages() }
					</Grid>

			</Container>
		);
	}
}

export default ImageLibrary;