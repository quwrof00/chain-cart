'use client'

import { useState } from 'react'
import RemoveButton from './RemoveButton'

interface RemoveButtonWrapperProps {
  itemId: number
}

export default function RemoveButtonWrapper({ itemId }: RemoveButtonWrapperProps) {
  const [removed, setRemoved] = useState(false)

  if (removed) return null

  return (
    <RemoveButton
      itemId={itemId}
      onRemove={() => setRemoved(true)}
    />
  )
}
