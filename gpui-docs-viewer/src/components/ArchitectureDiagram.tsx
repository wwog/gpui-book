import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import './ArchitectureDiagram.css'

interface ArchitectureDiagramProps {
  path: string
}

export default function ArchitectureDiagram({ path }: ArchitectureDiagramProps) {
  const diagramRef = useRef<HTMLDivElement>(null)
  const [diagramId] = useState(() => `diagram-${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    })
  }, [])

  useEffect(() => {
    if (!diagramRef.current) return

    const getDiagram = () => {
      if (path === 'architecture/index' || path === 'architecture') {
        return `
graph TB
    A[Application<br/>应用程序入口] --> B[App<br/>应用状态管理]
    B --> C[Window<br/>平台窗口]
    B --> D[Context<br/>上下文环境]
    D --> E[Entity<br/>实体状态]
    D --> F[Render<br/>渲染视图]
    C --> F
    E --> F
    
    style A fill:#4da6ff,stroke:#0066cc,color:#fff
    style B fill:#66b3ff,stroke:#0066cc,color:#fff
    style C fill:#99ccff,stroke:#0066cc,color:#000
    style D fill:#99ccff,stroke:#0066cc,color:#000
    style E fill:#cce6ff,stroke:#0066cc,color:#000
    style F fill:#e6f2ff,stroke:#0066cc,color:#000
        `
      } else if (path === 'architecture/application') {
        return `
graph LR
    A[创建 Application] --> B[调用 new 函数]
    B --> C[调用 run 函数]
    C --> D[提供 App 引用]
    D --> E[开始控制应用]
    
    style A fill:#4da6ff,stroke:#0066cc,color:#fff
    style B fill:#66b3ff,stroke:#0066cc,color:#fff
    style C fill:#99ccff,stroke:#0066cc,color:#000
    style D fill:#cce6ff,stroke:#0066cc,color:#000
    style E fill:#e6f2ff,stroke:#0066cc,color:#000
        `
      } else if (path === 'architecture/app') {
        return `
graph TB
    A[App<br/>应用状态] --> B[open_window<br/>打开窗口]
    A --> C[on_action<br/>全局动作绑定]
    A --> D[spawn<br/>异步任务]
    A --> E[管理 Entity 状态]
    
    style A fill:#4da6ff,stroke:#0066cc,color:#fff
    style B fill:#99ccff,stroke:#0066cc,color:#000
    style C fill:#99ccff,stroke:#0066cc,color:#000
    style D fill:#99ccff,stroke:#0066cc,color:#000
    style E fill:#99ccff,stroke:#0066cc,color:#000
        `
      } else if (path === 'architecture/context') {
        return `
graph LR
    A[Context] --> B[继承 App 功能]
    A --> C[控制 Entity]
    A --> D[notify<br/>通知更新]
    D --> E[触发重新渲染]
    
    style A fill:#4da6ff,stroke:#0066cc,color:#fff
    style B fill:#99ccff,stroke:#0066cc,color:#000
    style C fill:#99ccff,stroke:#0066cc,color:#000
    style D fill:#99ccff,stroke:#0066cc,color:#000
    style E fill:#cce6ff,stroke:#0066cc,color:#000
        `
      } else if (path === 'architecture/window') {
        return `
graph TB
    A[Window<br/>平台窗口] --> B[bounds<br/>窗口位置和大小]
    A --> C[mouse_position<br/>鼠标位置]
    A --> D[其他窗口功能]
    
    style A fill:#4da6ff,stroke:#0066cc,color:#fff
    style B fill:#99ccff,stroke:#0066cc,color:#000
    style C fill:#99ccff,stroke:#0066cc,color:#000
    style D fill:#99ccff,stroke:#0066cc,color:#000
        `
      } else if (path === 'state-management/index' || path === 'state-management') {
        return `
graph LR
    A[状态管理] --> B[Entity<br/>实体状态]
    A --> C[Global<br/>全局状态]
    
    B --> D[组件级别<br/>可创建多个]
    B --> E[随组件生命周期]
    
    C --> F[应用级别<br/>每种类型一个]
    C --> G[应用运行期间存在]
    
    style A fill:#4da6ff,stroke:#0066cc,color:#fff
    style B fill:#66b3ff,stroke:#0066cc,color:#fff
    style C fill:#66b3ff,stroke:#0066cc,color:#fff
    style D fill:#cce6ff,stroke:#0066cc,color:#000
    style E fill:#cce6ff,stroke:#0066cc,color:#000
    style F fill:#cce6ff,stroke:#0066cc,color:#000
    style G fill:#cce6ff,stroke:#0066cc,color:#000
        `
      } else if (path === 'state-management/entity') {
        return `
graph TB
    A[Entity<T>] --> B[创建<br/>app.new]
    A --> C[读取<br/>entity.read]
    A --> D[更新<br/>entity.update]
    A --> E[降级<br/>entity.downgrade]
    
    B --> F[存储在 App 中]
    C --> G[只读访问]
    D --> H[修改状态<br/>需要 notify]
    E --> I[WeakEntity<br/>弱引用]
    
    style A fill:#4da6ff,stroke:#0066cc,color:#fff
    style B fill:#99ccff,stroke:#0066cc,color:#000
    style C fill:#99ccff,stroke:#0066cc,color:#000
    style D fill:#99ccff,stroke:#0066cc,color:#000
    style E fill:#99ccff,stroke:#0066cc,color:#000
    style F fill:#e6f2ff,stroke:#0066cc,color:#000
    style G fill:#e6f2ff,stroke:#0066cc,color:#000
    style H fill:#e6f2ff,stroke:#0066cc,color:#000
    style I fill:#e6f2ff,stroke:#0066cc,color:#000
        `
      } else if (path === 'state-management/global') {
        return `
graph TB
    A[Global<T>] --> B[标记类型<br/>impl Global]
    A --> C[设置<br/>set_global]
    A --> D[访问<br/>global/global_mut]
    A --> E[观察<br/>observe_global]
    
    B --> F[必须实现 Global trait]
    C --> G[应用级别唯一]
    D --> H[全局共享访问]
    E --> I[响应变化]
    
    style A fill:#4da6ff,stroke:#0066cc,color:#fff
    style B fill:#99ccff,stroke:#0066cc,color:#000
    style C fill:#99ccff,stroke:#0066cc,color:#000
    style D fill:#99ccff,stroke:#0066cc,color:#000
    style E fill:#99ccff,stroke:#0066cc,color:#000
    style F fill:#e6f2ff,stroke:#0066cc,color:#000
    style G fill:#e6f2ff,stroke:#0066cc,color:#000
    style H fill:#e6f2ff,stroke:#0066cc,color:#000
    style I fill:#e6f2ff,stroke:#0066cc,color:#000
        `
      } else if (path === 'rendering/index' || path === 'rendering') {
        return `
graph TB
    A[渲染系统] --> B[Render<br/>保留模式]
    A --> C[RenderOnce<br/>即时模式]
    
    B --> D[有状态<br/>&mut self]
    B --> E[按需渲染<br/>notify触发]
    B --> F[适合复杂视图]
    
    C --> G[无状态<br/>self所有权]
    C --> H[每次重新创建]
    C --> I[适合简单组件]
    
    style A fill:#4da6ff,stroke:#0066cc,color:#fff
    style B fill:#66b3ff,stroke:#0066cc,color:#fff
    style C fill:#66b3ff,stroke:#0066cc,color:#fff
    style D fill:#cce6ff,stroke:#0066cc,color:#000
    style E fill:#cce6ff,stroke:#0066cc,color:#000
    style F fill:#cce6ff,stroke:#0066cc,color:#000
    style G fill:#cce6ff,stroke:#0066cc,color:#000
    style H fill:#cce6ff,stroke:#0066cc,color:#000
    style I fill:#cce6ff,stroke:#0066cc,color:#000
        `
      } else if (path === 'interactivity/index' || path === 'interactivity') {
        return `
graph LR
    A[交互系统] --> B[鼠标交互]
    A --> C[键盘交互]
    
    B --> D[on_click<br/>点击事件]
    B --> E[on_hover<br/>悬停事件]
    
    C --> F[actions宏<br/>定义动作]
    C --> G[key_binding<br/>按键绑定]
    C --> H[on_action<br/>动作处理]
    
    style A fill:#4da6ff,stroke:#0066cc,color:#fff
    style B fill:#66b3ff,stroke:#0066cc,color:#fff
    style C fill:#66b3ff,stroke:#0066cc,color:#fff
    style D fill:#99ccff,stroke:#0066cc,color:#000
    style E fill:#99ccff,stroke:#0066cc,color:#000
    style F fill:#99ccff,stroke:#0066cc,color:#000
    style G fill:#99ccff,stroke:#0066cc,color:#000
    style H fill:#99ccff,stroke:#0066cc,color:#000
        `
      } else if (path === 'animations/index' || path === 'animations') {
        return `
graph TB
    A[动画系统] --> B[Animation<br/>动画配置]
    A --> C[with_animation<br/>应用动画]
    
    B --> D[Duration<br/>持续时间]
    B --> E[Easing<br/>缓动函数]
    B --> F[Repeat<br/>重复播放]
    
    C --> G[ElementId<br/>元素标识]
    C --> H[动画进度<br/>0.0 - 1.0]
    C --> I[样式更新<br/>根据进度]
    
    style A fill:#4da6ff,stroke:#0066cc,color:#fff
    style B fill:#66b3ff,stroke:#0066cc,color:#fff
    style C fill:#66b3ff,stroke:#0066cc,color:#fff
    style D fill:#cce6ff,stroke:#0066cc,color:#000
    style E fill:#cce6ff,stroke:#0066cc,color:#000
    style F fill:#cce6ff,stroke:#0066cc,color:#000
    style G fill:#cce6ff,stroke:#0066cc,color:#000
    style H fill:#cce6ff,stroke:#0066cc,color:#000
    style I fill:#cce6ff,stroke:#0066cc,color:#000
        `
      } else if (path === 'styling/index' || path === 'styling') {
        return `
graph TB
    A[样式系统] --> B[工具类 API<br/>简洁方式]
    A --> C[Style 结构体<br/>底层方式]
    
    B --> D[链式调用<br/>.flex().items_center]
    
    C --> E[直接操作<br/>style.display]
    
    A --> F[布局样式<br/>Display, Flex等]
    A --> G[尺寸样式<br/>Size, Margin等]
    A --> H[外观样式<br/>Background, Border等]
    A --> I[文本样式<br/>Font, Color等]
    
    style A fill:#4da6ff,stroke:#0066cc,color:#fff
    style B fill:#66b3ff,stroke:#0066cc,color:#fff
    style C fill:#66b3ff,stroke:#0066cc,color:#fff
    style D fill:#cce6ff,stroke:#0066cc,color:#000
    style E fill:#cce6ff,stroke:#0066cc,color:#000
    style F fill:#99ccff,stroke:#0066cc,color:#000
    style G fill:#99ccff,stroke:#0066cc,color:#000
    style H fill:#99ccff,stroke:#0066cc,color:#000
    style I fill:#99ccff,stroke:#0066cc,color:#000
        `
      }
      return null
    }

    const diagram = getDiagram()
    if (diagram && diagramRef.current) {
      diagramRef.current.innerHTML = ''
      mermaid.render(diagramId, diagram).then((result) => {
        if (diagramRef.current) {
          diagramRef.current.innerHTML = result.svg
        }
      }).catch((error) => {
        console.error('Mermaid render error:', error)
        if (diagramRef.current) {
          diagramRef.current.innerHTML = '<p>图表加载失败</p>'
        }
      })
    }
  }, [path, diagramId])

  return <div className="architecture-diagram" ref={diagramRef} />
}

