<script setup lang="ts">
import { useRouter } from 'vue-router'

const base = import.meta.env.BASE_URL
const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div id="skills-page">
    <div id="videobg">
      <video class="video-bg" muted loop autoplay>
        <source :src="base + 'video/ui2.mp4'" type="video/mp4" />
      </video>
    </div>
    
    <button class="back-button" @click="goBack">返回首页</button>
    
    <div class="content">
      <h1>专业技能</h1>
      <div class="skills-grid">
        <div class="card">
          <h2>Java</h2>
          <p>掌握 Java8-26 新特性，熟悉集合框架、反射、动态代理等核心机制，能运用 Hutool、Lombok 等工具库提高效率</p>
        </div>
        <div class="card">
          <h2>Spring Boot</h2>
          <p>掌握 Spring Boot3 + MyBatis-Plus 独立开发后端项目，熟悉 Spring Cloud 微服务全家桶，能独立完成微服务项目的拆分治理</p>
        </div>
        <div class="card">
          <h2>MySQL</h2>
          <p>熟悉 MySQL 数据库设计和 SQL 调优，实践过分库分表、索引优化，能使用 Druid 进行 SQL 监控和慢查询分析</p>
        </div>
        <div class="card">
          <h2>Redis</h2>
          <p>熟悉 Redis 缓存中间件，实践过 Caffeine 多级缓存架构、分布式锁、缓存雪崩/穿透解决方案、哨兵集群搭建</p>
        </div>
        <div class="card">
          <h2>AI 应用开发</h2>
          <p>熟悉 Spring AI、LangChain4j 等 AI 开发框架，独立开发过涉及 RAG、工具调用、MCP、多 Agent 协作的企业级 AI 智能体应用。掌握 Prompt 工程和优化技巧，掌握 MCP Server 和 Agent Skills 的开发和发布。熟悉 Vibe Coding、SDD、Harness Engineering 等多种 AI 编程模式</p>
        </div>
        <div class="card">
          <h2>Docker + Nginx</h2>
          <p>熟悉 Docker 容器化和 Nginx 反向代理部署，能编写 Dockerfile 打包项目并通过 Serverless 平台快速上线</p>
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
  text-shadow: 0 0 20px rgba(0, 255, 204, 0.8);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  background: rgba(0, 0, 0, 0.6);
  padding: 25px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.card h2 {
  font-size: 22px;
  margin-bottom: 12px;
  color: #00ffcc;
}

.card p {
  font-size: 15px;
  line-height: 1.8;
  text-align: left;
}
</style>
