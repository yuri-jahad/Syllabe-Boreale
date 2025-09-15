// hooks/useAvatar.ts - VERSION LOCALE OPTIMISÉE
import { api } from '@eden'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

// ✅ Types pour le service local
interface OptimizedUrls {
  original: string
  webp?: string
  large?: string
  medium?: string
  small?: string
}

interface AvatarMetadata {
  format: string
  width: number
  height: number
  bytes: number
  resource_type: string
  is_overwrite: boolean
  compression_ratio?: number
}

interface AvatarUsageStats {
  uploadsThisMonth: number
  localCount: number
  remainingUploads: number
  percentageUsed: number
  resetDate: string
  isNearLimit: boolean
  diskUsage: {
    totalFiles: number
    totalSizeMB: number
    averageCompressionRatio: number
    estimatedSavingsMB: number
  }
  storage_info?: {
    backend: string
    compression: string
    max_file_size_mb: number
    supported_formats: string[]
  }
}

interface UploadResponse {
  success: boolean
  message: string
  avatar: {
    url: string
    optimized: {
      large: OptimizedUrls
      medium: OptimizedUrls
      small: OptimizedUrls
    }
    metadata: AvatarMetadata
  }
  usage: AvatarUsageStats
  timestamp: string
}

export const useGetMyAvatar = () => {
  return useQuery({
    queryKey: ['avatar', 'me'],
    queryFn: async () => {
      const response = await api.auth.verify.get()
      if (response.error) throw response.error
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1
  })
}

export const useUploadAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file: File) => {
      const maxSize = 10 * 1024 * 1024
      if (file.size > maxSize) {
        throw new Error('File size too large. Maximum 10MB allowed.')
      }

      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/avif',
        'video/mp4',
        'video/webm',
        'video/mov',
        'video/quicktime'
      ]

      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          'Invalid file type. Only JPEG, PNG, GIF, WebP, AVIF, MP4, WebM and MOV are allowed.'
        )
      }

      console.log('🔄 Starting LOCAL avatar upload...', {
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        type: file.type
      })

      const response = await api.api.user.avatar.upload.post({ file })

      if (response.error) {
        throw new Error(response.error.error || 'Failed to upload avatar')
      }

      console.log('✅ LOCAL Avatar uploaded successfully:', {
        compression: response.data.avatar?.metadata?.compression_ratio,
        format: response.data.avatar?.metadata?.format,
        backend: response.data.usage?.storage_info?.backend
      })

      return response.data as UploadResponse
    },

    onSuccess: data => {
      const compressionRatio = data.avatar?.metadata?.compression_ratio || 0
      const isReplacement = data.avatar?.metadata?.is_overwrite

      console.log('✅ Avatar updated! Compression:', `${compressionRatio}%`)

      queryClient.invalidateQueries({ queryKey: ['avatar'] })
      queryClient.setQueryData(['avatar', 'me'], (oldData: any) => ({
        ...oldData,
        user: {
          ...oldData?.user,
          image_path: data.avatar?.url,
          optimized: data.avatar?.optimized
        }
      }))

      // ✅ Message de succès amélioré avec infos locales
      toast.success(
        `Avatar ${isReplacement ? 'remplacé' : 'uploadé'} ! ` +
          `Compression: ${compressionRatio}% • ` +
          `${data.usage?.uploadsThisMonth || '?'}/${
            data.usage?.remainingUploads
              ? data.usage.uploadsThisMonth + data.usage.remainingUploads
              : '?'
          } ce mois`
      )
    },

    onError: (error: Error) => {
      console.error('❌ LOCAL Avatar upload error:', error)

      let errorMessage = 'Failed to upload avatar'
      if (
        error.message.includes('limit reached') ||
        error.message.includes('429')
      ) {
        errorMessage =
          'Monthly upload limit reached. Please try again next month.'
      } else if (error.message.includes('size')) {
        errorMessage =
          'File too large. Please choose a smaller image (max 10MB).'
      } else if (error.message.includes('type')) {
        errorMessage =
          'Invalid file type. Supported: JPEG, PNG, GIF, WebP, AVIF, MP4, WebM, MOV.'
      } else if (error.message) {
        errorMessage = error.message
      }

      toast.error(errorMessage)
    }
  })
}

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      console.log('🔄 Deleting LOCAL avatar files...')
      const response = await api.api.user.avatar.delete()
      if (response.error)
        throw new Error(response.error.error || 'Failed to delete avatar')
      return response.data
    },

    onSuccess: data => {
      console.log(
        '✅ LOCAL Avatar files deleted successfully:',
        data.deleted_files
      )

      // ✅ Invalidation et mise à jour du cache
      queryClient.invalidateQueries({ queryKey: ['avatar'] })

      queryClient.setQueryData(['avatar', 'me'], (oldData: any) => ({
        ...oldData,
        user: {
          ...oldData?.user,
          image_path: null
        }
      }))

      toast.success('Avatar supprimé (fichiers locaux nettoyés)')
    },

    onError: (error: Error) => {
      console.error('❌ LOCAL Avatar deletion error:', error)
      toast.error("Échec de la suppression de l'avatar")
    }
  })
}

