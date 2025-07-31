export const CUSTOMER_360_PROJECT_ID = 'hzao7xsp'
export const CUSTOMER_360_DATASET = 'production'

export interface FullCustomer {
    name?: string,
    nameOverride?: string,
    industry?: string,
    logo?: string,
    plan?: string,
    arr?: string,
    nameUse?: string,
    region?: string,
    _createdAt?: string,
    useCases?: {
        title?: string,
        description?: any,
        categories?: string[],
        greatExampleOf?: string[],
        valueDelivered?: string[],
        whySanity?: string[],
    }[],
    companyOverview?: any,
    initialLaunch?: {
        contractStartDate?: string,
        firstLaunchDate?: string,
        implementationStateAtContractStart?: string,
    },
    allUsecaseCategories?: string[],
}

export const customerQuery = `
*[_type == "customer" && _id == $id][0] {
    'name': coalesce(nameOverride, name),
    companyOverview,
    industry,
    "logo": logo.asset->.url,
    plan,
    arr,
    nameUse,
    "region": region->.name,
    _createdAt,
    useCases[]{
        title,
        description,
        "categories": categories[]->.name,
        greatExampleOf,
        valueDelivered,
        whySanity,
    },
    initialLaunch,
    "allUsecaseCategories": array::unique(useCases[].categories[]->.name)
}`

export const CMS_TECHNOLOGY_ID = '9dcd4c38-08dc-4e69-bbe0-64a2e494d955'

export interface Technology {
    _id: string,
    name?: string,
    logo?: string,
    type?: string
}

export const technologiesForCustomerQuery = `
*[_type == "technology" && type._ref != $cmsId && count(*[_type == "customer" && _id == $id && references(^._id)]) > 0 ]{
    _id,
    name,
    "logo": logo.asset->.url,
    "type": type->.name,
}
`

export const previousCMSForCustomerQuery = `
*[_type == "technology" && type._ref == $cmsId && count(*[_type == "customer" && _id == $id && references(^._id)]) > 0 ]{
    _id,
    name,
    "logo": logo.asset->.url,
}
`