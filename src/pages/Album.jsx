import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    musicList: [],
    artworkUrl100: '',
    artistName: '',
    collectionName: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const { artworkUrl100 } = response[0];
    const { artistName } = response[0];
    const { collectionName } = response[0];
    const musics = response.slice(1);

    this.setState({
      musicList: musics,
      artworkUrl100,
      artistName,
      collectionName,
    });
  }

  render() {
    const { musicList, artworkUrl100, artistName, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <div>
            <img src={ artworkUrl100 } alt="Foto do album" />
            <h1 data-testid="album-name">{ collectionName}</h1>
            <h2 data-testid="artist-name">{ artistName }</h2>
            {
              musicList.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  music={ music }
                  trackId={ music.trackId }
                  previewUrl={ music.previewUrl }
                  trackName={ music.trackName }
                />
              ))
            }
          </div>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
