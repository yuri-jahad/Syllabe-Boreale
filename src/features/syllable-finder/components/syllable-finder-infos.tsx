import SearchInput from '@features/shared/components/input-search/input-search'
import { WordInfosCSS } from '@features/syllable-finder/components/syllable-finder.style'
import ListsGallery from '@shared/components/lists-gallery/lists-gallery'
import PanelInfos from '@shared/components/panel-infos/panel-infos'
import { useEffect } from 'react'
import { useSyllablesSection, useNavigation } from '@/store/store'
import type { ChangeEvent } from 'react'
import { useFindSyllables } from '../hooks/syllable-finder.hooks'
import HeaderSpecs from '@shared/components/header/header-specs'
import SyllablesInfosBody from './syllable-finder-central'
import { useAuth } from '@auth/hooks/auth.hooks'

export default function SyllablesInfos () {
  const { syllablesList, setSyllablesList, clearSyllablesCache } =
    useSyllablesSection()

  const { currentList, currentPatternSyllable, setCurrentPatternSyllable } =
    useNavigation()
  const { user } = useAuth()

  const findSyllables = useFindSyllables()

  useEffect(() => {
    if (currentPatternSyllable && currentList && !findSyllables.isPending) {
      findSyllables.mutate({
        searchParams: {
          pattern: currentPatternSyllable,
          listname: currentList
        }
      })
    }
  }, [currentPatternSyllable, currentList])

  useEffect(() => {
    if (findSyllables.isSuccess && findSyllables.data) {
      setSyllablesList(findSyllables.data)
    }
  }, [findSyllables.isSuccess, findSyllables.data, setSyllablesList])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCurrentPatternSyllable(value)

    if (value.length === 0) {
      clearSyllablesCache()
    }
  }

  return (
    <div style={{ width: '90vw', height: '88vh' }}>
      <div className={WordInfosCSS}>
        <HeaderSpecs
          total={syllablesList?.total || 0}
          spliced={syllablesList?.data?.length || 0}
          username={user?.username || ''}
        />
        <SearchInput
          handleOnChange={handleOnChange}
          placeholder='Rechercher des syllabes...'
        />

        {findSyllables.isError && (
          <div
            style={{
              color: 'rgba(255, 100, 100, 0.8)',
              padding: '10px',
              textAlign: 'center'
            }}
          >
            ❌ Erreur: {findSyllables.error?.message}
          </div>
        )}

        {!currentList && (
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              padding: '10px',
              textAlign: 'center'
            }}
          >
            ⚠️ Sélectionnez une liste pour commencer
          </div>
        )}

        <SyllablesInfosBody />
        <ListsGallery />
      </div>
      <PanelInfos />
    </div>
  )
}
