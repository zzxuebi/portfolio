import { useEffect, useRef, useState } from 'react'
import './ProjectModal.css'

export default function ProjectModal({ open, projects, activeIndex, onClose, onIndexChange }) {
  const tabScrollRef = useRef(null)
  const contentScrollRef = useRef(null)
  const [tab, setTab] = useState(activeIndex)

  // Sync external activeIndex -> internal tab when modal opens
  useEffect(() => {
    if (open) {
      setTab(activeIndex)
    }
  }, [open, activeIndex])

  // Scroll active tab into view
  useEffect(() => {
    if (!open) return
    const container = tabScrollRef.current
    if (!container) return
    const activeTab = container.querySelector(`.pm-tab[data-index="${tab}"]`)
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [tab, open])

  // Reset content scroll when tab changes
  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTop = 0
    }
  }, [tab])

  // Lock body + html scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [open])

  // Intercept wheel events on overlay to prevent background scroll
  useEffect(() => {
    if (!open) return
    const onWheel = (e) => {
      e.stopPropagation()
    }
    const overlay = document.querySelector('.pm-overlay')
    if (overlay) {
      overlay.addEventListener('wheel', onWheel, { passive: false })
    }
    return () => {
      if (overlay) {
        overlay.removeEventListener('wheel', onWheel)
      }
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const project = projects[tab]
  const totalImages = project.sections.reduce((sum, s) => sum + s.images.length, 0)

  // Green highlight key phrases
  const GREEN_PATTERNS = [
    /[\d.]+%[以上]*/g,
    /\d+万人同时在线/g,
    /全自主国产化/g,
    /国产化/g,
    /统一入口/g,
    /高保真还原/g,
    /一键式/g,
    /可视化/g,
    /数字化/g,
  ]

  function renderHighlight(text) {
    let parts = [{ text, green: false }]
    GREEN_PATTERNS.forEach((pattern) => {
      const newParts = []
      parts.forEach((part) => {
        if (part.green) { newParts.push(part); return }
        let lastIdx = 0
        let match
        const regex = new RegExp(pattern.source, pattern.flags)
        while ((match = regex.exec(part.text)) !== null) {
          if (match.index > lastIdx) {
            newParts.push({ text: part.text.slice(lastIdx, match.index), green: false })
          }
          newParts.push({ text: match[0], green: true })
          lastIdx = match.index + match[0].length
        }
        if (lastIdx < part.text.length) {
          newParts.push({ text: part.text.slice(lastIdx), green: false })
        }
      })
      parts = newParts
    })
    return parts.map((p, i) =>
      p.green
        ? <span key={i} className="pm-caption-green">{p.text}</span>
        : <span key={i}>{p.text}</span>
    )
  }

  function renderCaption(caption, sectionTitle, captionClass) {
    // Split by Chinese colon — first part is title, rest is content
    const colonIdx = caption.indexOf('：')
    let title = null
    let content = caption

    if (colonIdx > 0 && colonIdx < 20) {
      title = caption.slice(0, colonIdx)
      content = caption.slice(colonIdx + 1)
    }

    // For link-style caption, keep original rendering
    if (captionClass === 'pm-caption-link') {
      return <p className={`pm-section-caption ${captionClass}`}>{caption}</p>
    }

    return (
      <div className="pm-caption-block">
        {title && (
          <div className="pm-caption-title">{title}</div>
        )}
        <p className={`pm-section-caption ${captionClass || ''}`}>
          {renderHighlight(content)}
        </p>
      </div>
    )
  }

  return (
    <div className="pm-overlay" onClick={onClose}>
      <div className="pm-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="pm-header">
          <div className="pm-header-left">
            <div className="pm-header-title">全部作品</div>
            <div className="pm-header-count">{String(tab + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</div>
          </div>
          <button className="pm-close" onClick={onClose} aria-label="关闭">✕</button>
        </div>

        {/* Tabs */}
        <div className="pm-tabs-wrapper" ref={tabScrollRef}>
          <div className="pm-tabs">
            {projects.map((p, i) => (
              <button
                key={i}
                className={`pm-tab ${i === tab ? 'active' : ''}`}
                data-index={i}
                onClick={() => setTab(i)}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable content: cover + sections */}
        <div className="pm-scroll-area" ref={contentScrollRef}>
          {/* Cover image with background color */}
          {!project.hideBanner && (
            <div className="pm-cover-wrap" style={{ backgroundColor: project.bgColor }}>
              <img src={project.banner || project.cover} alt={project.name} className="pm-cover-image" />
            </div>
          )}

          {/* Project info */}
          <div className="pm-info-bar">
            <div className="pm-info-left">
              <div className="pm-category">{project.category}</div>
              <h3 className="pm-name">{project.name}</h3>
            </div>
            <div className="pm-info-right">
              <div className="pm-image-count">{totalImages} PAGES</div>
            </div>
          </div>
          <p className="pm-desc">{project.desc}</p>

          {/* Sections */}
          {project.sections.map((section, si) => (
            <div key={si} className="pm-section">
              <div className="pm-section-header">
                <span className="pm-section-tag">{section.title}</span>
                <span className="pm-section-line" />
              </div>
              {section.caption && (
                renderCaption(section.caption, section.title, section.captionClass)
              )}
              {section.images.length > 0 && (
                <div className={`pm-image-grid ${section.images.length === 1 ? 'pm-grid-single' : ''}`}>
                  {section.images.map((img, ii) => {
                    const imgSrc = typeof img === 'string' ? img : img.src
                    const isPhone = typeof img === 'object' && img.phone
                    return (
                      <div key={ii} className={`pm-image-card${isPhone ? ' pm-phone-card' : ''}`}>
                        {isPhone ? (
                          <div className="pm-phone-frame">
                            <div className="pm-phone-notch" />
                            <img src={imgSrc} alt={`${project.name} - ${section.title}`} className="pm-section-image pm-phone-image" loading="lazy" />
                          </div>
                        ) : (
                          <img src={imgSrc} alt={`${project.name} - ${section.title}`} className="pm-section-image" loading="lazy" />
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Bottom spacer */}
          <div className="pm-bottom-spacer" />
        </div>

        {/* Nav arrows */}
        <button
          className="pm-nav pm-nav-prev"
          onClick={() => setTab((t) => (t - 1 + projects.length) % projects.length)}
          aria-label="上一个"
        >
          ‹
        </button>
        <button
          className="pm-nav pm-nav-next"
          onClick={() => setTab((t) => (t + 1) % projects.length)}
          aria-label="下一个"
        >
          ›
        </button>
      </div>
    </div>
  )
}
