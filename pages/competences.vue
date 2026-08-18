<template>
  <main class="pc-scene">

    <div id="mobile-page-title">
      <h2>_competences</h2>
    </div>

    <div class="pc-rig">

      <div class="monitor">
        <div class="monitor-bezel">
          <div
            class="monitor-screen"
            @wheel.prevent="handleWheel"
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
          >

            <div class="screen-level" :class="levelClass(0)">
              <p class="boot-line font-fira_retina">&gt; competences.os</p>
              <p class="boot-line font-fira_retina blink">&gt; scroll to browse folders_</p>
            </div>

            <div class="screen-level" :class="levelClass(1)">
              <div class="folder-grid">
                <button
                  v-for="cat in categoryNames"
                  :key="cat"
                  class="folder-item"
                  @click="enterFolder(cat)"
                >
                  <div class="folder-icon-wrap" :style="{ backgroundColor: folderColorFor(cat) }">
                    <img :src="folderIconFor(cat)" alt="" class="folder-icon" />
                  </div>
                  <span class="folder-label font-fira_retina">{{ cat }}</span>
                </button>
              </div>
            </div>

            <div class="screen-level" :class="levelClass(2)">
              <div class="apps-header">
                <img src="/icons/arrow.svg" alt="back" class="back-arrow" @click="goBackToFolders" />
                <p class="font-fira_regular text-white text-sm">{{ openFolder }}</p>
              </div>

              <ul v-if="openFolder === 'IA / Data'" class="skill-list">
                <li v-for="skill in config.competences[openFolder]" :key="skill" class="skill-list-item font-fira_retina">
                  {{ skill }}
                </li>
              </ul>

              <div v-else class="apps-grid">
                <div v-for="skill in (openFolder ? config.competences[openFolder] : [])" :key="skill" class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-front">
                      <div class="app-icon-square" :style="{ backgroundColor: skillColor(skill) }">
                        <img v-if="iconFor(skill)" :src="iconFor(skill)" :alt="skill" class="app-icon-img icon-black" />
                        <span v-else class="app-icon-fallback font-fira_bold">{{ initials(skill) }}</span>
                      </div>
                    </div>
                    <div class="flip-back">
                      <span class="flip-back-label font-fira_retina">{{ skill }}</span>
                      <div class="proficiency-dots">
                        <span class="dot" v-for="n in 5" :key="n" :class="{ filled: n <= 4 }"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="monitor-neck"></div>
        <div class="monitor-base"></div>
      </div>

      <div class="desk-row">
        <div class="keyboard">
          <div
            v-for="(key, i) in keyboardKeys"
            :key="i"
            class="key"
            :style="{ backgroundColor: key.color }"
          >
            <img v-if="key.icon" :src="key.icon" :alt="key.label" class="key-icon icon-black" />
            <span v-else class="key-label font-fira_retina">{{ key.label }}</span>
          </div>
        </div>
        <div class="mouse"></div>
      </div>

    </div>

    <p v-if="level > 0" class="scroll-back-hint font-fira_retina text-menu-text text-xs">// scroll up to go back</p>

  </main>
</template>

<script setup>
import { ref } from 'vue'
import DevConfig from '~/developer.json';

const config = ref(DevConfig)
const categoryNames = Object.keys(config.value.competences)

const level = ref(0)
const openFolder = ref(null)
let wheelLock = false
let touchStartY = 0

function handleWheel(e) {
  if (wheelLock) return
  wheelLock = true
  setTimeout(() => { wheelLock = false }, 500)

  if (e.deltaY > 0) {
    goDeeper()
  } else {
    goBack()
  }
}

function handleTouchStart(e) {
  touchStartY = e.touches[0].clientY
}

function handleTouchEnd(e) {
  if (wheelLock) return
  const touchEndY = e.changedTouches[0].clientY
  const diff = touchStartY - touchEndY

  if (Math.abs(diff) < 30) return

  wheelLock = true
  setTimeout(() => { wheelLock = false }, 500)

  if (diff > 0) {
    goDeeper()
  } else {
    goBack()
  }
}

