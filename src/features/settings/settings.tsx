import Scene from '@shared/components/scene/scene'
import { useState, useRef, useCallback, useEffect } from 'react'
import {
  User,
  Palette,
  Shield,
  MessageSquare,
  Upload,
  Trash2,
  Save,
  Check
} from 'lucide-react'
import {
  useAvatarManager,
  useProfileManager,
  useSupportManager,
  useChangePassword
} from './hooks/use-settings'
import {
  settingsContainerCSS,
  settingsCSS,
  sidebarCSS,
  sidebarContentCSS,
  menuItemCSS,
  menuItemActiveCSS,
  contentAreaCSS,
  contentInnerCSS,
  sectionCSS,
  sectionHeaderCSS,
  sectionTitleCSS,
  sectionDescCSS,
  fieldGroupCSS,
  labelCSS,
  inputCSS,
  selectCSS,
  textareaCSS,
  buttonPrimaryCSS,
  buttonSecondaryCSS,
  buttonDangerCSS,
  avatarSectionCSS,
  avatarActionsCSS,
  fileHintCSS,
  colorSectionCSS,
  colorInputCSS,
  colorDisplayCSS,
  previewBoxCSS,
  errorNoticeCSS,
  passwordFieldsCSS,
  buttonGroupCSS,
  formErrorCSS,
  ticketItemCSS,
  ticketHeaderCSS,
  statusBadgeCSS,
  typeBadgeCSS,
  avatarButtonGroupCSS,
  appearanceDescCSS,
  syllablePreviewCSS,
  gridColumnSpan2CSS,
  formFieldMarginCSS,
  ticketsHeaderCSS,
  ticketsCountBadgeCSS,
  ticketsScrollContainerCSS,
  ticketFlexContainerCSS,
  ticketIdBadgeCSS,
  ticketMainTitleCSS,
  ticketActionsContainerCSS,
  ticketDateCSS,
  ticketDescriptionCSS,
  ticketsFooterCSS
} from './settings.style'
import { useAuth } from '@auth/hooks/auth.hooks'
import { useStore } from '@/store/store'

const MENU_ITEMS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'support', label: 'Support', icon: MessageSquare }
] as const

