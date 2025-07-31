// Types matching the existing Studio schemas
export interface Resource {
  _id: string
  _type: 'resource'
  title: string
  description: string
  type: 'upload' | 'link'
  file?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  link?: string
  targetRoles?: Array<{
    _id: string
    title: string
  }>
  order: number
  feedback?: Array<{
    _ref: string
    _type: 'reference'
  }>
  analytics?: {
    _ref: string
    _type: 'reference'
  }
  resourceCategory?:
    | 'bestPractices'
    | 'calculator'
    | 'caseStudy'
    | 'checklist'
    | 'competitorAnalysis'
    | 'customerSuccess'
    | 'externalLink'
    | 'industryReport'
    | 'internalLink'
    | 'internalPresentation'
    | 'marketResearch'
    | 'marketingCollateral'
    | 'objectionHandling'
    | 'other'
    | 'pitchDeck'
    | 'podcastEpisode'
    | 'processDocumentation'
    | 'productDemo'
    | 'productGuide'
    | 'referenceMaterial'
    | 'salesGuide'
    | 'salesPresentation'
    | 'salesScript'
    | 'salesTool'
    | 'template'
    | 'testimonial'
    | 'trainingMaterial'
    | 'videoResource'
    | 'webinarRecording'
    | 'worksheet'
    | 'commercialTemplates'
  caseStudyDetails?: {
    industry?:
      | 'technology'
      | 'healthcare'
      | 'financialServices'
      | 'retailEcommerce'
      | 'mediaEntertainment'
      | 'education'
      | 'manufacturing'
      | 'realEstate'
      | 'travelHospitality'
      | 'nonProfit'
      | 'government'
      | 'other'
    useCase?:
      | 'marketing'
      | 'ecommerce'
      | 'mediaEditorial'
      | 'product'
      | 'contentOperations'
      | 'other'
    companySize?: 'small' | 'medium' | 'large' | 'enterprise'
    businessChallenge?: string
  }
  isFeatured?: boolean
  _updatedAt: string
}

export interface BattleCard {
  _id: string
  _type: 'battleCard'
  title: string
  slug: {current: string}
  customer360Tag?: {
    _ref: string
    _type: 'reference'
  },
  logo?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  positioningSanityValue?: any[]
  theirStrengths?: Array<{
    strength: any[]
    ourResponse: any[]
  }>
  whyWeWin?: Array<{
    point: any[]
    evidence?: any[]
  }>
  quickResponse?: Array<{
    response: any[]
    context?: any[]
  }>
  objectionHandling?: Array<{
    objection: any[]
    response: any[]
    followUp?: any[]
  }>
  comparisonTable?: Array<{
    feature: string
    us: any[]
    competitor: any[]
    advantage?: 'win' | 'lose' | 'neutral'
  }>
  technicalDetails?: any[]
  pricingNotes?: any[]
  relatedResources?: Array<{
    title: string
    url: string
    type?: 'docs' | 'caseStudy' | 'presentation' | 'video' | 'blog' | 'other'
    description?: any[]
  }>
  customerQuotes?: Array<{
    quote: any[]
    attribution?: string
  }>
  lastUpdatedBy?: {
    _ref: string
    _type: 'reference'
  }
  lastUpdated?: string
  isFeatured?: boolean
  _updatedAt: string
}

export interface Lesson {
  _id: string
  _type: 'lesson'
  title: string
  summary: string
  estimatedTime: string
  content?: Array<{
    _type: 'block' | 'image'
    [key: string]: any
  }>
  videos?: Array<{
    _ref: string
    _type: 'reference'
  }>
  quizzes?: Array<{
    _ref: string
    _type: 'reference'
  }>
  resources?: Array<{
    _ref: string
    _type: 'reference'
  }>
  order: number
  feedback?: Array<{
    _ref: string
    _type: 'reference'
  }>
  analytics?: {
    _ref: string
    _type: 'reference'
  }
}

export interface AcademyModule {
  _id: string
  _type: 'academyModule'
  title: string
  description: string
  lessons?: Array<{
    _ref: string
    _type: 'reference'
  }>
  order: number
}

export interface SalesPlay {
  _id: string
  _type: 'salesPlay'
  title: string
  description: string
  content?: Array<{
    _type: 'block' | 'image'
    [key: string]: any
  }>
  targetRoles?: Array<{
    _ref: string
    _type: 'reference'
  }>
  salesStages?: Array<{
    _ref: string
    _type: 'reference'
  }>
}

