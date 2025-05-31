import React, { useEffect, useState } from 'react'
import ProfileNavBar from '@/components/ProfileNavBar'
import api from '@/services/api'

// Date formatting utility
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`
}

// Table Headings
const HistoryTableHead = () => (
  <thead>
    <tr className="bg-gray-50">
      <th className="px-4 py-2 text-left font-medium text-gray-700">Slang</th>
      <th className="px-4 py-2 text-left font-medium text-gray-700">
        Explanation
      </th>
      <th className="px-4 py-2 text-left font-medium text-gray-700">Date</th>
    </tr>
  </thead>
)

// Table Body
const HistoryTableBody = ({ history }) => (
  <tbody>
    {history.length === 0 ? (
      <tr>
        <td colSpan={3} className="text-center py-8 text-gray-400">
          No history found.
        </td>
      </tr>
    ) : (
      history.map((item) => (
        <tr key={item.id} className="border-t">
          <td className="px-4 py-2">{item.original}</td>
          <td className="px-4 py-2">{item.translated}</td>
          <td className="px-4 py-2">
            {item.createdAt ? formatDate(item.createdAt) : '-'}
          </td>
        </tr>
      ))
    )}
  </tbody>
)

// Main Page
const HistoryPage = () => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/translations/all')
        setHistory(res.data[0] || [])
      } catch (e) {
        setHistory([])
      }
    }
    fetchHistory()
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ProfileNavBar />
      <main className="flex flex-col items-center py-8 px-4">
        <section className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Translation History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <HistoryTableHead />
              <HistoryTableBody history={history} />
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HistoryPage
