import { sortBy, order as orderContant } from '~/constants/product'

import { ProductListConfig } from '~/types/product.type'
import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from '~/constants/path'
import omit from 'lodash/omit'
import { QueryConfig } from '~/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { t } = useTranslation('home')
  const page = Number(queryConfig.page)
  const navigate = useNavigate()
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        order: orderValue,
        sort_by: sortBy.price
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>{t('sortButtons.sortBy')}</div>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy('view'),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy('view')
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            {t('sortButtons.popular')}
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm  capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy('createdAt'),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy('createdAt')
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            {t('sortButtons.latest')}
          </button>
          <button
            className={classNames('h-8 px-4 text-center  text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy('sold'),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy('sold')
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            {t('sortButtons.price')}
          </button>
          <select
            className={classNames('h-8 px-4 text-left text-sm capitalize outline-none', {
              'bg-white text-orange hover:bg-slate-100': isActiveSortBy('price'),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy('price')
            })}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled>
              {t('sortButtons.price')}
            </option>
            <option value={orderContant.asc} className='bg-white text-black'>
              {t('sortButtons.ascPrice')}
            </option>
            <option value={orderContant.desc} className='bg-white text-black'>
              {t('sortButtons.descPrice')}
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex items-center justify-center'>
            {page === 1 ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-br-sm rounded-tr-sm bg-white px-3 shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-br-sm rounded-tr-sm bg-white px-3 shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
