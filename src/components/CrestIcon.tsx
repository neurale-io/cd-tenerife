interface Props { size?: number }

export default function CrestIcon({ size = 40 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield shape */}
      <path
        d="M50 5 L90 20 L90 60 Q90 90 50 105 Q10 90 10 60 L10 20 Z"
        fill="#112248"
        stroke="#c9880a"
        strokeWidth="3"
      />
      {/* Gold diagonal bands */}
      <path d="M50 5 L90 20 L90 35 L10 75 L10 60 L50 5Z" fill="#c9880a" opacity="0.9" />
      {/* Cross white */}
      <rect x="43" y="15" width="14" height="65" rx="2" fill="white" opacity="0.9" />
      <rect x="15" y="42" width="70" height="14" rx="2" fill="white" opacity="0.9" />
      {/* Center crest letters */}
      <text x="50" y="58" textAnchor="middle" fill="#0c1b3a" fontSize="14" fontWeight="900" fontFamily="Inter,sans-serif">CDT</text>
    </svg>
  )
}
