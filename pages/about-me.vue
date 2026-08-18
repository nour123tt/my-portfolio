<template>
  <main v-if="!loading" id="about-me" class="page">

    <div id="mobile-page-title">
      <h2>_about-me</h2>
    </div>

    <div id="page-menu" class="w-full flex">

      <!-- DESKTOP section icons -->
      <div id="sections">
        <div id="section-icon" v-for="section in config.about.sections" :key="section.title" :class="{ active: isSectionActive(section.title)}">
          <img :id="'section-icon-' + section.title" :src="section.icon" :alt="section.title + '-section'" @click="focusCurrentSection(section)">
        </div>
      </div>

      <!-- focused section content -->
      <div id="section-content" class="hidden lg:block w-full h-full border-right">

        <!-- title -->
        <div id="section-content-title" class="hidden lg:flex items-center min-w-full">
          <img id="section-arrow-menu" src="/icons/arrow.svg" alt="" class="section-arrow mx-3 open">
          <p v-html="config.about.sections[currentSection]?.title" class="font-fira_regular text-white text-sm"></p>
        </div>

        <!-- folders -->
        <div>
          <div v-for="(folder, key, index) in config.about.sections[currentSection]?.info" :key="key" class="grid grid-cols-2 items-center my-2 font-fira_regular text-menu-text" @click="focusCurrentFolder(folder)">
            <div class="flex col-span-2 hover:text-white hover:cursor-pointer">
              <img id="diple" src="/icons/diple.svg" alt="" :class="{ open: isOpen(folder.title)}">
              <img :src="'/icons/folder' + (index+1) + '.svg'" alt="" class="mr-3">
              <p :id="folder.title" v-html="key" :class="{ active: isActive(folder.title)}"></p>
            </div>
            <div v-if="folder.files !== undefined" class="col-span-2">
              <div v-for="(file, key) in folder.files" :key="key" class="hover:text-white hover:cursor-pointer flex my-2">
                <img src="/icons/markdown.svg" alt="" class="ml-8 mr-3"/>
                <p >{{ key }}</p>
              </div> 
            </div>
          </div>
        </div>

        <!-- contact -->
        <div id="section-content-title-contact" class="flex items-center min-w-full border-top">
          <img id="section-arrow-menu" src="/icons/arrow.svg" alt="" class="section-arrow mx-3 open">
          <p v-html="config.contacts.direct.title" class="font-fira_regular text-white text-sm"></p>
        </div>
        <div id="contact-sources" class="hidden lg:flex lg:flex-col my-2">
          <div v-for="(source, key) in config.contacts.direct.sources" :key="key" class="flex items-center mb-2">
            <img :src="'/icons/' + key + '.svg'" alt="" class="mx-4">
            <a v-html="source" href="/" class="font-fira_retina text-menu-text hover:text-white"></a>
          </div>
        </div>

      </div>

      <!-- mobile -->
      <div id="section-content" class="lg:hidden w-full font-fira_regular">

        <div v-for="section in config.about.sections" :key="section.title">
          
          <!-- section title (mobile) -->
          <div :key="section.title" :src="section.icon" id="section-content-title" class="flex lg:hidden mb-1" @click="focusCurrentSection(section)">
            <img src="/icons/arrow.svg" :id="'section-arrow-' + section.title" alt="" class="section-arrow">
            <p v-html="section.title" class=" text-white text-sm"></p>
          </div>

          <!-- folders -->
          <div :id="'folders-' + section.title" class="hidden"> <!-- <div :id="'folders-' + section.title" :class="currentSection == section.title ? 'block' : 'hidden'"> -->
            <div v-for="(folder, key, index) in config.about.sections[section.title]?.info" :key="key" class="grid grid-cols-2 items-center my-2 font-fira_regular text-menu-text hover:text-white hover:cursor-pointer" @click="focusCurrentFolder(folder)">
              <div class="flex col-span-2">
                <img id="diple" src="/icons/diple.svg">
                <img :src="'icons/folder' + (index+1) + '.svg'" alt="" class="mr-3">
                <p :id="folder.title" v-html="key" :class="{ active: isActive(folder.title)}"></p>
              </div>
              <div v-if="folder.files !== undefined" class="col-span-2">
                <div v-for="(file, key) in folder.files" :key="key" class="hover:text-white hover:cursor-pointer flex my-2">
                  <img src="/icons/markdown.svg" alt="" class="ml-8 mr-3"/>
                  <p >{{ key }}</p>
                </div>
                
              </div>
            </div>
          </div>
          
        </div>

        <!-- section content title -->
        <div id="section-content-title" class="flex items-center min-w-full" @click="showContacts()">
          <img src="/icons/arrow.svg" alt="" id="section-arrow" class="section-arrow">
          <p v-html="config.contacts.direct.title" class="font-fira_regular text-white text-sm"></p>
        </div>

        <!-- section content folders -->
        <div id="contacts" class="hidden">
          <div v-for="(source, key) in config.contacts.direct.sources" :key="key" class="flex items-center my-2">
            <img :src="'/icons/' + key + '.svg'" alt="">
            <a v-html="source" href="/" class="font-fira_retina text-menu-text hover:text-white ml-4"></a>
          </div>
        </div>

      </div>

    </div>
    <!-- MENU END -->

    <!-- content -->
    <div class="flex flex-col lg:grid lg:grid-cols-2 h-full w-full">
      
      <div id="left" class="w-full flex flex-col border-right">
        
        <!-- windows tab desktop -->
        <div class="tab-height w-full hidden lg:flex border-bot items-center">
          <div class="flex items-center border-right h-full">
            <p v-html="config.about.sections[currentSection]?.title" class="font-fira_regular text-menu-text text-sm px-3"></p>
            <img src="/icons/close.svg" alt="" class="mx-3">
          </div>
        </div>

        <!-- windows tab mobile -->
        <div id="tab-mobile" class="flex lg:hidden font-fira_retina">
            <span class="text-white">// </span>
            <h3 v-html="config.about.sections[currentSection]?.title" class="text-white px-2"></h3>
            <span class="text-menu-text"> / </span>
            <h3 v-html="config.about.sections[currentSection]?.info[folder].title" class="text-menu-text pl-2"></h3>
        </div>
        
        <!-- text -->
        <div id="commented-text" class="flex h-full w-full lg:border-right overflow-hidden">

          <div class="w-full h-full ml-5 mr-10 lg:my-5 overflow-scroll">
              <CommentedText :text="config.about.sections[currentSection]?.info[folder].description" />
          </div>
          
          <!-- scroll bar -->
          <div id="scroll-bar" class="h-full border-left hidden lg:flex justify-center py-1">
            <div id="scroll">
          </div>

        </div>

      </div>
      
    </div>

    <div id="right" class="max-w-full flex flex-col">
        
      <!-- windows tab -->
      <div class="tab-height w-full h-full hidden lg:flex border-bot items-center">

      </div>

      <!-- windows tab mobile -->
      <div class="tab-height w-full h-full flex-none lg:hidden items-center">

      </div>

        <div id="gists-content" class="flex">
        
          <div id="gists" class="flex flex-col lg:px-6 lg:py-4 w-full overflow-hidden">

            <template v-if="folder === 'interests'">
              <!-- title -->
              <h3 class="text-white lg:text-menu-text mb-4 text-sm">// Showcase:</h3>
              <FilmStrip :items="config.about.sections[currentSection]?.info[folder].showcase" />
            </template>

            <template v-else-if="folder === 'education'">
              <!-- title -->
              <h3 class="text-white lg:text-menu-text mb-4 text-sm">// Souvenirs:</h3>
              <PolaroidStack :images="config.about.sections[currentSection]?.info[folder].showcase" />
            </template>

            <template v-else>
              <!-- title -->
              <h3 class="text-white lg:text-menu-text mb-4 text-sm">// Recommendations:</h3>

              <div class="flex flex-col overflow-scroll">
                <div
                  v-for="pos in [0, 1]"
                  :key="pos"
                  class="recommendation-slot mb-5"
                >
                  <transition name="rec-fade" mode="out-in">
                    <div
                      v-if="visiblePair[pos]"
                      :key="visiblePair[pos].name"
                      class="recommendation-card"
                    >
                      <!-- head info, styled like the old gist head -->
                      <div class="flex justify-between my-2">
                        <div class="flex">
                          <img
                            v-if="visiblePair[pos].image"
                            :src="visiblePair[pos].image"
                            alt=""
                            class="w-8 h-8 rounded-full mr-2 object-cover"
                          />
                          <div v-else class="avatar-placeholder w-8 h-8 rounded-full mr-2 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-menu-text">
                              <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.5c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z"/>
                            </svg>
                          </div>
                          <div class="flex flex-col">
                            <span class="font-fira_bold text-purple-text text-xs pb-1">
                              @{{ visiblePair[pos].name }}
                            </span>
                            <p class="font-fira_retina text-xs text-menu-text">{{ visiblePair[pos].title }}</p>
                          </div>
                        </div>
                      </div>

                      <!-- code-style comment block, syntax-highlighted like a real snippet -->
                      <div class="snippet-container">
                        <pre><code><span class="hl-comment">// review</span><br><span class="hl-keyword">const</span> <span class="hl-var">feedback</span> <span class="hl-op">=</span> <span class="hl-string">"{{ visiblePair[pos].comment }}"</span><span class="hl-op">;</span></code></pre>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </template>

          </div>

          <!-- scroll bar -->
          <div id="scroll-bar" class="h-full border-left hidden lg:flex justify-center py-1">
            <div id="scroll"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>

