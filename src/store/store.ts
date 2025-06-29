import { useMemo } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { api } from '@eden'

type FindWordsResponse = Awaited<
  ReturnType<typeof api.api.vocabulary['find-words']['post']>
>['data']

export type ListId = string
export type ListIds = ListId[]

interface WordToAdd {
  name: string
  tags: ListId[]
}

interface AppState {
  // Modal state
  modalIsOpen: boolean
  editRowSelected: any

  // Modal form state
  modalWordName: string
  modalWordTags: ListIds
  modalIsLoading: boolean

  // Add Words Modal state
  addWordsModalWords: WordToAdd[]
  addWordsCurrentWord: string

  // Data management
  dataManagement: any | null

  // === SECTION MOTS ===
  wordsList: FindWordsResponse | null
  wordDefinitions: string | null
  wordSelected: string

  // === SECTION SYLLABES ===
  syllableManagement: string
  syllablesList: FindWordsResponse | null
  syllablesDefinitions: string | null
  syllableSelected: string
  syllableWordsList: FindWordsResponse | null
  syllableWordSelected: string
  syllableWordDefinitions: string | null

  // Navigation state
  currentList: ListId
  currentPatternWord: string
  currentPatternSyllable: string
  currentPatternSyllableWord: string
}

interface AppActions {
  // Modal actions
  openModal: (row: any) => void
  closeModal: () => void

  // Modal form actions
  setModalWordName: (name: string) => void
  setModalWordTags: (tags: ListIds) => void
  toggleModalWordTag: (tag: ListId) => void
  removeModalWordTag: (tag: ListId) => void
  setModalIsLoading: (loading: boolean) => void
  resetModalForm: () => void

  // Add Words Modal actions
  setAddWordsCurrentWord: (word: string) => void
  addWordToList: (word: string) => void
  removeWordFromList: (index: number) => void
  toggleWordTagInList: (wordIndex: number, tag: ListId) => void
  clearAddWordsList: () => void

  // Data actions
  setDataManagement: (data: any | null) => void

  // === ACTIONS SECTION MOTS ===
  setWordsList: (list: FindWordsResponse) => void
  setWordDefinitions: (def: string | null) => void
  setWordSelected: (word: string) => void
  clearWordsCache: () => void

  // === ACTIONS SECTION SYLLABES ===
  setSyllableManagement: (syllable: string) => void
  setSyllablesList: (list: FindWordsResponse) => void
  setSyllablesDefinitions: (def: string | null) => void
  setSyllableSelected: (syllable: string) => void
  setSyllableWordsList: (list: FindWordsResponse) => void
  setSyllableWordSelected: (word: string) => void
  setSyllableWordDefinitions: (def: string | null) => void
  clearSyllablesCache: () => void

  // Navigation actions
  setCurrentList: (listId: ListId) => void
  setCurrentPatternWord: (pattern: string) => void
  setCurrentPatternSyllable: (pattern: string) => void
  setCurrentPatternSyllableWord: (pattern: string) => void

  // Cache global
  clearAllCache: () => void
}

type AppStore = AppState & AppActions

const getTagsFromRow = (row: any): ListIds => {
  return [
    'word',
    ...Object.keys(row).filter(key => key.startsWith('is_') && row[key])
  ]
}

