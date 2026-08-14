import { useEffect, useRef } from 'react'

export default function MouseFollower() {
  const dotRef = useRef(null)
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    let raf
    let needsUpdate = false

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (!needsUpdate) {
        needsUpdate = true
        raf = requestAnimationFrame(tick)
      }
    }

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12
      dot.style.transform = `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`

      // Stop the loop when position is close enough to target
      const dx = Math.abs(target.current.x - pos.current.x)
      const dy = Math.abs(target.current.y - pos.current.y)
      if (dx < 0.5 && dy < 0.5) {
        needsUpdate = false
      } else {
        raf = requestAnimationFrame(tick)
      }
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={dotRef} className="mouse-follower" aria-hidden="true" />
}
