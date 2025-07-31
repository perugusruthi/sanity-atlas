import React from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import {useQuery} from '@sanity/sdk-react'
import {ArrowLeft, Calendar, Package, Tag} from 'lucide-react'
import {PortableText} from '@portabletext/react'
import {portableTextComponents} from './PortableTextComponents'

interface ProductGuideDetail {
  _id: string
  title: string
  slug: {current: string}
  productFocus?: string
  guideType?: string
  overview: string
  details: any[]
  relatedResources?: Array<{
    _id: string
    _type: string
    title: string
    description: string
    type?: string
  }>
  isFeatured?: boolean
  _updatedAt: string
}

const productGuideQuery = `
  *[_type == "productGuide" && _id == $id][0] {
    _id,
    title,
    slug,
    productFocus,
    guideType,
    overview,
    details,
    relatedResources[]->{
      _id,
      _type,
      title,
      description,
      type
    },
    isFeatured,
    _updatedAt
  }
`

const ProductGuideDetail: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const navigate = useNavigate();

  const {data: guide, isPending} = useQuery<ProductGuideDetail>({
    query: productGuideQuery,
    params: {id},
  })

  if (isPending) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!guide) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Guide Not Found</h1>
          <p className="text-gray-600 mb-6">
            The product guide you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatGuideType = (guideType: string) => {
    return guideType
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim()
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Product Guide
            </span>
            {guide.guideType && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {formatGuideType(guide.guideType)}
              </span>
            )}
            {guide.isFeatured && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{guide.title}</h1>

          <div className="flex items-center space-x-6 text-sm text-gray-500">
            {guide._updatedAt && (
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                Updated {formatDate(guide._updatedAt)}
              </div>
            )}
            {guide.productFocus && (
              <div className="flex items-center">
                <Package size={14} className="mr-1" />
                Product: {guide.productFocus}
              </div>
            )}
          </div>
        </div>

        {/* Overview */}
        <div className="p-8 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed">{guide.overview}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {guide.details && guide.details.length > 0 ? (
            <div className="prose prose-lg max-w-none">
              <PortableText value={guide.details} components={portableTextComponents} />
            </div>
          ) : (
            <p className="text-gray-500 italic">No detailed content available for this guide.</p>
          )}
        </div>

        {/* Related Resources */}
        {guide.relatedResources && guide.relatedResources.length > 0 && (
          <div className="p-8 border-t border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guide.relatedResources.map((resource) => (
                <Link
                  key={resource._id}
                  to={`/template/${resource._id}`}
                  className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <h4 className="font-medium text-gray-900 mb-1">{resource.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{resource.description}</p>
                  {resource.type && (
                    <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {resource.type}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductGuideDetail
