import React from 'react'
import DashboardNavBar from '@/components/DashboardNavBar'

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNavBar />
      <main className="flex flex-col items-center py-4 px-4 -mt-20">
        {/* Profile Header */}
        <section className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src="/profile-avatar.png"
                alt="User avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-100"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Sophia</h2>
            <div className="flex flex-col items-center gap-1">
              <span className="text-gray-500 text-sm">@sophia_codes</span>
              <span className="text-gray-400 text-xs">Joined in 2022</span>
            </div>
          </div>
          {/* Stats */}
          <div className="flex justify-center mt-8">
            <div className="bg-gray-50 rounded-xl px-85 py-6 flex flex-col items-center shadow w-full max-w-md">
              <span className="text-gray-500 text-base">Total</span>
              <span className="text-4xl font-bold text-purple-600">125</span>
            </div>
          </div>
        </section>

        {/* Saved Translations */}
        <section className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-lg font-semibold mb-4">Saved Translations</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left font-medium text-gray-700">
                    Slang
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">
                    Translation
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">That outfit is lowkey fire.</td>
                  <td className="px-4 py-2">
                    That outfit is actually really nice, but not in an obvious
                    or flashy way.
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">
                    I'm totally dead after that meme.
                  </td>
                  <td className="px-4 py-2">
                    That meme was so funny it made me laugh really hard.
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">He's such a simp for her.</td>
                  <td className="px-4 py-2">
                    He goes out of his way to do things for her, possibly too
                    much, just because he likes her.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProfilePage
