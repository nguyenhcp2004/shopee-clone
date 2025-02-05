import { ToastContainer } from 'react-toastify'
import useRouteElements from './useRouteElements'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBondary from '~/components/ErrorBoundary'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <div>
      <HelmetProvider>
        <ErrorBondary>
          {routeElements}
          <ToastContainer />
        </ErrorBondary>
        <ReactQueryDevtools initialIsOpen={false} />
      </HelmetProvider>
    </div>
  )
}

export default App
