import React from 'react'

function page() {
  return (
    <div className="h-[100vh] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center text-center justify-center">
          <h1 className='text-2xl text-green-500'>
            This is About page.
          </h1>
        </div>
      </div>
    </div>
  )
}

export default page
