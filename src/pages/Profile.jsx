import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
  state = {
    infoUser: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await getUser();
    this.setState({
      infoUser: response,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, infoUser } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading ? <Loading />
            : (
              <section>
                <img
                  data-testid="profile-image"
                  src={ infoUser.image }
                  alt="Foto perfil"
                />
                <Link to="/profile/edit">
                  Editar perfil
                </Link>
                <h3>Nome</h3>
                <p>
                  { infoUser.name }
                </p>
                <h3>Email</h3>
                <p>
                  { infoUser.email }
                </p>
                <h3>Descrição</h3>
                <p>
                  { infoUser.description }
                </p>
              </section>
            )
        }
      </div>
    );
  }
}

export default Profile;
