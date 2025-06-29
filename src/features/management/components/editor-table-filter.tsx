import { useSession } from '@/features/shared/hooks/shared-session.hook'
import { useState } from 'react'
import { css, cx } from '~styled-system/css'

// 🎯 Styles des filtres
const filtersContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  margin: '0 auto',
  width: 'min(94%, 1400px)',
  padding: '16px 0',
  borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
  marginBottom: '16px'
})

const filterGroupStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
})

const filterLabelStyle = css({
  fontSize: '12px',
  color: '#94a3b8',
  fontWeight: '500',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
})

const filterButtonStyle = css({
  padding: '6px 12px',
  background: 'rgba(30, 41, 59, 0.4)',
  border: '1px solid rgba(148, 163, 184, 0.2)',
  borderRadius: '6px',
  color: '#94a3b8',
  fontSize: '12px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  textTransform: 'capitalize',

  '&:hover': {
    background: 'rgba(30, 41, 59, 0.6)',
    borderColor: 'rgba(148, 163, 184, 0.3)',
    color: '#cbd5e1'
  }
})

// ✨ Style séparé pour l'état actif
const filterButtonActiveStyle = css({
  background: 'rgba(59, 130, 246, 0.2) !important',
  borderColor: 'rgba(59, 130, 246, 0.4) !important',
  color: '#bfdbfe !important',

  '&:hover': {
    background: 'rgba(59, 130, 246, 0.3) !important',
    borderColor: 'rgba(59, 130, 246, 0.5) !important',
    color: '#dbeafe !important'
  }
})

const buttonGroupStyle = css({
  display: 'flex',
  gap: '6px'
})

const clearFiltersStyle = css({
  padding: '6px 12px',
  background: 'transparent',
  border: '1px solid rgba(148, 163, 184, 0.2)',
  borderRadius: '4px',
  color: '#94a3b8',
  fontSize: '11px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  textTransform: 'uppercase',
  letterSpacing: '0.3px',

  '&:hover': {
    background: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    color: '#ef4444'
  }
})

// Interface pour les filtres
interface FiltersProps {
  onFiltersChange: (filters: FilterState) => void
}

