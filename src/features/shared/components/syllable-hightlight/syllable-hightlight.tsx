export const SyllableHighlight = ({
  children,
  color
}: {
  children: React.ReactNode
  color: string
}) => {
  return (
    <span
      style={{
        color,
        fontWeight: '700',
        background: 'rgba(59, 130, 246, 0.15)',
        padding: '1px 2px',
        borderRadius: '2px',
        margin: '0 -1px'
      }}
    >
      {children}
    </span>
  )
}
