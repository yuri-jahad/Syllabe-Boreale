export const renderAdminWarning = (isAdmin: any) => {
  return (
    !isAdmin && (
      <div
        style={{
          background: 'rgba(251, 146, 60, 0.08)',
          border: '1px solid rgba(251, 146, 60, 0.2)',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
          transition: 'all 0.2s ease'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '20px',
            height: '20px',
            borderRadius: '4px',
            background: 'rgba(251, 146, 60, 0.15)',
            color: '#fb923c',
            fontSize: '12px',
            flexShrink: 0,
            fontWeight: '600'
          }}
        >
          !
        </div>

        <div style={{ flex: 1 }}>
          <span
            style={{
              fontSize: '13px',
              color: '#a0aec0',
              fontWeight: '500',
              lineHeight: '1.4'
            }}
          >
            Modification reserved for administrators
          </span>
        </div>
      </div>
    )
  )
}