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
      const { data } = await api.get(`/auth/info`)
      return data.info
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

  const saveTranslation = async (id) => {
    try {
      const res = await api.post(`/translations/save/${id}`)
    } catch (e) {
      console.error(e)
      setFetchError(e.response.data.message)
    }
  }

  const unsaveTranslation = async (id) => {
    try {
      const res = await api.delete(`/translations/unsave/${id}`)
      return res.data
    } catch (e) {
      console.error(e)
      setFetchError(e.response.data.message)
    }
  }

  const fetchAllSavedTranslations = async () => {
    try {
      const res = await api.get(`/translations/saved`)
      return res.data
    } catch (e) {
      console.error(e)
      setFetchError(e.response.data.message)
    }
  }

  return {
    fetchSlangs,
    fetchUserData,
    fetchError,
    fetchTrendSlangs,
    saveTranslation,
    unsaveTranslation,
    fetchAllSavedTranslations,
  }
}
