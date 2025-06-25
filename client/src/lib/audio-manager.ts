export class AudioManager {
  private audioContext: AudioContext | null = null;
  private audioBuffers: Map<string, AudioBuffer> = new Map();
  private activeSources: Map<string, AudioBufferSourceNode> = new Map();
  private gainNodes: Map<string, GainNode> = new Map();
  private masterGainNode: GainNode | null = null;
  private loadingPromises: Map<string, Promise<AudioBuffer>> = new Map();

  // Sound file mappings (in a real app, these would be actual audio files)
  private soundUrls: Record<string, string> = {
    "rain-forest": "/sounds/rain-forest.mp3",
    "ocean-waves": "/sounds/ocean-waves.mp3",
    "forest-birds": "/sounds/forest-birds.mp3",
    "white-noise": "/sounds/white-noise.mp3",
    "fireplace": "/sounds/fireplace.mp3",
    "thunder-storm": "/sounds/thunder-storm.mp3",
  };

  constructor() {
    this.initializeAudioContext();
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGainNode = this.audioContext.createGain();
      this.masterGainNode.connect(this.audioContext.destination);
      this.masterGainNode.gain.setValueAtTime(0.85, this.audioContext.currentTime);
    } catch (error) {
      console.error("Failed to initialize audio context:", error);
    }
  }

  private async loadAudioBuffer(soundId: string): Promise<AudioBuffer> {
    if (!this.audioContext) {
      throw new Error("Audio context not initialized");
    }

    // Check if already loading
    if (this.loadingPromises.has(soundId)) {
      return this.loadingPromises.get(soundId)!;
    }

    // Check if already loaded
    if (this.audioBuffers.has(soundId)) {
      return this.audioBuffers.get(soundId)!;
    }

    const loadPromise = this.fetchAndDecodeAudio(soundId);
    this.loadingPromises.set(soundId, loadPromise);

    try {
      const buffer = await loadPromise;
      this.audioBuffers.set(soundId, buffer);
      this.loadingPromises.delete(soundId);
      return buffer;
    } catch (error) {
      this.loadingPromises.delete(soundId);
      throw error;
    }
  }

  private async fetchAndDecodeAudio(soundId: string): Promise<AudioBuffer> {
    if (!this.audioContext) {
      throw new Error("Audio context not initialized");
    }

    // For demo purposes, we'll generate synthetic audio instead of loading files
    // In a real app, you would fetch actual audio files
    return this.generateSyntheticAudio(soundId);
  }

  private generateSyntheticAudio(soundId: string): AudioBuffer {
    if (!this.audioContext) {
      throw new Error("Audio context not initialized");
    }

    const sampleRate = this.audioContext.sampleRate;
    const duration = 10; // 10 seconds of audio
    const length = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      
      switch (soundId) {
        case "rain-forest":
          this.generateRainSound(channelData, sampleRate);
          break;
        case "ocean-waves":
          this.generateOceanSound(channelData, sampleRate);
          break;
        case "forest-birds":
          this.generateBirdSound(channelData, sampleRate);
          break;
        case "white-noise":
          this.generateWhiteNoise(channelData);
          break;
        case "fireplace":
          this.generateFireplaceSound(channelData, sampleRate);
          break;
        case "thunder-storm":
          this.generateThunderSound(channelData, sampleRate);
          break;
        default:
          this.generateWhiteNoise(channelData);
      }
    }

    return buffer;
  }

  private generateRainSound(data: Float32Array, sampleRate: number) {
    for (let i = 0; i < data.length; i++) {
      // High frequency noise for rain drops
      const highFreq = (Math.random() - 0.5) * 0.3;
      // Low frequency rumble
      const lowFreq = Math.sin(2 * Math.PI * 60 * i / sampleRate) * 0.1;
      data[i] = (highFreq + lowFreq) * 0.5;
    }
  }

  private generateOceanSound(data: Float32Array, sampleRate: number) {
    for (let i = 0; i < data.length; i++) {
      // Wave sound with varying amplitude
      const wave = Math.sin(2 * Math.PI * 0.2 * i / sampleRate) * 0.5;
      const noise = (Math.random() - 0.5) * 0.2;
      data[i] = (wave + noise) * Math.abs(Math.sin(2 * Math.PI * 0.05 * i / sampleRate));
    }
  }

  private generateBirdSound(data: Float32Array, sampleRate: number) {
    for (let i = 0; i < data.length; i++) {
      let sample = 0;
      // Occasional bird chirps
      if (Math.random() < 0.001) {
        const freq = 1000 + Math.random() * 2000;
        sample = Math.sin(2 * Math.PI * freq * i / sampleRate) * 0.3;
      }
      // Background ambience
      sample += (Math.random() - 0.5) * 0.05;
      data[i] = sample;
    }
  }

  private generateWhiteNoise(data: Float32Array) {
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() - 0.5) * 0.3;
    }
  }

  private generateFireplaceSound(data: Float32Array, sampleRate: number) {
    for (let i = 0; i < data.length; i++) {
      // Crackling sound
      const crackle = Math.random() < 0.01 ? (Math.random() - 0.5) * 0.8 : 0;
      // Low frequency rumble
      const rumble = Math.sin(2 * Math.PI * 30 * i / sampleRate) * 0.2;
      // High frequency hiss
      const hiss = (Math.random() - 0.5) * 0.1;
      data[i] = crackle + rumble + hiss;
    }
  }

  private generateThunderSound(data: Float32Array, sampleRate: number) {
    for (let i = 0; i < data.length; i++) {
      // Rain
      const rain = (Math.random() - 0.5) * 0.3;
      // Occasional thunder
      let thunder = 0;
      if (Math.random() < 0.0001) {
        thunder = Math.sin(2 * Math.PI * 50 * i / sampleRate) * 0.8;
      }
      data[i] = rain + thunder;
    }
  }

  async play(soundId: string): Promise<void> {
    if (!this.audioContext || !this.masterGainNode) {
      throw new Error("Audio context not initialized");
    }

    // Resume audio context if suspended
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    // Stop existing source if playing
    this.stop(soundId);

    try {
      const buffer = await this.loadAudioBuffer(soundId);
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = buffer;
      source.loop = true;
      
      source.connect(gainNode);
      gainNode.connect(this.masterGainNode);

      // Set initial volume
      gainNode.gain.setValueAtTime(0.6, this.audioContext.currentTime);

      source.start();

      this.activeSources.set(soundId, source);
      this.gainNodes.set(soundId, gainNode);
    } catch (error) {
      console.error(`Failed to play sound ${soundId}:`, error);
      throw error;
    }
  }

  stop(soundId: string): void {
    const source = this.activeSources.get(soundId);
    if (source) {
      try {
        source.stop();
      } catch (error) {
        // Source might already be stopped
      }
      this.activeSources.delete(soundId);
      this.gainNodes.delete(soundId);
    }
  }

  setVolume(soundId: string, volume: number): void {
    const gainNode = this.gainNodes.get(soundId);
    if (gainNode && this.audioContext) {
      gainNode.gain.setValueAtTime(
        Math.max(0, Math.min(1, volume)),
        this.audioContext.currentTime
      );
    }
  }

  setMasterVolume(volume: number): void {
    if (this.masterGainNode && this.audioContext) {
      this.masterGainNode.gain.setValueAtTime(
        Math.max(0, Math.min(1, volume)),
        this.audioContext.currentTime
      );
    }
  }

  dispose(): void {
    // Stop all active sources
    for (const [soundId] of this.activeSources) {
      this.stop(soundId);
    }

    // Close audio context
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    // Clear all maps
    this.audioBuffers.clear();
    this.activeSources.clear();
    this.gainNodes.clear();
    this.loadingPromises.clear();
  }
}
