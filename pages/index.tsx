import React from 'react'
import withLayoutAuth from '../components/hoc/WithLayoutAuth'

function Home() {
  const dummyArray = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: (index + 1).toString(),
    firstName: index + 1 + '1',
    lastName: 'John',
  }))

  console.log(dummyArray)

  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-500">
      <h1 className="text-red-300 text-4xl">Welcome11 to Next.js with Tailwind CSS</h1>
    </div>
  )
}

export default withLayoutAuth()(Home)
