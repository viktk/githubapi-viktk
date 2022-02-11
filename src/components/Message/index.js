import React from 'react';
import PropTypes from 'prop-types';
import { Message as SemanticUIMessage } from 'semantic-ui-react';

const Message = ({ nbRepos }) => (
  <SemanticUIMessage>La recherche a renvoyé {nbRepos} résultats</SemanticUIMessage>
);

Message.defaultProps = {
  nbRepos: 0,
};

Message.propTypes = {
  nbRepos: PropTypes.number,
};

export default Message;
