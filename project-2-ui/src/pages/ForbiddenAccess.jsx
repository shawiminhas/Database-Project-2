import React from 'react'

const ForbiddenAccess = () => {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center border-4 border-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-xl shadow-2xl p-8">
          <p className="text-base font-semibold text-gray-700">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Sorry, you dont have access to view this page.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
  )
}

export default ForbiddenAccess
