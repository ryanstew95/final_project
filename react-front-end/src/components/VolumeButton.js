import React from 'react';
import SoundOn from "../asset/Sound_on.png";
import SoundOff from "../asset/Sound_off.png";
import useVolumeControl from './useVolumeControl';

function VolumeButton() {
  const { isMute, toggleMute } = useVolumeControl();

  return (
    <div className="mute-button-container">
      <img
        className="mute-button"
        src={isMute ? SoundOn : SoundOff}
        alt={isMute ? 'sound on' : 'sound off'}
        onClick={toggleMute}
      />
    </div>
  );
}

export default VolumeButton;
