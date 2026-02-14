import { useState } from '#app'

type Grid = [number[], number[], number[], number[]]

export const useGameState = () => {
  const grid = useState<Grid>('game-grid', () => createEmptyGrid())
  const score = useState<number>('game-score', () => 0)
  const bestScore = useState<number>('game-best-score', () => 0)
  const isGameOver = useState<boolean>('game-over', () => false)
  const isWon = useState<boolean>('game-won', () => false)

  function createEmptyGrid(): Grid {
    return [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  }

  function spawnTile() {
    const emptyCells: [number, number][] = []
    const currentGrid = grid.value
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentGrid[r as 0|1|2|3][c] === 0) {
          emptyCells.push([r, c])
        }
      }
    }
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length)
      const cell = emptyCells[randomIndex]
      if (cell) {
        const [row, col] = cell
        const newGrid: Grid = [                   
          [...currentGrid[0]],
          [...currentGrid[1]],
          [...currentGrid[2]],
          [...currentGrid[3]]
        ]
        newGrid[row as 0|1|2|3][col] = Math.random() < 0.9 ? 2 : 4
        grid.value = newGrid
      }
    }
  }

  function resetGame() {
    grid.value = createEmptyGrid()
    score.value = 0
    isGameOver.value = false
    isWon.value = false
    spawnTile()
    spawnTile()
  }

  // Load best score from localStorage on client
  function loadBestScore() {
    if (import.meta.client) {
      const saved = localStorage.getItem('2048-best-score')
      if (saved) {
        bestScore.value = parseInt(saved, 10)
      }
    }
  }

  // Save best score to localStorage
  function saveBestScore() {
    if (process.client) {
      localStorage.setItem('2048-best-score', bestScore.value.toString())
    }
  }

  return {
    grid,
    score,
    bestScore,
    isGameOver,
    isWon,
    resetGame,
    spawnTile,
    createEmptyGrid,
    loadBestScore,
    saveBestScore
  }
}
