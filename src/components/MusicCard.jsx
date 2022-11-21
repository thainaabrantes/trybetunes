import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isInputChecked: false,
    isLoading: false,
  };

  async componentDidMount() {
    const { music: { trackName } } = this.props;
    const response = await getFavoriteSongs();
    const songsArray = [...response.map((item) => item.trackName)];

    if (songsArray.includes(trackName)) {
      this.setState({ isInputChecked: true });
    }
  }

  handleFavoriteSong = async (music) => {
    const { removeFavoriteSong } = this.props;
    const { isInputChecked } = this.state;
    if (!isInputChecked) {
      this.setState({ isInputChecked: true, isLoading: true });
      const favoriteSong = await addSong(music);
      if (favoriteSong === 'OK') {
        this.setState({ isLoading: false });
      }
    } else {
      this.setState({ isInputChecked: false, isLoading: true }, async () => {
        await removeSong(music);
        await removeFavoriteSong();
      });
    }
  };

  render() {
    const { music } = this.props;
    const { isInputChecked, isLoading } = this.state;

    return (
      <div>
        {
          isLoading ? <Loading />
            : (
              <section>
                <p>{ music.trackName }</p>
                <audio data-testid="audio-component" src={ music.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor={ `checkbox-music-${music.trackId}` }>
                  Favorita
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${music.trackId}` }
                    id={ `checkbox-music-${music.trackId}` }
                    checked={ isInputChecked }
                    onChange={ () => this.handleFavoriteSong(music) }
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
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }).isRequired,
  removeFavoriteSong: PropTypes.func.isRequired,
};

export default MusicCard;