function goDeeper() {
  if (level.value < 2 && (level.value !== 1 || openFolder.value)) {
    level.value += 1
  }
}

function goBack() {
  if (level.value > 0) {
    level.value -= 1
    if (level.value < 2) {
      setTimeout(() => { if (level.value < 2) openFolder.value = null }, 400)
    }
  }
}

function enterFolder(name) {
  openFolder.value = name
  level.value = 2
}

function goBackToFolders() {
  level.value = 1
  setTimeout(() => { openFolder.value = null }, 400)
}

function levelClass(n) {
  if (n === level.value) return 'active'
  if (n < level.value) return 'past'
  return 'future'
}

const folderIconMap = {
  'Langages de programmation': '/images/icons/folder icons/langage-de-programmation.png',
  'Programmation Web': '/images/icons/folder icons/internet.png',
  'Frameworks': '/images/icons/folder icons/decentralized.png',
  'Bases de données': '/images/icons/folder icons/business-intelligence.png',
  'IA / Data': '/images/icons/folder icons/ai.png',
  "Intelligence d'affaires": '/images/icons/folder icons/business-intelligence.png',
  'Méthodologies': '/images/icons/folder icons/agile.png',
  'Gestion de projets': '/images/icons/folder icons/idea.png'
}

function folderIconFor(cat) {
  return folderIconMap[cat] || '/images/icons/folder icons/idea.png'
}

const folderColorMap = {
  'Langages de programmation': '#1D9E75',
  'Programmation Web': '#D85A30',
  'Frameworks': '#7F77DD',
  'Bases de données': '#1D9EC6',
  'IA / Data': '#EF9F27',
  "Intelligence d'affaires": '#378ADD',
  'Méthodologies': '#639922',
  'Gestion de projets': '#D4537E'
}

function folderColorFor(cat) {
  return folderColorMap[cat] || '#4D5BCE'
}

const iconMap = {
  'Python': '/icons/techs/python.svg',
  'Java': '/images/icons/java.png',
  'HTML': '/icons/techs/html.svg',
  'CSS': '/icons/techs/css.svg',
  'JavaScript': '/icons/techs/javascript.svg',
  'Angular': '/icons/techs/angular.svg',
  'Spring Boot': '/icons/techs/springboot.svg',
  'Tableau Public': '/icons/techs/table.svg',
  'Talend': '/icons/techs/talend.svg',
  'Odoo': '/icons/techs/odoo.svg',
  'C': '/images/icons/c.png',
  'C++': '/images/icons/c plus.png',
  'Dart': '/images/icons/dart.png',
  'GitHub': '/images/icons/git.png',
  'Node.js': '/images/icons/node.png',
  'MongoDB': '/images/icons/mongo.png',
  'SQL': '/images/icons/database.png',
  'UML': '/images/icons/uml.png',
  'Agile/Scrum': '/images/icons/jira.png'
}

function iconFor(skill) {
  return iconMap[skill] || null
}

const colorPalette = ['#1D9E75', '#D85A30', '#7F77DD', '#1D9EC6', '#EF9F27', '#378ADD', '#639922', '#D4537E', '#4D5BCE']
function skillColor(skill) {
  let hash = 0
  for (let i = 0; i < skill.length; i++) hash = skill.charCodeAt(i) + ((hash << 5) - hash)
  return colorPalette[Math.abs(hash) % colorPalette.length]
}

function initials(name) {
  return name
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
}

const keyboardKeys = [
  { label: 'PY', icon: '/icons/techs/python.svg', color: '#1D9E75' },
  { label: 'JV', icon: '/images/icons/java.png', color: '#D85A30' },
  { label: 'HTML', icon: '/icons/techs/html.svg', color: '#D4537E' },
  { label: 'CSS', icon: '/icons/techs/css.svg', color: '#378ADD' },
  { label: 'JS', icon: '/icons/techs/javascript.svg', color: '#EF9F27' },
  { label: 'NG', icon: '/icons/techs/angular.svg', color: '#7F77DD' },
  { label: 'SB', icon: '/icons/techs/springboot.svg', color: '#639922' },
  { label: 'SQL', icon: '/images/icons/database.png', color: '#1D9EC6' },
  { label: 'C', icon: '/images/icons/c.png', color: '#4D5BCE' },
  { label: 'C++', icon: '/images/icons/c plus.png', color: '#D4537E' },
  { label: 'MG', icon: '/images/icons/mongo.png', color: '#1D9EC6' },
  { label: 'GIT', icon: '/images/icons/git.png', color: '#D85A30' }
]
</script>

