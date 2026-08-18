<template>
  <main class="cert-page">

    <div id="mobile-page-title">
      <h2>_certificates</h2>
    </div>

    <div class="board-frame">
      <div class="corkboard">
        <div
          v-for="cert in allCertsWithPositions"
          :key="cert.title"
          class="pinned-card"
          :style="cert.style"
          @click="flipped[cert.title] = !flipped[cert.title]"
        >
          <div class="pin"></div>
          <div class="card-inner" :class="{ flipped: flipped[cert.title] }">

            <div class="card-front">
              <img v-if="cert.image" :src="cert.image" alt="" class="card-image" />
              <div v-else class="card-image-fallback">
                <span class="font-fira_bold">{{ initials(cert.title) }}</span>
              </div>
              <div class="card-tag font-fira_retina" :style="{ backgroundColor: platformColor(cert.platform) }">
                {{ cert.platform }}
              </div>
            </div>

            <div class="card-back">
              <p class="card-back-platform font-fira_retina">// {{ cert.platform }}</p>
              <p class="card-back-title font-fira_bold">{{ cert.title }}</p>
            </div>

          </div>
        </div>
      </div>
    </div>

    <p class="hint font-fira_retina text-menu-text text-sm">// click a card to flip it</p>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import DevConfig from '~/developer.json';

const config = ref(DevConfig)
const flipped = ref({})

const rotations = [-3, 2, -2, 4, -4, 2, -3, 3, -2, 3, -3, 4]
const wiggleDurations = [7, 9, 8, 10, 7.5, 9.5, 8.5, 10.5, 7, 9, 8, 10]

const allCertsWithPositions = computed(() => {
  return config.value.certificates.map((cert, i) => ({
    ...cert,
    baseRotation: rotations[i % rotations.length],
    style: {
      '--base-rot': rotations[i % rotations.length] + 'deg',
      '--wiggle-dur': wiggleDurations[i % wiggleDurations.length] + 's',
      animationDelay: (i * 0.06) + 's'
    }
  }))
})

const platformColorMap = {
  'Coursera': '#378ADD',
  'Microsoft': '#639922',
  'NVIDIA': '#639922',
  '365 Data Science': '#7F77DD',
  'Udemy': '#D4537E',
  'IT Specialist': '#EF9F27'
}

function platformColor(platform) {
  return platformColorMap[platform] || '#4D5BCE'
}

function initials(title) {
  return title
    .replace(/[^\p{L}\s]/gu, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
}
</script>

<style scoped>
.cert-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 30px;
  width: 100%;
  min-height: 100%;
  overflow-y: auto;
  background: radial-gradient(circle at 50% 20%, #101F2E 0%, #010C15 70%);
}

.board-frame {
  max-width: 1100px;
  width: 100%;
  padding: 24px;
  border-radius: 8px;
  background: linear-gradient(155deg, #6b4a2e, #4a3018);
  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.6),
    inset 0 0 0 6px #3a2716,
    inset 0 0 0 8px #7a5638;
}

.corkboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 44px 32px;
  padding: 30px;
  border-radius: 4px;
  background:
    repeating-linear-gradient(45deg, #3a2f1f 0px, #3a2f1f 2px, #35291a 2px, #35291a 4px);
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.5);
}

.pinned-card {
  position: relative;
  cursor: pointer;
  transform: rotate(var(--base-rot));
  animation:
    card-drop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards,
    card-wiggle var(--wiggle-dur) ease-in-out infinite 0.6s;
  transition: transform 0.2s ease;
}

.pinned-card:hover {
  animation-play-state: running, paused;
  transform: rotate(0deg) scale(1.05) !important;
  z-index: 5;
}

@keyframes card-drop {
  from { opacity: 0; transform: translateY(-30px) rotate(0deg); }
  to { opacity: 1; transform: translateY(0) rotate(var(--base-rot)); }
}

@keyframes card-wiggle {
  0%, 100% { transform: rotate(var(--base-rot)); }
  50% { transform: rotate(calc(var(--base-rot) * -1)); }
}

.pin {
  position: absolute;
  top: -9px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #ff8a7a, #b8392a 70%);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  z-index: 3;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 230px;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

.card-front {
  background-color: #f4f0e8;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #ffffff;
}

.card-image-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #e8e2d4, #d8d0bc);
  color: #3a2f1f;
  font-size: 22px;
}

.card-tag {
  position: absolute;
  bottom: 8px;
  left: 8px;
  padding: 4px 10px;
  border-radius: 4px;
  color: white;
  font-size: 10px;
}

.card-back {
  background-color: #f4f0e8;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 18px;
}

.card-back-platform {
  color: #8a7d5f;
  font-size: 11px;
  margin-bottom: 8px;
}

.card-back-title {
  color: #2a2214;
  font-size: 14px;
  line-height: 1.5;
}

.hint {
  margin-top: 24px;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .cert-page {
    padding: 30px 14px;
  }

  .board-frame {
    padding: 14px;
    border-radius: 6px;
    box-shadow:
      0 15px 40px rgba(0, 0, 0, 0.55),
      inset 0 0 0 4px #3a2716,
      inset 0 0 0 6px #7a5638;
  }

  .corkboard {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px 14px;
    padding: 18px;
  }

  .pin {
    width: 12px;
    height: 12px;
    top: -7px;
  }

  .card-inner {
    height: 160px;
  }

  .card-tag {
    font-size: 8px;
    padding: 3px 7px;
    bottom: 5px;
    left: 5px;
  }

  .card-back {
    padding: 12px;
  }

  .card-back-platform {
    font-size: 9px;
    margin-bottom: 5px;
  }

  .card-back-title {
    font-size: 11px;
    line-height: 1.4;
  }

  .pinned-card:hover {
    transform: rotate(var(--base-rot)) !important;
  }

  .hint {
    font-size: 12px;
    margin-top: 16px;
    text-align: center;
  }
}

@media (max-width: 380px) {
  .corkboard {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .card-inner {
    height: 180px;
  }
}
</style>