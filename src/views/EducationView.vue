<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

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
  <div id="education-page">
    <div id="videobg">
      <video ref="videoRef" class="video-bg" muted loop preload="auto">
        <source src="/video/stats.mp4" type="video/mp4" />
      </video>
    </div>
    
    <button class="back-button" @click="goBack">返回首页</button>
    
    <div class="content">
      <h1>教育经历</h1>
      <div class="card">
        <h2>中国石油大学（北京）</h2>
        <p>
          <strong>专业：</strong>软件工程（本科）<br />
          <strong>时间：</strong>2024年09月 ~ 2028年06月<br />
          <strong>学制：</strong>全日制<br />
          <strong>GPA排名：</strong>前25%<br />
          <strong>主修课程：</strong>Java程序设计、数据库系统、计算机网络等<br />
          <strong>英语：CET-6</strong>  550分通过
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#education-page {
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
  left: 5%;
  transform: translateY(-50%);
  text-align: left;
  color: #ffffff;
  z-index: 10;
  width: 28%;
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

.card h2 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #00ffcc;
}

.card p {
  font-size: 18px;
  line-height: 2;
  text-align: left;
}
</style>
