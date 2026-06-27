<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const base = import.meta.env.BASE_URL
const router = useRouter()
const videoRef = ref<HTMLVideoElement | null>(null)

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.play().catch(() => {})
  }
})
</script>

<template>
  <div id="contact-page">
    <div id="videobg">
      <video ref="videoRef" class="video-bg" muted loop preload="auto">
        <source :src="base + 'video/che.mp4'" type="video/mp4" />
      </video>
    </div>
    
    <button class="back-button" @click="goBack">返回首页</button>
    
    <div class="content">
      <h1>联系方式</h1>
      <div class="card">
        <p>
          <strong>电话：</strong>19111900894<br />
          <strong>邮箱：</strong>lbwnb4444@yeah.net<br />
          <strong>GitHub：</strong>https://github.com/catcatfish<br />
          <strong>微信：</strong>coldcodecatfish987
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#contact-page {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

#videobg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.video-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: transparent;
  border: 2px solid #00ffcc;
  color: #00ffcc;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 20;
}

.back-button:hover {
  background: rgba(0, 255, 204, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 204, 0.5);
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffffff;
  z-index: 10;
}

.content h1 {
  font-size: 36px;
  margin-bottom: 20px;
  text-shadow: 0 0 20px rgba(0, 255, 204, 0.8);
}

.card {
  background: rgba(0, 0, 0, 0.6);
  padding: 40px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.card p {
  font-size: 18px;
  line-height: 2.5;
  text-align: left;
}
</style>
