<script setup lang="ts">
import { useGameState } from '~/composables/useGameState'
import { useGameControls } from '~/composables/useGameControls'

const { grid } = useGameState()
const { handleTouchStart, handleTouchEnd } = useGameControls()
</script>

<template>
  <div
    class="game-board p-3 sm:p-4 bg-gray-400 dark:bg-gray-600 rounded-xl"
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
  >
    <div class="grid grid-cols-4 gap-2 sm:gap-3">
      <GameTile
        v-for="(cell, index) in grid.flat()"
        :key="index"
        :value="cell"
      />
    </div>
  </div>
</template>
