import {
  NavCSS,
  UlCSS,
  navLinkCSS,
  navLinkActiveCSS,
  AsideCSS
} from '@shared/components/nav/nav.style'
import { Link } from '@tanstack/react-router'

const menuItems = [
  { path: '/dashboard/home', label: 'HOME' },
  { path: '/dashboard/word-finder', label: 'WORDS' },
  { path: '/dashboard/syllable-finder', label: 'SYLLABLES' },
  { path: '/dashboard/chart', label: 'CHART' },
  { path: '/dashboard/management', label: 'MANAGEMENT' },
  { path: '/dashboard/settings', label: 'SETTING' }
]

export default function Nav () {
  return (
    <aside className={AsideCSS}>
      <nav className={NavCSS}>
        <ul className={UlCSS}>
          {menuItems.map(item => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={navLinkCSS}
                activeProps={{
                  className: navLinkActiveCSS
                }}
                activeOptions={{ exact: item.path === '/' }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
