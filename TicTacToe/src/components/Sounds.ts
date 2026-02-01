import Sound from 'react-native-sound';

// Required on Android
Sound.setCategory('Playback');

export const tapSound = new Sound(
  'tap.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('tap sound error', error);
    }
  }
);

export const winSound = new Sound(
  'win.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('win sound error', error);
    }
  }
);

export const tieSound = new Sound(
  'tie.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('tie sound error', error);
    }
  }
);