// 🆕 Hook pour récupérer les stats d'usage local
export const useGetAvatarUsage = () => {
  return useQuery({
    queryKey: ['avatar', 'usage'],
    queryFn: async () => {
      const response = await api.api.user.avatar.usage.get()
      if (response.error) {
        throw new Error(response.error.error || 'Failed to fetch usage stats')
      }
      return response.data
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1
  })
}

// 🆕 Hook pour les URLs optimisées d'un utilisateur
export const useGetAvatarUrls = (userId?: number) => {
  return useQuery({
    queryKey: ['avatar', 'urls', userId || 'me'],
    queryFn: async () => {
      const endpoint = userId
        ? api.api.user.avatar.urls[userId.toString()].get()
        : api.api.user.avatar.urls.get()

      const response = await endpoint
      if (response.error) {
        throw new Error(response.error.error || 'Failed to fetch avatar URLs')
      }
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: true
  })
}

// 🆕 Hook pour la maintenance du cache
export const useAvatarMaintenance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      action: 'clear_cache' | 'reset_counter' | 'cache_stats'
    ) => {
      console.log(`🔧 Executing maintenance action: ${action}`)
      const response = await api.api.user.avatar.maintenance.post({ action })
      if (response.error) {
        throw new Error(response.error.error || 'Failed to execute maintenance')
      }
      return response.data
    },

    onSuccess: (data, action) => {
      if (action === 'clear_cache') {
        queryClient.invalidateQueries({ queryKey: ['avatar'] })
        toast.success('Cache avatar nettoyé')
      } else if (action === 'reset_counter') {
        queryClient.invalidateQueries({ queryKey: ['avatar', 'usage'] })
        toast.success('Compteur réinitialisé')
      } else if (action === 'cache_stats') {
        toast.success(`Cache: ${data.cache_stats?.size || 0} entrées`)
      }
    },

    onError: (error: Error) => {
      console.error('❌ Maintenance error:', error)
      toast.error('Erreur lors de la maintenance')
    }
  })
}

export const useAvatarManager = () => {
  const { data: currentAvatar, isLoading, error } = useGetMyAvatar()
  const { data: usageStats, isLoading: isLoadingUsage } = useGetAvatarUsage()
  const uploadMutation = useUploadAvatar()
  const deleteMutation = useDeleteAvatar()
  const maintenanceMutation = useAvatarMaintenance()

  return {
    // État actuel
    avatar: currentAvatar,
    usage: usageStats?.stats,
    isLoading: isLoading || isLoadingUsage,
    error,

    // Actions
    upload: uploadMutation.mutate,
    deleteAvatar: deleteMutation.mutate,
    maintenance: maintenanceMutation.mutate,

    // États des mutations
    isUploading: uploadMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isMaintenance: maintenanceMutation.isPending,

    // Erreurs des mutations
    uploadError: uploadMutation.error,
    deleteError: deleteMutation.error,
    maintenanceError: maintenanceMutation.error,

    // Succès
    uploadSuccess: uploadMutation.isSuccess,
    deleteSuccess: deleteMutation.isSuccess,
    maintenanceSuccess: maintenanceMutation.isSuccess,

    // ✅ Données complètes de la dernière réponse
    lastUploadData: uploadMutation.data,
    lastMaintenanceData: maintenanceMutation.data,

    // ✅ Infos utiles pour l'UI
    canUpload: usageStats?.stats?.remainingUploads
      ? usageStats.stats.remainingUploads > 0
      : true,
    isNearLimit: usageStats?.stats?.isNearLimit || false,
    compressionInfo: {
      backend: usageStats?.stats?.storage_info?.backend || 'local',
      format: usageStats?.stats?.storage_info?.compression || 'webp',
      avgCompression:
        usageStats?.stats?.diskUsage?.averageCompressionRatio || 0,
      savedSpace: usageStats?.stats?.diskUsage?.estimatedSavingsMB || 0
    }
  }
}

// ===== HOOKS SUPPORT OPTIMISÉS (INCHANGÉS) =====

export type SupportTicketType = 'bug' | 'feature' | 'support'
export type SupportTicketStatus = 'open' | 'closed'

export interface CreateSupportTicketData {
  type: SupportTicketType
  title: string
  description: string
}

export interface SupportTicket {
  id: number
  user_id: number
  type: SupportTicketType
  title: string
  description: string
  status: SupportTicketStatus
  created_at: string
}

