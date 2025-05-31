import DashboardNavBar from '@/components/DashboardNavBar'
import SlangCard from '@/components/SlangCard'
import { Input } from '@/components/ui/input'
import api from '@/services/api'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SlangopediaPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [slangTerms, setSlangTerms] = useState([])

  const fetchSlangs = async () => {
    try {
      const res = await api.get(`/translations/slang/all`)
      setSlangTerms(res.data)
    } catch (e) {
      toast.error('Failed to fetch slangs', e)
      console.error(e)
    }
  }

  useEffect(() => {
    fetchSlangs()
  }, [])

  const filteredSlangs = slangTerms
    ? slangTerms.filter((slang) => {
        const matchesSearch =
          searchQuery === '' ||
          slang.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          slang.meaning.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesSearch
      })
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavBar />
      <div className="relative mx-24">
        <Search className="w-4 h-4 absolute left-2 top-3 text-text dark:text-text" />
        <Input
          type="search"
          placeholder="Search"
          className="w-full h-10 pl-8 bg-input-background ring-primary border-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Slangopedia
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredSlangs.map((term) => (
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
