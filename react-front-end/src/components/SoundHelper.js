import switch004 from '../asset/sounds/Switch_004.ogg'
import select008 from '../asset/sounds/Select_008.ogg'
import question003 from '../asset/sounds/Question_003.ogg'
import error008 from '../asset/sounds/Error_008.ogg'
import glass004 from '../asset/sounds/Glass_004.ogg'
import close003 from '../asset/sounds/Close_003.ogg'
import scratch004 from '../asset/sounds/Scratch_004.ogg'
import select005 from '../asset/sounds/Select_005.ogg'

const handleAudio = (volume, sound) => {
  if (volume && sound) {
    const audio = new Audio(sound);
    const playAudio = () => {
      audio.play();
      // Optionally, you can remove the event listener after the first play
      document.removeEventListener('click', playAudio);
    };

    // Attach a click event listener to the document
    document.addEventListener('click', playAudio);
  }
};


const sounds = {
  click: switch004,
  hover: select008,
  correct: question003,
  incorrect: error008,
  hint: glass004,
  skip: close003,
  fifty: scratch004,
  swap: select005
}

export { handleAudio, sounds }