// ✅ Hook création de ticket optimisé
export const useCreateSupportTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (ticketData: CreateSupportTicketData) => {
      // ✅ Validation côté client
      if (ticketData.title.length < 5 || ticketData.title.length > 255) {
        throw new Error('Title must be between 5 and 255 characters')
      }
      if (ticketData.description.length < 10) {
        throw new Error('Description must be at least 10 characters')
      }

      console.log('🔄 Creating support ticket...', ticketData)
      const response = await api.api.support.tickets.post(ticketData)

      if (response.error) {
        throw new Error(response.error.error || 'Failed to create ticket')
      }

      return response.data
    },

    onSuccess: data => {
      console.log(`✅ Support ticket created: #${data.ticket?.id}`)

      // ✅ Invalidation ciblée
      queryClient.invalidateQueries({ queryKey: ['support', 'my-tickets'] })

      toast.success(`Ticket #${data.ticket?.id} créé avec succès`)
    },

    onError: (error: Error) => {
      console.error('❌ Support ticket creation error:', error)
      toast.error(error.message || 'Erreur lors de la création du ticket')
    }
  })
}

// ✅ Hook pour récupérer ses tickets (simplifié)
export const useGetMyTickets = (limit = 10) => {
  return useQuery({
    queryKey: ['support', 'my-tickets', { limit }],
    queryFn: async () => {
      const response = await api.api.support.tickets.my.get({
        query: { limit: limit.toString(), offset: '0' }
      })
      if (response.error) {
        throw new Error(response.error.error || 'Failed to fetch tickets')
      }
      return response.data
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1
  })
}

// 🎯 Hook composé pour le support (simplifié)
export const useSupportManager = () => {
  const { data: myTickets, isLoading, error } = useGetMyTickets()
  const createMutation = useCreateSupportTicket()

  return {
    // État actuel
    tickets: myTickets?.tickets || [],
    isLoading,
    error,

    // Actions
    createTicket: createMutation.mutate,

    // États des mutations
    isCreating: createMutation.isPending,

    // Erreurs des mutations
    createError: createMutation.error,

    // Succès
    createSuccess: createMutation.isSuccess
  }
}

export interface UserProfile {
  id: number
  username: string
  bio: string | null
  location: string | null
  image_path: string | null
  role: string
}

export interface UpdateProfileData {
  bio?: string
  location?: string
  syllable_color?: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (profileData: UpdateProfileData) => {
      if (profileData.bio && profileData.bio.length > 200) {
        throw new Error('Bio must be 200 characters or less')
      }
      if (profileData.location && profileData.location.length > 100) {
        throw new Error('Location must be 100 characters or less')
      }

      const response = await api.api.user.profile.put(profileData)
      if (response.error) {
        throw new Error(response.error.error || 'Failed to update profile')
      }
      return response.data
    },

    onSuccess: data => {
      console.log('✅ Profile updated successfully')

      queryClient.setQueryData(['profile', 'me'], {
        success: true,
        user: data.user,
        timestamp: data.timestamp
      })

      toast.success('Profil mis à jour avec succès')
    },

    onError: (error: Error) => {
      console.error('❌ Profile update error:', error)
      toast.error(error.message || 'Erreur lors de la mise à jour du profil')
    }
  })
}

// ✅ Hook changement de mot de passe
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (passwordData: ChangePasswordData) => {
      // ✅ Validation côté client
      if (
        !passwordData.currentPassword ||
        passwordData.currentPassword.length < 1
      ) {
        throw new Error('Current password is required')
      }
      if (!passwordData.newPassword || passwordData.newPassword.length < 1) {
        throw new Error('New password must have at least 1 character')
      }

      const response = await api.api.user.password.put(passwordData)
      if (response.error) {
        throw new Error(response.error.error || 'Failed to change password')
      }
      return response.data
    },

    onSuccess: () => {
      console.log('✅ Password changed successfully')
      toast.success('Mot de passe changé avec succès')
    },

    onError: (error: Error) => {
      console.error('❌ Password change error:', error)
      toast.error(error.message || 'Erreur lors du changement de mot de passe')
    }
  })
}

// 🎯 Hook composé pour le profil (optimisé)
export const useProfileManager = () => {
  const updateMutation = useUpdateProfile()
  const passwordMutation = useChangePassword()

  return {
    updateProfile: updateMutation.mutate,
    changePassword: passwordMutation.mutate,

    isUpdating: updateMutation.isPending,
    isChangingPassword: passwordMutation.isPending,

    updateError: updateMutation.error,
    passwordError: passwordMutation.error,

    updateSuccess: updateMutation.isSuccess,
    passwordSuccess: passwordMutation.isSuccess
  }
}
