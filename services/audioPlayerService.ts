// Service to handle audio playback for ringing sounds

const RINGING_AUDIO_URL = 'https://botsrhere.online/deontic/callerpro/ring.mp3';
const BACKGROUND_NOISE_URL = 'https://eburon.ai/soundfx/noice.mp3';

/**
 * Plays the ringing audio from the configured URL
 * @returns Promise that resolves when audio finishes or is stopped
 */
export const playRingingSound = (): { promise: Promise<void>; stop: () => void } => {
    const audio = new Audio(RINGING_AUDIO_URL);
    audio.loop = false;
    audio.volume = 0.7; // Slightly reduced volume for comfort
    
    let stopped = false;
    
    const promise = new Promise<void>((resolve, reject) => {
        audio.addEventListener('ended', () => {
            if (!stopped) {
                resolve();
            }
        });
        
        audio.addEventListener('error', (e) => {
            console.error('Error playing ringing sound:', e);
            reject(new Error('Failed to play ringing sound'));
        });
        
        audio.play().catch((err) => {
            console.error('Error starting ringing sound:', err);
            reject(err);
        });
    });
    
    const stop = () => {
        stopped = true;
        audio.pause();
        audio.currentTime = 0;
    };
    
    return { promise, stop };
};

/**
 * Plays background noise in a loop for ambient call sound
 * @returns Object with stop function to end the background noise
 */
export const playBackgroundNoise = (): { stop: () => void; audio: HTMLAudioElement } => {
    const audio = new Audio(BACKGROUND_NOISE_URL);
    audio.loop = true; // Loop continuously
    audio.volume = 0.3; // Lower volume for background ambience
    
    audio.play().catch((err) => {
        console.error('Error starting background noise:', err);
    });
    
    const stop = () => {
        audio.pause();
        audio.currentTime = 0;
    };
    
    return { stop, audio };
};

/**
 * Preloads the ringing audio to ensure smooth playback
 */
export const preloadRingingSound = (): void => {
    const audio = new Audio(RINGING_AUDIO_URL);
    audio.preload = 'auto';
    
    // Also preload background noise
    const bgAudio = new Audio(BACKGROUND_NOISE_URL);
    bgAudio.preload = 'auto';
};