<style scoped>
.pc-scene {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 55%, #101F2E 0%, #010C15 75%);
  padding: 20px;
  overflow-y: auto;
}

.pc-rig {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: rig-fade-in 0.8s ease;
  width: 100%;
}

@keyframes rig-fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.monitor {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.monitor-bezel {
  width: 680px;
  max-width: 90vw;
  aspect-ratio: 16 / 10;
  background-color: #142433;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.55);
  border: 2px solid #1E2D3D;
}

.monitor-screen {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #010C15;
  border-radius: 6px;
  box-shadow: inset 0 0 40px rgba(67, 217, 173, 0.15);
  overflow: hidden;
  touch-action: none;
}

.screen-level {
  position: absolute;
  inset: 0;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(1.2);
  pointer-events: none;
  transition: opacity 0.6s cubic-bezier(0.65, 0, 0.35, 1), transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}

.screen-level.active {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

.screen-level.past {
  opacity: 0;
  transform: scale(0.8);
}

.screen-level.future {
  opacity: 0;
  transform: scale(1.2);
}

.boot-line {
  color: #43D9AD;
  font-size: 15px;
  margin-bottom: 6px;
  align-self: flex-start;
}

.blink {
  animation: blink-cursor 1s steps(2) infinite;
}

@keyframes blink-cursor {
  50% { opacity: 0.3; }
}

.folder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 26px;
  width: 100%;
}

.folder-item {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: folder-pop 0.5s ease backwards;
}

.folder-item:nth-child(1) { animation-delay: 0.05s; }
.folder-item:nth-child(2) { animation-delay: 0.1s; }
.folder-item:nth-child(3) { animation-delay: 0.15s; }
.folder-item:nth-child(4) { animation-delay: 0.2s; }
.folder-item:nth-child(5) { animation-delay: 0.25s; }
.folder-item:nth-child(6) { animation-delay: 0.3s; }
.folder-item:nth-child(7) { animation-delay: 0.35s; }

@keyframes folder-pop {
  from { opacity: 0; transform: scale(0.7) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.folder-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4), 0 0 0px rgba(67, 217, 173, 0);
  animation: led-pulse 3.5s ease-in-out infinite;
}

.folder-item:nth-child(2n) .folder-icon-wrap {
  animation-delay: 0.8s;
}

.folder-item:nth-child(3n) .folder-icon-wrap {
  animation-delay: 1.6s;
}

@keyframes led-pulse {
  0%, 100% {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4), 0 0 0px rgba(67, 217, 173, 0);
  }
  50% {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4), 0 0 18px rgba(67, 217, 173, 0.35);
  }
}

.folder-item:hover .folder-icon-wrap {
  transform: scale(1.12) translateY(-3px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.5), 0 0 24px rgba(67, 217, 173, 0.5);
  animation: none;
}

.folder-icon {
  width: 60%;
  height: 60%;
  object-fit: contain;
}

.folder-label {
  color: #8da9c6;
  font-size: 11px;
  text-align: center;
  line-height: 1.4;
}

.apps-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  width: 100%;
  align-self: flex-start;
}

.back-arrow {
  width: 15px;
  height: 15px;
  transform: rotate(180deg);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.back-arrow:hover {
  opacity: 1;
}

.skill-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skill-list-item {
  background-color: #011221;
  border: 1px solid #1E2D3D;
  border-left: 3px solid #EF9F27;
  border-radius: 6px;
  padding: 10px 14px;
  color: #E5E9F0;
  font-size: 13px;
  animation: folder-pop 0.4s ease backwards;
}

.skill-list-item:nth-child(1) { animation-delay: 0.05s; }
.skill-list-item:nth-child(2) { animation-delay: 0.1s; }
.skill-list-item:nth-child(3) { animation-delay: 0.15s; }
.skill-list-item:nth-child(4) { animation-delay: 0.2s; }
.skill-list-item:nth-child(5) { animation-delay: 0.25s; }

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 18px;
  width: 100%;
}

