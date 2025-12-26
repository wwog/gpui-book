import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import DocViewer from './components/DocViewer'
import { docsData } from './data/docs'

// 递归函数来展平所有文档路径
function getAllDocPaths(items: typeof docsData): string[] {
  const paths: string[] = []
  items.forEach((item) => {
    paths.push(item.path)
    if (item.children) {
      item.children.forEach((child) => {
        paths.push(child.path)
      })
    }
  })
  return paths
}

const allPaths = getAllDocPaths(docsData)

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/introduction" replace />} />
          <Route path="/introduction" element={<DocViewer path="introduction" />} />
          {allPaths.map((path) => (
            <Route
              key={path}
              path={`/${path}`}
              element={<DocViewer path={path} />}
            />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

