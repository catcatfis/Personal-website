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
          <h2>基于 Spring AI 的多场景 AI 智能体应用平台</h2>
          <div class="tech-stack">
            <span class="tag">Spring Boot 3</span>
            <span class="tag">Spring AI 1.0</span>
            <span class="tag">Spring AI Alibaba</span>
            <span class="tag">RAG / PGVector</span>
            <span class="tag">Tool Calling</span>
            <span class="tag">MCP</span>
            <span class="tag">SSE</span>
            <span class="tag">Kryo</span>
          </div>
          <ul class="highlights">
            <li>基于 Spring Boot 3 + Spring AI 搭建多场景 AI 智能体应用平台，统一封装 ChatClient + Advisor 扩展点，落地恋爱咨询、旅行规划两个业务场景，均支持多轮对话、SSE 流式输出与结构化输出，各场景知识库、工具集、会话记忆相互隔离，形成可复用的场景接入模式</li>
            <li>参考 OpenManus 自主实现 ReAct 智能体框架：BaseAgent（状态机 + 步数上限 + SSE 逐步推送）→ ReActAgent（think/act 抽象）→ ToolCallAgent 三层继承结构，支持 20 步"思考—行动"循环，复用联网搜索、网页抓取、文件读写、PDF 生成等 7 类工具，完成"搜索目的地 → 抓取攻略 → 生成行程 PDF"的多步串联任务；Agent 采用按请求实例化的并发安全设计</li>
            <li>自研图片搜索 MCP Server（WebMVC 模式，@Tool 封装 Pexels API）并独立进程部署，主应用以 MCP Client 接入，实现报告生成时自动检索配图，实践大模型与外部服务的标准化解耦调用协议</li>
            <li>RAG 全链路：自定义文档切分 + LLM 关键词元信息增强，Embedding 后写入 PGVector 向量库；检索侧调优相似度阈值与 TopK，结合查询重写与上下文增强 Advisor 提升召回质量；双业务知识库通过独立 Advisor 工厂实现隔离检索</li>
            <li>对话记忆持久化：基于 MessageChatMemoryAdvisor + 滑动窗口（20 条）实现多轮对话记忆；自主实现文件版 ChatMemoryRepository，采用 Kryo 二进制序列化按会话 ID 持久化历史消息，解决服务重启后记忆丢失问题</li>
          </ul>
        </div>

        <div class="card">
          <h2>仿微信智能即时通讯系统（评聊）</h2>
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
            <li>基于 Spring Boot + Netty 实现仿微信即时通讯系统，支持实时单聊、群聊、在线状态管理等功能；独立设计 WS 服务层，与业务 HTTP 端口分离（8090/8080）</li>
            <li>基于 ConcurrentHashMap 构建 channel ↔ uid 双向索引会话表，支持同一用户多端在线；推送任务统一投递线程池，避免阻塞 Netty EventLoop，支持万级并发连接</li>
            <li>对接微信公众平台网页授权（snsapi_userinfo），实现带参临时二维码生成 → 扫码事件回调 → OAuth2 授权换取用户信息 → Token 签发 → WebSocket 用户绑定的完整闭环</li>
            <li>登录态并发治理：针对分布式环境下 Token 签发的 read-modify-write 竞态，基于 Redisson 分布式锁（按 uid 粒度串行化）+ SET NX 原子写保障同一用户 Token 唯一，并补充锁超时降级复用逻辑</li>
            <li>RocketMQ 异步消息管道：将消息写扩散、群成员推送、系统通知从主链路剥离，接口仅做落库与事件投递；基于事务同步 + 失败指数退避重试保障消息投递；通过广播模式让各实例仅推送本地连接，支撑水平扩展</li>
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
