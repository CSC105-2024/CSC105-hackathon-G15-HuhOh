import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ProfileNavBar from '@/components/ProfileNavBar'
import api from '@/services/api'
import { toast } from 'sonner'

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
    profileImage: null,
  })
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const handleImageUpload = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setFormData((prev) => ({ ...prev, profileImage: file }))

      const reader = new FileReader()
      reader.onload = () => setPreviewImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formPayload = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formPayload.append(key, value)
      })

      await api.put('/profile/update', formPayload)
      toast.success('Profile updated')
      navigate('/profile')
    } catch (error) {
      toast.error('Update failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileNavBar />

      <div className="max-w-md mx-auto p-6 pt-10">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-24 h-24 rounded-full bg-gray-200 border-2 border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl text-gray-400">👤</span>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <Button
            variant="ghost"
            size="sm"
            className="mt-3"
            onClick={() => fileInputRef.current?.click()}
          >
            Edit
          </Button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />

          <Input
            type="password"
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={(e) =>
              setFormData({ ...formData, oldPassword: e.target.value })
            }
          />

          <Input
            type="password"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
          />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfilePage
