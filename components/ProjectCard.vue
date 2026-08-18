<template>
    <div id="project" class="lg:mx-5">
        <span class="flex text-sm my-3">
            <h3 class="text-purplefy font-fira_bold mr-3">Project {{ index + 1 }}</h3>
            <h4 class="font-fira_retina text-menu-text"> // {{ project.title }}</h4>
        </span>
        <div id="project-card" class="flex flex-col">
<div id="window">
                <img id="showcase" :src="project.img" alt="" class="">
            </div>
            <div class="pb-8 pt-6 px-6 border-top">
                <p class="text-menu-text font-fira_retina text-sm mb-5">
                {{ project.description }}
                </p>
                <a id="view-button" :href="project.url" target="_blank" class="text-white font-fira_retina py-2 px-4 w-fit text-xs rounded-lg">
                    view-project
                </a>
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps({
    project: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
})
</script>
<style scoped>
#project {
  min-width: 400px;
  margin-bottom: 5px;
}
.tech-badge-icon {
  filter: grayscale(100%) brightness(1.6);
  opacity: 0.85;
}
#project-card {
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
@media (max-width: 768px) {
  #project {
    min-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #project-card {
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
  #project {
    width: 100%;
    min-width: 100%;
    padding-inline: 5px;
  }
}
@media (min-width: 1350px) {
  #project {
    width: 100%;
    min-width: 100%;
    padding-inline: 20px;
  }
}
</style>