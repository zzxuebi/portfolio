import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ProfileCard from './ProfileCard'

const TRAITS = [
  {
    num: '01',
    title: '产品思维导向',
    en: 'Product-Oriented',
    desc: '不仅关注视觉表现，更注重设计对业务目标与用户价值的实际驱动',
  },
  {
    num: '02',
    title: '工程化思维',
    en: 'Engineering Mindset',
    desc: '具备将设计资产转化为可复用、可维护、可被AI识别的体系化能力',
  },
  {
    num: '03',
    title: '复杂场景驾驭',
    en: 'Complex Scenarios',
    desc: '我擅长从杂乱需求中提炼核心问题并落地为解决方案，更看重设计是否易懂、是否能商业落地',
  },
  {
    num: '04',
    title: '团队赋能',
    en: 'Team Empowerment',
    desc: '沉淀方法论并赋能团队，推动组织设计能力整体提升',
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [qrShow, setQrShow] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          gsap.fromTo(
            contentRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: 'power3.out' }
          )

          observer.unobserve(section)
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="contact fs-section">
      <div className="contact-bg-texture" />
      <div className="container">
        <div ref={contentRef} className="contact-scattered" style={{ opacity: 0 }}>
          {/* Floating design elements — scattered & randomized */}
          <div className="float-element float-typeface">Typeface</div>
          <div className="float-element float-aa">Aa</div>
          <div className="float-element float-grid">Grid<br />System</div>
          <div className="float-element float-hierarchy">层次<br /><em>Hierarchy</em></div>
          <div className="float-element float-contrast">对比<br /><em>Contrast</em></div>
          <div className="float-element float-whitespace">留白<br /><em>White Space</em></div>
          <div className="float-element float-design-text">
            设计，连接<br />想法与生活。
            <span className="float-design-sub">DESIGN CONNECTS IDEAS AND LIFE.</span>
          </div>
          <div className="float-element float-sticky-note">
            简洁<br />· 清晰<br />· 一致<br />· 有温度
          </div>

          {/* Extra scattered elements for randomness */}
          <div className="float-element float-kern">Kerning</div>
          <div className="float-element float-leading">Leading</div>
          <div className="float-element float-xheight">x-height</div>
          <div className="float-element float-serif">Serif</div>
          <div className="float-element float-sans">Sans</div>
          <div className="float-element float-weight">Weight</div>
          <div className="float-element float-baseline">Baseline</div>
          <div className="float-element float-glyph">Glyph</div>
          <div className="float-element float-tracking">Tracking</div>
          <div className="float-element float-ligature">Ligature</div>
          <div className="float-element float-ascender">Ascender</div>
          <div className="float-element float-descender">Descender</div>

          {/* Profile card */}
          <div className="contact-photo-card">
            <ProfileCard
              avatarUrl="/人物.png"
              iconUrl="/icon-pattern.svg"
              name="HCY"
              title="Visual Designer"
              handle="hcy.design"
              status="Available for work"
              contactText="Let's Talk"
              showUserInfo={false}
              behindGlowColor="rgba(0, 201, 114, 0.5)"
              innerGradient="linear-gradient(145deg, rgba(0,201,114,0.15) 0%, rgba(0,0,0,0.9) 100%)"
            />
          </div>

          {/* About me */}
          <div className="contact-about">
            <h2 className="contact-about-title">关于<span className="contact-about-me">我</span></h2>
            <div className="contact-socials">
              <a
                href="mailto:1416440432@qq.com"
                className="contact-social-btn"
                data-tooltip="1416440432@qq.com"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </a>
              <a
                href="tel:18380415781"
                className="contact-social-btn"
                data-tooltip="18380415781"
                aria-label="Phone"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </a>
              <button
                className="contact-social-btn"
                onClick={() => setQrShow(true)}
                aria-label="WeChat"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05a6.127 6.127 0 01-.253-1.726c0-3.573 3.26-6.467 7.278-6.467.267 0 .527.022.789.044C16.538 4.703 12.909 2.188 8.691 2.188zm-2.6 4.408c.56 0 1.016.455 1.016 1.016 0 .56-.456 1.016-1.017 1.016-.56 0-1.016-.455-1.016-1.016 0-.56.456-1.016 1.016-1.016zm5.21 0c.56 0 1.017.455 1.017 1.016 0 .56-.456 1.016-1.016 1.016-.56 0-1.016-.455-1.016-1.016 0-.56.455-1.016 1.016-1.016zm4.226 3.63c-3.503 0-6.346 2.494-6.346 5.574 0 3.08 2.843 5.574 6.346 5.574a7.49 7.49 0 002.14-.312.627.627 0 01.524.074l1.39.812a.226.226 0 00.122.04.214.214 0 00.213-.215c0-.053-.02-.105-.035-.156l-.285-1.08a.434.434 0 01.156-.488c1.345-.99 2.2-2.452 2.2-4.049 0-3.08-2.843-5.574-6.346-5.574h-.073zm-2.14 3.274c.413 0 .748.335.748.748a.749.749 0 01-.748.748.748.748 0 01-.748-.748c0-.413.335-.748.748-.748zm4.28 0c.413 0 .748.335.748.748a.748.748 0 01-.748.748.749.749 0 01-.748-.748c0-.413.335-.748.748-.748z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Trait cards */}
          <div className="contact-traits">
            {TRAITS.map((trait, i) => (
              <div key={i} className={`trait-card trait-${i + 1}`}>
                <div className="trait-header">
                  <span className="trait-title">{trait.title}</span>
                  <span className="trait-num">{trait.num}</span>
                </div>
                <div className="trait-en">{trait.en}</div>
                <div className="trait-desc">{trait.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {qrShow && (
        <div className="qr-popup-overlay" onClick={() => setQrShow(false)}>
          <div className="qr-popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="qr-popup-close" onClick={() => setQrShow(false)}>✕</button>
            <img className="qr-popup-img" src="/qrcode.png" alt="WeChat QR Code" />
            <div className="qr-popup-label">微信扫码添加</div>
          </div>
        </div>
      )}

    </section>
  )
}
