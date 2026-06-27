<script setup lang="ts">
import { provide } from 'vue'
import MusicPlayer from './components/MusicPlayer.vue'

const songs = [
  { src: '/music/ChangingSeasons.mp3', name: 'Changing Seasons' },
  { src: '/music/ColorYourNight.mp3', name: 'Color Your Night' },
  { src: '/music/WhenTheMoonsReachingOutStars.mp3', name: 'When The Moon\'s Reaching Out Stars' }
]

provide('songs', songs)
</script>

<template>
  <router-view />
  <MusicPlayer :songs="songs" />
</template>

<style scoped>
</style>