const ProfileSection = () => {
  const { bio, location, syllableColor, setAvatar, setBio, setLocation } =
    useStore()
  const { user } = useAuth()

  console.log({ user })

  const isDemoAccount = user?.username === 'demo'
  const fileInputRef = useRef<HTMLInputElement>(null)
  const avatarManager = useAvatarManager()
  const profileManager = useProfileManager()

  const getOptimalAvatarUrl = useCallback(() => {
    if (avatarManager.lastUploadData?.avatar?.optimized_urls?.medium) {
      return avatarManager.lastUploadData.avatar.optimized_urls.medium
    }
    if (avatarManager.avatar?.user?.optimized_urls?.medium) {
      return avatarManager.avatar.user.optimized_urls.medium
    }
    if (avatarManager.lastUploadData?.avatar?.secure_url) {
      return avatarManager.lastUploadData.avatar.secure_url
    }
    if (avatarManager.avatar?.user?.secure_url) {
      return avatarManager.avatar.user.secure_url
    }
    return (
      avatarManager.lastUploadData?.avatar?.url ||
      avatarManager.avatar?.user?.image_path ||
      user?.image_path
    )
  }, [avatarManager.lastUploadData, avatarManager.avatar, user?.image_path])

  const getOptimizationInfo = useCallback(url => {
    if (!url) return null
    if (url.includes('.avif'))
      return { format: 'AVIF', icon: '🚀', color: '#8b5cf6' }
    if (url.includes('.webm'))
      return { format: 'WebM', icon: '🎬', color: '#f59e0b' }
    if (url.includes('.webp'))
      return { format: 'WebP', icon: '⚡', color: '#0891b2' }
    return null
  }, [])

  useEffect(() => {
    const optimizedUrl = getOptimalAvatarUrl()
    if (optimizedUrl) {
      setAvatar(optimizedUrl)
    }
  }, [avatarManager.avatar, avatarManager.lastUploadData])

  const handleAvatarChange = useCallback(
    e => {
      const file = e.target.files?.[0]
      if (file && !isDemoAccount) {
        avatarManager.upload(file)
      }
    },
    [avatarManager, isDemoAccount]
  )

  const handleAvatarDelete = useCallback(() => {
    if (
      !isDemoAccount &&
      confirm('Do you really want to delete your avatar?')
    ) {
      avatarManager.deleteAvatar()
    }
  }, [avatarManager, isDemoAccount])

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      if (!isDemoAccount) {
        profileManager.updateProfile({
          bio,
          location,
          syllable_color: syllableColor
        })
      }
    },
    [bio, location, profileManager, isDemoAccount, syllableColor]
  )

  const avatarUrl = getOptimalAvatarUrl()
  const optimizationInfo = getOptimizationInfo(avatarUrl)

  return (
    <div className={sectionCSS}>
      <div className={sectionHeaderCSS}>
        <h2 className={sectionTitleCSS}>Profile</h2>
        <p className={sectionDescCSS}>Personal information and avatar.</p>
      </div>

      {isDemoAccount && (
        <div className={errorNoticeCSS}>
          Modifications disabled in demo mode.
        </div>
      )}

      <div className={fieldGroupCSS}>
        <label className={labelCSS}>Avatar</label>
        <div className={avatarSectionCSS}>
          <picture>
            {avatarManager.avatar?.user?.optimized_urls?.avif && (
              <source
                srcSet={avatarManager.avatar.user.optimized_urls.avif}
                type='image/avif'
              />
            )}
            {avatarManager.avatar?.user?.optimized_urls?.webm && (
              <source
                srcSet={avatarManager.avatar.user.optimized_urls.webm}
                type='video/webm'
              />
            )}
            {avatarManager.avatar?.user?.optimized_urls?.webp && (
              <source
                srcSet={avatarManager.avatar.user.optimized_urls.webp}
                type='image/webp'
              />
            )}
            {avatarUrl?.includes('.webm') ? (
              <video
                src={avatarUrl}
                width={150}
                height={150}
                autoPlay
                loop
                muted
                playsInline
                className='rounded-full object-cover'
                style={{ width: '150px', height: '150px' }}
              />
            ) : (
              <img
                src={avatarUrl}
                alt='Profile'
                width={150}
                height={150}
                loading='lazy'
                className='rounded-full object-cover'
              />
            )}
          </picture>

          <div className={avatarActionsCSS}>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/jpeg,image/png,image/gif,image/webp,image/avif,video/mp4,video/webm,video/mov'
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
              disabled={isDemoAccount || avatarManager.isUploading}
            />
            <div className={avatarButtonGroupCSS}>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isDemoAccount || avatarManager.isUploading}
                className={buttonSecondaryCSS}
              >
                <Upload size={16} />
                {avatarManager.isUploading
                  ? 'Uploading...'
                  : 'Upload'}
              </button>
              {avatarUrl && (
                <button
                  onClick={handleAvatarDelete}
                  disabled={
                    isDemoAccount ||
                    avatarManager.isUploading ||
                    avatarManager.isDeleting
                  }
                  className={buttonDangerCSS}
                >
                  <Trash2 size={16} />
                  {avatarManager.isDeleting ? 'Deleting...' : 'Remove'}
                </button>
              )}
            </div>

            <div className={fileHintCSS}>
              <p>JPEG, PNG, GIF, WebP, AVIF, MP4, WebM or MOV. Max 10MB.</p>

              {optimizationInfo && (
                <div
                  style={{
                    color: optimizationInfo.color,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginTop: '4px'
                  }}
                >
                  {optimizationInfo.icon} {optimizationInfo.format} optimized -
                  automatic compression
                </div>
              )}

              {avatarManager.usage && (
                <div
                  style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    marginTop: '4px'
                  }}
                >
                  Uploads: {avatarManager.usage.uploadsThisMonth}/
                  {avatarManager.usage.uploadsThisMonth +
                    avatarManager.usage.remainingUploads}{' '}
                  • Users: {avatarManager.usage.localCount} • Storage:{' '}
                  {avatarManager.usage.diskUsage?.totalSizeMB}MB • Compression:{' '}
                  {avatarManager.usage.diskUsage?.averageCompressionRatio}%
                </div>
              )}

              {avatarManager.lastUploadData?.avatar && (
                <div
                  style={{
                    fontSize: '11px',
                    color: '#10b981',
                    marginTop: '2px'
                  }}
                >
                  ✓ 2 formats generated (50×50, 150×150) • Automatic optimization
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={fieldGroupCSS}>
          <label className={labelCSS} htmlFor='bio'>
            Bio
          </label>
          <textarea
            id='bio'
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder='Tell us a bit about yourself...'
            className={textareaCSS}
            disabled={isDemoAccount}
            maxLength={200}
          />
          <p className={fileHintCSS}>{bio.length}/200 characters</p>
        </div>

        <div className={fieldGroupCSS}>
          <label className={labelCSS} htmlFor='location'>
            Location
          </label>
          <input
            id='location'
            type='text'
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder='Paris, France'
            className={inputCSS}
            disabled={isDemoAccount}
            maxLength={100}
          />
        </div>

        <div className={buttonGroupCSS}>
          <button
            type='submit'
            disabled={isDemoAccount || profileManager.isUpdating}
            className={buttonPrimaryCSS}
          >
            <Save size={16} />
            {profileManager.isUpdating
              ? 'Updating...'
              : 'Update profile'}
          </button>
        </div>
      </form>
    </div>
  )
}

const AppearanceSection = () => {
  const { syllableColor, setSyllableColor } = useStore()
  const [tempColor, setTempColor] = useState(syllableColor)
  const { user } = useAuth()

  const profileManager = useProfileManager()
  const isDemoAccount = user?.username === 'demo'

  useEffect(() => {
    if (!isDemoAccount) {
      setTempColor(syllableColor)
    }
  }, [syllableColor])

  const handleColorSave = useCallback(() => {
    if (!isDemoAccount) {
      setSyllableColor(tempColor)
      profileManager.updateProfile({ syllable_color: tempColor })
    }
  }, [tempColor, setSyllableColor, profileManager])

  const hasColorChanged = tempColor !== syllableColor

  return (
    <div className={sectionCSS}>
      <div className={sectionHeaderCSS}>
        <h2 className={sectionTitleCSS}>Appearance</h2>
        <p className={sectionDescCSS}>
          Visual interface customization.
        </p>
      </div>

      <div className={fieldGroupCSS}>
        <label className={labelCSS}>Syllable color</label>
        <p className={appearanceDescCSS}>
          Highlight color for syllables in text.
        </p>
        <div className={colorSectionCSS}>
          <input
            type='color'
            value={tempColor}
            onChange={e => setTempColor(e.target.value)}
            className={colorInputCSS}
          />
          <span className={colorDisplayCSS}>{tempColor.toUpperCase()}</span>
          {hasColorChanged && (
            <button
              onClick={handleColorSave}
              disabled={isDemoAccount ? true : profileManager.isUpdating}
              className={buttonPrimaryCSS}
              style={{ marginLeft: '12px', padding: '8px 12px' }}
            >
              <Check size={16} />
              {profileManager.isUpdating ? 'Saving...' : 'Confirm'}
            </button>
          )}
        </div>
        <div className={previewBoxCSS}>
          <strong>Preview:</strong> The word "
          <span
            className={syllablePreviewCSS}
            style={{ backgroundColor: tempColor }}
          >
            syl
          </span>
          lable" will be highlighted like this.
        </div>
      </div>
    </div>
  )
}

