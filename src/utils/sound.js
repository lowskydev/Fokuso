// Sound utility functions for the Pomodoro timer

export const createBellSound = () => {
  try {
    // Create audio context
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Create oscillator for the bell sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configure the bell sound
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // High pitch
    oscillator.frequency.exponentialRampToValueAtTime(
      400,
      audioContext.currentTime + 0.1
    ); // Drop to lower pitch

    // Configure volume envelope for bell-like decay
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01); // Quick attack
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 1.5
    ); // Long decay

    // Play the sound
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.5);

    // Add a second harmonic for richer bell sound
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();

    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);

    oscillator2.frequency.setValueAtTime(1200, audioContext.currentTime);
    oscillator2.frequency.exponentialRampToValueAtTime(
      600,
      audioContext.currentTime + 0.1
    );

    gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode2.gain.linearRampToValueAtTime(
      0.15,
      audioContext.currentTime + 0.01
    );
    gainNode2.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 1.2
    );

    oscillator2.start(audioContext.currentTime);
    oscillator2.stop(audioContext.currentTime + 1.2);
  } catch (error) {
    console.warn("Could not play notification sound:", error);
  }
};

export const createChimeSound = () => {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Create a softer chime sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Chime frequencies
    oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.2); // E5
    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.4); // G5

    // Gentle envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 2
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);
  } catch (error) {
    console.warn("Could not play chime sound:", error);
  }
};

export const createGongSound = () => {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Create a deep gong sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Low frequency for gong
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      100,
      audioContext.currentTime + 0.3
    );

    // Long sustain like a gong
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 3
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 3);
  } catch (error) {
    console.warn("Could not play gong sound:", error);
  }
};

export const playNotificationSound = (soundType = "bell") => {
  switch (soundType) {
    case "bell":
      createBellSound();
      break;
    case "chime":
      createChimeSound();
      break;
    case "gong":
      createGongSound();
      break;
    default:
      createBellSound();
  }
};
