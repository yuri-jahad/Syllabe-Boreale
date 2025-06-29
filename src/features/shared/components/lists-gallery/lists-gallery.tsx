import {
  ListsGalleryCSS,
  ListCSS
} from '@shared/components/lists-gallery/lists-gallery.style'
import { useStore } from '@/store/store'
import { useSession } from '@shared/hooks/shared-session.hook' // ✅ Import du hook
import { colors } from '../../global/global.token'

export default function ListsGallery () {
  const { data: sessionData, isLoading, error } = useSession()
  const { setCurrentList, currentList } = useStore()

  const handleOnClick = (e: string) => {
    console.log(sessionData)
    setCurrentList(e)
  }

  // Gestion du loading
  if (isLoading) {
    return (
      <div className={ListsGalleryCSS}>
        <div>Chargement des listes...</div>
      </div>
    )
  }

  // Gestion des erreurs
  if (error) {
    return (
      <div className={ListsGalleryCSS}>
        <div>Erreur lors du chargement: {error.message}</div>
      </div>
    )
  }

  const listNames = sessionData?.data.allListsDetails.listNames || []

  if (!listNames || listNames.length === 0) {
    return (
      <div className={ListsGalleryCSS}>
        <div>Aucune liste disponible</div>
      </div>
    )
  }

  return (
    <div className={ListsGalleryCSS}>
      {listNames.map((listName: string, index: number) => (
        <div
          className={ListCSS}
          style={currentList === listName ? { backgroundColor:"#00a8d4" } : {}}
          key={`${listName}-${index}`}
          onClick={() => handleOnClick(listName)}
        >
          {listName}
        </div>
      ))}
    </div>
  )
}
