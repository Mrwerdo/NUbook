import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import IconTeam from './icons/icon-team.svg'
import IconSystem from './icons/icon-system.svg'
import IconGuides from './icons/icon-guides.svg'
import IconChevronDown from './icons/icon-chevron-down.svg'

const iconMap = {
  Team: IconTeam,
  System: IconSystem,
  Guides: IconGuides,
}

const SectionPicker = ({ sections, currentSection }) => {
  const CurrentSectionIcon = iconMap[currentSection.title]
  const [dropdownOpen, setDropdownOpen] = useState(false)
  return (
    <div className='relative -ml-4 -mr-1'>
      <button
        className='flex bg-gray-900 px-4 rounded w-full py-3 lg:py-2 focus:shadow-outline'
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <CurrentSectionIcon className='text-white' />
        <span className='ml-3 font-semibold text-white'>
          {currentSection.title}
        </span>
        <IconChevronDown className='ml-auto w-5 text-white' />
      </button>

      <div
        className={`overflow-hidden bg-white rounded mt-1 absolute top-auto w-full z-10 ${
          dropdownOpen ? '' : 'hidden'
        }`}
        style={{
          boxShadow: `0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 12px 1px rgba(0,0,0,0.12), 0 3px 8px 1px rgba(0,0,0,0.12)`,
        }}
      >
        {sections.map(section => {
          const isActive = section.slug === currentSection.slug
          const Icon = iconMap[section.title]
          return (
            <Link
              to={section.slug}
              key={section.slug}
              className={`flex px-4 py-3 lg:py-2 hover:bg-gray-100 ${
                isActive ? 'bg-nubots-500 hover:bg-nubots-500' : ''
              }`}
            >
              <Icon className={isActive ? 'text-white' : 'text-gray-600'} />
              <span
                className={`ml-3 ${isActive ? 'text-white font-semibold' : ''}`}
              >
                {section.title}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

SectionPicker.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentSection: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
}

export default SectionPicker