export const useStore = create<AppStore>()(
  devtools((set, get) => ({
    // État initial
    modalIsOpen: false,
    editRowSelected: null,
    modalWordName: '',
    modalWordTags: ['word'],
    modalIsLoading: false,
    addWordsModalWords: [],
    addWordsCurrentWord: '',
    dataManagement: null,

    // Section mots
    wordsList: null,
    wordDefinitions: null,
    wordSelected: 'hello',

    // Section syllabes
    syllableManagement: 'edition',
    syllablesList: null,
    syllablesDefinitions: null,
    syllableSelected: 'oh',
    syllableWordsList: null,
    syllableWordSelected: 'oh',
    syllableWordDefinitions: null,

    // Navigation
    currentList: 'word' as ListId,
    currentPatternWord: 'hello',
    currentPatternSyllable: 'oh',
    currentPatternSyllableWord: 'oh',

    // Modal actions
    openModal: row => {
      const currentState = get()
      if (currentState.modalIsOpen && currentState.editRowSelected === row)
        return

      set({
        modalIsOpen: true,
        editRowSelected: row,
        modalWordName: row.word,
        modalWordTags: getTagsFromRow(row),
        modalIsLoading: false
      })
    },

    closeModal: () => {
      const currentState = get()
      if (!currentState.modalIsOpen) return

      set({
        modalIsOpen: false,
        editRowSelected: null,
        modalWordName: '',
        modalWordTags: ['word'],
        modalIsLoading: false
      })
    },

    setModalWordName: name => set({ modalWordName: name }),
    setModalWordTags: tags => set({ modalWordTags: tags }),

    toggleModalWordTag: tag => {
      const { modalWordTags } = get()
      if (tag === 'word') return

      set({
        modalWordTags: modalWordTags.includes(tag)
          ? modalWordTags.filter(t => t !== tag)
          : [...modalWordTags, tag]
      })
    },

    removeModalWordTag: tag => {
      if (tag === 'word') return
      const { modalWordTags } = get()
      set({ modalWordTags: modalWordTags.filter(t => t !== tag) })
    },

    setModalIsLoading: loading => set({ modalIsLoading: loading }),
    resetModalForm: () =>
      set({
        modalWordName: '',
        modalWordTags: ['word'],
        modalIsLoading: false
      }),

    // Add Words Modal actions
    setAddWordsCurrentWord: word => set({ addWordsCurrentWord: word }),

    addWordToList: word => {
      const { addWordsModalWords } = get()
      set({
        addWordsModalWords: [
          ...addWordsModalWords,
          { name: word, tags: ['word'] }
        ],
        addWordsCurrentWord: ''
      })
    },

    removeWordFromList: index => {
      const { addWordsModalWords } = get()
      set({
        addWordsModalWords: addWordsModalWords.filter((_, i) => i !== index)
      })
    },

    toggleWordTagInList: (wordIndex, tag) => {
      if (tag === 'word') return
      const { addWordsModalWords } = get()

      const updatedWords = addWordsModalWords.map((word, index) => {
        if (index !== wordIndex) return word

        const hasTag = word.tags.includes(tag)
        return {
          ...word,
          tags: hasTag ? word.tags.filter(t => t !== tag) : [...word.tags, tag]
        }
      })

      set({ addWordsModalWords: updatedWords })
    },

    clearAddWordsList: () =>
      set({
        addWordsModalWords: [],
        addWordsCurrentWord: ''
      }),

    // Data actions
    setDataManagement: data => {
      const currentState = get()
      if (currentState.dataManagement === data) return
      set({ dataManagement: data })
    },

    // === ACTIONS SECTION MOTS ===
    setWordsList: list => set({ wordsList: list }),
    setWordDefinitions: def => set({ wordDefinitions: def }),
    setWordSelected: word => set({ wordSelected: word }),
    clearWordsCache: () =>
      set({
        wordsList: null,
        wordDefinitions: null,
        wordSelected: ''
      }),

    // === ACTIONS SECTION SYLLABES ===
    setSyllableManagement: syllable => {
      const currentState = get()
      if (currentState.syllableManagement === syllable) return
      set({ syllableManagement: syllable })
    },

    setSyllablesList: list => set({ syllablesList: list }),
    setSyllablesDefinitions: def => set({ syllablesDefinitions: def }),
    setSyllableSelected: syllable =>
      set({
        syllableSelected: syllable,
        syllableWordSelected: '', // Reset mot sélectionné
        syllableWordDefinitions: null // Reset définitions
      }),
    setSyllableWordsList: list => set({ syllableWordsList: list }),
    setSyllableWordSelected: word => set({ syllableWordSelected: word }),
    setSyllableWordDefinitions: def => set({ syllableWordDefinitions: def }),

    clearSyllablesCache: () =>
      set({
        syllablesList: null,
        syllablesDefinitions: null,
        syllableSelected: '',
        syllableWordsList: null,
        syllableWordSelected: '',
        syllableWordDefinitions: null
      }),

    // Navigation actions
    setCurrentList: listId => set({ currentList: listId }),
    setCurrentPatternWord: pattern => set({ currentPatternWord: pattern }),
    setCurrentPatternSyllableWord: pattern =>
      set({ currentPatternSyllableWord: pattern }),
    setCurrentPatternSyllable: pattern =>
      set({ currentPatternSyllable: pattern }),

    // Cache global
    clearAllCache: () =>
      set({
        dataManagement: null,
        wordsList: null,
        wordDefinitions: null,
        wordSelected: '',
        syllablesList: null,
        syllablesDefinitions: null,
        syllableSelected: '',
        syllableWordsList: null,
        syllableWordSelected: '',
        syllableWordDefinitions: null
      })
  }))
)

// === SELECTORS SECTION MOTS ===
export const useWordsList = () => useStore(state => state.wordsList)
export const useWordDefinitions = () => useStore(state => state.wordDefinitions)
export const useWordSelected = () => useStore(state => state.wordSelected)
export const useSetWordsList = () => useStore(state => state.setWordsList)
export const useSetWordDefinitions = () =>
  useStore(state => state.setWordDefinitions)
export const useSetWordSelected = () => useStore(state => state.setWordSelected)
export const useClearWordsCache = () => useStore(state => state.clearWordsCache)

