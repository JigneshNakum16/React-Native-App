import TrackPlayer, { Event, RepeatMode, Capability } from 'react-native-track-player';
import { playListData } from './src/constants';

/**
 * Sets up the TrackPlayer instance
 * @returns {Promise<boolean>} True if player was set up successfully
 */
export async function setupPlayer() {
  let isSetup = false;
  try {
    // Check if player is already initialized
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch (error) {
    // Player not initialized, set it up
    await TrackPlayer.setupPlayer();
    isSetup = true;
  } finally {
    return isSetup;
  }
}

/**
 * Adds tracks to the player queue and configures repeat mode
 */
export async function addTrack() {
  await TrackPlayer.add(playListData);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

/**
 * Sets up the playback service with remote control capabilities
 * This enables lock screen controls and background playback
 */
export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    TrackPlayer.destroy();
  });
}

/**
 * Registers the playback service options for iOS/Android
 * This defines which capabilities the player supports
 */
export const PlaybackServiceOptions = {
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.Stop,
  ],
  compactCapabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
  ],
  progressUpdateEventInterval: 1,
};
