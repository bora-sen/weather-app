import React from 'react'

function MainLayout({children}) {
  return (
    <main className='w-full min-h-screen transition-all flex justify-center pt-24 bg-main bg-center bg-cover'>
      {children}
    </main>
  )
}

export default MainLayout