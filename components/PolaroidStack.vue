<template>
    <div class="polaroid-stack">
        <transition-group name="polaroid-fade">
            <div
                v-for="(img, idx) in visible"
                :key="img.key"
                class="polaroid"
                :style="img.style"
            >
                <img :src="img.src" alt="" />
            </div>
        </transition-group>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const props = defineProps({
    images: {
        type: Array,
        required: true
    }
})
const visible = ref([])
let currentIndex = 0
let keyCounter = 0
let cycleInterval = null
function randomBetween(min, max) {
    return Math.random() * (max - min) + min
}
function randomStyle() {
    const rotate = randomBetween(-10, 10)
    return {
        transform: `rotate(${rotate}deg)`,
        top: '50%',
        left: '50%',
    }
}
function showNext() {
    if (!props.images.length) return
    const src = props.images[currentIndex]
    currentIndex = (currentIndex + 1) % props.images.length
    const entry = {
        key: keyCounter++,
        src,
        style: randomStyle(),
    }
    visible.value.push(entry)
    // keep max 2 on screen at once for a layered look
    if (visible.value.length > 2) {
        visible.value.shift()
    }
}
onMounted(() => {
    showNext()
    cycleInterval = setInterval(showNext, 4200)
})
onBeforeUnmount(() => {
    clearInterval(cycleInterval)
})
</script>
<style scoped>
.polaroid-stack {
    position: relative;
    width: 100%;
    height: 440px;
    overflow: hidden;
}
.polaroid {
    position: absolute;
    width: 340px;
    margin-top: -190px;
    margin-left: -170px;
    background-color: #f4f4f4;
    padding: 18px 18px 50px 18px;
    border-radius: 4px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
}
.polaroid img {
    width: 100%;
    height: 340px;
    object-fit: cover;
    display: block;
}
.polaroid-fade-enter-active {
    transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.polaroid-fade-leave-active {
    transition: opacity 0.8s ease;
    position: absolute;
}
.polaroid-fade-enter-from {
    opacity: 0;
    transform: scale(0.7) rotate(0deg) !important;
}
.polaroid-fade-leave-to {
    opacity: 0;
}

@media (max-width: 768px) {
    .polaroid-stack {
        height: 300px;
    }

    .polaroid {
        width: 220px;
        margin-top: -125px;
        margin-left: -110px;
        padding: 12px 12px 34px 12px;
    }

    .polaroid img {
        height: 220px;
    }
}

@media (max-width: 380px) {
    .polaroid-stack {
        height: 240px;
    }

    .polaroid {
        width: 180px;
        margin-top: -100px;
        margin-left: -90px;
    }

    .polaroid img {
        height: 180px;
    }
}

</style>