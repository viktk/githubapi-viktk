import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const MenuBar = () => {
  const history = useHistory();
  const [activeMenuItem, setActiveMenuItem] = useState('search');

  return (
    <Menu>
      <Menu.Item
        name="search"
        active={activeMenuItem === 'search'}
        onClick={() => {
          setActiveMenuItem('search');
          history.push('/');
        }}
      >
        Recherche
      </Menu.Item>
      <Menu.Item
        name="faq"
        active={activeMenuItem === 'faq'}
        onClick={() => {
          setActiveMenuItem('faq');
          history.push('/faq');
        }}
      >
        FAQ
      </Menu.Item>
    </Menu>
  );
};

export default MenuBar;
