import React from 'react'
import withLayoutAuth from '../components/hoc/WithLayoutAuth'

function Home() {
  return (
    <div className="flex justify-center items-center">
      <h1 className="text-4xl text-black">Welcome to my home dashboard</h1>
    </div>
  )
}

export default withLayoutAuth()(Home)
