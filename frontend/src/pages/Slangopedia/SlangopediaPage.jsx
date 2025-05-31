import DashboardNavBar from '@/components/DashboardNavBar'
import SlangCard from '@/components/SlangCard'
import api from '@/services/api'
import { useEffect, useState } from 'react'

const SlangopediaPage = () => {
  const [slangTerms, setSlangTerms] = useState([])

  const fetchSlangs = async () => {
    try {
      const res = await api.get(`/translations/slang/all`)
      setSlangTerms(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchSlangs()
  }, [])

  console.log(slangTerms)

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Slangopedia
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {slangTerms.map((term) => (
            <SlangCard
              key={term.id}
              term={term.term}
              meaning={term.meaning}
              example={term.example}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SlangopediaPage
