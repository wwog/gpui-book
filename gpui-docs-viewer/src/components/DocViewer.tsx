import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import ArchitectureDiagram from './ArchitectureDiagram'
import { getDocContent } from '../data/docContent'
import './DocViewer.css'

interface DocViewerProps {
  path: string
}

export default function DocViewer({ path }: DocViewerProps) {
  const content = getDocContent(path)

  return (
    <div className="doc-viewer">
      <div className="doc-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <pre className="code-block">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="inline-code" {...props}>
                  {children}
                </code>
              )
            },
            h1: ({ children }) => <h1 className="doc-h1">{children}</h1>,
            h2: ({ children }) => <h2 className="doc-h2">{children}</h2>,
            h3: ({ children }) => <h3 className="doc-h3">{children}</h3>,
            blockquote: ({ children }) => (
              <blockquote className="doc-blockquote">{children}</blockquote>
            ),
            img: ({ src, alt }) => (
              <img src={src} alt={alt} className="doc-image" />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
        {(path.startsWith('architecture') || 
          path.startsWith('state-management') || 
          path.startsWith('rendering') || 
          path.startsWith('interactivity') || 
          path.startsWith('animations') || 
          path.startsWith('styling')) && <ArchitectureDiagram path={path} />}
      </div>
    </div>
  )
}

