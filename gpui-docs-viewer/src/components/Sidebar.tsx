import { Link, useLocation } from 'react-router-dom'
import { docsData } from '../data/docs'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation()

  const renderNavItem = (item: typeof docsData[0], level = 0) => {
    const isActive = location.pathname === `/${item.path}`
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.path} className="nav-item">
        <Link
          to={`/${item.path}`}
          className={`nav-link ${isActive ? 'active' : ''}`}
          style={{ paddingLeft: `${level * 1.5 + 0.75}rem` }}
          onClick={() => {
            if (window.innerWidth < 768) {
              onToggle()
            }
          }}
        >
          {item.title}
        </Link>
        {hasChildren && (
          <div className="nav-children">
            {item.children!.map((child) => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h1>GPUI 文档</h1>
      </div>
      <nav className="sidebar-nav">
        {docsData.map((item) => renderNavItem(item))}
      </nav>
    </aside>
  )
}

