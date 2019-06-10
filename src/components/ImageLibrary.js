import React from 'react';
import { 
	Container,
	Segment,
	Header,
	Grid,
} from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './ImageLibrary.scss';

import UploadWidget from './UploadWidget';
import SearchWidget from './SearchWidget';
import ImageGrid from './ImageGrid';


const ImageLibrary = props => {
	const { handleUpload, handleDelete, handleDeleteAll, onFileChange, onTagChange, images, imagesToUpload, imagesLoading, imagesUploading, imageDeleting, onSearchChange } = props;

	return (
		<Container>
			<Header as="h1" textAlign="center">
				{ process.env.REACT_APP_APPNAME }
			</Header>
			<Header as="h4" textAlign="center">
				Shopify Fall 2019 Internship Coding Challenge
			</Header>

			<Grid columns={2}>
				<Grid.Column width={7}>
					<Segment textAlign="center">
						<UploadWidget
							images={imagesToUpload}
							imagesUploading={imagesUploading}
							handleUpload={handleUpload}
							onFileChange={onFileChange}
							onTagChange={onTagChange}
						/>
					</Segment>

					<Segment textAlign="center">
						<SearchWidget
							onSearchChange={onSearchChange}
						/>
					</Segment>
				</Grid.Column>

				<Grid.Column width={9}>
					<Segment>
						<ImageGrid
							columns={4}
							imagesLoading={imagesLoading}
							images={images}
							handleDelete={handleDelete}
							handleDeleteAll={handleDeleteAll}
							imageDeleting={imageDeleting}
						/>
					</Segment>
				</Grid.Column>
			</Grid>
		</Container>
	);
}

export default ImageLibrary;