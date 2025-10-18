import React from 'react'

const IconAppLogo = ({ size = 32 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 625 625" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_16_134)">
        <path d="M312.5 81L583.133 549.75H41.8671L312.5 81Z" fill="hsl(var(--foreground))" />
        <g clipPath="url(#clip1_16_133)">
          <line x1="214.586" y1="305.302" x2="410.586" y2="501.302" stroke="hsl(var(--background))" strokeWidth="40" />
          <path d="M244 440L289.033 518H198.967L244 440Z" fill="hsl(var(--background))" />
          <path d="M380 369L425.033 291H334.967L380 369Z" fill="hsl(var(--background))" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_16_133">
          <rect width={size} height={size} fill="hsl(var(--background))" />
        </clipPath>
        <clipPath id="clip1_16_133">
          <rect width="225" height="225" fill="hsl(var(--background))" transform="translate(200 291)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default IconAppLogo