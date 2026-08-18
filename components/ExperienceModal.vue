<template>
    <transition name="modal-fade">
        <div v-if="experience" class="modal-overlay" @click.self="$emit('close')">
            <div class="folder-wrapper">

                <!-- folder tab sticking out the top -->
                <div class="folder-tab-shape">
                    <span class="tab-label font-fira_retina">{{ experience.title }}</span>
                </div>

                <div class="modal-folder">

                    <!-- title bar -->
                    <div class="folder-tab">
                        <img src="/icons/folder1.svg" alt="" class="w-5 h-5 mr-3">
                        <p class="font-fira_regular text-white text-sm">{{ experience.title }}</p>
                        <button class="close-btn" @click="$emit('close')">
                            <img src="/icons/close.svg" alt="close" class="w-4 h-4">
                        </button>
                    </div>

                    <!-- content -->
                    <div class="folder-content">
                        <div class="folder-image">
                            <transition name="img-fade" mode="out-in">
                                <img :key="currentImageIndex" :src="experience.images[currentImageIndex]" alt="" />
                            </transition>
                            <div v-if="experience.images.length > 1" class="image-dots">
                                <span
                                    v-for="(img, i) in experience.images"
                                    :key="i"
                                    class="dot"
                                    :class="{ active: i === currentImageIndex }"
                                ></span>
                            </div>
                        </div>

                        <div class="folder-text">
                            <p class="font-fira_retina text-menu-text text-xs mb-2">// {{ experience.period }}</p>
                            <p class="font-fira_retina text-white text-sm leading-relaxed mb-4" v-html="experience.description"></p>

                            <div v-if="experience.private" class="private-note">
                                <span class="hl-comment font-fira_retina text-xs">
                                    // remarque
                                </span>
                                <p class="font-fira_retina text-menu-text text-xs mt-1 leading-relaxed">
                                    Ce projet a été réalisé dans un cadre professionnel confidentiel, propriété de l'entreprise. Voici les détails que je peux partager publiquement.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
    experience: {
        type: Object,
        default: null
    }
})

defineEmits(['close'])

const currentImageIndex = ref(0)
let cycleInterval = null

function startCycle() {
    clearInterval(cycleInterval)
    if (!props.experience || props.experience.images.length <= 1) return
    cycleInterval = setInterval(() => {
        currentImageIndex.value = (currentImageIndex.value + 1) % props.experience.images.length
    }, 3000)
}

watch(() => props.experience, (val) => {
    currentImageIndex.value = 0
    if (val) startCycle()
    else clearInterval(cycleInterval)
})

onBeforeUnmount(() => clearInterval(cycleInterval))
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(1, 12, 21, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 30px 20px;
}

.folder-wrapper {
    max-width: 950px;
    width: 100%;
    max-height: 82vh;
    display: flex;
    flex-direction: column;
}

.folder-tab-shape {
    background-color: #142433;
    border: 1px solid #1E2D3D;
    border-bottom: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: fit-content;
    max-width: 260px;
    padding: 8px 20px;
    margin-left: 20px;
    margin-bottom: -1px;
    position: relative;
    z-index: 2;
}

.tab-label {
    color: #8da9c6;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
}

.modal-folder {
    background-color: #0B1826;
    border: 1px solid #1E2D3D;
    border-radius: 4px 12px 12px 12px;
    width: 100%;
    max-height: 88vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.folder-tab {
    display: flex;
    align-items: center;
    padding: 14px 18px;
    border-bottom: 1px solid #1E2D3D;
    background-color: #011221;
}

.folder-tab p {
    flex: 1;
}

.close-btn {
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.close-btn:hover {
    opacity: 1;
    transform: rotate(90deg);
}

.folder-content {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 24px;
    gap: 24px;
}

.folder-image {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #1E2D3D;
    position: relative;
    background-color: #010C15;
    display: flex;
    align-items: center;
    justify-content: center;
}

.folder-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
}

.image-dots {
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 6px;
}

.dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    transition: background-color 0.3s ease;
}

.dot.active {
    background-color: #43D9AD;
}

.img-fade-enter-active, .img-fade-leave-active {
    transition: opacity 0.5s ease;
}
.img-fade-enter-from, .img-fade-leave-to {
    opacity: 0;
}

.private-note {
    background-color: #011221;
    border: 1px solid #1E2D3D;
    border-left: 3px solid #FEA55F;
    border-radius: 6px;
    padding: 12px 14px;
}

.hl-comment {
    color: #8b949e;
}

.modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity 0.25s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
    opacity: 0;
}

.folder-image {
    min-height: 240px;
}

@media (max-width: 768px) {
    .modal-overlay {
        padding: 16px 12px;
    }

    .folder-wrapper {
        max-height: 88vh;
    }

    .folder-tab-shape {
        max-width: 180px;
        padding: 6px 14px;
        margin-left: 14px;
    }

    .tab-label {
        font-size: 10px;
    }

    .folder-tab {
        padding: 10px 14px;
    }

    .folder-content {
        padding: 16px;
        gap: 16px;
    }

    .folder-image {
        min-height: 200px;
    }

    .folder-text p {
        font-size: 13px;
    }

    .private-note {
        padding: 10px 12px;
    }
}

@media (min-width: 900px) {
    .folder-content {
        flex-direction: row;
        align-items: stretch;
    }
    .folder-image {
        width: 62%;
        flex-shrink: 0;
        min-height: 480px;
    }
    .folder-text {
        width: 38%;
        overflow-y: auto;
    }
}
</style>