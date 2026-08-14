import { useState, useEffect, useCallback, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import ProgressAxis from './components/ProgressAxis'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import MouseFollower from './components/MouseFollower'
import './styles/global.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Resources to preload
const PRELOAD_RESOURCES = [
  '/hero-video.mp4',
]

function App() {
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const [showUI, setShowUI] = useState(false)
  const [qrShow, setQrShow] = useState(false)
  const isScrolling = useRef(false)
  const wheelTimeout = useRef(null)
  const closeProjectModal = useRef(null)

  // Preload resources
  useEffect(() => {
    if (!loading) return

    let loaded = 0
    const total = PRELOAD_RESOURCES.length
    let fallbackTimer

    const updateProgress = () => {
      loaded++
      const progress = Math.round((loaded / total) * 100)
      setLoadProgress(progress)
      if (loaded >= total) {
        setTimeout(() => {
          setLoadProgress(100)
          setTimeout(() => {
            setLoading(false)
            setTimeout(() => setShowUI(true), 400)
          }, 600)
        }, 300)
      }
    }

    PRELOAD_RESOURCES.forEach((src) => {
      if (src.endsWith('.mp4')) {
        const video = document.createElement('video')
        video.preload = 'auto'
        video.muted = true
        video.onloadeddata = updateProgress
        video.onerror = updateProgress
        video.src = src
      } else {
        const img = new Image()
        img.onload = updateProgress
        img.onerror = updateProgress
        img.src = src
      }
    })

    // Fallback: proceed after 8s regardless
    fallbackTimer = setTimeout(() => {
      if (loading) {
        setLoadProgress(100)
        setTimeout(() => {
          setLoading(false)
          setTimeout(() => setShowUI(true), 400)
        }, 600)
      }
    }, 8000)

    return () => clearTimeout(fallbackTimer)
  }, [])

  // Track current section based on scroll position
  const sectionsRef = useRef(null)
  useEffect(() => {
    if (loading) return

    sectionsRef.current = document.querySelectorAll('.fs-section')
    const sections = sectionsRef.current
    let ticking = false

    const updateCurrentSection = () => {
      const vh = window.innerHeight

      let currentIdx = 0
      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= vh * 0.4) {
          currentIdx = i
        }
      })

      setCurrentSection(currentIdx)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateCurrentSection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateCurrentSection()

    return () => window.removeEventListener('scroll', onScroll)
  }, [loading])

  // Navigate to section with GSAP smooth scroll + scroll-snap lock
  const scrollToSection = useCallback((index) => {
    if (isScrolling.current) return
    const sections = sectionsRef.current || document.querySelectorAll('.fs-section')
    if (!sections[index] || index === currentSection) return

    isScrolling.current = true
    // Disable scroll-snap during animation to prevent conflicts
    document.documentElement.style.scrollSnapType = 'none'

    setCurrentSection(index)
    gsap.to(window, {
      scrollTo: { y: sections[index], offsetY: 0 },
      duration: 0.9,
      ease: 'power3.inOut',
      onComplete: () => {
        // Re-enable scroll-snap after animation
        document.documentElement.style.scrollSnapType = 'y mandatory'
        isScrolling.current = false
      },
    })
  }, [currentSection])

  // Wrapped navigation: close project modal before scrolling
  const handleNav = useCallback((index) => {
    if (closeProjectModal.current) closeProjectModal.current()
    scrollToSection(index)
  }, [scrollToSection])

  // Wheel event: navigate section by section with debounce
  useEffect(() => {
    if (loading) return

    const handleWheel = (e) => {
      if (isScrolling.current) {
        e.preventDefault()
        return
      }

      // Skip section navigation when project modal is open
      if (document.querySelector('.pm-overlay')) return

      // Clear any pending wheel timeout
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current)

      const threshold = 50
      if (Math.abs(e.deltaY) < threshold) return

      e.preventDefault()
      const direction = e.deltaY > 0 ? 1 : -1
      const sections = sectionsRef.current || document.querySelectorAll('.fs-section')
      const nextIndex = Math.max(0, Math.min(sections.length - 1, currentSection + direction))

      if (nextIndex !== currentSection) {
        scrollToSection(nextIndex)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [loading, currentSection, scrollToSection])

  return (
    <>
      <LoadingScreen progress={loadProgress} visible={loading} />

      {!loading && (
        <>
          <Navbar
            visible={showUI}
            currentSection={currentSection}
            onNavigate={handleNav}
            onShowQR={() => setQrShow(true)}
          />
          <ProgressAxis
            visible={showUI}
            currentSection={currentSection}
            totalSections={4}
            onNavigate={handleNav}
          />

          <main>
            <Hero showUI={showUI} />
            <Experience />
            <Portfolio onCloseModal={(fn) => { closeProjectModal.current = fn }} />
            <Contact />
          </main>

          <MouseFollower />

          {qrShow && (
            <div className="qr-popup-overlay" onClick={() => setQrShow(false)}>
              <div className="qr-popup-card" onClick={(e) => e.stopPropagation()}>
                <button className="qr-popup-close" onClick={() => setQrShow(false)}>✕</button>
                <img className="qr-popup-img" src="/qrcode.png" alt="WeChat QR Code" />
                <div className="qr-popup-label">微信扫码添加</div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default App
