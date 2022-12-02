import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    favoriteSongs: [],
    isLoading: true,
  };

  async componentDidMount() {
    const response = await getFavoriteSongs();
    this.setState({
      favoriteSongs: response,
      isLoading: false,
    });
  }

  async componentDidUpdate() {
    const response = await getFavoriteSongs();
    this.setState({ favoriteSongs: response });
  }

  removeFavoriteSong = (songId) => {
    const { favoriteSongs } = this.state;
    const updateFavSongs = favoriteSongs.filter((song) => (
      song.trackId !== songId
    ));
    this.setState({ favoriteSongs: updateFavSongs });
  };

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <main>
          {
            isLoading ? <Loading />
              : (
                <section>
                  { favoriteSongs.map((favoriteSong) => (
                    <MusicCard
                      key={ favoriteSong.trackId }
                      music={ favoriteSong }
                      removeFavoriteSong={ this.removeFavoriteSong }
                    />
                  ))}
                </section>
              )
          }
        </main>
      </div>
    );
  }
}

export default Favorites;
