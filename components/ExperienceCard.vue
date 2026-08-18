<template>
    <div id="experience" class="lg:mx-5">
        <span class="flex text-sm my-3">
            <h3 class="text-purplefy font-fira_bold mr-3">Project {{ index + 1 }}</h3>
            <h4 class="font-fira_retina text-menu-text"> // {{ experience.period }}</h4>
        </span>
        <div id="experience-card" class="flex flex-col">
            <div id="window">
                <img id="showcase" :src="experience.images[0]" alt="" class="">
            </div>
            <div class="pb-8 pt-6 px-6 border-top">
                <h4 class="text-white font-fira_bold text-sm mb-3">{{ experience.title }}</h4>
                <p class="text-menu-text font-fira_retina text-sm mb-5 short-desc">
                {{ experience.shortDescription }}
                </p>
                <button id="explore-button" @click="$emit('explore', experience)" class="text-white font-fira_retina py-2 px-4 w-fit text-xs rounded-lg">
                    explore-project
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps({
    experience: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
})
defineEmits(['explore'])
</script>
<style scoped>
#experience {
  min-width: 400px;
  margin-bottom: 5px;
}
#experience-card {
  border: 1px solid #1E2D3D;
  background-color: #011221;
  border-radius: 15px;
  max-width: 400px;
  width: 100%;
}
#window {
  max-height: 120px;
  position: relative;
  overflow: hidden;
}
#showcase {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}
.short-desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
#explore-button {
  background-color: #1C2B3A;
  cursor: pointer;
}
#explore-button:hover {
  background-color: #263B50;
}
@media (max-width: 768px) {
  #experience {
    min-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #experience-card {
    max-width: 100%;
  }

  #window {
    max-height: 160px;
  }

  #showcase {
    height: 160px;
  }
}
@media (min-width: 768px) {
  #experience {
    width: 100%;
    min-width: 100%;
    padding-inline: 5px;
  }
}
@media (min-width: 1350px) {
  #experience {
    width: 100%;
    min-width: 100%;
    padding-inline: 20px;
  }
}
</style>