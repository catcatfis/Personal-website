<script setup lang="ts">
import { provide } from 'vue'
import MusicPlayer from './components/MusicPlayer.vue'

const base = import.meta.env.BASE_URL
const songs = [
  { src: base + 'music/ChangingSeasons.mp3', name: 'Changing Seasons' },
  { src: base + 'music/ColorYourNight.mp3', name: 'Color Your Night' },
  { src: base + 'music/WhenTheMoonsReachingOutStars.mp3', name: 'When The Moon\'s Reaching Out Stars' }
]

provide('songs', songs)
</script>

<template>
  <router-view />
  <MusicPlayer :songs="songs" />
</template>

<style scoped>
</style>
