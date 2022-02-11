import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Form, Input, Segment } from 'semantic-ui-react';

const SearchBar = ({
  isLoading, searchValue, onSearchChange, onSearchSubmit,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Segment>
      <Form onSubmit={onSearchSubmit}>
        <Input
          ref={inputRef}
          className="search"
          fluid
          loading={isLoading}
          icon="search"
          placeholder="Chercher des dépôts github"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </Form>
    </Segment>
  );
};

SearchBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
