import React from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { useCommonContext } from '../../context/CommonContext'

export type PropsType = {
  current?: number
  pageSize: number
  total: number
  onChange?: (page: number, pageSize: number) => void
}

const Pagination = ({ current = 1, total, pageSize, onChange }: PropsType) => {
  const onNext = () => {
    const pageNumber = Math.ceil(total / pageSize)
    if (current < pageNumber) {
      if (onChange) {
        onChange(current + 1, pageSize)
      }
    }
  }

  const onPrev = () => {
    if (current > 1) {
      if (onChange) {
        onChange(current - 1, pageSize)
      }
    }
  }

  const onClickPage = (page: number) => {
    if (onChange) {
      onChange(page, pageSize)
    }
  }

  const renderPageButton = () => {
    const pageNumber = Math.ceil(total / pageSize)
    const buttons = []

    if (pageNumber < 1) {
      return null
    }
    let className = 'py-2 px-3 leading-tigh border border-[#F5F5F5] rounded-lg  font-normal text-[12px] cursor-pointer'
    for (let i = 1; i <= pageNumber; i += 1) {
      if (i === current) {
        className = 'py-2 px-3 leading-tigh  rounded-lg  border font-normal text-[12px] cursor-pointer'
      }

      buttons.push(
        <li
          onClick={() => {
            onClickPage(i)
          }}
          key={`pagination_item_${i}`}
        >
          <a rel="nofollow" className={className}>
            {i}
          </a>
        </li>,
      )
    }
    return buttons
  }

  const getPrevBtnClassName = () => {
    if (current > 1) {
      // eslint-disable-next-line max-len
      return 'whitespace-nowrap flex py-2 px-3 ml-0  text-[12px] text-center items-center leading-tight  rounded-full cursor-pointer'
    }

    // eslint-disable-next-line max-len
    return 'flex whitespace-nowrap py-2 px-3 ml-0  text-[12px] text-center items-center leading-tight text-[#9F9F9F] border border-[#F5F5F5] rounded-full cursor-pointer'
  }

  const getNextBtnClassName = () => {
    const pageNumber = Math.ceil(total / pageSize)

    if (current < pageNumber) {
      // eslint-disable-next-line max-len
      return 'flex py-2 px-3 ml-0  text-[12px] text-center items-center leading-tight border rounded-full whitespace-nowrap cursor-pointer'
    }

    // eslint-disable-next-line max-len
    return 'flex whitespace-nowrap py-2 px-3 ml-0  text-[12px] text-center items-center leading-tight text-[#9F9F9F] border border-[#F5F5F5] rounded-full cursor-pointer'
  }

  return (
    <>
      {total > 0 && (
        <nav aria-label="Хуудаслалт" className="my-[14px] grid grid-flow-col ">
          <ul className="mx-auto inline-flex items-center  gap-x-2 -space-x-px">
            <li onClick={onPrev}>
              <a rel="nofollow" className={getPrevBtnClassName()}>
                <ArrowLeftIcon className="mr-[6px] w-[14px] " />
                {'Өмнөх хуудас'}
              </a>
            </li>
            {renderPageButton()}
            <li onClick={onNext}>
              <a rel="nofollow" className={getNextBtnClassName()}>
                {'Дараагийн хуудас'}
                <ArrowRightIcon className="ml-[6px] w-[14px] " />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  )
}

export default Pagination
