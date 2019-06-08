import React from 'react';
import { 
  Divider,
  Header,
  Search,
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

const SearchWidget = () => {

  return (
    <React.Fragment>
      { renderHeader() }
      <Search />
    </React.Fragment>
  );
}

export default SearchWidget;