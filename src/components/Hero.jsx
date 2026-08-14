import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero({ showUI }) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const tagRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const scrollRef = useRef(null)
  const hasAnimated = useRef(false)

  // Video plays, then trigger hero text animations
  useEffect(() => {
    if (!showUI || hasAnimated.current) return
    hasAnimated.current = true

    const video = videoRef.current
    if (!video) return

    // Attempt autoplay (muted + playsInline + autoPlay attribute ensures broad compatibility)
    const playPromise = video.play()
    if (playPromise) {
      playPromise.catch(() => {
        // If autoplay fails, retry on first user interaction
        const retryPlay = () => {
          video.play().catch(() => {})
          document.removeEventListener('click', retryPlay)
          document.removeEventListener('touchstart', retryPlay)
        }
        document.addEventListener('click', retryPlay, { once: true })
        document.addEventListener('touchstart', retryPlay, { once: true })
      })
    }

    // After 2 seconds, animate in the UI elements
    const timer = setTimeout(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          '-=0.5'
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .to(
          scrollRef.current,
          {
            opacity: 1,
            duration: 0.6,
          },
          '-=0.3'
        )
    }, 2000)

    return () => clearTimeout(timer)
  }, [showUI])

  // Pause video when Hero section scrolls out of view
  useEffect(() => {
    if (!showUI) return
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [showUI])

  return (
    <section ref={sectionRef} className="hero fs-section">
      <video
        ref={videoRef}
        className="hero-video"
        src="/hero-video.mp4"
        poster="/bg.webp"
        muted
        autoPlay
        loop
        playsInline
        webkit-playsinline="true"
        preload="metadata"
        onEnded={(e) => e.target.pause()}
      />
      <div className="hero-overlay" />

      <div className="hero-content">
        <div
          ref={tagRef}
          className="hero-tag"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          Visual / AI / Brand Designer
        </div>
        <h1
          ref={titleRef}
          className="hero-title"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          创造<em>视觉</em>
          <br />
          定义未来
        </h1>
        <p
          ref={subtitleRef}
          className="hero-subtitle"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          专注于视觉设计、AI 设计与品牌体验
          <br />
          用设计连接技术与美学的边界
        </p>
      </div>

      <div
        ref={scrollRef}
        className="hero-scroll-indicator"
        style={{ opacity: 0 }}
      >
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
