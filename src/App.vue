<script setup lang="ts">
import { provide, onMounted } from 'vue'
import MusicPlayer from './components/MusicPlayer.vue'

const base = import.meta.env.BASE_URL
const songs = [
  { src: base + 'music/ChangingSeasons.mp3', name: 'Changing Seasons' },
  { src: base + 'music/ColorYourNight.mp3', name: 'Color Your Night' },
  { src: base + 'music/WhenTheMoonsReachingOutStars.mp3', name: 'When The Moon\'s Reaching Out Stars' }
]

provide('songs', songs)

// 用隐藏的 video 元素预加载首页视频
const videoBase = 'https://github.com/catcatfis/Personal-website/releases/download/v1.0/'
const preloadVideos = () => {
  ;['fv_movie1.mp4', 'fv_movie2.mp4'].forEach(name => {
    const v = document.createElement('video')
    v.src = videoBase + name
    v.preload = 'auto'
    v.muted = true
    v.style.display = 'none'
    document.body.appendChild(v)
  })
}

onMounted(() => {
  preloadVideos()
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :max="6">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <MusicPlayer :songs="songs" />
</template>

<style scoped>
</style>
