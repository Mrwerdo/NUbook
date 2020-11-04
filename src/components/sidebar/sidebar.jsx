import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import style from './sidebar.module.css'
import SectionPicker from './section-picker'

const getLinkProps = ({ isCurrent }) => {
  return {
    className: `${style.link} ${isCurrent ? `${style.linkActive}` : ''}`,
  }
}

const Sidebar = ({ menu, currentSection }) => {
  const sidebarEl = useRef(null)

  // Scroll to reveal the active link on mount
  useEffect(() => {
    const activeLink = sidebarEl.current.querySelector(`.${style.linkActive}`)

    if (activeLink) {
      activeLink.scrollIntoView({ block: 'center', inline: 'nearest' })

      // Sometimes `scrollIntoView` scrolls the main content, so we reset it here
      document.documentElement.scrollTop = 0
    }
  }, [])

  return (
    <nav ref={sidebarEl}>
      <div className='mb-8'>
        <SectionPicker sections={menu} currentSection={currentSection} />
      </div>

      {currentSection.chapters.map(chapter => {
        return (
          <div className='mb-8' key={chapter.title}>
            <div className={style.chapterTitle}>{chapter.title}</div>
            {chapter.pages.map(page => (
              <Link to={page.slug} key={page.slug} getProps={getLinkProps}>
                {page.title}
              </Link>
            ))}
          </div>
        )
      })}
    </nav>
  )
}

Sidebar.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentSection: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    chapters: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        pages: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }),
}

export default Sidebar
