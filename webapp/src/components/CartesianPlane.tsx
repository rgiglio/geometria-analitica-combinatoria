import { useRef, useEffect, useCallback } from 'react'

export interface PlanePoint {
  x: number
  y: number
  label?: string
  color?: string
}

export interface PlaneLine {
  a: number
  b: number
  c: number
  color?: string
  label?: string
}

export interface PlaneSegment {
  from: PlanePoint
  to: PlanePoint
  color?: string
  dashed?: boolean
}

interface Props {
  width?: number
  height?: number
  points?: PlanePoint[]
  lines?: PlaneLine[]
  segments?: PlaneSegment[]
  gridRange?: number
  onCanvasClick?: (x: number, y: number) => void
  className?: string
}

export function CartesianPlane({
  width = 500,
  height = 500,
  points = [],
  lines = [],
  segments = [],
  gridRange = 10,
  onCanvasClick,
  className = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const toScreen = useCallback(
    (x: number, y: number): [number, number] => {
      const cx = width / 2
      const cy = height / 2
      const scale = Math.min(width, height) / (2 * gridRange + 2)
      return [cx + x * scale, cy - y * scale]
    },
    [width, height, gridRange]
  )

  const fromScreen = useCallback(
    (sx: number, sy: number): [number, number] => {
      const cx = width / 2
      const cy = height / 2
      const scale = Math.min(width, height) / (2 * gridRange + 2)
      return [Math.round((sx - cx) / scale), Math.round((cy - sy) / scale)]
    },
    [width, height, gridRange]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#fafafa'
    ctx.fillRect(0, 0, width, height)

    // grid
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 0.5
    for (let i = -gridRange; i <= gridRange; i++) {
      const [sx, sy] = toScreen(i, -gridRange)
      const [ex, ey] = toScreen(i, gridRange)
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke()
      const [sx2, sy2] = toScreen(-gridRange, i)
      const [ex2, ey2] = toScreen(gridRange, i)
      ctx.beginPath(); ctx.moveTo(sx2, sy2); ctx.lineTo(ex2, ey2); ctx.stroke()
    }

    // axes
    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 2
    const [ox, oy] = toScreen(0, 0)
    ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(width, oy); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, height); ctx.stroke()

    // axis labels
    ctx.fillStyle = '#6b7280'
    ctx.font = '11px Inter, sans-serif'
    ctx.textAlign = 'center'
    for (let i = -gridRange; i <= gridRange; i++) {
      if (i === 0) continue
      const [sx] = toScreen(i, 0)
      ctx.fillText(String(i), sx, oy + 14)
      const [, sy] = toScreen(0, i)
      ctx.fillText(String(i), ox - 14, sy + 4)
    }
    ctx.fillText('x', width - 12, oy - 6)
    ctx.fillText('y', ox + 12, 14)

    // lines: ax + by + c = 0
    lines.forEach((line) => {
      ctx.strokeStyle = line.color || '#6366f1'
      ctx.lineWidth = 2
      ctx.beginPath()
      if (Math.abs(line.b) > 1e-9) {
        const y1 = (-line.a * -gridRange - line.c) / line.b
        const y2 = (-line.a * gridRange - line.c) / line.b
        const [sx, sy] = toScreen(-gridRange, y1)
        const [ex, ey] = toScreen(gridRange, y2)
        ctx.moveTo(sx, sy); ctx.lineTo(ex, ey)
      } else if (Math.abs(line.a) > 1e-9) {
        const xv = -line.c / line.a
        const [sx, sy] = toScreen(xv, -gridRange)
        const [ex, ey] = toScreen(xv, gridRange)
        ctx.moveTo(sx, sy); ctx.lineTo(ex, ey)
      }
      ctx.stroke()
      if (line.label) {
        const [lx, ly] = toScreen(gridRange - 1, Math.abs(line.b) > 1e-9 ? (-line.a * (gridRange - 1) - line.c) / line.b : 0)
        ctx.fillStyle = line.color || '#6366f1'
        ctx.font = 'bold 13px Inter, sans-serif'
        ctx.fillText(line.label, lx, ly - 8)
      }
    })

    // segments
    segments.forEach((seg) => {
      const [sx, sy] = toScreen(seg.from.x, seg.from.y)
      const [ex, ey] = toScreen(seg.to.x, seg.to.y)
      ctx.strokeStyle = seg.color || '#f59e0b'
      ctx.lineWidth = 1.5
      if (seg.dashed) ctx.setLineDash([5, 4])
      else ctx.setLineDash([])
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke()
      ctx.setLineDash([])
    })

    // points
    points.forEach((p) => {
      const [sx, sy] = toScreen(p.x, p.y)
      ctx.fillStyle = p.color || '#ef4444'
      ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fill()
      if (p.label) {
        ctx.fillStyle = '#1f2937'
        ctx.font = 'bold 13px Inter, sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText(p.label, sx + 8, sy - 8)
      }
    })
  }, [width, height, points, lines, segments, gridRange, toScreen])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onCanvasClick) return
    const rect = canvasRef.current!.getBoundingClientRect()
    const [x, y] = fromScreen(e.clientX - rect.left, e.clientY - rect.top)
    onCanvasClick(x, y)
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height }}
      className={`rounded-xl border border-gray-200 cursor-crosshair ${className}`}
      onClick={handleClick}
    />
  )
}
