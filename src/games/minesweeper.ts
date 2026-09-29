export const COLS = 9
export const ROWS = 9
export const MINES = 10
export const SIZE = ROWS * COLS

export type Cell = {
  mine: boolean
  adjacent: number
  revealed: boolean
  flagged: boolean
}

export type Status = "ready" | "playing" | "won" | "lost"

export type Board = {
  cells: Cell[]
  status: Status
  flags: number
}

export const at = (row: number, col: number) => row * COLS + col

export const neighbors = (index: number): number[] => {
  const row = Math.floor(index / COLS)
  const col = index % COLS
  const out: number[] = []
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue
      const r = row + dr
      const c = col + dc
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue
      out.push(at(r, c))
    }
  }
  return out
}

const clone = (board: Board): Board => ({
  ...board,
  cells: board.cells.map((c) => ({ ...c })),
})

export const createBoard = (): Board => ({
  cells: Array.from({ length: SIZE }, () => ({
    mine: false,
    adjacent: 0,
    revealed: false,
    flagged: false,
  })),
  status: "ready",
  flags: 0,
})

const placeMines = (board: Board, safe: number, count: number) => {
  const blocked = new Set([safe, ...neighbors(safe)])
  const pool = Array.from({ length: SIZE }, (_, i) => i).filter(
    (i) => !blocked.has(i),
  )
  for (let k = pool.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1))
    const tmp = pool[k]
    pool[k] = pool[j]
    pool[j] = tmp
  }
  for (const i of pool.slice(0, count)) board.cells[i].mine = true
  for (let i = 0; i < SIZE; i++) {
    board.cells[i].adjacent = neighbors(i).filter(
      (n) => board.cells[n].mine,
    ).length
  }
}

export const reveal = (input: Board, index: number): Board => {
  if (input.status === "won" || input.status === "lost") return input
  const target = input.cells[index]
  if (!target || target.revealed || target.flagged) return input

  const board = clone(input)
  if (board.status === "ready") {
    placeMines(board, index, MINES)
    board.status = "playing"
  }

  const stack = [index]
  let exploded = false
  while (stack.length) {
    const current = stack.pop() as number
    const cell = board.cells[current]
    if (cell.revealed || cell.flagged) continue
    cell.revealed = true
    if (cell.mine) {
      exploded = true
      continue
    }
    if (cell.adjacent === 0) {
      for (const n of neighbors(current)) {
        if (!board.cells[n].revealed && !board.cells[n].flagged) stack.push(n)
      }
    }
  }

  if (exploded) {
    board.status = "lost"
    for (const cell of board.cells) {
      if (cell.mine) cell.revealed = true
    }
    board.flags = board.cells.filter((c) => c.flagged).length
    return board
  }

  const hiddenSafe = board.cells.filter((c) => !c.mine && !c.revealed).length
  if (hiddenSafe === 0) {
    board.status = "won"
    for (const cell of board.cells) {
      if (cell.mine) cell.flagged = true
    }
    board.flags = MINES
  }
  return board
}

export const toggleFlag = (input: Board, index: number): Board => {
  if (input.status === "won" || input.status === "lost") return input
  const target = input.cells[index]
  if (!target || target.revealed) return input
  const board = clone(input)
  board.cells[index].flagged = !board.cells[index].flagged
  board.flags = board.cells.filter((c) => c.flagged).length
  return board
}

export const chord = (input: Board, index: number): Board => {
  if (input.status !== "playing") return input
  const cell = input.cells[index]
  if (!cell || !cell.revealed || cell.mine || cell.adjacent === 0) return input
  const around = neighbors(index)
  if (around.filter((n) => input.cells[n].flagged).length !== cell.adjacent) {
    return input
  }
  let board = input
  for (const n of around) {
    if (!board.cells[n].revealed && !board.cells[n].flagged) {
      board = reveal(board, n)
      break
    }
  }
  return board
}
