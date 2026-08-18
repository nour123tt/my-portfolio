<template>
    <div class="orbit-wrapper">
        <div class="orbit-scene">

            <div class="hub" :class="{ dim: focused }">
                <span class="hub-text font-fira_retina">competences</span>
            </div>

            <div
                v-for="(ring, ringIndex) in rings"
                :key="ringIndex"
                class="ring"
                :style="ringStyle(ringIndex)"
                :class="{ paused: focused }"
            >
                <button
                    v-for="(skill, i) in ring.skills"
                    :key="skill.name"
                    class="node"
                    :style="nodeStyle(ring, i)"
                    :class="{ active: focused && focused.name === skill.name }"
                    @click.stop="toggleFocus(skill, ring.category)"
                >
                    <span class="node-face">
                        <img v-if="skill.icon" :src="skill.icon" :alt="skill.name" class="node-icon" />
                        <span v-else class="node-fallback font-fira_retina">{{ initials(skill.name) }}</span>
                    </span>
                </button>
            </div>

        </div>

        <transition name="fade-up">
            <div v-if="focused" class="focus-panel" @click.stop>
                <p class="font-fira_retina text-menu-text text-xs mb-1">// {{ focused.category }}</p>
                <p class="font-fira_bold text-white text-lg">{{ focused.name }}</p>
                <button class="close-focus" @click="focused = null">
                    <img src="/icons/close.svg" alt="close" class="w-4 h-4">
                </button>
            </div>
        </transition>

        <div v-if="!focused" class="orbit-hint font-fira_retina text-menu-text text-sm">
            // click a node to focus
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    categories: {
        type: Object,
        required: true
    }
})

const focused = ref(null)

function toggleFocus(skill, category) {
    if (focused.value && focused.value.name === skill.name) {
        focused.value = null
    } else {
        focused.value = { name: skill.name, category }
    }
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

const iconMap = {
    'Python': '/icons/techs/python.svg',
    'Java': '/icons/techs/java.svg',
    'HTML': '/icons/techs/html.svg',
    'CSS': '/icons/techs/css.svg',
    'JavaScript': '/icons/techs/javascript.svg',
    'Angular': '/icons/techs/angular.svg',
    'Spring Boot': '/icons/techs/springboot.svg',
    'Tableau Public': '/icons/techs/table.svg'
}

const ringConfigs = [
    { radiusX: 210, radiusY: 90, tiltDeg: 62, duration: 55, direction: 1 },
    { radiusX: 300, radiusY: 130, tiltDeg: 58, duration: 75, direction: -1 },
    { radiusX: 385, radiusY: 165, tiltDeg: 64, duration: 95, direction: 1 }
]

const rings = computed(() => {
    const catNames = Object.keys(props.categories)
    const buckets = [[], [], []]
    catNames.forEach((name, i) => buckets[i % 3].push(name))

    return buckets.map((catGroup, ringIndex) => {
        const skills = []
        catGroup.forEach(catName => {
            props.categories[catName].forEach(skillName => {
                skills.push({
                    name: skillName,
                    icon: iconMap[skillName] || null
                })
            })
        })
        return {
            category: catGroup.join(' / '),
            skills,
            ...ringConfigs[ringIndex]
        }
    })
})

function ringStyle(ringIndex) {
    const cfg = ringConfigs[ringIndex]
    return {
        '--tilt': cfg.tiltDeg + 'deg',
        '--duration': cfg.duration + 's',
        '--direction': cfg.direction === 1 ? 'normal' : 'reverse'
    }
}

function nodeStyle(ring, i) {
    const angle = (360 / ring.skills.length) * i
    return {
        '--angle': angle + 'deg',
        '--rx': ring.radiusX + 'px',
        '--ry': ring.radiusY + 'px'
    }
}
</script>

<style scoped>
.orbit-wrapper {
    width: 100%;
    min-height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    perspective: 1600px;
}

.orbit-scene {
    position: relative;
    width: 1px;
    height: 1px;
    transform-style: preserve-3d;
}

.hub {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #0f3d33, #010C15 70%);
    border: 2px solid #43D9AD;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 50px rgba(67, 217, 173, 0.5), inset 0 0 30px rgba(67, 217, 173, 0.15);
    z-index: 10;
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.hub.dim {
    opacity: 0.35;
    transform: translate3d(-50%, -50%, 0) scale(0.9);
}

.hub-text {
    color: #43D9AD;
    font-size: 13px;
    text-align: center;
}

.ring {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1px;
    height: 1px;
    transform-style: preserve-3d;
    transform: translate3d(-50%, -50%, 0) rotateX(var(--tilt));
    animation: ring-spin var(--duration) linear infinite;
    animation-direction: var(--direction);
}

.ring.paused {
    animation-play-state: paused;
}

@keyframes ring-spin {
    from { transform: translate3d(-50%, -50%, 0) rotateX(var(--tilt)) rotateZ(0deg); }
    to { transform: translate3d(-50%, -50%, 0) rotateX(var(--tilt)) rotateZ(360deg); }
}

.node {
    position: absolute;
    top: 0;
    left: 0;
    width: 54px;
    height: 54px;
    margin: -27px 0 0 -27px;
    border-radius: 50%;
    background-color: #011221;
    border: 1.5px solid #1E2D3D;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    transform:
        rotateZ(var(--angle))
        translate3d(var(--rx), 0, 0)
        rotateZ(calc(-1 * var(--angle)));
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease, opacity 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.node:hover {
    border-color: #607B96;
    z-index: 6;
}

.node.active {
    border-color: #43D9AD;
    box-shadow: 0 0 22px rgba(67, 217, 173, 0.7);
    z-index: 7;
}

.node-face {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.node-icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.node-fallback {
    color: #607B96;
    font-size: 11px;
}

.node.active .node-fallback {
    color: #43D9AD;
}

.orbit-hint {
    margin-top: 10px;
    opacity: 0.6;
    position: relative;
    z-index: 2;
}

.focus-panel {
    position: relative;
    margin-top: 10px;
    background-color: #011221;
    border: 1px solid #43D9AD;
    border-radius: 12px;
    padding: 20px 28px;
    min-width: 240px;
    text-align: center;
    box-shadow: 0 0 30px rgba(67, 217, 173, 0.25);
    z-index: 2;
}

.close-focus {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.6;
}

.close-focus:hover {
    opacity: 1;
}

.fade-up-enter-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-up-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

@media (max-width: 900px) {
    .orbit-wrapper {
        min-height: 600px;
        perspective: 1000px;
    }
    .hub {
        width: 100px;
        height: 100px;
    }
    .node {
        width: 42px;
        height: 42px;
        margin: -21px 0 0 -21px;
    }
    .node-face {
        width: 22px;
        height: 22px;
    }
}
</style>