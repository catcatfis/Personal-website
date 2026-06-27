<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const base = import.meta.env.BASE_URL
const router = useRouter()
const video1Ref = ref<HTMLVideoElement | null>(null)
const video2Ref = ref<HTMLVideoElement | null>(null)
const startwavesRef = ref<HTMLDivElement | null>(null)
const showWaves = ref(true)
const showCenterText = ref(true)

const navItems = [
  { name: '个人简介', path: '/about' },
  { name: '教育经历', path: '/education' },
  { name: '专业技能', path: '/skills' },
  { name: '个人作品', path: '/works' },
  { name: '联系方式', path: '/contact' }
]

const navigateTo = (path: string) => {
  sessionStorage.setItem('homeVisited', 'true')
  router.push(path)
}

const startVideo = () => {
  if (video1Ref.value) {
    video1Ref.value.play().catch(() => {})
    video1Ref.value.addEventListener('ended', () => {
      if (video1Ref.value) video1Ref.value.style.display = 'none'
      if (video2Ref.value) {
        video2Ref.value.play().catch(() => {})
      }
    })
  }
}

onMounted(async () => {
  // 从其他页面返回首页时直接跳过 waves 动画
  if (sessionStorage.getItem('homeVisited') === 'true') {
    showWaves.value = false
    showCenterText.value = false
    await nextTick()
    startVideo()
    return
  }

  await nextTick()

  if (startwavesRef.value) {
    startwavesRef.value.addEventListener('animationend', () => {
      showWaves.value = false
      startVideo()
    }, { once: true })
  }
})
</script>

<template>
  <div id="home-page">
    <div v-if="showWaves" ref="startwavesRef" id="startwaves">
      <div class="waves">
        <img :src="base + 'img/waves/wave-1.svg'" />
        <img :src="base + 'img/waves/wave-2.svg'" />
        <img :src="base + 'img/waves/wave-3.svg'" />
        <img :src="base + 'img/waves/wave-4.svg'" />
        <img :src="base + 'img/waves/wave-5.svg'" id="shape" />
      </div>
    </div>

    <div id="videobg">
      <video ref="video2Ref" class="video-bg" muted loop preload="auto">
        <source :src="base + 'assset/fv_movie2.mp4'" type="video/mp4" />
      </video>
      <video ref="video1Ref" class="video-bg" muted preload="auto">
        <source :src="base + 'assset/fv_movie1.mp4'" type="video/mp4" />
      </video>

      <div v-if="showCenterText" id="centertext">
        <h1>李健豪的个人网站</h1>
        <p>中国石油大学(北京)<br />软件工程<br />2028届</p>
      </div>

      <div id="button-list">
        <button
          v-for="item in navItems"
          :key="item.path"
          class="nav-button"
          @click="navigateTo(item.path)"
        >
          {{ item.name }}
        </button>
      </div>

      <div id="footer-text">李健豪的个人网站</div>
    </div>
  </div>
</template>

<style scoped>
#home-page {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* ===== 波浪开场动画（参考 P3RE）===== */
#startwaves {
  position: fixed;
  display: flex;
  justify-content: center;
  height: 120vh;
  width: 100%;
  background-color: #469ce5;
  transform: translateY(-10vh);
  animation-name: down;
  animation-duration: 3s;
  animation-delay: 1s;
  animation-timing-function: ease-out;
  z-index: 999;
}

@keyframes down {
  0% {
    transform: translateY(-10vh);
  }
  100% {
    transform: translateY(110vh);
  }
}

.waves {
  display: block;
  position: absolute;
  bottom: 120vh;
  width: 100%;
}

.waves img:not(#shape) {
  position: absolute;
  left: 0;
}

.waves img:nth-child(1) {
  opacity: 0.8;
  bottom: -0.1vw;
  animation: move-1 5s infinite;
}

@keyframes move-1 {
  50% {
    transform: translateY(35px);
  }
}

.waves img:nth-child(2) {
  opacity: 0.7;
  bottom: 0.5vw;
  animation: move-2 4s infinite;
}

@keyframes move-2 {
  50% {
    transform: translateY(25px);
  }
}

.waves img:nth-child(3) {
  bottom: 0.3vw;
  opacity: 0.6;
  animation: move-3 3.5s infinite;
}

@keyframes move-3 {
  50% {
    transform: translateY(20px);
  }
}

.waves img:nth-child(4) {
  bottom: 0.1vw;
  opacity: 0.5;
  animation: move-4 3s infinite;
}

@keyframes move-4 {
  50% {
    transform: translateY(20px);
  }
}

#shape {
  position: absolute;
  left: 0;
  bottom: -1vw;
}

/* ===== 视频背景 ===== */
#videobg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.video-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

/* ===== 中心文字 ===== */
#centertext {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffffff;
  z-index: 10;
  animation-name: out;
  animation-duration: 1.5s;
  animation-delay: 3s;
  animation-fill-mode: forwards;
}

@keyframes out {
  100% {
    opacity: 0;
    display: none;
  }
}

#centertext h1 {
  font-size: 48px;
  text-shadow: 0 0 20px rgba(0, 255, 204, 0.8);
  margin-bottom: 20px;
}

#centertext p {
  font-size: 20px;
  line-height: 1.8;
  opacity: 0.9;
}

/* ===== 导航按钮 ===== */
#button-list {
  position: absolute;
  right: 8%;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  z-index: 10;
  animation-name: in;
  animation-duration: 1.5s;
  animation-delay: 4s;
  animation-fill-mode: forwards;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@keyframes in {
  100% {
    opacity: 1;
  }
}

.nav-button {
  background: transparent;
  border: none;
  color: #00ffcc;
  font-size: 32px;
  cursor: pointer;
  text-align: right;
  padding: 16px 36px;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
  position: relative;
  display: inline-block;
  letter-spacing: 2px;
}

.nav-button:hover {
  color: #000000;
  text-shadow: none;
}

.nav-button:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: -1;
  clip-path: polygon(-15px 50%, 0 0, 100% 0, 100% 100%, 0 100%);
  filter: drop-shadow(4px 0 15px rgba(255, 105, 180, 0.8));
}

/* ===== 底部文字 ===== */
#footer-text {
  position: absolute;
  right: 20px;
  bottom: 20px;
  color: #ffffff;
  font-size: 40px;
  opacity: 0;
  z-index: 10;
  animation-name: in;
  animation-duration: 1.5s;
  animation-delay: 4s;
  animation-fill-mode: forwards;
}
</style>