.flip-card {
  perspective: 600px;
  height: 100px;
  animation: folder-pop 0.4s ease backwards;
}

.flip-card:nth-child(odd) { animation-delay: 0.05s; }
.flip-card:nth-child(even) { animation-delay: 0.1s; }

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner,
.flip-card:active .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-front, .flip-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.flip-front {
  border: 1px solid #263B50;
  box-shadow: 0 0 0px rgba(67, 217, 173, 0);
  animation: led-pulse-card 4s ease-in-out infinite;
}

.flip-card:nth-child(2n) .flip-front {
  animation-delay: 1s;
}

.flip-card:nth-child(3n) .flip-front {
  animation-delay: 2s;
}

@keyframes led-pulse-card {
  0%, 100% {
    box-shadow: 0 0 0px rgba(67, 217, 173, 0);
  }
  50% {
    box-shadow: 0 0 14px rgba(67, 217, 173, 0.3);
  }
}

.app-icon-square {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-icon-img {
  width: 40%;
  height: 40%;
  object-fit: contain;
}

.icon-black {
  filter: brightness(0);
}

.app-icon-fallback {
  color: white;
  font-size: 14px;
}

.flip-back {
  background-color: #011221;
  border: 1px solid #43D9AD;
  transform: rotateY(180deg);
  padding: 8px;
  gap: 6px;
}

.flip-back-label {
  color: #E5E9F0;
  font-size: 11px;
  text-align: center;
  line-height: 1.3;
}

.proficiency-dots {
  display: flex;
  gap: 3px;
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #1E2D3D;
}

.dot.filled {
  background-color: #43D9AD;
}

.monitor-neck {
  width: 28px;
  height: 26px;
  background-color: #1E2D3D;
}

.monitor-base {
  width: 130px;
  height: 12px;
  background-color: #1E2D3D;
  border-radius: 4px;
}

.desk-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 36px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.keyboard {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  background-color: #142433;
  border: 1px solid #1E2D3D;
  border-radius: 10px;
  padding: 14px;
}

.key {
  width: 46px;
  height: 46px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  animation: key-glow 5s ease-in-out infinite;
}

.key:nth-child(2n) {
  animation-delay: 1.2s;
}

.key:nth-child(3n) {
  animation-delay: 2.4s;
}

.key:nth-child(4n) {
  animation-delay: 3.6s;
}

@keyframes key-glow {
  0%, 100% {
    box-shadow: 0 0 0px rgba(255, 255, 255, 0);
  }
  50% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.25);
  }
}

.key:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.key-icon {
  width: 40%;
  height: 40%;
  object-fit: contain;
}

.key-label {
  color: white;
  font-size: 10px;
}

.mouse {
  width: 30px;
  height: 48px;
  background-color: #142433;
  border: 1px solid #1E2D3D;
  border-radius: 15px 15px 10px 10px;
}

.scroll-back-hint {
  margin-top: 14px;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .pc-scene {
    padding: 14px;
  }

  .monitor-bezel {
    width: 94vw;
    padding: 12px;
  }

  .screen-level {
    padding: 16px;
  }

  .boot-line {
    font-size: 12px;
  }

  .folder-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .folder-icon-wrap {
    width: 46px;
    height: 46px;
    border-radius: 10px;
  }

  .folder-label {
    font-size: 9px;
  }

  .apps-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .flip-card {
    height: 74px;
  }

  .flip-back-label {
    font-size: 9px;
  }

  .keyboard {
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    padding: 10px;
  }

  .key {
    width: 32px;
    height: 32px;
  }

  .key-label {
    font-size: 8px;
  }

  .mouse {
    width: 22px;
    height: 36px;
  }

  .desk-row {
    gap: 20px;
    margin-top: 16px;
  }
}

@media (max-width: 420px) {
  .monitor-bezel {
    aspect-ratio: 4 / 3.6;
  }

  .folder-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .apps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>