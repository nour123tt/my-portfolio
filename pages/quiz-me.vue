<template>
  <main class="quiz-page">

    <div id="mobile-page-title">
      <h2>_quiz-me</h2>
    </div>

    <div class="quiz-wrapper">

      <p class="progress font-fira_retina text-menu-text">// question {{ currentIndex + 1 }} / {{ questions.length }}</p>

      <div class="show-board">

        <div class="question-header">
          <p class="question-text font-fira_bold">{{ currentQuestion.question }}</p>
        </div>

        <div class="answers-stack">
          <button
            v-for="(option, i) in currentQuestion.options"
            :key="option"
            class="answer-slot"
            :class="optionClass(option)"
            :disabled="answered"
            @click="selectAnswer(option)"
          >
            <span class="answer-letter font-fira_bold">{{ ['A', 'B', 'C'][i] }}</span>
            <span class="answer-text font-fira_retina">{{ option }}</span>
          </button>
        </div>

        <button v-if="answered" class="next-btn font-fira_bold" @click="nextQuestion">
          {{ currentIndex === questions.length - 1 ? 'restart' : 'next question' }} &gt;
        </button>

      </div>

      <div class="hint-panel">
        <p class="hint-label font-fira_bold">// hint</p>
        <transition name="fade" mode="out-in">
          <p class="hint-text font-fira_retina" :key="'h' + currentIndex" v-if="showHint">
            {{ currentQuestion.hint }}
          </p>
          <button v-else class="hint-btn font-fira_bold" @click="showHint = true">
            reveal hint
          </button>
        </transition>
      </div>

      <p class="score font-fira_retina text-menu-text">// score: {{ score }} / {{ answeredCount }}</p>

    </div>

  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DevConfig from '~/developer.json';

const config = ref(DevConfig)

const questions = ref([])
const currentIndex = ref(0)
const selectedOption = ref(null)
const answered = ref(false)
const showHint = ref(false)
const score = ref(0)
const answeredCount = ref(0)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

onMounted(() => {
  questions.value = shuffle(config.value.quiz).map(q => ({
    ...q,
    options: shuffle(q.options)
  }))
})

const currentQuestion = computed(() => questions.value[currentIndex.value] || { question: '', options: [], hint: '' })

function optionClass(option) {
  if (!answered.value) return {}
  if (option === currentQuestion.value.answer) return { correct: true }
  if (option === selectedOption.value) return { wrong: true }
  return { dimmed: true }
}

function selectAnswer(option) {
  if (answered.value) return
  selectedOption.value = option
  answered.value = true
  answeredCount.value++
  if (option === currentQuestion.value.answer) {
    score.value++
  }
}

function nextQuestion() {
  if (currentIndex.value === questions.value.length - 1) {
    questions.value = shuffle(config.value.quiz).map(q => ({
      ...q,
      options: shuffle(q.options)
    }))
    currentIndex.value = 0
    score.value = 0
    answeredCount.value = 0
  } else {
    currentIndex.value++
  }
  selectedOption.value = null
  answered.value = false
  showHint.value = false
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.quiz-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 40px 20px;
  background: radial-gradient(circle at 50% 25%, #101F2E 0%, #010C15 70%);
  overflow-y: auto;
  overflow-x: hidden;
}

.quiz-wrapper {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress {
  margin-bottom: 24px;
  font-size: 14px;
  opacity: 0.7;
  text-align: center;
}

.show-board {
  width: 100%;
  max-width: 620px;
  background: linear-gradient(155deg, #142433, #0B1826);
  border: 2px solid #263B50;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45), inset 0 0 0 3px #010C15, inset 0 0 0 5px #263B50;
}

.question-header {
  text-align: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 2px dashed #263B50;
}

.question-text {
  color: #E5E9F0;
  font-size: 18px;
  line-height: 1.5;
  word-wrap: break-word;
}

.answers-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.answer-slot {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  background-color: #010C15;
  border: 2px solid #1E2D3D;
  border-radius: 10px;
  padding: 14px 18px;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.answer-slot:hover:not(:disabled) {
  border-color: #43D9AD;
}

.answer-letter {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #1E2D3D;
  color: #8da9c6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.answer-text {
  color: #a5d6ff;
  font-size: 14px;
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
  min-width: 0;
  flex: 1;
}

.answer-slot.correct {
  border-color: #43D9AD;
  background-color: rgba(67, 217, 173, 0.12);
}
.answer-slot.correct .answer-letter {
  background-color: #43D9AD;
  color: #04342C;
}
.answer-slot.correct .answer-text {
  color: #43D9AD;
}

.answer-slot.wrong {
  border-color: #E24B4A;
  background-color: rgba(226, 75, 74, 0.12);
}
.answer-slot.wrong .answer-letter {
  background-color: #E24B4A;
  color: #501313;
}
.answer-slot.wrong .answer-text {
  color: #f09595;
}

.answer-slot.dimmed {
  opacity: 0.35;
}

.answer-slot:disabled {
  cursor: default;
}

.next-btn {
  display: block;
  width: 100%;
  margin: 22px auto 0;
  background-color: #43D9AD;
  border: none;
  border-radius: 10px;
  padding: 13px 26px;
  color: #04342C;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.next-btn:hover {
  background-color: #5de8bd;
}

.hint-panel {
  width: 100%;
  max-width: 620px;
  margin-top: 20px;
  background-color: #011221;
  border: 1px solid #1E2D3D;
  border-left: 4px solid #FEA55F;
  border-radius: 14px;
  padding: 20px 22px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hint-label {
  color: #FEA55F;
  font-size: 13px;
  margin-bottom: 10px;
}

.hint-text {
  color: #f5c896;
  font-size: 14px;
  line-height: 1.7;
  word-wrap: break-word;
}

.hint-btn {
  background: none;
  border: 1px dashed #607B96;
  border-radius: 10px;
  padding: 12px 20px;
  color: #607B96;
  font-size: 13px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.hint-btn:hover {
  border-color: #FEA55F;
  color: #FEA55F;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.score {
  margin-top: 20px;
  font-size: 13px;
  opacity: 0.7;
  text-align: center;
}

@media (max-width: 640px) {
  .quiz-page {
    padding: 20px 12px;
  }

  .quiz-wrapper {
    max-width: 100%;
  }

  .progress {
    font-size: 11px;
    margin-bottom: 14px;
  }

  .show-board {
    padding: 16px 14px;
    border-radius: 12px;
  }

  .question-header {
    padding-bottom: 12px;
    margin-bottom: 14px;
  }

  .question-text {
    font-size: 14px;
    line-height: 1.4;
  }

  .answers-stack {
    gap: 8px;
  }

  .answer-slot {
    padding: 10px 12px;
    gap: 8px;
    border-radius: 8px;
  }

  .answer-letter {
    width: 24px;
    height: 24px;
    font-size: 11px;
  }

  .answer-text {
    font-size: 12px;
  }

  .next-btn {
    padding: 11px;
    font-size: 12px;
    margin-top: 14px;
  }

  .hint-panel {
    margin-top: 14px;
    padding: 14px;
    min-height: auto;
  }

  .hint-label {
    font-size: 11px;
    margin-bottom: 6px;
  }

  .hint-text {
    font-size: 12px;
  }

  .hint-btn {
    padding: 10px;
    font-size: 12px;
  }

  .score {
    font-size: 11px;
    margin-top: 12px;
  }
}
</style>