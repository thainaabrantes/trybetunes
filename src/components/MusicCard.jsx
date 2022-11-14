import React, { Component } from 'react';

class MusicCard extends Component {
    render() {
      const { previewUrl, trackName } = this.props;
        return (
            <section>
                <p>{ trackName }</p>
                <audio data-testid="audio-component" src={previewUrl} controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento{" "} <code>audio</code>.
                </audio>
            </section>
        )
    }
}

export default MusicCard;