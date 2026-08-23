import { useState, useEffect } from 'react'
import { supabase } from './supabase'

/* ── Type ── */
export type BlogPost = {
  id: number
  type: 'featured' | 'grid'
  badge?: string
  title: string
  description?: string
  author?: string
  category: string
  category_color: string
  video_url: string
  display_order: number
}

/* ── Fallback data — edit here and both home + blog page update ── */
export const BLOG_FALLBACK: BlogPost[] = [
  {
    id: 1,
    type: 'featured',
    badge: 'Must Read',
    title: 'Full-Frame vs. Crop Sensor: Which for Photography?',
    description: 'An honest look at the real-world differences between these camera systems to help you choose what\'s actually right for your photography needs.',
    author: 'By August Renner ©',
    category: 'Gear',
    category_color: '#7d1a4a',
    video_url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_155500_808e6fdd-761f-4acd-b3be-cb7e6e700def.mp4',
    display_order: 1,
  },
  {
    id: 2,
    type: 'grid',
    title: 'Finding Natural Light in Unexpected Places',
    category: 'Lighting',
    category_color: '#2c4c34',
    video_url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4',
    display_order: 2,
  },
  {
    id: 3,
    type: 'grid',
    title: 'My Approach to Editing: Creating a Consistent Photography Style',
    category: 'Editing',
    category_color: '#a63e2d',
    video_url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4',
    display_order: 3,
  },
  {
    id: 4,
    type: 'grid',
    title: 'Pricing Your Photography: Strategies That Work',
    category: 'Business',
    category_color: '#1a2b8c',
    video_url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154232_f8809bd2-a6c3-4a38-908d-2005e5b3cb3e.mp4',
    display_order: 4,
  },
]

/* ── Shared hook — used by BlogPage and BlogPreviewSection ── */
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!supabase) {
        setPosts(BLOG_FALLBACK)
        setLoading(false)
        return
      }
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('display_order', { ascending: true })

      if (error || !data || data.length === 0) {
        setPosts(BLOG_FALLBACK)
      } else {
        setPosts(data as BlogPost[])
      }
      setLoading(false)
    }
    load()
  }, [])

  return { posts, loading }
}