#sections {
  width: 5rem; /* 80px */
  height: 100%;
  display: none;
  border-right: 1px solid #1E2D3D;
}

/* LG */
@media (min-width: 1024px) {
  #sections {
    display: block;
  }
}

#section-icon {
  @apply my-6 hover:cursor-pointer flex justify-center;
  opacity: 0.4;
}

#section-icon.active {
  opacity: 1;
}

#section-icon:hover {
  opacity: 1;
}

.tab-height {
  min-height: 35px;
  max-height: 35px;
}

#tab-mobile {
  padding: 25px 20px 0px 25px;
  align-items: flex-end;
}

#scroll-bar{
  width: 20px;
}

#scroll {
  width: 14px;
  height: 7px;
  background-color: #607B96;
}

#diple {
  @apply mx-3 w-2 max-w-fit;
}

.open {
  transform: rotate(90deg);
}

.active {
  color:white;
}

#right, #left {
  height: 100%;
  overflow: hidden;
}

#gists-content {
  height: 100%;
  overflow: hidden;
}

@media (max-width: 1024px) {
  #gists-content {
    height: 100%;
    padding: 0px 25px;
    overflow: hidden;
  }

  #about {
  min-height: stretch;
}
}

.section-arrow {
  transition: 0.1s;
}

/* recommendations, styled like the original code-snippet showcase */
.recommendation-slot {
  min-height: 140px;
}

