import React from 'react'
import {Link} from 'react-router-dom'
import {FileText, Info, Book, Shield, Star, Rocket, Target, Users} from 'lucide-react'
import type {ContentItem} from '../types'
import {toPlainText} from '@portabletext/react'

interface ContentCardProps {
  item: ContentItem
  showFeatured?: boolean
}

const ContentCard: React.FC<ContentCardProps> = ({item, showFeatured = false}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'resource':
        return <FileText className="h-5 w-5" />
      case 'knowledgeArticle':
        return <Info className="h-5 w-5" />
      case 'productGuide':
        return <Book className="h-5 w-5" />
      case 'battleCard':
      case 'compliance':
        return <Shield className="h-5 w-5" />
      case 'demo':
        return <Rocket className="h-5 w-5" />
      case 'painpoint':
        return <Target className="h-5 w-5" />
      case 'persona':
        return <Users className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'resource':
        return 'bg-blue-100 text-blue-600'
      case 'knowledgeArticle':
        return 'bg-yellow-100 text-yellow-600'
      case 'productGuide':
        return 'bg-green-100 text-green-600'
      case 'battleCard':
        return 'bg-red-100 text-red-600'
      case 'compliance':
        return 'bg-purple-100 text-purple-600'
      case 'demo':
        return 'bg-orange-100 text-orange-600'
      case 'painpoint':
        return 'bg-red-100 text-red-600'
      case 'persona':
        return 'bg-blue-100 text-blue-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getDescription = (item: ContentItem) => {
    if (item._type === 'battleCard' && 'positioningSanityValue' in item) {
      if (Array.isArray(item.positioningSanityValue) && item.positioningSanityValue.length > 0) {
        const plain = toPlainText(item.positioningSanityValue)
        return plain.split('. ').slice(0, 2).join('. ') + (plain.includes('.') ? '.' : '')
      }
      // If positioningSanityValue is empty, return empty string
      return ''
    }
    if (
      item._type === 'knowledgeArticle' &&
      'body' in item &&
      Array.isArray(item.body) &&
      item.body.length > 0
    ) {
      const plain = toPlainText(item.body)
      return plain.split('. ').slice(0, 2).join('. ') + (plain.includes('.') ? '.' : '')
    }
    if (item._type === 'productGuide' && 'overview' in item && item.overview) {
      return (
        item.overview.split('. ').slice(0, 2).join('. ') + (item.overview.includes('.') ? '.' : '')
      )
    }
    if (item._type === 'demo' && 'description' in item && item.description) {
      return (
        item.description.split('. ').slice(0, 2).join('. ') +
        (item.description.includes('.') ? '.' : '')
      )
    }
    if (item._type === 'painpoint' && 'description' in item && item.description) {
      return item.description
    }
    if (item._type === 'persona' && 'description' in item && item.description) {
      return item.description
    }
    if ('description' in item && item.description) return item.description
    if ('overview' in item && item.overview) return item.overview
    if ('summary' in item && item.summary) return item.summary
    return ''
  }

  const getLink = (item: ContentItem) => {
    if (item._type === 'battleCard') {
      return `/battle-card/${item._id}`
    }
    if (item._type === 'productGuide') {
      return `/product/${item._id}`
    }
    if (item._type === 'resource') {
      return `/template/${item._id}`
    }
    if (item._type === 'knowledgeArticle') {
      return `/article/${item._id}`
    }
    if (item._type === 'demo') {
      return `/demo/${item._id}`
    }
    if (item._type === 'painpoint') {
      return `/painpoint/${item._id}`
    }
    if (item._type === 'persona') {
      return `/persona/${item._id}`
    }
    if ('slug' in item && item.slug) {
      return `/${item._type}/${item.slug.current}`
    }
    return `/${item._type}/${item._id}`
  }

  // Helper function to format category names
  const formatCategoryName = (category: string) => {
    return category
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .trim() // Remove leading space
  }

  // Helper function to format type names
  const formatTypeName = (type: string) => {
    return type
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim()
  }

  // Helper function to format case study details
  const getCaseStudyInfo = (item: ContentItem) => {
    if (
      item._type === 'resource' &&
      item.resourceCategory === 'caseStudy' &&
      item.caseStudyDetails
    ) {
      const details = item.caseStudyDetails
      const parts = []

      if (details.industry) {
        parts.push(details.industry.replace(/([A-Z])/g, ' $1').trim())
      }
      if (details.companySize) {
        parts.push(details.companySize)
      }
      if (details.useCase) {
        parts.push(details.useCase.replace(/([A-Z])/g, ' $1').trim())
      }

      return parts.length > 0 ? parts.join(' • ') : null
    }
    return null
  }

  // Restore previous color mapping for resource categories
  const categoryColors: Record<string, string> = {
    bestPractices: 'bg-green-100 text-green-800',
    calculator: 'bg-yellow-100 text-yellow-800',
    caseStudy: 'bg-blue-100 text-blue-800',
    checklist: 'bg-purple-100 text-purple-800',
    competitorAnalysis: 'bg-pink-100 text-pink-800',
    customerSuccess: 'bg-teal-100 text-teal-800',
    externalLink: 'bg-gray-100 text-gray-800',
    industryReport: 'bg-indigo-100 text-indigo-800',
    internalLink: 'bg-gray-100 text-gray-800',
    internalPresentation: 'bg-orange-100 text-orange-800',
    marketResearch: 'bg-cyan-100 text-cyan-800',
    marketingCollateral: 'bg-blue-200 text-blue-900',
    objectionHandling: 'bg-red-100 text-red-800',
    other: 'bg-gray-200 text-gray-800',
    pitchDeck: 'bg-yellow-200 text-yellow-900',
    podcastEpisode: 'bg-pink-200 text-pink-900',
    processDocumentation: 'bg-blue-300 text-blue-900',
    productDemo: 'bg-green-200 text-green-900',
    productGuide: 'bg-green-300 text-green-900',
    referenceMaterial: 'bg-gray-300 text-gray-900',
    salesGuide: 'bg-indigo-200 text-indigo-900',
    salesPresentation: 'bg-orange-200 text-orange-900',
    salesScript: 'bg-purple-200 text-purple-900',
    salesTool: 'bg-teal-200 text-teal-900',
    template: 'bg-gray-100 text-gray-800',
    testimonial: 'bg-yellow-100 text-yellow-800',
    trainingMaterial: 'bg-green-100 text-green-800',
    videoResource: 'bg-blue-100 text-blue-800',
    webinarRecording: 'bg-pink-100 text-pink-800',
    worksheet: 'bg-gray-100 text-gray-800',
    commercialTemplates: 'bg-blue-500 text-white',
  }

  return (
    <Link
      to={getLink(item)}
      className="block bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow p-6 group min-h-[220px]"
    >
      {/* Badge Row: Category/Icon + Label */}
      <div className="flex items-center gap-2 mb-5">
        {'resourceCategory' in item && item.resourceCategory ? (
          <>
            <span
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-lg`}
            >
              {getIcon('resource')}
            </span>
            <span className="inline-block px-3 py-1 rounded-full font-semibold text-xs bg-gray-100 text-gray-800">
              {formatCategoryName(item.resourceCategory)}
            </span>
          </>
        ) : (
          <>
            <span
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${getColor(item._type)} text-lg`}
            >
              {getIcon(item._type)}
            </span>
            <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
              {formatTypeName(item._type)}
            </span>
          </>
        )}
      </div>
      {/* Title (left-aligned, less prominent) */}
      <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1 text-left">
        {item.title}
      </h3>
      {/* Case Study Banners */}
      {item._type === 'resource' &&
        item.resourceCategory === 'caseStudy' &&
        item.caseStudyDetails && (
          <div className="flex flex-wrap gap-2 mb-2">
            {item.caseStudyDetails.industry && (
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                {formatCategoryName(item.caseStudyDetails.industry)}
              </span>
            )}
            {item.caseStudyDetails.useCase && (
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                {formatCategoryName(item.caseStudyDetails.useCase)}
              </span>
            )}
            {item.caseStudyDetails.companySize && (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                {item.caseStudyDetails.companySize}
              </span>
            )}
          </div>
        )}
      {/* Demo Banners */}
      {item._type === 'demo' && (
        <div className="flex flex-wrap gap-2 mb-2">
          {item.demoType && (
            <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
              {formatCategoryName(item.demoType)}
            </span>
          )}
          {item.difficulty && (
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
              {item.difficulty}
            </span>
          )}
          {item.estimatedDuration && (
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
              {item.estimatedDuration}
            </span>
          )}
        </div>
      )}
      {/* Product Guide Banners */}
      {item._type === 'productGuide' && item.guideType && (
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {formatCategoryName(item.guideType)}
          </span>
        </div>
      )}
      {/* Description (left-aligned, more room) */}
      <p className="text-gray-700 text-sm line-clamp-3 text-left">{getDescription(item)}</p>
    </Link>
  )
}

export default ContentCard
