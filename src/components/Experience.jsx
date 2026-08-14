import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import FallingText from './FallingText'

const STATS = [
  { value: '10', unit: '年+', label: 'UI 设计经验' },
  { value: '60', unit: '+', label: '项目落地参与' },
  { value: '4', unit: '端', label: '多端界面设计' },
  { value: 'AI', unit: '驱动', label: '自动化交付能力' },
]

const EXPERIENCES = [
  {
    company: '四川创力科技有限责任公司',
    year: '2026.01 - 2026.09',
    items: [
      'LDP3.0平台的优化迭代：专为服务政企客户数字化平台建设而打造的第三代LDP Web端设计体系。依托项目沉淀与实战经验，围绕"标准化、高效率、易实施"三大核心目标，全面升级了视觉设计语言、交互设计策略、内容组织方法与组件设计规范，为构建一致、清晰、高可维护的政企应用界面提供支撑。',
      'AI 工作流：提炼规范组件化的设计规范为 Agent 可识别的 skill 包，通过 MCP 使得设计人员协作的一致性和前端开发的效率提高60%以上。',
      '评审与质量管控：建立标准的设计变量库并以此通过 AI 执行设计评审、交互评审，保证全自动、全周期走查，确保高保真还原落地。',
    ],
  },
  {
    company: '中科院成都分院-中科信息（成都计算机研究所）',
    year: '2021.01 - 2025.08',
    items: [
      '全链路产品设计管理：主导G/B/C端多类型项目，统筹用户研究、产品规划、交互设计与界面实现，通过撰写结构清晰的PRD，在复杂项目中确保了跨团队对需求理解的一致性，使项目按时上线并确保体验一致性与产品目标达成。',
      '设计工程化推进：牵头制定并落地产品设计规范与组件体系，协同研发构建可视化脚手架，实现设计资源与代码组件同步更新，平均降低30%重复开发成本。',
      '评审与质量管控：建立并执行设计评审、交互评审机制，通过全周期走查确保高保真还原与体验细节落地。',
      '跨职能协同：紧密配合产品、研发及业务团队搭建脚手架平台，推动设计系统在实际项目中高效应用，助力多个重点项目交付周期缩短20%以上。',
      '团队培养与知识沉淀：建立团队定期培训与分享机制，内容涵盖设计手法、规范解读、行业趋势分析、交互逻辑及设计底层原理。主导输出设计师能力模型、交互设计原则与方法库，并整理为可复用的知识文档与培训课件，推动团队专业成长与设计方法论沉淀。',
    ],
  },
  {
    company: '北京悦禾旅游有限公司',
    year: '2017.07 - 2020.10',
    items: [
      '官网与用户体验设计：主导官网视觉体系与专题设计，通过埋点分析用户行为，设计迭代后，关键页面用户停留时间提升。',
      'IP设计与拓展：主导公司IP形象拓展，产出表情包、漫画及周边设计，完成其在新媒体与周边产品中的系列化落地，相关内容使新媒体渠道粉丝增长。',
      '新媒体视觉设计：包揽新媒体运营和线下物料的视觉全案设计。',
    ],
  },
  {
    company: '成都初唐网络科技股份有限公司',
    year: '2016.07 - 2017.06',
    items: [
      '专注于互联网房地产领域的C端产品设计，主导"楼市经纪人""楼市客立方""惠买房"等多款产品的整体交互与用户体验优化。',
      '基于用户行为数据分析与A/B测试，通过重构信息架构与核心交互流程，迭代"地图找房"等功能，推动日活跃用户（DAU）环比增长15%，显著提升用户体验，实现新用户次日留存率提升10%，核心页面转化率提升18%。',
    ],
  },
  {
    company: '好哇网(成都)信息技术股份有限公司',
    year: '2015.09 - 2016.06',
    items: [
      '负责公司产品UI设计，参与项目包括好小二、火掌柜、宽屏一体触摸点菜收银机，同时负责公司公众号、微博等宣传物料、海报的设计。',
    ],
  },
]

