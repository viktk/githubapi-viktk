// == Import npm
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Message as SemanticUIMessage, Segment } from 'semantic-ui-react';
import axios from 'axios';

import MenuBar from 'src/components/MenuBar';
import SearchBar from 'src/components/SearchBar';
import Message from 'src/components/Message';
import ReposResults from 'src/components/ReposResults';

import logoGithub from 'src/assets/images/logo-github.png';
import './app.scss';

// == Composant
const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [reposData, setReposData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSubmit = () => {
    // si searchValue est vide, on arrête tout, pas besoin de faire de requête
    if (!searchValue || !/\S/.test(searchValue)) {
      return;
    }

    // on commence par mettre le loading a true
    setIsLoading(true);

    // si on arrive la, c'est bon, on peut faire la requete
    axios.get(`https://api.github.com/search/repositories?q=${searchValue}&per_page=9`)
      .then((response) => {
        // si j'arrive ici, ma requete a réussi
        // je peux stocker dans mon state le retour de l'api
        setReposData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // on coupe le loading
        setIsLoading(false);
      });
  };

  const handleLoadMore = () => {
    // je veux augmenter ma page de 1
    // refaire la requête
    // et stocker les éléments A LA SUITE dans mon state
    setIsLoading(true);
    setCurrentPage(currentPage + 1);

    // si on arrive la, c'est bon, on peut faire la requete
    axios.get(`https://api.github.com/search/repositories?q=${searchValue}&per_page=9&page=${currentPage + 1}`)
      .then((response) => {
        // si j'arrive ici, ma requete a réussi
        // je peux stocker dans mon state le retour de l'api

        const newReposData = {
          // on commence par créer un nouvel objet et recopier les clés
          ...reposData,
          // pour items, on crée un nouveau tableau
          items: [
            // dans lequel on recopie les anciens résultats
            ...reposData.items,
            // et a la fin, on rajoute les nouveaux
            ...response.data.items,
          ],
        };

        setReposData(newReposData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // on coupe le loading
        setIsLoading(false);
      });
  };

  return (
    <div className="app">
      <img className="app__logo" alt="Logo de l'entreprise Github" src={logoGithub} />
      <MenuBar />
      <Route exact path="/">
        <SearchBar
          isLoading={isLoading}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearchSubmit={handleSubmit}
        />
        {
          reposData ? (
            <>
              <Message nbRepos={reposData.total_count} />
              <ReposResults
                isLoading={isLoading}
                repos={reposData.items}
                loadMoreRepos={handleLoadMore}
              />
            </>
          ) : (
            <SemanticUIMessage info>
              <SemanticUIMessage.Header>
                Bienvenue sur l'explorateur de dépots Github
              </SemanticUIMessage.Header>
              <p>Pour commencer, tapez votre recherche ci dessus et appuyez sur entrée</p>
            </SemanticUIMessage>
          )
        }
      </Route>
      <Route exact path="/faq">
        <Segment>
          <h1 className="main-title">FAQ</h1>
          <h2 className="sub-title">A quoi ça sert ?</h2>
          <p>Cette application permet de trouver une liste de dépôts GitHub</p>
          <h2 className="sub-title">Comment faire une recherche ?</h2>
          <p>Sur la page recherche, complétez le champ de recherche et valider la recherche.</p>
          <h2 className="sub-title">Puis-je chercher n'importe quel terme ?</h2>
          <p>Oui, c'est fou.</p>
        </Segment>
      </Route>
    </div>
  );
};

// == Export
export default App;
