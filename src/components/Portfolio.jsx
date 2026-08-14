import { useEffect, useRef, useState, useCallback, useMemo, lazy, Suspense } from 'react'
import gsap from 'gsap'
import CircularGallery from './CircularGallery'
import PixelBlast from './PixelBlast'

const ProjectModal = lazy(() => import('./ProjectModal'))

const PROJECTS = [
  {
    name: '创立 LDP 平台',
    category: '平台',
    desc: '从零到一搭建 LDP 低代码开发平台，涵盖组件体系、流程引擎与权限管理，支撑多条业务线快速交付。',
    cover: '/works/1.创立 LDP 平台/cover.png',
    banner: '/works/1.创立 LDP 平台/banner.png',
    bgColor: '#e8f0fe',
    sections: [
      { title: '项目展示', images: ['/works/1.创立 LDP 平台/1.png', '/works/1.创立 LDP 平台/2.png', '/works/1.创立 LDP 平台/3.png', '/works/1.创立 LDP 平台/1-柳钢工作台.png', '/works/1.创立 LDP 平台/1-柳钢工作台-2.png', { src: '/works/1.创立 LDP 平台/01_外部投资驾驶舱.png', phone: true }, '/works/1.创立 LDP 平台/01_益民科技门户.png', '/works/1.创立 LDP 平台/01_高科集团经营管理.png', '/works/1.创立 LDP 平台/数字新疆-党建管理系统_基层和基础.png', '/works/1.创立 LDP 平台/贵安发展项目_进度计划管理.png'] },
    ],
  },
  {
    name: '智慧立法平台',
    category: '政务',
    desc: '面向人大立法工作的数字化平台，实现法规起草、意见征集、审议流程的全链路管理。',
    cover: '/works/2.智慧立法平台/cover.png',
    banner: '/works/2.智慧立法平台/banner.png',
    bgColor: '#1a1a2e',
    sections: [
      { title: '项目展示', images: ['/works/2.智慧立法平台/1.png', '/works/2.智慧立法平台/2.png', '/works/2.智慧立法平台/3.png', '/works/2.智慧立法平台/4.png', '/works/2.智慧立法平台/5.png', '/works/2.智慧立法平台/6.png'] },
      { title: '最终项目成果', images: [], caption: '该项目已上线，公众可以访问的网站为 https://rhpt.scspc.gov.cn/flfgkgzd', captionClass: 'pm-caption-link' },
    ],
  },
  {
    name: '重庆反诈综合管理平台',
    category: '政务',
    desc: '通过反诈大数据建立预警劝阻、案件研判、人员管控三大业务系统，帮助公安机关实现反诈工作的"预防、打击、管控一体化"。',
    cover: '/works/3.重庆反诈平台/cover.png',
    banner: '/works/3.重庆反诈平台/banner.png',
    bgColor: '#e8e8e8',
    sections: [
      { title: '项目介绍', images: [], caption: '通过反诈大数据建立预警劝阻、案件研判、人员管控三大业务系统，帮助公安机关实现反诈工作的"预防、打击、管控一体化"。', captionClass: 'pm-caption-nowrap' },
      { title: '项目展示', images: ['/works/3.重庆反诈平台/2.png', '/works/3.重庆反诈平台/3.png'] },
    ],
  },
  {
    name: '广西数字党建',
    category: '政务',
    desc: '运用互联网、大数据、人工智能等现代信息技术，对党建工作进行全方位、系统化的数字化改造和赋能。',
    cover: '/works/4.广西数字党建/cover.png',
    banner: '/works/4.广西数字党建/banner.png',
    bgColor: '#d8d8d8',
    sections: [
      { title: '项目介绍', images: [], caption: '运用互联网、大数据、人工智能等现代信息技术，对党建工作进行全方位、系统化的数字化改造和赋能，从而提升党建工作质量与效率，实现党员信息、组织关系、党员发展、党费收缴、"三会一课"等基础党务工作的在线化、流程化管理。' },
      { title: '项目展示', images: ['/works/4.广西数字党建/2.png', '/works/4.广西数字党建/3.png'] },
    ],
  },
  {
    name: '掌上人大',
    category: '移动端',
    desc: '人大代表移动履职平台，提供议案提交、会议通知、履职记录等移动端服务。',
    cover: '/works/5.掌上人大/cover.png',
    banner: '/works/5.掌上人大/banner.png',
    bgColor: '#e0e0e0',
    sections: [
      { title: '项目展示', images: ['/works/5.掌上人大/2.png'], caption: '掌上人大通过pc、平板、手机端，打造全自主国产化的政务版"企业微信"，实现即时通讯、OA办公、工作台拓展外部应用等功能。', captionClass: 'pm-caption-nowrap' },
    ],
  },
  {
    name: '数字人大',
    category: '政务',
    desc: '平台包括代表履职大数据平台、会议文件数字化系统、人大网上信访系统、规范性文件数据库、督查督办系统、智慧党建系统、智慧接待系统、OA办公等子系统。',
    cover: '/works/6.数字人大/cover.png',
    banner: '/works/6.数字人大/banner.png',
    bgColor: '#c8d8e8',
    sections: [
      { title: '项目介绍', images: [], caption: '平台包括代表履职大数据平台、会议文件数字化系统、人大网上信访系统、规范性文件数据库、督查督办系统、智慧党建系统、智慧接待系统、OA办公等子系统，通过数字人大数据中心和掌上人大进行联通。', captionClass: 'pm-caption-nowrap' },
      { title: '项目展示', images: ['/works/6.数字人大/1.png', '/works/6.数字人大/2.png', '/works/6.数字人大/3.png', '/works/6.数字人大/4.png', '/works/6.数字人大/5.png'] },
    ],
  },
  {
    name: '智能会议通',
    category: '效率工具',
    desc: '智能会议管理系统，支持会议预约、议程管理、纪要生成与任务跟踪，提升会议效率。',
    cover: '/works/7.智能会议通/cover.png',
    banner: '/works/7.智能会议通/banner.png',
    bgColor: '#f0e8e8',
    sections: [
      { title: '项目背景与目标', images: [], caption: '项目背景：为人大常委会提供数字化会议管理解决方案。实现目标：统一入口、数字化文件管理、投票完整性保障。' },
      { title: '设计过程', images: [], caption: '市场分析、竞品研究（金华鸿正、用友）、系统架构决策。' },
      { title: '移动端设计', images: [], caption: '移动端APP UI/UX设计，注重信息层级与交互体验。' },
      { title: '项目展示', images: ['/works/7.智能会议通/3.png', '/works/7.智能会议通/4.png', '/works/7.智能会议通/6.png', '/works/7.智能会议通/7.png', '/works/7.智能会议通/8.png', '/works/7.智能会议通/9.png', '/works/7.智能会议通/10.png', '/works/7.智能会议通/11.png'] },
      { title: '最终项目成果', images: ['/works/7.智能会议通/12成果.png'], caption: '风格和交互得到客户高度肯定，支撑2万人同时在线。' },
    ],
  },
  {
    name: '香港选举系统',
    category: '政务',
    desc: '电子点票系统，包含业务系统、BPCM选票管理、HSS硬件监控、VIBS投票集成四个子系统。',
    cover: '/works/8.香港选举系统/cover.png',
    banner: '/works/8.香港选举系统/banner.png',
    bgColor: '#f5f5f5',
    sections: [
      { title: '项目背景', images: [], caption: '电子点票系统，包含业务系统、BPCM选票管理、HSS硬件监控、VIBS投票集成四个子系统。' },
      { title: '设计过程', images: ['/works/8.香港选举系统/2.png', '/works/8.香港选举系统/3.png'], caption: '梳理系统架构、需求评审、高保真设计。', captionClass: 'pm-caption-nowrap' },
      { title: '项目展示', images: ['/works/8.香港选举系统/4.png', '/works/8.香港选举系统/5.png', '/works/8.香港选举系统/6.png', '/works/8.香港选举系统/8.png'] },
      { title: '最终项目成果', images: ['/works/8.香港选举系统/9成果.png'], caption: '从老旧系统的能用变为易用、好用，支撑2万人同时在线。', captionClass: 'pm-caption-nowrap' },
    ],
  },
  {
    name: 'CASIT 脚手架',
    category: '工程化',
    desc: '为解决团队前端开发效果不一致、工具版本不统一、组件重复开发等问题，搭建前端一体化脚手架平台，助力多个重点项目交付周期缩短20%以上。',
    cover: '/works/9.CASIT 脚手架/cover.png',
    banner: '/works/9.CASIT 脚手架/banner.png',
    bgColor: '#f0f0f0',
    sections: [
      { title: '项目背景与目标', images: [], caption: '项目背景：为解决团队前端各人员开发效果不一致、使用研发工具版本不统一、后续项目相同组件重复开发的问题，紧密配合产品、研发及业务团队搭建脚手架平台，推动设计系统在实际项目中高效应用，助力多个重点项目交付周期缩短20%以上。实现目标：搭建前端一体化一键式项目创建；1.提升开发速度：可快速搭建项目，生成页面或者组件；2.规范统一：包含风格规范，目录规范，页面和组件代码规范，性能规范，css命名规范（避免样式污染）；3.可动态引入所需能力和第三方库并提供调用API；4.组件管理：在脚手架中存放抽取公共组件，在生成项目时可动态引入组件，动态配置接口，方便使用。' },
      { title: '设计过程', images: [], caption: '调研需求，明确流程优先级后，输出原型文件和需求文档和研发团队一起评审，最终确定项目风格和设计流程。' },
      { title: '项目展示', images: ['/works/9.CASIT 脚手架/3.png', '/works/9.CASIT 脚手架/4.png', '/works/9.CASIT 脚手架/5.png', '/works/9.CASIT 脚手架/6.png', '/works/9.CASIT 脚手架/7.png', '/works/9.CASIT 脚手架/8.png', '/works/9.CASIT 脚手架/9.png', '/works/9.CASIT 脚手架/10.png'] },
      { title: '最终项目成果', images: ['/works/9.CASIT 脚手架/11成果.png'], caption: '平均人员开发耗时减少原先整体的30%：1. 创建项目减少原先的20%；2. 新增页面组件，减少30%。' },
    ],
  },
  {
    name: '双河农场电商平台',
    category: '电商',
    desc: '依托农场背景自建电商平台，主打土地认养（认养一亩田）的数字农场，为客户提供生长在黑土地上的稻米、黑猪肉等优质农副产品。',
    cover: '/works/10.双河农场电商平台/cover.png',
    banner: '/works/10.双河农场电商平台/banner.png',
    hideBanner: true,
    bgColor: '#f5f5f5',
    sections: [
      { title: '项目介绍', images: [], caption: '本项目依托农场背景，自建电商平台，主打土地认养（认养一亩田）的数字农场，为客户提供生长在黑土地上的稻米、黑猪肉等优质农副产品，将虚拟的"一亩田"与现实土地绑定，满足城市消费者对土地的情感寄托与食品安全双重需求。平台通过高清摄像头、传感器实时展示认养田气象、土壤数据、作物长势，客户通过平台参与种植监督、生长过程可视化，建立深度信任关系。' },
      { title: '项目展示', images: ['/works/10.双河农场电商平台/2.png'] },
    ],
  },
  {
    name: '悦禾旅游平台',
    category: '旅游',
    desc: '整合中、美、墨西哥等地资源，形成覆盖90%城市景点的旅游服务体系，主打留学、游学服务。',
    cover: '/works/11.悦禾旅游平台/cover.png',
    banner: '/works/11.悦禾旅游平台/banner.png',
    bgColor: '#f0e0d8',
    sections: [
      { title: '项目介绍', images: [], caption: '平台通过整合中、美、墨西哥等地资源，形成覆盖90%城市景点的旅游服务体系，主打留学、游学服务，分别有悦禾、玛雅玩家、拉美玩家三个不同品牌，同时为当地留学生提供一站式生活服务-都行留学生情报站。' },
      { title: '项目展示', images: ['/works/11.悦禾旅游平台/2.png'] },
    ],
  },
  {
    name: '设计系统',
    category: '设计系统',
    desc: '团队设计规范文档，涵盖色彩体系、字体规范、组件标准、动效原则等设计语言定义，让设计有章可循。',
    cover: '/works/12.设计规范/cover.png',
    banner: '/works/12.设计规范/banner.png',
    hideBanner: true,
    bgColor: '#e8f0fe',
    sections: [
      { title: '设计规范总览', images: ['/works/12.设计规范/1.png', '/works/12.设计规范/2.png'] },
    ],
  },
  {
    name: '能力沉淀',
    category: '方法论',
    desc: '当 AI 时代降临，设计师该如何自处？用什么为企业提供价值？实际工作中积累沉淀了一些经验及想法给了我答案：构建可复用、可扩展、AI友好的设计资产体系，从界面执行者到系统构建者的能力跃迁是当下设计师的方向。',
    cover: '/works/13.能力沉淀/cover.png',
    banner: '/works/13.能力沉淀/banner.png',
    hideBanner: true,
    bgColor: '#d0d8e0',
    sections: [
      { title: '概述', images: ['/works/13.能力沉淀/p1.png', '/works/13.能力沉淀/p2.png'] },
      { title: '设计系统管理者角色演进', images: ['/works/13.能力沉淀/p3.png', '/works/13.能力沉淀/p4.png', '/works/13.能力沉淀/p5.png'] },
      { title: 'AI 驱动的研发新范式', images: ['/works/13.能力沉淀/p6.png', '/works/13.能力沉淀/p7.png', '/works/13.能力沉淀/p8.png'] },
      { title: '数据化设计系统架构', images: ['/works/13.能力沉淀/p9.png', '/works/13.能力沉淀/p10.png', '/works/13.能力沉淀/p11.png'] },
      { title: 'Token 系统建设与落地实践', images: ['/works/13.能力沉淀/p12.png', '/works/13.能力沉淀/p13.png', '/works/13.能力沉淀/p14.png'] },
    ],
  },
]

