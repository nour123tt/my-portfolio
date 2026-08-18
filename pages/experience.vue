<template>
  <main class="flex flex-col flex-auto lg:flex-row overflow-hidden">

    <div id="mobile-page-title">
      <h2>_experience</h2>
    </div>

    <!-- section title (mobile) -->
    <div id="section-content-title" class="flex lg:hidden" @click="showFilters = !showFilters">
      <img :class="showFilters ? 'section-arrow rotate-90' : 'section-arrow'" src="/icons/arrow.svg">
      <span class="font-fira_regular text-white text-sm">experience</span>
    </div>

    <div v-if="showFilters || isDesktop" id="filter-menu"
      class="w-full flex-col border-right font-fira_regular text-menu-text lg:flex">
      <!-- title -->
      <div id="section-content-title" class="hidden lg:flex items-center min-w-full">
        <img id="section-arrow-menu" src="/icons/arrow.svg" alt="" class="section-arrow mx-3">
        <p class="font-fira_regular text-white text-sm">experience</p>
      </div>

      <!-- filter menu -->
      <nav id="filters" class="w-full flex-col">

        <div v-for="tech in techs" :key="tech" class="flex items-center py-2">
          <input type="checkbox" :id="tech" @click="filterExperiences(tech)">
          <div :id="'icon-tech-' + tech" :style="{ '--icon-url': 'url(/icons/techs/' + tech + '.svg)' }" class="tech-icon w-5 h-5 mx-4"></div>
          <label :for="tech" :id="'title-tech-' + tech">{{ tech }}</label>
        </div>
      </nav>
    </div>

    <!-- content -->

    <div class="flex flex-col w-full overflow-hidden">

      <!-- windows tab -->
      <div class="tab-height w-full hidden lg:flex border-bot items-center">
        <div class="flex items-center border-right h-full">
          <p v-for="filter in filters" :key="filter" class="font-fira_regular text-menu-text text-sm px-3">{{ filter }};
          </p>
          <img src="/icons/close.svg" alt="" class="m-3">
        </div>
      </div>

      <!-- windows tab mobile -->
      <div id="tab" class="flex lg:hidden items-center">
        <span class="text-white"> // </span>
        <p class="font-fira_regular text-white text-sm px-3">experience</p>
        <span class="text-menu-text"> / </span>
        <p v-for="filter in filters" :key="filter" class="font-fira_regular text-menu-text text-sm px-3">{{ filter }};
        </p>
      </div>

      <!-- experiences -->
      <div id="projects-case" class="grid grid-cols-1 lg:grid-cols-2 max-w-full h-full overflow-scroll lg:self-center">
        <div id="not-found"
          class="hidden flex flex-col font-fira_retina text-menu-text my-5 h-full justify-center items-center">
          <span class="flex justify-center text-4xl pb-3">
            X__X
          </span>
          <span class="text-white flex justify-center text-xl">
            No matching experience
          </span>
          <span class="flex justify-center">
            for these technologies
          </span>
        </div>

        <experience-card v-for="(experience, index) in experiences" :key="experience.title" :index="index" :experience="experience" @explore="openModal" />

      </div>
    </div>

    <ExperienceModal :experience="selectedExperience" @close="closeModal" />

  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DevConfig from '~/developer.json';

const config = ref(DevConfig)
const techs = ['angular', 'html', 'css', 'javascript', 'flutter', 'python', 'springboot', 'odoo', 'talend', 'table']
const filters = ref(['all'])
const showFilters = ref(false)
const isDesktop = ref(true)

function checkDesktop() {
  isDesktop.value = window.innerWidth >= 1024
}

onMounted(() => {
  checkDesktop()
  window.addEventListener('resize', checkDesktop)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkDesktop)
})

const experiences = ref(config.value.experience)
const selectedExperience = ref(null)

function openModal(experience) {
  selectedExperience.value = experience
}

function closeModal() {
  selectedExperience.value = null
}

function filterExperiences(tech) {
  document.getElementById('icon-tech-' + tech).classList.toggle('active')
  document.getElementById('title-tech-' + tech).classList.toggle('active')

  const check = document.getElementById(tech)
  if (check.checked) {
    filters.value = filters.value.filter((item) => item !== 'all')
    filters.value.push(tech)
  } else {
    filters.value = filters.value.filter((item) => item !== tech)
    filters.value.length === 0 ? filters.value.push('all') : null
  }
  filters.value[0] == 'all' ? experiences.value = config.value.experience : experiences.value = filterExperiencesBy(filters.value)

  if (experiences.value.length === 0) {
    document.getElementById('projects-case').classList.remove('grid')
    document.getElementById('not-found').classList.remove('hidden')
  } else {
    document.getElementById('projects-case').classList.add('grid')
    document.getElementById('not-found').classList.add('hidden')
  }
}

function filterExperiencesBy(filters) {
  return config.value.experience.filter(experience => {
    return filters.some(filter => experience.tech.includes(filter))
  })
}
</script>

<style>
#filters {
  padding: 10px 25px;
}

#tab {
  padding: 25px 25px 5px;
  flex-wrap: wrap;
}

.tech-icon {
  opacity: 0.4;
  background-color: #4D5963;
  -webkit-mask-image: var(--icon-url);
  mask-image: var(--icon-url);
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}

.tech-icon.active {
  opacity: 1;
  background-color: #4D5963;
  -webkit-mask-image: var(--icon-url);
  mask-image: var(--icon-url);
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}

#title-tech.active {
  color: white;
}

input[type="checkbox"] {
  appearance: none;
  background-color: transparent;
  width: 1.15em;
  height: 1.15em;
  border: 2px solid currentColor;
  border-radius: 0.15em;
  margin-top: 1px;
}

input[type="checkbox"]:checked {
  background-color: currentColor;
  background-image: url("data:image/svg+xml;utf8,<svg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5.38587 7.2802L11.9718 0.693573L12.9856 1.70668L5.38587 9.30641L0.826172 4.74671L1.83928 3.73361L5.38587 7.2802Z' fill='white'/></svg>");
  background-repeat: no-repeat;
  background-position: center;
}

input[type="checkbox"]:checked:hover {
  box-shadow: #607b968b 0px 0px 0px 2px;
}

input[type="checkbox"]:not(:checked) {
  border-color: currentColor;
}

input[type="checkbox"]:hover {
  cursor: pointer;
  background-color: currentColor;
  background-image: url("data:image/svg+xml;utf8,<svg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5.38587 7.2802L11.9718 0.693573L12.9856 1.70668L5.38587 9.30641L0.826172 4.74671L1.83928 3.73361L5.38587 7.2802Z' fill='white'/></svg>");
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: #607b968b 0px 0px 0px 2px;
}

input[type="checkbox"]:hover:not(:checked) {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
  background-image: none;
  box-shadow: #607b968b 0px 0px 0px 2px;
}

input[type="checkbox"]:focus {
  box-shadow: none;
}

@media (max-width: 768px) {
  #projects-case {
    padding: 0px 25px 40px;
  }

}

@media (min-width: 768px) {
  #projects-case {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 50px 50px 40px;
  }
}

@media (min-width: 1350px) {
  #projects-case {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 50px 80px 40px;
  }
}
</style>