// === SELECTORS SECTION SYLLABES ===
export const useSyllablesList = () => useStore(state => state.syllablesList)
export const useSyllablesDefinitions = () =>
  useStore(state => state.syllablesDefinitions)
export const useSyllableSelected = () =>
  useStore(state => state.syllableSelected)
export const useSyllableWordsList = () =>
  useStore(state => state.syllableWordsList)
export const useSyllableWordSelected = () =>
  useStore(state => state.syllableWordSelected)
export const useSyllableWordDefinitions = () =>
  useStore(state => state.syllableWordDefinitions)

export const useSetSyllablesList = () =>
  useStore(state => state.setSyllablesList)
export const useSetSyllablesDefinitions = () =>
  useStore(state => state.setSyllablesDefinitions)
export const useSetSyllableSelected = () =>
  useStore(state => state.setSyllableSelected)
export const useSetSyllableWordsList = () =>
  useStore(state => state.setSyllableWordsList)
export const useSetSyllableWordSelected = () =>
  useStore(state => state.setSyllableWordSelected)
export const useSetSyllableWordDefinitions = () =>
  useStore(state => state.setSyllableWordDefinitions)
export const useClearSyllablesCache = () =>
  useStore(state => state.clearSyllablesCache)

// === SELECTORS COMPOSÉS POUR SECTION MOTS ===
export const useWordsSection = () => {
  const wordsList = useWordsList()
  const wordDefinitions = useWordDefinitions()
  const wordSelected = useWordSelected()
  const setWordsList = useSetWordsList()
  const setWordDefinitions = useSetWordDefinitions()
  const setWordSelected = useSetWordSelected()
  const clearWordsCache = useClearWordsCache()

  return useMemo(
    () => ({
      wordsList,
      wordDefinitions,
      wordSelected,
      setWordsList,
      setWordDefinitions,
      setWordSelected,
      clearWordsCache
    }),
    [
      wordsList,
      wordDefinitions,
      wordSelected,
      setWordsList,
      setWordDefinitions,
      setWordSelected,
      clearWordsCache
    ]
  )
}

// === SELECTORS COMPOSÉS POUR SECTION SYLLABES ===
export const useSyllablesSection = () => {
  const syllablesList = useSyllablesList()
  const syllablesDefinitions = useSyllablesDefinitions()
  const syllableSelected = useSyllableSelected()
  const syllableWordsList = useSyllableWordsList()
  const syllableWordSelected = useSyllableWordSelected()
  const syllableWordDefinitions = useSyllableWordDefinitions()

  const setSyllablesList = useSetSyllablesList()
  const setSyllablesDefinitions = useSetSyllablesDefinitions()
  const setSyllableSelected = useSetSyllableSelected()
  const setSyllableWordsList = useSetSyllableWordsList()
  const setSyllableWordSelected = useSetSyllableWordSelected()
  const setSyllableWordDefinitions = useSetSyllableWordDefinitions()
  const clearSyllablesCache = useClearSyllablesCache()

  return useMemo(
    () => ({
      // État
      syllablesList,
      syllablesDefinitions,
      syllableSelected,
      syllableWordsList,
      syllableWordSelected,
      syllableWordDefinitions,

      // Actions
      setSyllablesList,
      setSyllablesDefinitions,
      setSyllableSelected,
      setSyllableWordsList,
      setSyllableWordSelected,
      setSyllableWordDefinitions,
      clearSyllablesCache
    }),
    [
      syllablesList,
      syllablesDefinitions,
      syllableSelected,
      syllableWordsList,
      syllableWordSelected,
      syllableWordDefinitions,
      setSyllablesList,
      setSyllablesDefinitions,
      setSyllableSelected,
      setSyllableWordsList,
      setSyllableWordSelected,
      setSyllableWordDefinitions,
      clearSyllablesCache
    ]
  )
}

// === SELECTORS EXISTANTS (conservés pour compatibilité) ===
export const useModalIsOpen = () => useStore(state => state.modalIsOpen)
export const useEditRowSelected = () => useStore(state => state.editRowSelected)
export const useDataManagement = () => useStore(state => state.dataManagement)
export const useSyllableManagement = () =>
  useStore(state => state.syllableManagement)

export const useModalWordName = () => useStore(state => state.modalWordName)
export const useModalWordTags = () => useStore(state => state.modalWordTags)
export const useModalIsLoading = () => useStore(state => state.modalIsLoading)

export const useAddWordsModalWords = () =>
  useStore(state => state.addWordsModalWords)
export const useAddWordsCurrentWord = () =>
  useStore(state => state.addWordsCurrentWord)

export const useCurrentList = () => useStore(state => state.currentList)
export const useCurrentPatternWord = () =>
  useStore(state => state.currentPatternWord)
export const useCurrentPatternSyllable = () =>
  useStore(state => state.currentPatternSyllable)

