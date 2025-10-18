import React from 'react'
import IconAppLogo from '@/components/icon-app-logo'

const AppLogo = () => {
  return (
    <div className="relative">
      <IconAppLogo/>
      <span className="absolute text-xl font-paytone leading-relaxed tracking-wide left-[29px] top-1" style={{ WebkitTextStroke: '0.5px hsl(var(--muted-foreground))'}}>
        Noir.
      </span>
    </div>
  )
}

export default AppLogo