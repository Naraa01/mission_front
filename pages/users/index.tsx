import React from 'react'
import withLayoutAuth from '../../components/hoc/WithLayoutAuth'

function Users() {
  const dummyArray = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: (index + 1).toString(),
    firstName: index + 1 + '1',
    lastName: 'John',
  }))

  console.log(dummyArray)

  return <div>index</div>
}

export default withLayoutAuth()(Users)
