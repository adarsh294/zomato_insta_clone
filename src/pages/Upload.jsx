import React, { useState } from 'react'
import '../styles/Upload.css'
import { API_ENDPOINTS } from '../config/api'
import axios from 'axios'

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video: null
  })
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        setError('Video size must be less than 100MB')
        return
      }
      setFormData(prev => ({
        ...prev,
        video: file
      }))
      // Create preview
      const videoUrl = URL.createObjectURL(file)
      setPreview(videoUrl)
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      setError('Please enter a title')
      return
    }
    if (!formData.video) {
      setError('Please select a video file')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const data = new FormData()
      data.append('name', formData.title)
      data.append('description', formData.description)
      data.append('vedio', formData.video)

      const response = await axios.post("http://localhost:3000/api/food/upload",
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Upload response:', response.data)

      setSuccess('Video uploaded successfully!')
      setFormData({ title: '', description: '', video: null })
      setPreview(null)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
        console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);
  console.log("HEADERS:", err.response?.headers);
      console.error('Upload error:', err)
      setError(err.message || 'Failed to upload video')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({ title: '', description: '', video: null })
    setPreview(null)
    setError('')
    setSuccess('')
  }

  return (
    <div className="lg:w-[500px] mx-auto">
      <div className="upload-wrapper">
        <h1>Upload Video</h1>
        
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className=" flex flex-col gap-[10px]">
          {/* Video Input */}
          <div className="form-group">
            <label htmlFor="video">Select Video *</label>
            <div className="video-input-wrapper">
              <input
                type="file"
                id="video"
                accept="video/*"
                onChange={handleVideoChange}
                disabled={loading}
                className="video-input"
              />
              <span className="file-hint">Accepted formats: MP4, WebM, OGG (Max 100MB)</span>
            </div>
            {preview && (
              <div className="video-preview">
                <video width="200" height="150" controls>
                  <source src={preview} />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          {/* Title Input */}
          <div className="form-group">
            <label htmlFor="title">Video Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter video title"
              maxLength={100}
              disabled={loading}
              className="form-input"
            />
            <span className="char-count">{formData.title.length}/100</span>
          </div>

          {/* Description Input */}
          <div className="form-group mt-[-10px]">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter video description (optional)"
              maxLength={500}
              rows={5}
              disabled={loading}
              className="form-textarea"
            />
            <span className="char-count">{formData.description.length}/500</span>
          </div>

          {/* Form Actions */}
          <div className="form-actions mt-[-10px]">
            <button
              type="submit"
            
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Uploading...' : 'Upload Video'}
            </button>
            <button
              type="button"
                onClick={handleReset}
              disabled={loading}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Upload
