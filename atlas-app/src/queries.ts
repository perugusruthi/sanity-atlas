// Base query fragments
const baseFields = `
  _id,
  _type,
  title,
  description,
  order
`

const resourceFields = `
  ${baseFields},
  type,
  file,
  link,
  resourceCategory,
  caseStudyDetails,
  targetRoles[]->{ _id, title },
  feedback[]->{ _id },
  analytics->{ _id }
`

const lessonFields = `
  ${baseFields},
  summary,
  estimatedTime,
  content,
  videos[]->{ _id, title },
  quizzes[]->{ _id, title },
  resources[]->{ _id, title },
  feedback[]->{ _id },
  analytics->{ _id }
`

const moduleFields = `
  ${baseFields},
  lessons[]->{ _id, title, summary, estimatedTime }
`

const salesPlayFields = `
  ${baseFields},
  content,
  targetRoles[]->{ _id, title },
  salesStages[]->{ _id, title }
`

const playbookFields = `
  ${baseFields},
  content,
  salesPlays[]->{ _id, title }
`

const postFields = `
  ${baseFields},
  slug,
  excerpt,
  body,
  publishedAt
`

const complianceFields = `
  _id,
  _type,
  title,
  description,
  type,
  complianceCategory,
  file,
  link,
  effectiveDate,
  lastUpdated,
  version,
  isActive,
  isPublic,
  regions,
  order,
  _updatedAt
`

const demoFields = `
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
  featuredStatus,
  _updatedAt
`

const productGuideFields = `
  _id,
  _type,
  title,
  slug,
  productFocus,
  guideType,
  overview,
  details,
  relatedResources[]->{ _id, title, description, type },
  featuredStatus,
  _updatedAt
`

const painPointFields = `
  _id,
  _type,
  title,
  description,
  personas[]->{ _id, title, category, description },
  symptoms,
  consequences,
  solution,
  competitiveDifferentiators,
  discoRecordings[]->{ _id, title, description },
  demoRecordings[]->{ _id, title, description },
  relatedResources[]->{ _id, title, description },
  owner->{ _id, name },
  _updatedAt
`

const personaFields = `
  _id,
  _type,
  title,
  category,
  description,
  painPoints[]->{ _id, title, description },
  _updatedAt
`

// Main queries
export const getAllResources = `
  *[_type == "resource"] | order(order asc) {
    ${resourceFields}
  }
`

export const getAllLessons = `
  *[_type == "lesson"] | order(order asc) {
    ${lessonFields}
  }
`

export const getAllModules = `
  *[_type == "academyModule"] | order(order asc) {
    ${moduleFields}
  }
`

export const getAllSalesPlays = `
  *[_type == "salesPlay"] | order(title asc) {
    ${salesPlayFields}
  }
`

export const getAllPlaybooks = `
  *[_type == "playbook"] | order(title asc) {
    ${playbookFields}
  }
`

export const getAllPosts = `
  *[_type == "post"] | order(publishedAt desc) {
    ${postFields}
  }
`

export const getAllBattleCards = `
  *[_type == "battleCard"] | order(title asc) {
    _id,
    _type,
    title,
    slug,
    logo,
    featuredStatus,
    _updatedAt
  }
`

export const getAllCompliance = `
  *[_type == "compliance" && isActive == true] | order(order asc) {
    ${complianceFields}
  }
`

export const getAllDemos = `
  *[_type == "demo"] | order(title asc) {
    ${demoFields}
  }
`

export const getAllProductGuides = `
  *[_type == "productGuide"] | order(title asc) {
    ${productGuideFields}
  }
`

export const getAllPainPoints = `
  *[_type == "painPoint"] | order(title asc) {
    ${painPointFields}
  }
`

export const getAllPersonas = `
  *[_type == "persona"] | order(title asc) {
    ${personaFields}
  }
`

// Search queries
export const searchContent = `
  {
    "resources": *[_type == "resource" && (title match $query || description match $query)] | order(order asc) {
      ${resourceFields}
    },
    "lessons": *[_type == "lesson" && (title match $query || summary match $query)] | order(order asc) {
      ${lessonFields}
    },
    "salesPlays": *[_type == "salesPlay" && (title match $query || description match $query)] | order(title asc) {
      ${salesPlayFields}
    },
    "playbooks": *[_type == "playbook" && (title match $query || description match $query)] | order(title asc) {
      ${playbookFields}
    },
    "posts": *[_type == "post" && (title match $query || excerpt match $query)] | order(publishedAt desc) {
      ${postFields}
    },
    "painPoints": *[_type == "painPoint" && (title match $query || description match $query)] | order(title asc) {
      ${painPointFields}
    },
    "personas": *[_type == "persona" && (title match $query || description match $query)] | order(title asc) {
      ${personaFields}
    }
  }
`

