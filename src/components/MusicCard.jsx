import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isInputChecked: false,
    isLoading: false,
  };

  async componentDidMount() {
    const { trackName } = this.props;
    const response = await getFavoriteSongs();
    const songsArray = [...response.map((item) => item.trackName)];

    if (songsArray.includes(trackName)) {
      this.setState({ isInputChecked: true });
    }
  }

  addFavoriteSong = async (music) => {
    this.setState({ isInputChecked: true, isLoading: true });
    const favoriteSong = await addSong(music);
    if (favoriteSong === 'OK') {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { previewUrl, trackName, trackId, music } = this.props;
    const { isInputChecked, isLoading } = this.state;

    return (
      <div>
        {
          isLoading ? <Loading />
            : (
              <section>
                <p>{ trackName }</p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor={ `checkbox-music-${trackId}` }>
                  Favorita
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    id={ `checkbox-music-${trackId}` }
                    checked={ isInputChecked }
                    onChange={ () => this.addFavoriteSong(music) }
                  />
                </label>
              </section>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  music: PropTypes.isRequired,
};

export default MusicCard;
