import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artistName: '',
    isSearchButtonDisabled: true,
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

  render() {
    const { artistName, isSearchButtonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
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
      </div>
    );
  }
}

export default Search;
