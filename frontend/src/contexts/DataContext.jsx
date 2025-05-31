import { createContext, useState, useEffect } from 'react'
import { useFetch } from '@/hooks/useFetch'

export const DataContext = createContext()

export const DataContextProvider = ({ children }) => {
  const { fetchUserData } = useFetch()
  const { fetchSlangs } = useFetch()
  const [userData, setUserData] = useState(null)
  const [slangTerms, setSlangTerms] = useState([])

  const reloadUserData = async () => {
    const res = await fetchUserData()
    setUserData(res.data)
  }

  const getSlangTerms = async () => {
    const data = await fetchSlangs()
    setSlangTerms(data)
  }

  useEffect(() => {
    const handleStorageChange = () => {
      reloadUserData()
    }

    reloadUserData()
    getSlangTerms()

    // window.addEventListener('storage', handleStorageChange)

    // return () => {
    //   window.removeEventListener('storage', handleStorageChange)
    // }
  }, [])

  return (
    <DataContext.Provider
      value={{
        userData,
        setUserData,
        reloadUserData,
        slangTerms,
        setSlangTerms,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
