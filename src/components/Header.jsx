import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import './Header.css';

class Header extends Component {
  state = {
    name: '',
    image: '',
    loadingName: true,
  };

  async componentDidMount() {
    const response = await getUser();
    const { name, image } = response;
    this.setState({
      name,
      image,
      loadingName: false,
    });
  }

  render() {
    const { name, image, loadingName } = this.state;
    return (
      <div>
        {
          loadingName
            ? <Loading />
            : (
              <header className="header-component" data-testid="header-component">
                <div className="user-name-div">
                  <img src={ image } alt="Foto perfil" />
                  <p data-testid="header-user-name">{ name }</p>
                </div>
                <nav className="container-links">
                  <div className="link-div">
                    <Link
                      className="link"
                      to="/search"
                      data-testid="link-to-search"
                    >
                      Pesquisa
                    </Link>
                  </div>
                  <div className="link-div">
                    <Link
                      className="link"
                      to="/favorites"
                      data-testid="link-to-favorites"
                    >
                      Favoritas
                    </Link>
                  </div>
                  <div className="link-div">
                    <Link
                      className="link"
                      to="/profile"
                      data-testid="link-to-profile"
                    >
                      Perfil
                    </Link>
                  </div>
                </nav>
              </header>
            )
        }
      </div>
    );
  }
}

export default Header;
