import React from 'react'
import AreaSelector from "./AreaSelector"
import AreaPreview from './AreaPreview'
import IndicatorSelector from './IndicatorSelector'

export default function MenuPanel() {
  return (
    <div className='menu-panel'>
        <AreaSelector/>
        <AreaPreview/>
        <IndicatorSelector/>
    </div>
  )
}
