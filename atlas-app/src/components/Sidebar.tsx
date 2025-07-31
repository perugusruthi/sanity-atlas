import { Link, useLocation } from 'react-router-dom'
import {
  FileText,
  Clock,
  Search,
  Home,
  DollarSign,
  Info,
  Book,
  Building2,
} from 'lucide-react'

const IconWrapper: React.FC<{
  icon: React.ComponentType<any>
  className?: string
}> = ({ icon: Icon, className = '' }) => (
  <div className="flex items-center justify-start w-5 h-5 mr-3 max-w-4">
    <Icon className={`w-4 h-4 stroke-2 ${className}`} strokeWidth={2} />
  </div>
)

const Sidebar: React.FC = () => {
  const location = useLocation()

  const mainNavigation = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      description: 'Dashboard and overview',
    },
    {
      name: 'Browse All',
      href: '/browse',
      icon: Search,
      description: 'Search and browse all content',
    },
    {
      name: 'Account Navigator',
      href: '/account-navigator',
      icon: Building2,
      description: 'Browse and manage customer accounts',
    },
  ]

  const contentCategories = [
    {
      name: 'Knowledge Articles',
      href: '/content?type=knowledgeArticle',
      icon: Info,
      description: 'Best practices, techniques, and insights',
    },
    {
      name: 'Resources',
      href: '/content?type=resource',
      icon: FileText,
      description: 'PDFs, templates, and downloadable content',
    },
    {
      name: 'Product Guides',
      href: '/content?type=productGuide',
      icon: Book,
      description: 'Product knowledge and selling guides',
    },
  ]

  const quickAccess = [
    {
      name: 'Pricing Calculator',
      href: '/pricing-calculator',
      icon: DollarSign,
    },
    {
      name: 'Pitch Materials',
      href: '/content?type=resource&pitch=true',
      icon: FileText,
    },
    {
      name: 'Case Studies',
      href: '/content?type=resource&category=caseStudy',
      icon: FileText,
    },
    {
      name: 'Recent Updates',
      href: '/search?sort=updated',
      icon: Clock,
    },
  ]

  const isActive = (href: string) => {
    const currentParams = new URLSearchParams(location.search)
    const [baseHref, query] = href.split('?')

    if (query) {
      const linkParams = new URLSearchParams(query)
      if (location.pathname !== baseHref) return false
      for (const [key, value] of linkParams.entries()) {
        if (currentParams.get(key) !== value) return false
      }
      return true
    }

    return location.pathname === href
  }

  const contentCategoryIconColors: Record<string, string> = {
    'Knowledge Articles': 'text-yellow-600',
    Resources: 'text-blue-600',
    'Product Guides': 'text-green-600',
  }

  const quickAccessIconColors: Record<string, string> = {
    'Pricing Calculator': 'text-green-600',
    'Pitch Materials': 'text-yellow-600',
    'Case Studies': 'text-pink-600',
    'Recent Updates': 'text-purple-600',
  }

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            {/* Main Navigation */}
            <div className="px-4 mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Navigation
              </h3>
              <nav className="space-y-1">
                {mainNavigation.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-start px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        active
                          ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <IconWrapper
                        icon={item.icon}
                        className={active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}
                      />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Content Categories */}
            <div className="px-4 mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Content Categories
              </h3>
              <nav className="space-y-1">
                {contentCategories.map((item) => {
                  const active = isActive(item.href)
                  const colorClass = contentCategoryIconColors[item.name] || 'text-gray-400'
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-start px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        active
                          ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <IconWrapper
                        icon={item.icon}
                        className={active ? colorClass : 'text-gray-400 group-hover:text-gray-500'}
                      />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Quick Access */}
            <div className="px-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Quick Access
              </h3>
              <nav className="space-y-1">
                {quickAccess.map((item) => {
                  const active = isActive(item.href)
                  const colorClass = quickAccessIconColors[item.name] || 'text-gray-400'
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        active
                          ? 'bg-blue-50 border-r-2 border-blue-600'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <IconWrapper
                        icon={item.icon}
                        className={active ? colorClass : 'text-gray-400 group-hover:text-gray-500'}
                      />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
