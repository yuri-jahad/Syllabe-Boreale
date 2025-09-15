import SearchInput from '@features/shared/components/input-search/input-search'
import ListsGallery from '@shared/components/lists-gallery/lists-gallery'
import { useEffect, useState, Suspense, lazy, useRef } from 'react'
import { useSyllablesSection, useNavigation } from '@/store/store'
import type { ChangeEvent } from 'react'
import { useFindSyllables } from '../hooks/syllable-finder.hooks'
import HeaderSpecs from '@shared/components/header/header-specs'
import { useAuth } from '@auth/hooks/auth.hooks'
import { useDebouncedEffect } from '@shared/hooks/shared-use-debounced-effect'
import { SearchContainerCSS } from '@shared/generic/generic.style'
import { useQueryClient } from '@tanstack/react-query'

const SyllablesInfosBody = lazy(() => import('./syllable-finder-central'))

const PageSkeleton = () => (
  <div>
    <div className={SearchContainerCSS}>
      <div
        style={{
          padding: '20px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          marginBottom: '16px',
          opacity: 0.7
        }}
      >
        Loading...
      </div>
      <div
        style={{
          height: '40px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          marginBottom: '16px',
          opacity: 0.5
        }}
      />
      <div
        style={{
          height: '300px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          opacity: 0.3
        }}
      />
    </div>
  </div>
)

export default function SyllablesInfos () {
  const [isReady, setIsReady] = useState(false)
  const queryClient = useQueryClient()
  const lastSearchRef = useRef<string>('')

  const { syllablesList, setSyllablesList, clearSyllablesCache } =
    useSyllablesSection()
  const { currentList, currentPatternSyllable, setCurrentPatternSyllable } =
    useNavigation()
  const { user } = useAuth()
  const findSyllables = useFindSyllables()

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 16)
    return () => clearTimeout(timer)
  }, [])

  useDebouncedEffect(() => {
    if (currentPatternSyllable && currentList && !findSyllables.isPending) {
      const searchKey = `${currentPatternSyllable}-${currentList}`

      if (lastSearchRef.current === searchKey) {
        return
      }

      const cacheKey = ['findSyllables', currentPatternSyllable, currentList]
      const cachedData = queryClient.getQueryData(cacheKey)

      if (cachedData) {
        //@ts-ignore
        setSyllablesList(cachedData)
        return
      }

      lastSearchRef.current = searchKey
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

  useEffect(() => {
    return () => {
      lastSearchRef.current = ''
    }
  }, [currentPatternSyllable, currentList])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCurrentPatternSyllable(value)
    if (value.length === 0) {
      clearSyllablesCache()
      lastSearchRef.current = ''
    }
  }

  if (!isReady) {
    return <PageSkeleton />
  }

  return (
    <div>
      <div className={SearchContainerCSS}>
        <HeaderSpecs
          total={syllablesList?.total || 0}
          spliced={syllablesList?.data?.length || 0}
          username={user?.username || ''}
        />

        <SearchInput
          handleOnChange={handleOnChange}
          placeholder='Search for syllables...'
        />

        {findSyllables.isError && (
          <div
            style={{
              color: 'rgba(255, 100, 100, 0.8)',
              padding: '10px',
              textAlign: 'center'
            }}
          >
            ❌ Error: {findSyllables.error?.message}
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
            ⚠️ Select a list to get started
          </div>
        )}

        <Suspense
          fallback={
            <div
              style={{
                height: '300px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.7
              }}
            >
              Loading content...
            </div>
          }
        >
          <SyllablesInfosBody />
        </Suspense>

        <Suspense
          fallback={<div style={{ height: '100px', opacity: 0.5 }}>...</div>}
        >
          <ListsGallery />
        </Suspense>
      </div>
    </div>
  )
}