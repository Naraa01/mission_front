import React from 'react'
import withLayoutAuth from '../components/hoc/WithLayoutAuth'

function Home() {
  function twoSum(nums: number[], target: number) {
    let num: number[] = []

    for (let i = 0; i < nums.length; i++) {
      let complement = target - nums[i]
      if (num.hasOwnProperty(complement)) {
        return [num[complement], i]
      }
      num[nums[i]] = i
    }

    throw new Error('Error')
  }

  const nums = [2, 4, 5, 10]
  const target = 9
  // console.log('nums hello ->', twoSum(nums, target)) // Output: [0, 1]

  return (
    <div className="flex justify-center items-center">
      <h1 className="text-4xl text-black">Welcome to my home dashboard</h1>
    </div>
  )
}

export default withLayoutAuth()(Home)
