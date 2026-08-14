import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function LoadingScreen({ progress, visible }) {
  const screenRef = useRef(null)
  const barRef = useRef(null)
  const percentRef = useRef(null)

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${progress}%`,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
    if (percentRef.current) {
      percentRef.current.textContent = `${progress}%`
    }
  }, [progress])

  useEffect(() => {
    if (!visible && screenRef.current) {
      gsap.to(screenRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          screenRef.current.style.display = 'none'
          document.body.classList.remove('loading')
        },
      })
    }
  }, [visible])

  useEffect(() => {
    if (visible) {
      document.body.classList.add('loading')
    }
  }, [])

  if (!visible && !screenRef.current) return null

  return (
    <div
      ref={screenRef}
      className="loading-screen"
      style={{ display: visible ? 'flex' : undefined }}
    >
      <div className="loading-logo">
        HC<span>Y</span>
      </div>
      <div className="loading-bar-container">
        <div ref={barRef} className="loading-bar-fill" />
      </div>
      <div ref={percentRef} className="loading-percent">0%</div>
    </div>
  )
}