const SecuritySection = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const changePasswordMutation = useChangePassword()

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      if (newPassword === confirmPassword) {
        changePasswordMutation
          .mutateAsync({ currentPassword, newPassword })
          .then(() => {
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
          })
      }
    },
    [currentPassword, newPassword, confirmPassword, changePasswordMutation]
  )

  const canSubmit =
    currentPassword &&
    newPassword &&
    confirmPassword &&
    newPassword === confirmPassword &&
    !changePasswordMutation.isPending
  const passwordMismatch = confirmPassword && newPassword !== confirmPassword

  return (
    <div className={sectionCSS}>
      <div className={sectionHeaderCSS}>
        <h2 className={sectionTitleCSS}>Security</h2>
        <p className={sectionDescCSS}>Password and account access.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={fieldGroupCSS}>
          <label className={labelCSS}>Change password</label>
          <div className={passwordFieldsCSS}>
            <input
              type='password'
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              placeholder='Current password'
              className={inputCSS}
              autoComplete='current-password'
            />
            <input
              type='password'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder='New password'
              className={inputCSS}
              autoComplete='new-password'
            />
            <div className={gridColumnSpan2CSS}>
              <input
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder='Confirm password'
                className={inputCSS}
                autoComplete='new-password'
              />
              {passwordMismatch && (
                <div className={formErrorCSS}>Passwords don't match</div>
              )}
            </div>
          </div>
          <div className={buttonGroupCSS}>
            <button
              type='submit'
              disabled={!canSubmit}
              className={buttonDangerCSS}
            >
              <Shield size={16} />
              {changePasswordMutation.isPending
                ? 'Updating...'
                : 'Update password'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

const SupportSection = () => {
  const [type, setType] = useState('bug')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const supportManager = useSupportManager()

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      if (title.length >= 5 && description.length >= 10) {
        supportManager.createTicket({ type, title, description })
        setTitle('')
        setDescription('')
      }
    },
    [type, title, description, supportManager]
  )

  const canSubmit =
    title.length >= 5 && description.length >= 10 && !supportManager.isCreating

  return (
    <div className={sectionCSS}>
      <div className={sectionHeaderCSS}>
        <h2 className={sectionTitleCSS}>Support</h2>
        <p className={sectionDescCSS}>
          Report a bug or request a feature.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={fieldGroupCSS}>
          <label className={labelCSS}>New ticket</label>

          <div className={formFieldMarginCSS}>
            <label className={labelCSS} htmlFor='type'>
              Type
            </label>
            <select
              id='type'
              value={type}
              onChange={e => setType(e.target.value)}
              className={selectCSS}
            >
              <option value='bug'>Bug report</option>
              <option value='feature'>Feature request</option>
              <option value='support'>General support</option>
            </select>
          </div>

          <div className={formFieldMarginCSS}>
            <label className={labelCSS} htmlFor='title'>
              Title
            </label>
            <input
              id='title'
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder='Problem summary'
              className={inputCSS}
              maxLength={255}
            />
            <p className={fileHintCSS}>{title.length}/255 characters</p>
          </div>

          <div>
            <label className={labelCSS} htmlFor='description'>
              Description
            </label>
            <textarea
              id='description'
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder='Details and context...'
              className={textareaCSS}
            />
          </div>

          <div className={buttonGroupCSS}>
            <button
              type='submit'
              disabled={!canSubmit}
              className={buttonPrimaryCSS}
            >
              <MessageSquare size={16} />
              {supportManager.isCreating ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </form>

      {supportManager.tickets.length > 0 && (
        <div className={fieldGroupCSS}>
          <div className={ticketsHeaderCSS}>
            <label className={labelCSS}>Recent tickets</label>
            <span className={ticketsCountBadgeCSS}>
              {supportManager.tickets.length} total
            </span>
          </div>
          <div className={ticketsScrollContainerCSS}>
            {supportManager.tickets.map((ticket, index) => (
              <div
                key={ticket.id}
                className={ticketItemCSS}
                style={{
                  borderBottom:
                    index < supportManager.tickets.length - 1
                      ? '1px solid #334155'
                      : 'none'
                }}
              >
                <div className={ticketHeaderCSS}>
                  <div className={ticketFlexContainerCSS}>
                    <div>
                      <span className={ticketIdBadgeCSS}>#{ticket.id}</span>
                      <span
                        className={typeBadgeCSS}
                        style={{
                          backgroundColor:
                            ticket.type === 'bug' ? '#ef4444' : '#3b82f6',
                          color: '#fff'
                        }}
                      >
                        {ticket.type}
                      </span>
                    </div>
                    <h4 className={ticketMainTitleCSS}>{ticket.title}</h4>
                  </div>
                  <div className={ticketActionsContainerCSS}>
                    <span
                      className={statusBadgeCSS}
                      style={{
                        backgroundColor:
                          ticket.status === 'open' ? '#22c55e' : '#3b82f6',
                        color: '#fff'
                      }}
                    >
                      {ticket.status}
                    </span>
                    <span className={ticketDateCSS}>
                      {new Date(ticket.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <p className={ticketDescriptionCSS}>{ticket.description}</p>
              </div>
            ))}
          </div>
          {supportManager.tickets.length > 5 && (
            <p className={ticketsFooterCSS}>
              Showing {supportManager.tickets.length} tickets
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default function Settings () {
  const [activeSection, setActiveSection] = useState('profile')

  const sections = {
    profile: ProfileSection,
    appearance: AppearanceSection,
    security: SecuritySection,
    support: SupportSection
  }

  const ActiveComponent = sections[activeSection] || ProfileSection

  return (
    <Scene>
      <div className={settingsCSS}>
        <div className={settingsContainerCSS}>
          <div className={sidebarCSS}>
            <div className={sidebarContentCSS}>
              <nav aria-label='Settings navigation'>
                {MENU_ITEMS.map(item => {
                  const IconComponent = item.icon
                  const isActive = activeSection === item.id
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`${menuItemCSS} ${
                        isActive ? menuItemActiveCSS : ''
                      }`}
                      role='button'
                      tabIndex={0}
                      onKeyDown={e =>
                        e.key === 'Enter' && setActiveSection(item.id)
                      }
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <IconComponent size={16} />
                      <span>{item.label}</span>
                    </div>
                  )
                })}
              </nav>
            </div>
          </div>

          <main className={contentAreaCSS} aria-label='Settings content'>
            <div className={contentInnerCSS}>
              <ActiveComponent />
            </div>
          </main>
        </div>
      </div>
    </Scene>
  )
}