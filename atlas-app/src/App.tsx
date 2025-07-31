import { type SanityConfig } from '@sanity/sdk'
import { SanityApp } from '@sanity/sdk-react'
import { Flex, Spinner } from '@sanity/ui'
import { SanityUI } from './SanityUI'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

import Layout from './components/Layout'
import Home from './components/Home' // move Home from components to pages for routing structure
import Sidebar from './components/Sidebar'
import ProductGuideDetail from './components/ProductGuideDetail'
import ContentTypeList from './components/ContentTypeList'

const sanityConfigs: SanityConfig[] = [
  {
    projectId: '67rpxlqi',
    dataset: 'production',
  },
]
export default function App() {
  return (
    <SanityApp config={sanityConfigs} fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductGuideDetail />} />
            <Route path="/content" element={<ContentTypeList />} />

          </Route>
        </Routes>
      </Router>
    </SanityApp>
  )
}

