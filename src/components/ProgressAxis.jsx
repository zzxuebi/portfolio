import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const SECTION_LABELS = ['首屏', '经历', '作品', '联系']

export default function ProgressAxis({ visible, currentSection, totalSections, onNavigate }) {
  const axisRef = useRef(null)
  const fillRef = useRef(null)

  const progress = ((currentSection + 1) / totalSections) * 100

  useEffect(() => {
    if (visible && axisRef.current) {
      gsap.to(axisRef.current, {
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      })
    }
  }, [visible])

  useEffect(() => {
    if (fillRef.current) {
      gsap.to(fillRef.current, {
        height: `${progress}%`,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
  }, [progress])

  return (
    <div
      ref={axisRef}
      className={`progress-axis ${visible ? 'visible' : ''}`}
      style={{ opacity: 0 }}
    >
      <div className="progress-axis-track">
        <div ref={fillRef} className="progress-axis-fill" />
        <div className="progress-axis-dots">
          {SECTION_LABELS.map((label, i) => (
            <button
              key={i}
              className={`progress-axis-dot ${currentSection >= i ? 'active' : ''}`}
              data-label={label}
              onClick={() => onNavigate(i)}
              aria-label={`跳转到${label}`}
            />
          ))}
        </div>
      </div>
      <div className="progress-axis-percent">
        {Math.round(progress)}%
      </div>
    </div>
  )
}
