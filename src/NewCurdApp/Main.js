import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'

function Main( ) {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default Main