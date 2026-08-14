import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const NAV_ITEMS = [
  { label: '首页', en: 'Home', id: 0 },
  { label: '经历', en: 'Experience', id: 1 },
  { label: '作品', en: 'Works', id: 2 },
  { label: '联系', en: 'Contact', id: 3 },
]

export default function Navbar({ visible, currentSection, onNavigate, onShowQR }) {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (visible && navRef.current) {
      gsap.to(navRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      })
    }
  }, [visible])

  const handleNavigate = (id) => {
    onNavigate(id)
    setMenuOpen(false)
  }

  const handleQR = () => {
    onShowQR()
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar ${visible ? 'visible' : ''}`}
        style={{ opacity: 0, transform: 'translateY(-20px)' }}
      >
        <button className="navbar-logo-btn" onClick={() => handleNavigate(0)} aria-label="回到首页">
          <img src="/logo.svg" alt="HCY Logo" className="navbar-logo-img" />
        </button>

        <div className="navbar-pill">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`navbar-link ${currentSection === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="navbar-link-cn">{item.label}</span>
              <span className="navbar-link-en">{item.en}</span>
            </button>
          ))}
        </div>

        <button className="navbar-cta" onClick={onShowQR}>
          WeChat
        </button>

        <button
          className={`navbar-menu-btn ${menuOpen ? 'open' : ''}`}
          aria-label="菜单"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`navbar-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`navbar-mobile-link ${currentSection === item.id ? 'active' : ''}`}
            onClick={() => handleNavigate(item.id)}
          >
            <span className="navbar-mobile-link-cn">{item.label}</span>
            <span className="navbar-mobile-link-en">{item.en}</span>
          </button>
        ))}
        <button className="navbar-mobile-cta" onClick={handleQR}>
          WeChat
        </button>
      </div>
      {menuOpen && <div className="navbar-mobile-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  )
}
