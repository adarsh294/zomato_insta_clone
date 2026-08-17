// API Configuration
// During development, Vite proxy will handle /api calls
// In production, use the VITE_API_URL environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const API_ENDPOINTS = {
  UPLOAD_VIDEO: `${API_BASE_URL}/food/upload`,
  GET_REELS: `${API_BASE_URL}/food/reels`,
  
  // Auth endpoints
  REGISTER_USER: `${API_BASE_URL}/user/register`,
  LOGIN_USER: `${API_BASE_URL}/user/login`,
  
  // Food Partner endpoints
  REGISTER_FOODPARTNER: `${API_BASE_URL}/foodpartner/register`,
  LOGIN_FOODPARTNER: `${API_BASE_URL}/foodpartner/login`,
  GET_FOODPARTNER: `${API_BASE_URL}/foodpartner/getuser`,
}

export default API_BASE_URL