@media (max-width: 768px) {
  .recommendation-slot {
    min-height: 100px;
  }

  .snippet-container {
    font-size: 11px;
  }

  .snippet-container pre {
    padding: 1em;
  }

  .avatar-placeholder {
    width: 1.5rem !important;
    height: 1.5rem !important;
  }
}

.avatar-placeholder {
  background: linear-gradient(135deg, #43D9AD, #4D5BCE);
}

.snippet-container {
    background-color: #011221;
    padding: 5px;
    border-radius: 15px;
    border: 1px solid #1E2D3D;
    font-size: 12px;
    overflow-y: scroll;
    overflow-x: scroll;
    max-height: 220px;
}

.snippet-container pre {
    margin: 0;
    overflow: hidden;
    width: 100%;
    max-height: 220px;
    padding: 1.5em;
}

.snippet-container code {
    white-space: pre-wrap;
    max-height: 220px;
    width: 100%;
    overflow: hidden;
    line-height: 1.8;
    font-family: 'Fira Code Retina', monospace;
}

.snippet-container::-webkit-scrollbar {
    display: none;
}

/* syntax highlight colors, matching the site's existing hljs palette */
.hl-comment {
  color: #8b949e;
}

.hl-keyword {
  color: #ff7b72;
}

.hl-var {
  color: #79c0ff;
}

.hl-op {
  color: #c9d1d9;
}

.hl-string {
  color: #a5d6ff;
}

.rec-fade-enter-active, .rec-fade-leave-active {
  transition: opacity 0.6s ease;
}
.rec-fade-enter-from, .rec-fade-leave-to {
  opacity: 0;
}

#section-content #contacts {
  padding: 0px 25px;
}

</style>

<script>
import DevConfig from '~/developer.json';
export default {
  data() {
    return {
      currentSection: 'personal-info',
      folder: 'bio',
      loading: true,
      currentPairIndex: 0,
      recommendationInterval: null,
    }
  },
  /**
   * In setup we can define the data we want to use in the component before the component is created.
   */
  setup() {
    return {
      config: DevConfig
    }
  },
  computed: {
    // Set active class to current page link
    isActive() {
      return folder => this.folder === folder;
    },
    isSectionActive() {
      return section => this.currentSection === section;
    },
    isOpen() {
      return folder => this.folder === folder;
    },
    totalPairs() {
      return Math.ceil((this.config.recommendations?.length || 0) / 2)
    },
    visiblePair() {
      const list = this.config.recommendations || []
      const start = this.currentPairIndex * 2
      return [list[start] || null, list[start + 1] || null]
    },
  },
  methods: {
    focusCurrentSection(section) {
      this.currentSection = section.title
      this.folder = Object.keys(section.info)[0]

      document.getElementById('folders-' + section.title).classList.toggle('hidden') // show folders
      document.getElementById('section-arrow-' + section.title).classList.toggle('rotate-90'); // rotate arrow
    },
    focusCurrentFolder(folder) {
      this.folder = folder.title
      // handle if folder belongs to the current section. It happens when you click on a folder from a different section in mobile view.
      this.currentSection = this.config.about.sections[this.currentSection].info[folder.title] ? this.currentSection : Object.keys(this.config.about.sections).find(section => this.config.about.sections[section].info[folder.title])
    },
    /**
     * TODO: Hay que crear un método para que cuando se haga click en un folder, se muestren los archivos que contiene. Y si se hace click en un archivo, se muestre el contenido del archivo.
     * TODO:  Además de girar el icono del diple.
     */
    toggleFiles() {
      document.getElementById('file-' + this.folder).classList.toggle('hidden')
    },
    /* Mobile */
    showContacts() {
      document.getElementById('contacts').classList.toggle('hidden')
      document.getElementById('section-arrow').classList.toggle('rotate-90'); // rotate arrow
    },
  },
  mounted(){
    this.loading = false
    this.recommendationInterval = setInterval(() => {
      this.currentPairIndex = (this.currentPairIndex + 1) % this.totalPairs
    }, 9000)
  },
  beforeUnmount() {
    clearInterval(this.recommendationInterval)
  }
}
</script>