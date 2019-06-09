import React, { Component } from 'react';

import { 
	Container,
	Segment,
	Header,
	Divider,
	Button,
	Dimmer,
	Loader,
	Input,
	Grid,
	Item,
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
			imagesUploading: false,
			imageDeleting: false,
		}
	}

	componentDidMount() {
		getImages().then((result) => {
			console.log('images: ', result);
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

		this.setState({ imagesUploading: true })

		// Iterate through all images 
		imagesToUpload.forEach(image => {
			// Start uploading the image to firebase storage
			uploadImage(image).then(result => {
				console.log(`uploaded ${result.name}`)

				// add the image we uploaded to the array of images
				this.setState(prevState => ({
					images: [...prevState.images, result ],
					imagesUploading: false,
					imagesToUpload: null,
				}));
			});
		});
	}

	handleRemove = image => {
		this.setState({ imageDeleting : true })
		removeImage(image).then(() => {
			console.log(`removed ${image.name}`);

			let filteredImages = this.state.images.filter(value => {
				return value.link !== image.link;
			});

			// add the image we uploaded to the array of images
			this.setState({
				images: [...filteredImages],
				imageDeleting: false,
			});
		})
	}

	// when files are added from the 'add files' button, store them
	handleChange = event => {
		if(event.target.files[0]) {
			const files = event.target.files;
			let imagesToUpload = [];
			
			Array.from(files).forEach(image => {
				// Start uploading the image to firebase storage
				imagesToUpload.push({
					image,
					tags: [],
				})
			});

			this.setState(() => ({ imagesToUpload }));
		}
	}

	changeTag = event => {
		this.setTag(parseInt(event.target.id), event.target.value);
	}

	setTag = (id, tag) => {
		const { imagesToUpload } = this.state;

		if (tag !== ''){
			imagesToUpload[id].tags = tag.replace(/\s/g,'').split(','); 
			this.setState({ imagesToUpload });
		}
	}

	render() {
		const { images, imagesToUpload, imagesLoading, imagesUploading, imageDeleting } = this.state;

		return (
			<Container>
					<Header as="h1" textAlign="center">
						Super Cool Photo Thing
					</Header>
					<Header as="h4" textAlign="center">
						Shopify Fall 2019 Internship Coding Challenge
					</Header>

					<Grid
					columns={2}
					>
						<Grid.Column width={6}>
							<Segment textAlign="center">
						<Header as="h2">
							{ imagesToUpload ? 'Review upload selection' : 'Choose photos to upload' }
						</Header>

						<input type="file" multiple onChange={this.handleChange}></input>
						<Divider/>
						{
							imagesToUpload ?
								<Grid columns={3} verticalAlign='bottom' > 
									<Dimmer inverted active={imagesUploading}>
										<Loader inverted content={`Uploading ${imagesToUpload.length} ${imagesToUpload.length !== 1 ? 'images' : 'image'}`} />
									</Dimmer>
								{
									imagesToUpload.map((object, index) => {
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
														onChange={this.changeTag}
														id={index}
													/>
												</Item.Content>
											</Item>
										)
									}) 
								} 
								</Grid>
							: null
						}
						{ imagesToUpload ? <Divider/> : null }	
						<Button
							primary={imagesToUpload}
							disabled={!imagesToUpload}
							onClick={this.handleUpload}
						>
							{ imagesToUpload ? `Upload ${imagesToUpload.length} ${imagesToUpload.length !== 1 ? 'images' : 'image'}` : 'No images selected' } 
						</Button>
					</Segment>
						</Grid.Column>

						<Grid.Column width={10}>
							<Segment>
								<ImageGrid
									columns={4}
									imagesLoading={imagesLoading}
									images={images}
									handleRemove={this.handleRemove}
									imageDeleting={imageDeleting}
								/>
							</Segment>
						</Grid.Column>
					</Grid>
			</Container>
		);
	}
}

export default ImageLibrary;