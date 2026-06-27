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
  <div id="about-page">
    <div id="videobg">
      <video ref="videoRef" class="video-bg" muted loop preload="auto">
        <source src="/video/quest.mp4" type="video/mp4" />
      </video>
    </div>
    
    <button class="back-button" @click="goBack">返回首页</button>
    
    <div class="content">
      <h1>个人简介</h1>
      <div class="card">
        <h2>李健豪</h2>
        <p>
          <strong>年龄：</strong>20岁<br />
          <strong>籍贯：</strong>四川泸州<br />
          <strong>方向：</strong>Java后端/全栈开发<br />
        </p>
        <div class="divider"></div>
        <div class="summary">
          <p>1. 具有良好的编程能力和习惯，致力于代码的整体结构规范及优化</p>
          <p>2. 人际沟通能力强，踏实肯干，习惯不断学习新技术</p>
          <p>3. 随时可以入职，每周可实习7天，可连续实习两个月</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#about-page {
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

.divider {
  border-top: 1px solid rgba(0, 255, 204, 0.3);
  margin: 20px 0;
}

.summary p {
  font-size: 16px;
  line-height: 1.8;
  opacity: 0.9;
  margin: 8px 0;
}
</style>
