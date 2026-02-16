<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useGameState } from '~/composables/useGameState'
import { useGameControls } from '~/composables/useGameControls'

const { resetGame, loadBestScore } = useGameState()
const { initControls, destroyControls } = useGameControls()

onMounted(() => {
  loadBestScore()
  resetGame()
  initControls()
})

onUnmounted(() => {
  destroyControls()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-md mx-auto">
      <GameHeader />
      
      <div class="flex justify-between items-center mb-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Join the tiles, get to <strong>2048!</strong>
        </p>
        <UButton 
          color="primary" 
          variant="solid"
          @click="resetGame"
        >
          New Game
        </UButton>
      </div>

      <GameBoard />

      <div class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p><strong>HOW TO PLAY:</strong> Use your <strong>arrow keys</strong> or <strong>WASD</strong> to move the tiles.</p>
        <p class="mt-1">On mobile, <strong>swipe</strong> to move.</p>
        <p class="mt-1">Tiles with the same number <strong>merge into one</strong> when they touch.</p>
      </div>

      <GameOverModal />
    </div>
  </div>
</template>
