<script setup lang="ts">
import { useRouter } from 'vue-router'

const videoBase = 'https://github.com/catcatfis/Personal-website/releases/download/v1.0/'
const router = useRouter()

const goBack = () => {
  router.push('/')
}

const skills = [
  {
    title: 'Java',
    desc: '熟悉Java主要版本新特性，熟悉集合框架、反射、动态代理等核心机制，能运用 Hutool、Lombok等工具库提高效率'
  },
  {
    title: 'Spring Boot',
    desc: '掌握Spring Boot3+MyBatis-Plus 独立开发后端项目，熟悉Spring Cloud 微服务组件与项目的拆分治理'
  },
  {
    title: 'MySQL',
    desc: '熟悉MySQL数据库设计和 SQL调优，了解分库分表、索引优化,能使用 Druid 进行 SQL监控和慢查询分析'
  },
  {
    title: 'Redis',
    desc: '熟悉Redis 缓存中间件，了解 Caffeine 多级缓存架构、分布式锁、缓存雪崩/穿透解决方案、哨兵集群搭建'
  },
  {
    title: 'AI 应用开发',
    desc: '熟悉Spring AI、LangChain4j等AI开发框架，个人项目实现了RAG、工具调用、MCP、多 Agent 协作的完整链路、掌握Prompt工程和优化技巧，掌握MCP Server 的封装方式、熟悉多种AI编程模式。熟悉 Vibe Coding、SDD、Harness Engineering 等多种 AI 编程模式'
  },
  {
    title: 'Docker + Nginx',
    desc: '能用 Docker 打包部署项目、Nginx 做反向代理与负载均衡；了解 Serverless 平台部署流程'
  }
]

// 鼠标跟随：记录光标位置（光斑）并根据位置计算 3D 倾斜角度
const onCardMove = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  el.style.setProperty('--mx', `${x}px`)
  el.style.setProperty('--my', `${y}px`)
  el.style.setProperty('--rx', `${((y / rect.height) - 0.5) * -8}deg`)
  el.style.setProperty('--ry', `${((x / rect.width) - 0.5) * 8}deg`)
}

const onCardLeave = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}
</script>

<template>
  <div id="skills-page">
    <div id="videobg">
      <video class="video-bg" muted loop autoplay preload="auto">
        <source :src="videoBase + 'ui2.mp4'" type="video/mp4" />
      </video>
    </div>
    
    <button class="back-button" @click="goBack">返回首页</button>
    
    <div class="content">
      <h1>专业技能</h1>
      <div class="skills-grid">
        <div
          v-for="(skill, i) in skills"
          :key="skill.title"
          class="card"
          :style="{ animationDelay: `${i * 0.12}s` }"
          @mousemove="onCardMove"
          @mouseleave="onCardLeave"
        >
          <h2>{{ skill.title }}</h2>
          <p>{{ skill.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#skills-page {
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
  width: 80%;
}

.content h1 {
  font-size: 36px;
  margin-bottom: 30px;
  background: linear-gradient(90deg, #00ffcc, #9bfff0, #00ffcc);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 12px rgba(0, 255, 204, 0.5));
  animation: title-shine 3s linear infinite;
}

@keyframes title-shine {
  to {
    background-position: 200% center;
  }
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  position: relative;
  padding: 25px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 204, 0.25);
  overflow: hidden;
  cursor: pointer;
  /* 跟随鼠标的 3D 倾斜 + 悬停上浮 */
  transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))
    translateY(var(--lift, 0px));
  transition: transform 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease,
    background 0.3s ease;
  /* 入场动画（backwards 保证延迟期间不可见，且结束后不锁定 transform） */
  animation: card-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

/* 鼠标光斑 */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    220px circle at var(--mx, 50%) var(--my, 50%),
    rgba(0, 255, 204, 0.18),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

/* 扫光 */
.card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.25), transparent);
  transform: skewX(-20deg);
  transition: left 0.6s ease;
  pointer-events: none;
}

.card:hover {
  --lift: -8px;
  border-color: rgba(0, 255, 204, 0.8);
  background: rgba(0, 22, 20, 0.75);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55), 0 0 25px rgba(0, 255, 204, 0.35),
    inset 0 0 30px rgba(0, 255, 204, 0.08);
}

.card:hover::before {
  opacity: 1;
}

.card:hover::after {
  left: 125%;
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.card h2 {
  position: relative;
  display: inline-block;
  font-size: 22px;
  margin-bottom: 18px;
  color: #00ffcc;
  transition: text-shadow 0.3s ease, transform 0.3s ease;
}

/* 标题下划线：悬停时展开 */
.card h2::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -6px;
  width: 30px;
  height: 2px;
  transform: translateX(-50%);
  background: #00ffcc;
  transition: width 0.4s ease, box-shadow 0.4s ease;
}

.card:hover h2 {
  text-shadow: 0 0 15px rgba(0, 255, 204, 0.9);
  transform: translateY(-2px);
}

.card:hover h2::after {
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 255, 204, 0.9);
}

.card p {
  position: relative;
  font-size: 15px;
  line-height: 1.8;
  text-align: left;
}
</style>
