import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    userName: '',
    loadingName: true,
  };

  async componentDidMount() {
    const response = await getUser();
    const { name } = response;
    this.setState({
      userName: name,
      loadingName: false,
    });
  }

  render() {
    const { userName, loadingName } = this.state;
    return (
      <div>
        {
          loadingName
            ? <Loading />
            : (
              <header data-testid="header-component">
                <h1>Header</h1>
                <p data-testid="header-user-name">{ userName }</p>
                <nav>
                  <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
                  <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
                  <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
                </nav>
              </header>
            )
        }
      </div>
    );
  }
}

export default Header;