// Actions existantes
export const useOpenModal = () => useStore(state => state.openModal)
export const useCloseModal = () => useStore(state => state.closeModal)
export const useSetModalWordName = () =>
  useStore(state => state.setModalWordName)
export const useSetModalWordTags = () =>
  useStore(state => state.setModalWordTags)
export const useToggleModalWordTag = () =>
  useStore(state => state.toggleModalWordTag)
export const useRemoveModalWordTag = () =>
  useStore(state => state.removeModalWordTag)
export const useSetModalIsLoading = () =>
  useStore(state => state.setModalIsLoading)
export const useResetModalForm = () => useStore(state => state.resetModalForm)

export const useSetAddWordsCurrentWord = () =>
  useStore(state => state.setAddWordsCurrentWord)
export const useAddWordToList = () => useStore(state => state.addWordToList)
export const useRemoveWordFromList = () =>
  useStore(state => state.removeWordFromList)
export const useToggleWordTagInList = () =>
  useStore(state => state.toggleWordTagInList)
export const useClearAddWordsList = () =>
  useStore(state => state.clearAddWordsList)

export const useSetDataManagement = () =>
  useStore(state => state.setDataManagement)
export const useSetSyllableManagement = () =>
  useStore(state => state.setSyllableManagement)
export const useSetCurrentList = () => useStore(state => state.setCurrentList)
export const useSetCurrentPatternWord = () =>
  useStore(state => state.setCurrentPatternWord)
export const useSetCurrentPatternSyllable = () =>
  useStore(state => state.setCurrentPatternSyllable)
export const useClearAllCache = () => useStore(state => state.clearAllCache)

// Selectors composés existants
export const useModalForm = () => {
  const modalWordName = useModalWordName()
  const modalWordTags = useModalWordTags()
  const modalIsLoading = useModalIsLoading()
  const setModalWordName = useSetModalWordName()
  const setModalWordTags = useSetModalWordTags()
  const toggleModalWordTag = useToggleModalWordTag()
  const removeModalWordTag = useRemoveModalWordTag()
  const setModalIsLoading = useSetModalIsLoading()
  const resetModalForm = useResetModalForm()

  return useMemo(
    () => ({
      name: modalWordName,
      tags: modalWordTags,
      isLoading: modalIsLoading,
      setName: setModalWordName,
      setTags: setModalWordTags,
      toggleTag: toggleModalWordTag,
      removeTag: removeModalWordTag,
      setLoading: setModalIsLoading,
      resetForm: resetModalForm
    }),
    [
      modalWordName,
      modalWordTags,
      modalIsLoading,
      setModalWordName,
      setModalWordTags,
      toggleModalWordTag,
      removeModalWordTag,
      setModalIsLoading,
      resetModalForm
    ]
  )
}

export const useAddWordsModal = () => {
  const words = useAddWordsModalWords()
  const currentWord = useAddWordsCurrentWord()
  const setCurrentWord = useSetAddWordsCurrentWord()
  const addWord = useAddWordToList()
  const removeWord = useRemoveWordFromList()
  const toggleWordTag = useToggleWordTagInList()
  const clearWords = useClearAddWordsList()

  return useMemo(
    () => ({
      words,
      currentWord,
      setCurrentWord,
      addWord,
      removeWord,
      toggleWordTag,
      clearWords
    }),
    [
      words,
      currentWord,
      setCurrentWord,
      addWord,
      removeWord,
      toggleWordTag,
      clearWords
    ]
  )
}

export const useNavigation = () => {
  const currentList = useCurrentList()
  const currentPatternWord = useCurrentPatternWord()
  const currentPatternSyllable = useCurrentPatternSyllable()
  const setCurrentList = useSetCurrentList()
  const setCurrentPatternWord = useSetCurrentPatternWord()
  const setCurrentPatternSyllable = useSetCurrentPatternSyllable()

  return useMemo(
    () => ({
      currentList,
      currentPatternWord,
      currentPatternSyllable,
      setCurrentList,
      setCurrentPatternWord,
      setCurrentPatternSyllable
    }),
    [
      currentList,
      currentPatternWord,
      currentPatternSyllable,
      setCurrentList,
      setCurrentPatternWord,
      setCurrentPatternSyllable
    ]
  )
}

export const useModal = () => {
  const isOpen = useModalIsOpen()
  const editRow = useEditRowSelected()
  const openModal = useOpenModal()
  const closeModal = useCloseModal()

  return useMemo(
    () => ({
      isOpen,
      editRow,
      openModal,
      closeModal
    }),
    [isOpen, editRow, openModal, closeModal]
  )
}

// Compatibilité
export const useCurrentListData = () => useStore(state => state.currentList)
export const useModalState = () => useStore(state => state.modalIsOpen)
