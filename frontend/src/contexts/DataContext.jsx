import { createContext, useState, useEffect } from 'react'
import { useFetch } from '@/hooks/useFetch'

export const DataContext = createContext()

export const DataContextProvider = ({ children }) => {
  const { fetchUserData } = useFetch()
  const { fetchSlangs } = useFetch()
  const { fetchTrendSlangs } = useFetch()
  const [userData, setUserData] = useState(null)
  const [slangTerms, setSlangTerms] = useState([])
  const [trendSlangs, setTrendSlangs] = useState([])

  const reloadUserData = async () => {
    const res = await fetchUserData()
    setUserData(res.data)
  }

  const getSlangTerms = async () => {
    const data = await fetchSlangs()
    setSlangTerms(data)
  }

  const getTrendSlangs = async () => {
    const data = await fetchTrendSlangs()
    setTrendSlangs(data)
  }

  useEffect(() => {
    const handleStorageChange = () => {
      reloadUserData()
    }

    reloadUserData()
    getSlangTerms()
    getTrendSlangs()
  }, [])

  return (
    <DataContext.Provider
      value={{
        userData,
        setUserData,
        reloadUserData,
        slangTerms,
        setSlangTerms,
        trendSlangs,
        setTrendSlangs,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