export interface Playbook {
  _id: string
  _type: 'playbook'
  title: string
  description: string
  content?: Array<{
    _type: 'block' | 'image'
    [key: string]: any
  }>
  salesPlays?: Array<{
    _ref: string
    _type: 'reference'
  }>
}

export interface Post {
  _id: string
  _type: 'post'
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  body?: Array<{
    _type: 'block' | 'image'
    [key: string]: any
  }>
  publishedAt?: string
}

export interface Role {
  _id: string
  _type: 'role'
  title: string
  description?: string
}

export interface SalesStage {
  _id: string
  _type: 'salesStage'
  title: string
  description?: string
  order: number
}

export interface KnowledgeArticle {
  _id: string
  _type: 'knowledgeArticle'
  title: string
  slug: {current: string}
  author?: {_ref: string; _type: 'reference'}
  body: any[]
  relatedResources?: Array<{_ref: string; _type: 'reference'}>
  isFeatured?: boolean
  targetRoles?: Array<{_ref: string; _type: 'reference'}>
  _updatedAt: string
}

export interface ProductGuide {
  _id: string
  _type: 'productGuide'
  title: string
  slug: {current: string}
  productFocus?: string
  guideType?:
    | 'apiDocumentation'
    | 'bestPractices'
    | 'deploymentGuide'
    | 'implementationGuide'
    | 'integrationGuide'
    | 'positioningGuide'
    | 'productOverview'
    | 'salesGuide'
    | 'technicalGuide'
    | 'troubleshooting'
    | 'userGuide'
  overview: string
  details: any[]
  relatedResources?: Array<{_ref: string; _type: 'reference'}>
  isFeatured?: boolean
  _updatedAt: string
}

export interface Compliance {
  _id: string
  _type: 'compliance'
  title: string
  description?: string
  type: 'pdf' | 'link'
  complianceCategory: string
  file?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  link?: string
  effectiveDate?: string
  lastUpdated?: string
  version?: string
  isActive?: boolean
  isPublic?: boolean
  regions?: string[]
  order: number
  _updatedAt?: string
}

export interface Demo {
  _id: string
  _type: 'demo'
  title: string
  slug: {current: string}
  description: string
  demoType: 'product' | 'technical' | 'useCase' | 'integration' | 'custom'
  urls: Array<{
    label: string
    url: string
    description?: string
  }>
  useCases?: Array<{
    title: string
    description: string
    industry?:
      | 'technology'
      | 'healthcare'
      | 'financialServices'
      | 'retailEcommerce'
      | 'mediaEntertainment'
      | 'education'
      | 'manufacturing'
      | 'realEstate'
      | 'travelHospitality'
      | 'nonProfit'
      | 'government'
      | 'other'
    companySize?: 'small' | 'medium' | 'large' | 'enterprise'
  }>
  productGuides?: Array<{_ref: string; _type: 'reference'}>
  demoSteps?: Array<{
    _type: 'block'
    [key: string]: any
  }>
  technicalNotes?: Array<{
    _type: 'block'
    [key: string]: any
  }>
  estimatedDuration?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  targetRoles?: Array<{_ref: string; _type: 'reference'}>
  tags?: string[]
  isFeatured?: boolean
  _updatedAt: string
}

export interface PainPoint {
  _id: string
  _type: 'painpoint'
  title: string
  description: string
  personas?: Array<{
    _id: string
    title: string
    category: 'technical' | 'nonTechnical'
    description?: string
  }>
  symptoms?: any
  consequences?: any
  solution?: any
  competitiveDifferentiators?: any
  discoRecordings?: Array<{
    _id: string
    title: string
    description?: string
  }>
  demoRecordings?: Array<{
    _id: string
    title: string
    description?: string
  }>
  relatedResources?: Array<{
    _id: string
    title: string
    description?: string
  }>
  owner?: {
    _id: string
    name: string
  }
  _updatedAt: string
}

export interface Persona {
  _id: string
  _type: 'persona'
  title: string
  category: 'technical' | 'nonTechnical'
  description?: string
  painPoints?: Array<{
    _id: string
    title: string
    description: string
  }>
  _updatedAt: string
}

// Union type for all content types
export type ContentItem =
  | Resource
  | Lesson
  | AcademyModule
  | SalesPlay
  | Playbook
  | Post
  | KnowledgeArticle
  | ProductGuide
  | BattleCard
  | Compliance
  | Demo
  | PainPoint
  | Persona

// Search and filter types
export interface SearchFilters {
  type?: string
  featured?: boolean
  sort?: 'updated' | 'popular' | 'title'
  role?: string
  stage?: string
}
