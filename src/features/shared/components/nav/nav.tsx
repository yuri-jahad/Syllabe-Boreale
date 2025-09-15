import {
  NavCSS,
  UlCSS,
  navLinkCSS,
  navLinkActiveCSS,
  AsideCSS,
  BurgerButtonCSS,
  BurgerLineCSS,
  MobileLogoutCSS, 
  OverlayCSS
} from '@shared/components/nav/nav.style'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import Logout from '@shared/components/logout/logout'

const menuItems = [
  { path: '/dashboard/home', label: 'HOME' },
  { path: '/dashboard/word-finder', label: 'WORDS' },
  { path: '/dashboard/syllable-finder', label: 'SYLLABLES' },
  { path: '/dashboard/chart', label: 'CHART' },
  { path: '/dashboard/management', label: 'MANAGEMENT' },
  { path: '/dashboard/settings', label: 'SETTING' }
]

export default function Nav () {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Bouton Burger */}
      <button
        className={BurgerButtonCSS}
        onClick={toggleMobileMenu}
        aria-label='Menu de navigation'
      >
        <div
          className={BurgerLineCSS}
          style={{
            transform: isMobileMenuOpen
              ? 'rotate(45deg) translate(5px, 5px)'
              : 'none'
          }}
        />
        <div
          className={BurgerLineCSS}
          style={{
            opacity: isMobileMenuOpen ? '0' : '1'
          }}
        />
        <div
          className={BurgerLineCSS}
          style={{
            transform: isMobileMenuOpen
              ? 'rotate(-45deg) translate(7px, -6px)'
              : 'none'
          }}
        />
      </button>

      {isMobileMenuOpen && (
        <div className={`${OverlayCSS} open`} onClick={closeMobileMenu} />
      )}

      <aside className={AsideCSS}>
        <nav className={`${NavCSS} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className={UlCSS}>
            {menuItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  from='/dashboard'
                  className={navLinkCSS}
                  activeProps={{
                    className: navLinkActiveCSS
                  }}
                  activeOptions={{ exact: false }}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={MobileLogoutCSS}>
            <Logout />
          </div>
        </nav>
      </aside>
    </>
  )
}