// Global search across all content types
export const globalSearchQuery = `
  {
    "resources": *[_type == "resource" && (title match $searchTerm + "*" || description match $searchTerm + "*")] | order(_updatedAt desc) [0...10] {
      _id, _type, title, description, type, resourceCategory, caseStudyDetails, featuredStatus, _updatedAt
    },
    "knowledgeArticles": *[_type == "knowledgeArticle" && (title match $searchTerm + "*" || pt::text(body) match $searchTerm + "*" || description match $searchTerm + "*")] | order(_updatedAt desc) [0...10] {
      _id, _type, title, description, slug, featuredStatus, _updatedAt
    },
    "productGuides": *[_type == "productGuide" && (title match $searchTerm + "*" || overview match $searchTerm + "*" || pt::text(details) match $searchTerm + "*")] | order(_updatedAt desc) [0...10] {
      _id, _type, title, slug, productFocus, guideType, overview, details, featuredStatus, _updatedAt
    },
    "battleCards": *[_type == "battleCard" && (title match $searchTerm + "*")] | order(_updatedAt desc) [0...10] {
      _id, _type, title, slug, positioningSanityValue, featuredStatus, _updatedAt
    },
    "compliance": *[_type == "compliance" && (title match $searchTerm + "*" || description match $searchTerm + "*")] | order(_updatedAt desc) [0...10] {
      _id, _type, title, description, complianceCategory, type, isActive, _updatedAt
    },
    "demos": *[_type == "demo" && (title match $searchTerm + "*" || description match $searchTerm + "*")] | order(_updatedAt desc) [0...10] {
      _id, _type, title, slug, description, demoType, featuredStatus, _updatedAt
    },
    "painPoints": *[_type == "painPoint" && (title match $searchTerm + "*" || description match $searchTerm + "*")] | order(_updatedAt desc) [0...10] {
      _id, _type, title, description, _updatedAt
    },
    "personas": *[_type == "persona" && (title match $searchTerm + "*" || description match $searchTerm + "*")] | order(_updatedAt desc) [0...10] {
      _id, _type, title, category, description, _updatedAt
    }
  }
`

// Homepage feed - latest content across all types
export const homepageFeedQuery = `
  {
    "featured": *[_type in ["resource", "knowledgeArticle", "productGuide", "battleCard", "compliance", "demo", "painPoint", "persona"] && featuredStatus == "featured"] | order(_updatedAt desc) [0...6] {
      _id, _type, title, description, type, resourceCategory, caseStudyDetails, slug, productFocus, guideType, overview, details, complianceCategory, positioningSanityValue, body, demoType, category, _updatedAt
    },
    "latest": *[_type in ["resource", "knowledgeArticle", "productGuide", "battleCard", "compliance", "demo", "painPoint", "persona"]] | order(_updatedAt desc) [0...12] {
      _id, _type, title, description, type, resourceCategory, caseStudyDetails, slug, productFocus, guideType, overview, details, complianceCategory, positioningSanityValue, body, demoType, category, _updatedAt
    }
  }
`

// Filtered content by resource category
export const resourcesByCategoryQuery = `
  *[_type == "resource" && resourceCategory == $category] | order(_updatedAt desc) {
    _id, title, description, type, resourceCategory, featuredStatus, _updatedAt
  }
`

// Filtered queries
export const getResourcesByType = `
  *[_type == "resource" && type == $resourceType] | order(order asc) {
    ${resourceFields}
  }
`

export const getContentByRole = `
  *[_type in ["resource", "lesson", "salesPlay"] && $roleId in targetRoles[]._ref] | order(order asc, title asc) {
    _id,
    _type,
    title,
    description,
    order
  }
`

export const getContentByStage = `
  *[_type == "salesPlay" && $stageId in salesStages[]._ref] | order(title asc) {
    ${salesPlayFields}
  }
`

// Filtered queries for compliance
export const getComplianceByCategory = `
  *[_type == "compliance" && complianceCategory == $category && isActive == true] | order(order asc) {
    ${complianceFields}
  }
`

export const getDemosByType = `
  *[_type == "demo" && demoType == $demoType] | order(title asc) {
    ${demoFields}
  }
`

export const getAllComplianceCategories = `
  array::distinct(*[_type == "compliance" && isActive == true].complianceCategory) | order(asc)
`

// Single item queries
export const getResourceById = `
  *[_type == "resource" && _id == $id][0] {
    ${resourceFields}
  }
`

export const getLessonById = `
  *[_type == "lesson" && _id == $id][0] {
    ${lessonFields}
  }
`

export const getModuleById = `
  *[_type == "academyModule" && _id == $id][0] {
    ${moduleFields}
  }
`

export const getSalesPlayById = `
  *[_type == "salesPlay" && _id == $id][0] {
    ${salesPlayFields}
  }
`

export const getPlaybookById = `
  *[_type == "playbook" && _id == $id][0] {
    ${playbookFields}
  }
`

export const getPostById = `
  *[_type == "post" && _id == $id][0] {
    ${postFields}
  }
`

export const getDemoById = `
  *[_type == "demo" && _id == $id][0] {
    ${demoFields}
  }
`

export const getProductGuideById = `
  *[_type == "productGuide" && _id == $id][0] {
    ${productGuideFields}
  }
`

export const getPainPointById = `
  *[_type == "painPoint" && _id == $id][0] {
    ${painPointFields}
  }
`

export const getPersonaById = `
  *[_type == "persona" && _id == $id][0] {
    ${personaFields}
  }
`

// Supporting queries
export const getAllRoles = `
  *[_type == "role"] | order(title asc) {
    _id,
    title,
    description
  }
`

export const getAllSalesStages = `
  *[_type == "salesStage"] | order(order asc) {
    _id,
    title,
    description,
    order
  }
`
