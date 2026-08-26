import React, { useState } from 'react'
import '../styles/Upload.css'
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
    <main className="upload-page">
      <div className="upload-shell">
        <header className="upload-header">
          <div>
            <p className="eyebrow">Food partner studio</p>
            <h1>Create a new reel</h1>
            <p className="upload-subtitle">Share the dish people should try next.</p>
          </div>
          <span className="upload-step">01 <span>/ 01</span></span>
        </header>

        {error && <div className="alert alert-error" role="alert">{error}</div>}
        {success && <div className="alert alert-success" role="status">{success}</div>}

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group media-group">
            <label className="field-label" htmlFor="video">Your video <span>*</span></label>
            <label className={`video-dropzone ${preview ? 'has-preview' : ''}`} htmlFor="video">
              <input
                type="file"
                id="video"
                accept="video/*"
                onChange={handleVideoChange}
                disabled={loading}
                className="video-input"
              />
              {preview ? (
                <video className="video-preview" src={preview} controls />
              ) : (
                <span className="dropzone-content">
                  <span className="upload-icon" aria-hidden="true">+</span>
                  <strong>Choose a video to get started</strong>
                  <span>MP4, WebM or OGG · up to 100MB</span>
                </span>
              )}
            </label>
          </div>

          <div className="form-group">
            <label className="field-label" htmlFor="title">Title <span>*</span></label>
            <div className="input-wrap">
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. The crispiest paneer roll"
                maxLength={100}
                disabled={loading}
                className="form-input"
              />
              <span className="char-count">{formData.title.length}/100</span>
            </div>
          </div>

          <div className="form-group">
            <label className="field-label" htmlFor="description">Caption <span className="optional">Optional</span></label>
            <div className="input-wrap">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell your audience what makes it worth a visit..."
                maxLength={500}
                rows={4}
                disabled={loading}
                className="form-textarea"
              />
              <span className="char-count">{formData.description.length}/500</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleReset} disabled={loading} className="btn btn-secondary">
              Clear
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Publishing...' : 'Publish reel'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Upload
