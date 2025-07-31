import React, {useState, useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'
import {FileText, Info, Book, Shield, Rocket, Target, Users} from 'lucide-react'
import {createClient} from '@sanity/client'
import ContentCard from './ContentCard'
import type {ContentItem} from '../types'

const ContentTypeList: React.FC = () => {
  const client = createClient({
    projectId: '67rpxlqi',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
  })
  const [searchParams] = useSearchParams()
  const contentType = searchParams.get('type') || ''
  const categoryParam = searchParams.get('category')
  const pitchParam = searchParams.get('pitch')
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const contentTypeConfig = {
    resource: {
      name: 'Resources',
      icon: FileText,
      color: 'bg-blue-500',
      description: 'PDFs, guides, and downloadable content',
    },
    knowledgeArticle: {
      name: 'Knowledge Articles',
      icon: Info,
      color: 'bg-yellow-500',
      description: 'Best practices, tips, and insights',
    },
    productGuide: {
      name: 'Product Guides',
      icon: Book,
      color: 'bg-green-500',
      description: 'Product features and walkthroughs',
    },
    battleCard: {
      name: 'Battle Cards',
      icon: Shield,
      color: 'bg-red-500',
      description: 'Competitive intelligence and positioning',
    },
    compliance: {
      name: 'Compliance',
      icon: Shield,
      color: 'bg-purple-500',
      description: 'Legal documents and compliance materials',
    },
    demo: {
      name: 'Demo Documentation',
      icon: Rocket,
      color: 'bg-orange-500',
      description: 'Product demos and technical walkthroughs',
    },
    academyModule: {
      name: 'Academy Modules',
      icon: Shield,
      color: 'bg-blue-500',
      description: 'Training modules and courses',
    },
    salesPlay: {
      name: 'Sales Plays',
      icon: Shield,
      color: 'bg-blue-500',
      description: 'Strategic sales plays and tactics',
    },
    playbook: {
      name: 'Playbooks',
      icon: Book,
      color: 'bg-blue-500',
      description: 'Sales playbooks and methodologies',
    },
    tool: {
      name: 'Tools',
      icon: Shield,
      color: 'bg-blue-500',
      description: 'Sales tools and utilities',
    },
    externalLink: {
      name: 'External Links',
      icon: Shield,
      color: 'bg-blue-500',
      description: 'External resources and links',
    },
    platformUpdate: {
      name: 'Platform Updates',
      icon: Shield,
      color: 'bg-blue-500',
      description: 'Platform updates and announcements',
    },
    salesPlaybook: {
      name: 'Sales Playbooks',
      icon: Book,
      color: 'bg-blue-500',
      description: 'Sales playbooks and strategies',
    },
    salesPlaybookTemplate: {
      name: 'Playbook Templates',
      icon: FileText,
      color: 'bg-blue-500',
      description: 'Templates for sales playbooks',
    },
    canvasTemplate: {
      name: 'Canvas Templates',
      icon: FileText,
      color: 'bg-blue-500',
      description: 'Canvas templates and frameworks',
    },
    certification: {
      name: 'Certifications',
      icon: Shield,
      color: 'bg-blue-500',
      description: 'Certification programs and materials',
    },
    feed: {
      name: 'Feeds',
      icon: Shield,
      color: 'bg-blue-500',
      description: 'Content feeds and updates',
    },
    painpoint: {
      name: 'Pain Points',
      icon: Target,
      color: 'bg-red-500',
      description: 'Customer pain points and solutions',
    },
    persona: {
      name: 'Personas',
      icon: Users,
      color: 'bg-blue-500',
      description: 'Buyer personas and job roles',
    },
  }

  const contentTypeIconColors: Record<string, string> = {
    resource: 'text-blue-600',
    knowledgeArticle: 'text-yellow-600',
    productGuide: 'text-green-600',
    battleCard: 'text-red-600',
    compliance: 'text-purple-600',
    demo: 'text-orange-600',
    painpoint: 'text-red-600',
    persona: 'text-blue-600',
  }

  useEffect(() => {
    if (contentType) {
      fetchContent()
    }
  }, [contentType])

  const fetchContent = async () => {
    try {
      let query = ''

      if (contentType === 'demo') {
        query = `*[_type == "demo"] {
          _id,
          _type,
          title,
          slug,
          description,
          demoType,
          urls,
          useCases,
          productGuides[]->{ _id, title, slug },
          demoSteps,
          technicalNotes,
          estimatedDuration,
          difficulty,
          targetRoles[]->{ _id, title },
          tags,
          isFeatured,
          _updatedAt
        } | order(title asc)`
      } else if (contentType === 'painpoint') {
        query = `*[_type == "painPoint"] {
          _id,
          _type,
          title,
          description,
          personas[]->{ _id, title, category },
          _updatedAt
        } | order(title asc)`
      } else if (contentType === 'persona') {
        query = `*[_type == "persona"] {
          _id,
          _type,
          title,
          category,
          description,
          painPoints[]->{ _id, title },
          _updatedAt
        } | order(title asc)`
      } else {
        query = `*[_type == "${contentType}"] {
          _id,
          _type,
          title,
          description,
          publishedAt,
          resourceCategory,
          caseStudyDetails,
          positioningSanityValue,
          body,
          overview,
          details,
          productFocus,
          guideType,
          "roles": roles[]->{_id, title, type, level},
          "targetRoles": targetRoles[]->{_id, title, type, level},
          "affectedRoles": affectedRoles[]->{_id, title, type, level}
        } | order(publishedAt desc)`
      }

      const result = await client.fetch(query)
      setContent(result || [])
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const getContentTypeIcon = (type: string) => {
    const config = contentTypeConfig[type as keyof typeof contentTypeConfig]
    return config ? config.icon : FileText
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString()
  }

  // Helper function to format category names
  const formatCategoryName = (category: string) => {
    return category
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .trim() // Remove leading space
  }

  // Place these at the top level, after other useState hooks
  const [industryFilter, setIndustryFilter] = useState<string>('all')
  const [useCaseFilter, setUseCaseFilter] = useState<string>('all')
  const [companySizeFilter, setCompanySizeFilter] = useState<string>('all')
  const [guideTypeFilter, setGuideTypeFilter] = useState<string>('all')

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const config = contentTypeConfig[contentType as keyof typeof contentTypeConfig]
  if (!config) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Content Type Not Found</h1>
          <p className="text-gray-600">The requested content type could not be found.</p>
        </div>
      </div>
    )
  }

  const Icon = config.icon

  // Only show category filter for resources
  const showCategoryFilter = contentType === 'resource'
  // Show guide type filter for product guides
  const showGuideTypeFilter = contentType === 'productGuide'

  // Get unique categories from content
  const resourceCategories = showCategoryFilter
    ? Array.from(new Set(content.map((item: any) => item.resourceCategory).filter(Boolean)))
    : []

  // Get unique guide types from content
  const guideTypes = showGuideTypeFilter
    ? Array.from(new Set(content.map((item: any) => item.guideType).filter(Boolean)))
    : []

  // Filtered content
  let filteredContent = content
  let showCategoryDropdown = showCategoryFilter
  let showGuideTypeDropdown = showGuideTypeFilter

  if (showCategoryFilter && categoryParam === 'commercialTemplates') {
    filteredContent = content.filter((item: any) => item.resourceCategory === 'commercialTemplates')
    showCategoryDropdown = false
  } else if (showCategoryFilter && pitchParam === 'true') {
    filteredContent = content.filter(
      (item: any) =>
        item.resourceCategory === 'pitchDeck' || item.resourceCategory === 'salesPresentation',
    )
    showCategoryDropdown = false
  } else if (showCategoryFilter && categoryParam === 'caseStudy') {
    filteredContent = content.filter((item: any) => item.resourceCategory === 'caseStudy')
    showCategoryDropdown = false
  } else if (showCategoryFilter && categoryFilter !== 'all') {
    filteredContent = content.filter((item: any) => item.resourceCategory === categoryFilter)
  }

  // Apply guide type filter for product guides
  if (showGuideTypeFilter && guideTypeFilter !== 'all') {
    filteredContent = content.filter((item: any) => item.guideType === guideTypeFilter)
  }

  // Case Study Filters
  const isCaseStudyPage = showCategoryFilter && categoryParam === 'caseStudy'

  // Extract unique filter values from case studies
  let industryOptions: string[] = []
  let useCaseOptions: string[] = []
  let companySizeOptions: string[] = []
  if (isCaseStudyPage) {
    const caseStudies = filteredContent
    industryOptions = Array.from(
      new Set(caseStudies.map((item: any) => item.caseStudyDetails?.industry).filter(Boolean)),
    )
    useCaseOptions = Array.from(
      new Set(caseStudies.map((item: any) => item.caseStudyDetails?.useCase).filter(Boolean)),
    )
    companySizeOptions = Array.from(
      new Set(caseStudies.map((item: any) => item.caseStudyDetails?.companySize).filter(Boolean)),
    )
  }

  // Apply filters to case studies
  if (isCaseStudyPage) {
    filteredContent = filteredContent.filter((item: any) => {
      const details = item.caseStudyDetails || {}
      return (
        (industryFilter === 'all' || details.industry === industryFilter) &&
        (useCaseFilter === 'all' || details.useCase === useCaseFilter) &&
        (companySizeFilter === 'all' || details.companySize === companySizeFilter)
      )
    })
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon className={`h-8 w-8 ${contentTypeIconColors[contentType] || 'text-blue-600'}`} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{config.name}</h1>
            <p className="text-gray-600">{config.description}</p>
          </div>
        </div>
        {/* Case Study Filters */}
        {isCaseStudyPage && (
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Industry Filter */}
            <div>
              <label htmlFor="industry-filter" className="mr-2 text-sm font-medium text-gray-700">
                Industry:
              </label>
              <select
                id="industry-filter"
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="all">All</option>
                {industryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {formatCategoryName(opt)}
                  </option>
                ))}
              </select>
            </div>
            {/* Use Case Filter */}
            <div>
              <label htmlFor="usecase-filter" className="mr-2 text-sm font-medium text-gray-700">
                Use Case:
              </label>
              <select
                id="usecase-filter"
                value={useCaseFilter}
                onChange={(e) => setUseCaseFilter(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="all">All</option>
                {useCaseOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {formatCategoryName(opt)}
                  </option>
                ))}
              </select>
            </div>
            {/* Company Size Filter */}
            <div>
              <label
                htmlFor="companysize-filter"
                className="mr-2 text-sm font-medium text-gray-700"
              >
                Company Size:
              </label>
              <select
                id="companysize-filter"
                value={companySizeFilter}
                onChange={(e) => setCompanySizeFilter(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="all">All</option>
                {companySizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {formatCategoryName(opt)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {/* End Case Study Filters */}

        {/* Guide Type Filter for Product Guides */}
        {showGuideTypeDropdown && (
          <div className="mb-4">
            <label htmlFor="guide-type-filter" className="mr-2 text-sm font-medium text-gray-700">
              Filter by Guide Type:
            </label>
            <select
              id="guide-type-filter"
              value={guideTypeFilter}
              onChange={(e) => setGuideTypeFilter(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="all">All Guide Types</option>
              {guideTypes.map((type) => (
                <option key={type} value={type}>
                  {formatCategoryName(type)}
                </option>
              ))}
            </select>
            {guideTypes.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">
                No guide types available. Add guideType to your product guides in Sanity.
              </p>
            )}
          </div>
        )}

        {/* Category Filter for Resources */}
        {showCategoryDropdown && (
          <div className="mb-4">
            <label htmlFor="category-filter" className="mr-2 text-sm font-medium text-gray-700">
              Filter by Category:
            </label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="all">All Categories</option>
              {resourceCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {formatCategoryName(cat)}
                </option>
              ))}
            </select>
            {resourceCategories.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">
                No categories available. Add resourceCategory to your resources in Sanity.
              </p>
            )}
          </div>
        )}
        <div className="text-sm text-gray-600 mb-4">
          {filteredContent.length} item{filteredContent.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <ContentCard key={item._id} item={item} />
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <Icon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {config.name.toLowerCase()} found
          </h3>
          <p className="text-gray-600">
            There are no {config.name.toLowerCase()} available at the moment.
          </p>
        </div>
      )}
    </div>
  )
}

export default ContentTypeList
