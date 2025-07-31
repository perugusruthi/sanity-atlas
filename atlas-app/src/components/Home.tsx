import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  BookOpen, 
  FileText, 
  Users, 
  Package, 
  Award,
  Search,
  TrendingUp,
  Star,
  Shield,
  Info,
  Book
} from 'lucide-react'
import { homepageFeedQuery } from '../queries'
import type { ContentItem } from '../types'
import ContentCard from './ContentCard'

const Home: React.FC = () => {
  const [data, setData] = useState<{ featured: ContentItem[]; latest: ContentItem[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // For now, we'll use a simple fetch to the Sanity API
        const response = await fetch(`https://67rpxlqi.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(homepageFeedQuery)}`)
        const result = await response.json()
        setData(result.result)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load content')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const featured = data?.featured || []
  const latest = data?.latest || []

  const categories = [
    {
      name: 'Resources',
      description: 'PDFs, guides, and downloadable content',
      icon: FileText,
      href: '/content?type=resource',
      color: 'bg-blue-500',
      count: latest.filter((item) => item._type === 'resource').length + ' resources'
    },
    {
      name: 'Knowledge Articles',
      description: 'Best practices, tips, and insights',
      icon: Info,
      href: '/content?type=knowledgeArticle',
      color: 'bg-yellow-500',
      count: latest.filter((item) => item._type === 'knowledgeArticle').length + ' articles'
    },
    {
      name: 'Product Guides',
      description: 'Product features and walkthroughs',
      icon: Book,
      href: '/content?type=productGuide',
      color: 'bg-green-500',
      count: latest.filter((item) => item._type === 'productGuide').length + ' guides'
    }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-gray-500">Loading content...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Support Atlas
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Your comprehensive knowledge hub for sales excellence. Find the information you need, 
          when you need it, to close more deals and grow your pipeline.
        </p>
        
        {/* Quick Search */}
        <form className="max-w-2xl mx-auto" onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search for anything..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </form>
      </div>

      {/* Featured Content */}
      {featured.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="h-6 w-6 text-yellow-400 mr-2" /> Featured Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((item: ContentItem) => (
              <ContentCard key={item._id} item={item} showFeatured={true} />
            ))}
          </div>
        </div>
      )}

      {/* Latest Content Feed */}
      {latest.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 text-blue-500 mr-2" /> Latest Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((item: ContentItem) => (
              <ContentCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Content Categories */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.name}
                to={category.href}
                className="knowledge-card group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${category.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">
                      {category.name}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500">{category.count}</span>
                </div>
                <p className="text-gray-600">{category.description}</p>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/search" className="knowledge-card group">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">
                Search Knowledge Base
              </h3>
            </div>
            <p className="text-gray-600">Find specific information quickly</p>
          </Link>
          <Link to="/search?type=resource" className="knowledge-card group">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">
                Browse Resources
              </h3>
            </div>
            <p className="text-gray-600">Downloadable content and guides</p>
          </Link>
          <Link to="/content?type=resource&category=commercialTemplates" className="knowledge-card group">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">
                Commercial Templates
              </h3>
            </div>
            <p className="text-gray-600">MSAs, order forms, and other commercial documents</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home 