export interface FilterState {
  category: string
  role: string
  dateRange: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export default function TableFilters ({ onFiltersChange }: FiltersProps) {
  const { data } = useSession()
  const listNames = data?.data.allListsDetails.listNames.slice(1)

  const [filters, setFilters] = useState<FilterState>({
    category: '',
    role: '',
    dateRange: '',
    sortBy: 'created_at',
    sortOrder: 'desc'
  })

  const updateFilter = (
    key: keyof FilterState,
    value: string | 'asc' | 'desc'
  ) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const toggleFilter = (key: keyof FilterState, value: string) => {
    const newValue = filters[key] === value ? '' : value
    updateFilter(key, newValue)
  }

  const clearAllFilters = () => {
    const resetFilters: FilterState = {
      category: '',
      role: '',
      dateRange: '',
      sortBy: 'created_at',
      sortOrder: 'desc'
    }
    setFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  const activeFiltersCount = Object.values(filters).filter((value, index) => {
    // Ignorer sortBy et sortOrder par défaut
    if (index >= 3) return false
    return value !== ''
  }).length

  return (
    <div className={filtersContainerStyle}>
      {/* Filtre par catégorie */}
      <div className={filterGroupStyle}>
        <span className={filterLabelStyle}>Category:</span>
        <div className={buttonGroupStyle}>
          {listNames?.map((list, index) => {
            const isActive = filters.category === list
            return (
              <button
                key={index}
                className={cx(
                  filterButtonStyle,
                  isActive && filterButtonActiveStyle
                )}
                onClick={() => toggleFilter('category', list)}
              >
                {list}
              </button>
            )
          })}
        </div>
      </div>

      {/* Filtre par rôle */}
      <div className={filterGroupStyle}>
        <span className={filterLabelStyle}>Role:</span>
        <div className={buttonGroupStyle}>
          <button
            className={cx(
              filterButtonStyle,
              filters.role === 'Administrator' && filterButtonActiveStyle
            )}
            onClick={() => toggleFilter('role', 'Administrator')}
          >
            Administrator
          </button>
          <button
            className={cx(
              filterButtonStyle,
              filters.role === 'Moderator' && filterButtonActiveStyle
            )}
            onClick={() => toggleFilter('role', 'Moderator')}
          >
            Moderator
          </button>
        </div>
      </div>

      {/* Filtre par date */}
      <div className={filterGroupStyle}>
        <span className={filterLabelStyle}>Period:</span>
        <div className={buttonGroupStyle}>
          <button
            className={cx(
              filterButtonStyle,
              filters.dateRange === 'today' && filterButtonActiveStyle
            )}
            onClick={() => toggleFilter('dateRange', 'today')}
          >
            Today
          </button>
          <button
            className={cx(
              filterButtonStyle,
              filters.dateRange === 'week' && filterButtonActiveStyle
            )}
            onClick={() => toggleFilter('dateRange', 'week')}
          >
            Week
          </button>
          <button
            className={cx(
              filterButtonStyle,
              filters.dateRange === 'month' && filterButtonActiveStyle
            )}
            onClick={() => toggleFilter('dateRange', 'month')}
          >
            Month
          </button>
        </div>
      </div>

      {/* Tri */}
      <div className={filterGroupStyle}>
        <span className={filterLabelStyle}>Sort:</span>
        <div className={buttonGroupStyle}>
          <button
            className={cx(
              filterButtonStyle,
              filters.sortBy === 'created_at' && filterButtonActiveStyle
            )}
            onClick={() => updateFilter('sortBy', 'created_at')}
          >
            Date
          </button>
          <button
            className={cx(
              filterButtonStyle,
              filters.sortBy === 'word' && filterButtonActiveStyle
            )}
            onClick={() => updateFilter('sortBy', 'word')}
          >
            Word
          </button>
          <button
            className={cx(
              filterButtonStyle,
              filters.sortOrder === 'asc' && filterButtonActiveStyle
            )}
            onClick={() =>
              updateFilter(
                'sortOrder',
                filters.sortOrder === 'asc' ? 'desc' : 'asc'
              )
            }
          >
            {filters.sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Bouton effacer tous les filtres */}
      {activeFiltersCount > 0 && (
        <button className={clearFiltersStyle} onClick={clearAllFilters}>
          Clear ({activeFiltersCount})
        </button>
      )}
    </div>
  )
}

// Fonction utilitaire pour filtrer les données
export const applyFilters = (
  listNames: any,
  elements: any[],
  filters: FilterState
) => {
  let filteredData = [...elements]

  if (filters.category) {
    filteredData = filteredData.filter(row => {
      for (const list of listNames || []) {
        if (filters.category === list) {
          return row[list] === 1
        }
      }
      return false
    })
  }

  if (filters.role) {
    filteredData = filteredData.filter(item => item.role === filters.role)
  }

  // Filtre par date
  if (filters.dateRange) {
    const now = new Date()

    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.created_at)

      switch (filters.dateRange) {
        case 'today':
          return itemDate.toDateString() === now.toDateString()
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          return itemDate >= weekAgo
        case 'month':
          const monthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
          )
          return itemDate >= monthAgo
        case 'year':
          const yearAgo = new Date(
            now.getFullYear() - 1,
            now.getMonth(),
            now.getDate()
          )
          return itemDate >= yearAgo
        default:
          return true
      }
    })
  }

  filteredData.sort((a, b) => {
    let aValue: any, bValue: any

    switch (filters.sortBy) {
      case 'word':
        aValue = a.word?.toLowerCase() || ''
        bValue = b.word?.toLowerCase() || ''
        break
      case 'username':
        aValue = a.username?.toLowerCase() || ''
        bValue = b.username?.toLowerCase() || ''
        break
      case 'created_at':
      default:
        aValue = new Date(a.created_at)
        bValue = new Date(b.created_at)
        break
    }

    if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1
    if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1
    return 0
  })

  return filteredData
}
