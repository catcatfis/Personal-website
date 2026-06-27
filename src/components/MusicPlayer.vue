<script setup lang="ts">import { ref, onMounted, watch } from 'vue';
interface Song {
 src: string;
 name: string;
}
const props = defineProps<{
 songs: Song[];
}>();
const audioRef = ref<HTMLAudioElement | null>(null);
const currentSongIndex = ref(0);
const isPlaying = ref(false);
const currentTime = ref(0);
const loadCurrentSong = () => {
  if (audioRef.value) {
    audioRef.value.src = props.songs[currentSongIndex.value].src;
    audioRef.value.currentTime = currentTime.value;
    if (isPlaying.value) {
      audioRef.value.play().catch(() => {
        isPlaying.value = false;
        localStorage.setItem('isPlaying', 'false');
      });
    }
  }
};
const togglePlay = () => {
  if (audioRef.value) {
    if (isPlaying.value) {
      audioRef.value.pause();
      isPlaying.value = false;
    } else {
      audioRef.value.play().then(() => {
        isPlaying.value = true;
      }).catch(() => {
        isPlaying.value = false;
      });
    }
    localStorage.setItem('isPlaying', String(isPlaying.value));
  }
};
const nextSong = () => {
 currentSongIndex.value = (currentSongIndex.value + 1) % props.songs.length;
 currentTime.value = 0;
 localStorage.setItem('currentSong', String(currentSongIndex.value));
 localStorage.setItem('musicTime', '0');
 loadCurrentSong();
};
const handleEnded = () => {
 nextSong();
};
const handleTimeUpdate = () => {
 if (audioRef.value) {
 currentTime.value = audioRef.value.currentTime;
 localStorage.setItem('musicTime', String(currentTime.value));
 }
};
onMounted(() => {
 const savedSong = localStorage.getItem('currentSong');
 const savedPlaying = localStorage.getItem('isPlaying') === 'true';
 const savedTime = localStorage.getItem('musicTime');
 if (savedSong !== null) {
 currentSongIndex.value = parseInt(savedSong, 10);
 }
 if (savedTime !== null) {
 currentTime.value = parseFloat(savedTime);
 }
 isPlaying.value = savedPlaying;
 loadCurrentSong();
});
watch(currentSongIndex, () => {
 localStorage.setItem('currentSong', String(currentSongIndex.value));
});
</script>

<template>
  <div id="music-control">
    <button id="music-btn" :class="{ playing: isPlaying }" @click="togglePlay">
      {{ isPlaying ? '⏸' : '▶' }}
    </button>
    <button id="next-btn" @click="nextSong">⏭</button>
    <span id="song-info">{{ songs[currentSongIndex].name }}</span>
  </div>
  <audio ref="audioRef" @ended="handleEnded" @timeupdate="handleTimeUpdate" />
</template>

<style scoped>
#music-control {
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
}

#music-btn {
  background: transparent;
  border: 2px solid #00ffcc;
  color: #00ffcc;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

#music-btn:hover {
  background: rgba(0, 255, 204, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 204, 0.5);
}

#music-btn.playing {
  border-color: #ff6b9d;
  color: #ff6b9d;
  animation: pulse 1s ease-in-out infinite;
}

#next-btn {
  background: transparent;
  border: 2px solid #00ffcc;
  color: #00ffcc;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

#next-btn:hover {
  background: rgba(0, 255, 204, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 204, 0.5);
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 5px rgba(255, 107, 157, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 107, 157, 0.8); }
}

#song-info {
  color: #ffffff;
  font-size: 14px;
  opacity: 0.8;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
