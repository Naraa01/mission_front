import React, { ChangeEvent } from 'react'
import { SearchIcon } from './icons'

const Search = ({ onChange }: { onChange?: (el: ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className="relative border rounded-lg">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
          <SearchIcon />
        </button>
      </span>
      <input
        type="text"
        // type="search"
        name="q"
        className="py-2 w-full text-sm bg-white rounded-md pl-10 focus:outline-none focus:border-primary focus:ring-primary"
        placeholder={'Хайх'}
        onChange={onChange}
        // autoComplete="off"
      />
    </div>
  )
}

export default Search
