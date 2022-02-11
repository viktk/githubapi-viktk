import React from 'react';
import PropTypes from 'prop-types';

import {
  Card, Icon, Button, Grid,
} from 'semantic-ui-react';

const ReposResults = ({ isLoading, repos, loadMoreRepos }) => (
  <main>
    <Card.Group itemsPerRow={3}>
      {
        repos.map((repo) => (
          <Card
            style={{
              wordWrap: 'break-word',
            }}
            key={repo.id}
            image={repo.owner.avatar_url}
            header={repo.id + repo.name}
            meta={repo.owner.login}
            description={repo.description}
            extra={(
              <a>
                <Icon name="star" />
                {repo.stargazers_count} Étoiles
              </a>
            )}
          />
        ))
      }
    </Card.Group>
    <Grid centered>
      <Grid.Row>
        <Button onClick={loadMoreRepos}>
          <Icon
            loading={isLoading}
            name={isLoading ? 'spinner' : 'arrow alternate circle down'}
          />
          Récupérer plus de repos
        </Button>
      </Grid.Row>
    </Grid>
  </main>
);

ReposResults.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      stargazers_count: PropTypes.number.isRequired,
      owner: PropTypes.shape({
        login: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  loadMoreRepos: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ReposResults;