// Get all modal (popup) image paths for background preloading
export function getModalImagePaths() {
  const paths = []
  PROJECTS.forEach((p) => {
    if (p.banner && !p.hideBanner) paths.push(p.banner)
    p.sections.forEach((s) => {
      if (s.images) {
        s.images.forEach((img) => {
          if (typeof img === 'string') paths.push(img)
          else if (img.src) paths.push(img.src)
        })
      }
    })
  })
  return paths
}

// Get all cover image paths for loading screen preload
export function getCoverPaths() {
  return PROJECTS.map((p) => p.cover)
}

export default function Portfolio({ onCloseModal }) {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // Register closeModal with parent so navigation can close the modal
  useEffect(() => {
    if (onCloseModal) {
      onCloseModal(() => setModalOpen(false))
    }
  }, [onCloseModal])

  const items = useMemo(() => PROJECTS.map((p) => ({
    image: p.cover,
    text: p.name,
  })), [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          )
          observer.unobserve(section)
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const openModal = useCallback((index = 0) => {
    setActiveIndex(index)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  return (
    <section ref={sectionRef} className="portfolio fs-section">
      <div className="portfolio-header-bar" ref={headerRef} style={{ opacity: 0 }}>
        <div className="portfolio-header-left">
          <div className="portfolio-label">SELECTED CASE HIGHLIGHTS</div>
          <h2 className="portfolio-title-sm">精选作品</h2>
        </div>
        <button className="portfolio-all-btn" onClick={() => openModal(0)}>
          全部作品
        </button>
      </div>

      <div className="circular-gallery-wrapper">
        <div className="pixel-blast-bg">
          <PixelBlast
            variant="circle"
            pixelSize={4}
            color="#757575"
            patternScale={3}
            patternDensity={0.8}
            pixelSizeJitter={0.5}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.6}
            edgeFade={0.16}
            transparent
          />
        </div>
        <CircularGallery
          items={items}
          bend={3}
          textColor="#1a1a1a"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
          scale={0.667}
          onItemClick={openModal}
        />
      </div>

      {modalOpen && (
        <Suspense fallback={null}>
          <ProjectModal
            open={modalOpen}
            projects={PROJECTS}
            activeIndex={activeIndex}
            onClose={closeModal}
            onIndexChange={setActiveIndex}
          />
        </Suspense>
      )}
    </section>
  )
}
