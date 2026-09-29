export const SIZE = 18

export type Point = { x: number; y: number }
export type Status = "ready" | "running" | "paused" | "over"
export type Step = "idle" | "moved" | "ate" | "over" | "won"

export type Game = {
  snake: Point[]
  dir: Point
  food: Point
  score: number
  status: Status
}

export const startSnake = (): Point[] => [
  { x: 9, y: 9 },
  { x: 8, y: 9 },
  { x: 7, y: 9 },
]

export const pickFood = (snake: Point[]): Point | null => {
  const taken = new Set(snake.map((p) => `${p.x},${p.y}`))
  const free: Point[] = []
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (!taken.has(`${x},${y}`)) free.push({ x, y })
    }
  }
  return free.length ? free[(Math.random() * free.length) | 0] : null
}

export const freshGame = (): Game => {
  const snake = startSnake()
  return {
    snake,
    dir: { x: 1, y: 0 },
    food: pickFood(snake)!,
    score: 0,
    status: "ready",
  }
}

export const turn = (g: Game, dx: number, dy: number): boolean => {
  if (g.status === "over") return false
  if (g.dir.x === -dx && g.dir.y === -dy) return false
  g.dir = { x: dx, y: dy }
  if (g.status !== "running") g.status = "running"
  return true
}

export const step = (g: Game): Step => {
  if (g.status !== "running") return "idle"

  const head = g.snake[0]
  const next = { x: head.x + g.dir.x, y: head.y + g.dir.y }
  const out = next.x < 0 || next.y < 0 || next.x >= SIZE || next.y >= SIZE
  const ate = next.x === g.food.x && next.y === g.food.y
  const body = ate ? g.snake : g.snake.slice(0, -1)

  if (out || body.some((p) => p.x === next.x && p.y === next.y)) {
    g.status = "over"
    return "over"
  }

  g.snake = [next, ...g.snake]

  if (ate) {
    g.score += 10
    const nextFood = pickFood(g.snake)
    if (!nextFood) {
      g.status = "over"
      return "won"
    }
    g.food = nextFood
    return "ate"
  }

  g.snake.pop()
  return "moved"
}
