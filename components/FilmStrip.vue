<template>
    <div class="filmstrip-wrapper" @touchstart="pauseOnTouch" @touchend="resumeAfterTouch">
        <div class="filmstrip-track" :class="{ paused: touchPaused }" :style="{ animationDuration: scrollDuration + 's' }">
            <div class="sprocket-row top">
                <span v-for="n in sprocketCount" :key="'t' + n" class="hole"></span>
            </div>
            <div class="frames">
                <!-- render the items twice, back to back, for a seamless infinite loop -->
                <div v-for="(item, index) in loopedItems" :key="index" class="frame">
                    <div class="frame-image">
                        <img :src="item.image" :alt="item.label" />
                    </div>
                    <div class="frame-caption font-fira_retina">
                        <span class="hl-comment">// {{ item.label }}</span>
                    </div>
                </div>
            </div>
            <div class="sprocket-row bottom">
                <span v-for="n in sprocketCount" :key="'b' + n" class="hole"></span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
    items: {
        type: Array,
        required: true
    }
})
// duplicate the list so the CSS animation can loop seamlessly (scrolls exactly one set-width, then resets invisibly)
const loopedItems = computed(() => [...props.items, ...props.items])
const sprocketCount = computed(() => Math.max(props.items.length * 2 * 4, 24))
// scale scroll speed with number of items so it always feels like a consistent pace
const scrollDuration = computed(() => Math.max(props.items.length * 4, 15))

// touch devices have no hover, so pause on tap-and-hold instead
const touchPaused = ref(false)
let touchTimeout = null

function pauseOnTouch() {
    clearTimeout(touchTimeout)
    touchPaused.value = true
}

function resumeAfterTouch() {
    touchTimeout = setTimeout(() => {
        touchPaused.value = false
    }, 2500)
}
</script>
<style scoped>
.filmstrip-wrapper {
    width: 100%;
    overflow: hidden;
    background-color: #010C15;
    border: 1px solid #1E2D3D;
    border-radius: 10px;
    padding: 10px 0;
}
.filmstrip-track {
    display: flex;
    flex-direction: column;
    width: max-content;
    animation-name: scroll-strip;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}
.filmstrip-wrapper:hover .filmstrip-track {
    animation-play-state: paused;
}
.filmstrip-track.paused {
    animation-play-state: paused;
}
@keyframes scroll-strip {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-50%);
    }
}
.sprocket-row {
    display: flex;
    gap: 14px;
    padding: 0 20px;
}
.hole {
    width: 10px;
    height: 10px;
    background-color: #011221;
    border: 1px solid #1E2D3D;
    border-radius: 2px;
    flex-shrink: 0;
}
.frames {
    display: flex;
    gap: 20px;
    padding: 12px 20px;
}
.frame {
    flex-shrink: 0;
    width: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #011221;
    border: 1px solid #1E2D3D;
    border-radius: 8px;
    padding: 10px;
    transition: transform 0.2s ease, border-color 0.2s ease;
}
.frame:hover {
    transform: scale(1.04);
    border-color: #43D9AD;
}
.frame-image {
    width: 100%;
    height: 290px;
    overflow: hidden;
    border-radius: 4px;
}
.frame-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.frame-caption {
    margin-top: 8px;
    font-size: 12px;
    width: 100%;
    text-align: left;
}
.hl-comment {
    color: #8b949e;
}

@media (max-width: 768px) {
    .sprocket-row {
        gap: 10px;
        padding: 0 14px;
    }

    .hole {
        width: 7px;
        height: 7px;
    }

    .frames {
        gap: 14px;
        padding: 10px 14px;
    }

    .frame {
        width: 170px;
        padding: 8px;
    }

    .frame-image {
        height: 190px;
    }

    .frame-caption {
        font-size: 10px;
        margin-top: 6px;
    }
}
</style>