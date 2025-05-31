import api from '@/services/api'
import { useState } from 'react'

export const useFetch = () => {
  const [fetchError, setFetchError] = useState(null)

  const fetchSlangs = async () => {
    try {
      const res = await api.get(`/translations/slang/all`)
      return res.data
    } catch (e) {
      console.error(e)
      setFetchError(e.response.data.message)
    }
  }

  const fetchUserData = async () => {
    try {
      const res = await api.get(`/auth/info`)
      return res.data
    } catch (e) {
      console.error(e)
      setFetchError(e.response.data.message)
    }
  }

  const fetchTrendSlangs = async () => {
    try {
      const res = await api.get(`/translations/trending`)
      return res.data
    } catch (e) {
      console.error(e)
      setFetchError(e.response.data.message)
    }
  }

  return { fetchSlangs, fetchUserData, fetchError, fetchTrendSlangs }
}
