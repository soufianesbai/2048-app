import { useGameState } from './useGameState'

type Grid = [number[], number[], number[], number[]]

export const useGameLogic = () => {
  const { grid, score, bestScore, isGameOver, isWon, spawnTile, saveBestScore } = useGameState()

  function slide(row: number[]): { newRow: number[]; points: number } {
    const arr = row.filter(val => val !== 0)
    let points = 0

    for (let i = 0; i < arr.length - 1; i++) {
      const current = arr[i]
      const next = arr[i + 1]
      if (current !== undefined && next !== undefined && current === next) {
        arr[i] = current * 2
        points += arr[i]!
        if (arr[i] === 2048) {
          isWon.value = true
        }
        arr.splice(i + 1, 1)
      }
    }

    while (arr.length < 4) {
      arr.push(0)
    }

    return { newRow: arr, points }
  }

  function move(direction: 'up' | 'down' | 'left' | 'right') {
    if (isGameOver.value) return

    const oldGrid = JSON.stringify(grid.value)
    let totalPoints = 0
    const currentGrid = grid.value
    const newGrid: Grid = [
      [...currentGrid[0]],
      [...currentGrid[1]],
      [...currentGrid[2]],
      [...currentGrid[3]]
    ]

    if (direction === 'left') {
      for (let r = 0; r < 4; r++) {
        const { newRow, points } = slide(newGrid[r as 0|1|2|3])
        newGrid[r as 0|1|2|3] = newRow
        totalPoints += points
      }
    } else if (direction === 'right') {
      for (let r = 0; r < 4; r++) {
        const { newRow, points } = slide([...newGrid[r as 0|1|2|3]].reverse())
        newGrid[r as 0|1|2|3] = newRow.reverse()
        totalPoints += points
      }
    } else if (direction === 'up') {
      for (let c = 0; c < 4; c++) {
        const col = [newGrid[0][c]!, newGrid[1][c]!, newGrid[2][c]!, newGrid[3][c]!]
        const { newRow, points } = slide(col)
        for (let r = 0; r < 4; r++) {
          newGrid[r as 0|1|2|3][c] = newRow[r]!
        }
        totalPoints += points
      }
    } else if (direction === 'down') {
      for (let c = 0; c < 4; c++) {
        const col = [newGrid[3][c]!, newGrid[2][c]!, newGrid[1][c]!, newGrid[0][c]!]
        const { newRow, points } = slide(col)
        for (let r = 0; r < 4; r++) {
          newGrid[(3 - r) as 0|1|2|3][c] = newRow[r]!
        }
        totalPoints += points
      }
    }

    if (JSON.stringify(newGrid) !== oldGrid) {
      grid.value = newGrid
      score.value += totalPoints

      if (score.value > bestScore.value) {
        bestScore.value = score.value
        saveBestScore()
      }

      spawnTile()
      checkGameOver()
    }
  }

  function checkGameOver() {
    const currentGrid = grid.value
    
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentGrid[r as 0|1|2|3][c] === 0) return
      }
    }

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 3; c++) {
        if (currentGrid[r as 0|1|2|3][c] === currentGrid[r as 0|1|2|3][c + 1]) return
      }
    }

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentGrid[r as 0|1|2|3][c] === currentGrid[(r + 1) as 0|1|2|3][c]) return
      }
    }

    isGameOver.value = true
  }

  return { move, checkGameOver }
}
