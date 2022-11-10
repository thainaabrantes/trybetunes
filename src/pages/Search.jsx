import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    artistName: '',
    artistAlbums: [],
    isSearchButtonDisabled: true,
    isLoading: false,
    succesMessage: '',
  };

  enableSearchButton = () => {
    const { artistName } = this.state;
    const maxLength = 2;
    const invalideArtistName = artistName.length < maxLength;

    if (invalideArtistName) {
      this.setState({ isSearchButtonDisabled: true });
    } else {
      this.setState({ isSearchButtonDisabled: false });
    }
  };

  handleChange = ({ name, value }) => {
    this.setState({ [name]: value }, () => {
      this.enableSearchButton();
    });
  };

  searchAlbums = (event) => {
    event.preventDefault();
    const { artistName } = this.state;
    this.setState(
      { isLoading: true },
      async () => {
        const albumsResult = await searchAlbumsAPI(artistName);
        this.setState({
          artistAlbums: albumsResult,
          succesMessage: `Resultado de álbuns de: ${artistName}`,
          artistName: '',
          isLoading: false,
        });
      },
    );
  };

  render() {
    const {
      artistName,
      artistAlbums,
      isSearchButtonDisabled,
      isLoading,
      succesMessage,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {isLoading && <Loading />}
        <form onSubmit={ this.searchAlbums }>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome do Artista"
            name="artistName"
            value={ artistName }
            onChange={ ({ target }) => this.handleChange(target) }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ isSearchButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
        <div>
          {artistAlbums.length ? <p>{ succesMessage }</p> : <p />}
          {artistAlbums.length
            ? artistAlbums.map((album) => (
              <div key={ album.collectionId }>
                <img src={ album.artworkUrl100 } alt="Foto do album" />
                <h1>{ album.collectionName }</h1>
                <p>{album.artistName}</p>
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  ACESSAR ALBUM
                </Link>
              </div>
            ))
            : <p>Nenhum álbum foi encontrado</p>}
        </div>
      </div>
    );
  }
}

export default Search;
