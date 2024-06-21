import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

export default function Footer() {
  const { t } = useTranslation('footer')
  const countries: string[] = t('countries', { returnObjects: true })
  const policies: string[] = t('policies', { returnObjects: true })
  return (
    <footer className='w-full bg-neutral-100 p-9'>
      <div className='container'>
        <div className='mt-10 flex flex-col items-baseline justify-between text-sm text-gray-500 lg:flex-row'>
          <div className='mx-auto flex-shrink-0 pr-6 lg:text-left'>
            © {new Date().getFullYear()} Shopee. {t('All Rights Reserved')}
          </div>
          <div className='mx-auto mt-2 flex flex-col flex-wrap items-center justify-center gap-1 lg:flex-row lg:gap-0'>
            <div>{t('Country & Region')}:</div>
            {countries.map((country, index: number) => (
              <div key={country} className=''>
                <Link
                  to='/'
                  className={classNames('border-r-gray-400 px-1.5 lg:border-r', {
                    'pr-0 lg:border-r-0': index === countries.length - 1
                  })}
                >
                  {country}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-20 flex flex-col items-center justify-center gap-1 text-sm text-gray-500 lg:flex-row lg:gap-0'>
          {policies.map((policy, index: number) => (
            <div key={policy}>
              <Link
                to='/'
                className={classNames('border-r-gray-200 md:px-2 lg:border-r lg:px-8', {
                  'pr-0 lg:border-r-0': index === policies.length - 1
                })}
              >
                {policy}
              </Link>
            </div>
          ))}
        </div>
        <div className='mt-12 flex flex-col gap-1.5 text-center text-xs text-gray-500'>
          <p className='mb-4'>{t('Shopee Company Limited')}</p>
          <p>{t('address')}</p>
          <p>{t('personInCharge')}</p>
          <p>{t('registration')}</p>
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
