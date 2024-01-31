import { useContext } from 'react';
import { AppContext } from './AppContext';

function useVolumeControl() {
  const { state, toggleMute } = useContext(AppContext);

  return {
    isMute: state.isMute,
    toggleMute,
  };
}

export default useVolumeControl;
