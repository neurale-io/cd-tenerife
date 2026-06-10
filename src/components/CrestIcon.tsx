interface Props { size?: number }

export default function CrestIcon({ size = 40 }: Props) {
  const s = size
  return (
    <svg width={s} height={s} viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield */}
      <path
        d="M32 2L60 13V42C60 57 32 70 32 70C32 70 4 57 4 42V13L32 2Z"
        fill="#0c1b3a"
        stroke="#d4a726"
        strokeWidth="2"
      />
      {/* White horizontal band */}
      <path d="M4 22H60V34H4Z" fill="white" opacity="0.9"/>
      {/* Gold diagonal stripe */}
      <path d="M32 2L60 13V22H42L4 44V34L22 22H4V13L32 2Z" fill="#d4a726"/>
      {/* Center initials */}
      <text
        x="32" y="52"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="800"
        fontFamily="Inter,system-ui,sans-serif"
        letterSpacing="1"
      >CDT</text>
    </svg>
  )
}
