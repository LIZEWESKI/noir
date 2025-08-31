import React from 'react'
import IconAppLogo from '@/components/icon-app-logo'

const AppLogo = () => {
  return (
    <div className="flex items-center justify-center ">
      <IconAppLogo/>
      <span className="font-extrabold text-xl font-outfit tracking-wide">
        Noir<span className="text-primary">.</span>
      </span>
    </div>
  )
}

export default AppLogo