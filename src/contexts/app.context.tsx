import { SetStateAction, createContext, useState } from 'react'
import { ExtendedPurchase } from '~/types/purchase.type'
import { User } from '~/types/user.type'
import { getAccessTokenFromLS } from '~/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setAuthenticated: React.Dispatch<SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setAuthenticated: () => null,
  profile: null,
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchases)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