const SKILLS = [
  {
    title: '设计工具链',
    desc: '将工具作为设计工程化的支点',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: 'AI 驱动能力',
    desc: '将前沿技术转化为生产力',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
  },
  {
    title: '商业审美',
    desc: '不妥协的视觉品质，不跑偏的设计决策',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9z" />
        <path d="M11 3 8 9l4 13 4-13-3-6" />
        <line x1="2" y1="9" x2="22" y2="9" />
      </svg>
    ),
  },
  {
    title: '设计规范与知识沉淀',
    desc: '将设计经验与方法论系统化，输出可复用的设计规范、交互原则库及培训课件',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
]

function Timeline() {
  return (
    <div className="resume-timeline">
      <div className="timeline-track">
        <div className="timeline-track-inner">
          <div className="timeline-rail" />
          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className={`timeline-item-h${i === 0 ? ' popup-start' : ''}${i === EXPERIENCES.length - 1 ? ' popup-end' : ''}`}
            >
              <div className="timeline-node">
                <span className="timeline-bullet-h" />
                <div className="timeline-year-h">{exp.year}</div>
              </div>
              <div className="timeline-card">
                <div className="timeline-role">{exp.company}</div>
                <div className="timeline-popup">
                  {exp.items.map((item, j) => (
                    <div key={j} className="timeline-popup-item">
                      <span className="timeline-popup-num">O{j + 1}</span>
                      <span className="timeline-popup-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
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
    <section ref={sectionRef} className="experience fs-section">
      <div className="container">
        <div ref={cardRef} className="resume-card" style={{ opacity: 0 }}>
          {/* Top row: intro + stats */}
          <div className="resume-top">
            <div className="resume-intro">
              <div className="resume-label">RESUME 2026</div>
              <h2 className="resume-title">
                <span className="title-accent">设计</span><br />创造价值
              </h2>
              <div className="resume-signature">Hcy</div>
              <div className="resume-subtitle">视觉设计师 / UI 设计师 / 品牌设计师</div>
              <p className="resume-desc">
                专注于品牌视觉、界面体验与页面秩序，让复杂信息更清晰地被看见。
              </p>
            </div>
            <div className="resume-stats">
              {STATS.map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-value">
                    {stat.value}<span className="stat-unit">{stat.unit}</span>
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
              <div className="stat-text">
                <div className="stat-text-title">产品思维</div>
                <div className="stat-text-desc">熟悉产品、交互、设计、研发全流程，具备PRD撰写与需求管理能力，将业务带入设计使项目更贴合需求</div>
              </div>
            </div>
          </div>

          {/* Bottom row: quote + skills + education */}
          <div className="resume-bottom">
            <div className="resume-quote">
              <div className="quote-text">
                <div className="quote-mark">"</div>
                <p>设计不是让事物变得更复杂，而是建立更容易理解的视觉秩序。</p>
                <div className="quote-signature">~~~</div>
              </div>
              <img className="quote-decoration" src="/quote-decoration.svg" alt="decoration" />
            </div>

            <div className="resume-skills">
              <div className="skills-header">
                <span className="timeline-dot" />
                专业技能
              </div>
              <div className="skills-grid">
                {SKILLS.map((skill, i) => (
                  <div key={i} className="skill-text-card">
                    <div className="skill-text-icon">{skill.icon}</div>
                    <div className="skill-text-title">{skill.title}</div>
                    <div className="skill-text-desc">{skill.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="resume-education">
              <div className="edu-header">
                <svg className="edu-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
                  <path d="M15.5 8.5L13 13L8.5 15.5L11 11L15.5 8.5Z" fill="currentColor" />
                </svg>
                设计理念
              </div>
              <FallingText
                text="软件定义边界，AI拓展效率，但真正定义设计价值的，是我的经验深度、审美判断和对人性、需求的理解。这是我交付每一个项目的底气所在。"
                highlightWords={["软件定义边界", "AI拓展效率", "经验深度", "审美判断", "底气所在"]}
                highlightClass="highlighted"
                trigger="hover"
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.56}
                fontSize="1.02rem"
                mouseConstraintStiffness={0.9}
              />
            </div>
          </div>
        </div>

        {/* Timeline outside resume-card */}
        <div className="timeline-standalone">
          <Timeline />
        </div>
      </div>
    </section>
  )
}
