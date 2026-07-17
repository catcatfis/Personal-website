<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const videoBase = 'https://github.com/catcatfis/Personal-website/releases/download/v1.0/'
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
  <div id="works-page">
    <video ref="videoRef" class="video-bg" muted loop autoplay preload="auto">
      <source :src="videoBase + 'equ1.mp4'" type="video/mp4" />
    </video>
    
    <button class="back-button" @click="goBack">返回首页</button>
    
    <div class="content">
      <h1>个人作品</h1>
      <div class="cards-wrapper">
        <div class="card">
          <h2>MallChat 即时通讯系统</h2>
          <div class="tech-stack">
            <span class="tag">Spring Boot</span>
            <span class="tag">Netty</span>
            <span class="tag">Vue 3</span>
            <span class="tag">MySQL</span>
            <span class="tag">Redis</span>
            <span class="tag">Redisson</span>
            <span class="tag">RocketMQ</span>
          </div>
          <ul class="highlights">
            <li>基于 Spring Boot + Netty 实现仿微信即时通讯系统，支持实时单聊、群聊、在线状态管理等功能</li>
            <li>独立设计 Netty WebSocket 服务层，通过 ChannelGroup 管理长连接，实现消息的精准推送与广播，支持万级并发连接</li>
            <li>集成 Redis + Redisson 分布式锁解决用户登录态并发问题，采用 Redis 缓存热点数据</li>
            <li>对接微信开放平台 OAuth2.0 实现扫码登录，完成授权回调、Token 签发、WebSocket 用户绑定的完整链路</li>
            <li>引入 RocketMQ 消息队列异步处理消息广播与系统通知，降低接口响应耗时</li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
#works-page {
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  z-index: 10;
  overflow-y: auto;
  padding: 80px 15% 40px;
  box-sizing: border-box;
}

.content h1 {
  font-size: 36px;
  margin-bottom: 20px;
  text-shadow: 0 0 20px rgba(0, 255, 204, 0.8);
}

.cards-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: rgba(0, 0, 0, 0.6);
  padding: 40px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  text-align: left;
  width: 100%;
  box-sizing: border-box;
}

.card h2 {
  font-size: 28px;
  margin-bottom: 15px;
  color: #00ffcc;
}

.tech-stack {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tag {
  background: rgba(0, 255, 204, 0.15);
  border: 1px solid rgba(0, 255, 204, 0.4);
  color: #00ffcc;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.arch {
  font-size: 16px;
  margin-bottom: 18px;
  opacity: 0.9;
}

.highlights {
  list-style: none;
  padding: 0;
}

.highlights li {
  font-size: 15px;
  line-height: 1.8;
  padding: 6px 0;
  padding-left: 20px;
  position: relative;
  opacity: 0.9;
}

.highlights li::before {
  content: '>';
  position: absolute;
  left: 0;
  color: #00ffcc;
}
</style>
