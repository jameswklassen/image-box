import React, {Component} from 'react';
import { 
    Divider,
    Header,
    Search,
    Label,
} from 'semantic-ui-react';

const renderHeader = () => {
    return (
        <React.Fragment>
            <Header as="h2">
                Search Images
            </Header>
            <p>Search Images by name or tag</p>
            <Divider/>
        </React.Fragment>
    );
}

class SearchWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
        }

        if (props.images) {
            const searchResults = props.images.map(image => {
                return {
                    title: image.name
                }
            })
            this.setState({searchResults})
        }
    }

    render() {
        return (
            <React.Fragment>
                { renderHeader() }
                <Search
                    results={this.state.searchResults}
                    onSearchChange={this.props.onSearchChange}
                    resultRenderer={this.resultRenderer}
                />
            </React.Fragment>
        );
    }
}

export default SearchWidget;