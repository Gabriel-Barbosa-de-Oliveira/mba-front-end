import React from 'react'

export default function OnlineOffline({ isOnline = true }) {
  return (
    <span>
      {isOnline ? 'Online' : 'Offline'}
    </span>
  )
}
