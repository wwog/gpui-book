export interface DocItem {
  title: string
  path: string
  children?: DocItem[]
}

export const docsData: DocItem[] = [
  {
    title: '介绍',
    path: 'introduction',
  },
  {
    title: '快速开始',
    path: 'getting-started',
    children: [
      { title: '创建 GPUI 应用', path: 'getting-started/create-gpui-app' },
      { title: '手动创建项目', path: 'getting-started/manual-project' },
    ],
  },
  {
    title: '架构',
    path: 'architecture',
    children: [
      { title: '应用架构概览', path: 'architecture/index' },
      { title: 'Application', path: 'architecture/application' },
      { title: 'App', path: 'architecture/app' },
      { title: 'Window', path: 'architecture/window' },
      { title: 'Context', path: 'architecture/context' },
    ],
  },
  {
    title: '状态管理',
    path: 'state-management',
    children: [
      { title: '状态管理概览', path: 'state-management/index' },
      { title: 'Entity', path: 'state-management/entity' },
      { title: 'Global', path: 'state-management/global' },
    ],
  },
  {
    title: '元素',
    path: 'elements',
    children: [
      { title: '元素概览', path: 'elements/index' },
      { title: 'Div', path: 'elements/div' },
      { title: 'Text', path: 'elements/text' },
      { title: 'Img', path: 'elements/img' },
      { title: 'Deferred', path: 'elements/deferred' },
    ],
  },
  {
    title: '样式',
    path: 'styling',
    children: [
      { title: '样式概览', path: 'styling/index' },
      { title: '元素样式', path: 'styling/element' },
      { title: '文本样式', path: 'styling/text' },
      { title: '图片样式', path: 'styling/image' },
    ],
  },
  {
    title: '动画',
    path: 'animations',
    children: [
      { title: '动画概览', path: 'animations/index' },
      { title: '动画基础', path: 'animations/animation' },
      { title: 'With Animation', path: 'animations/with_animation' },
    ],
  },
  {
    title: '交互',
    path: 'interactivity',
    children: [
      { title: '交互概览', path: 'interactivity/index' },
      { title: '鼠标事件', path: 'interactivity/mouse' },
      { title: '键盘事件', path: 'interactivity/keyboard' },
    ],
  },
  {
    title: '渲染',
    path: 'rendering',
    children: [
      { title: '渲染概览', path: 'rendering/index' },
      { title: 'Render', path: 'rendering/render' },
      { title: 'RenderOnce', path: 'rendering/render-once' },
    ],
  },
  {
    title: '异步',
    path: 'async',
    children: [
      { title: '异步概览', path: 'async/index' },
      { title: '前台执行器', path: 'async/foreground-executor' },
      { title: '后台执行器', path: 'async/background-executor' },
    ],
  },
  {
    title: '示例',
    path: 'examples',
    children: [
      { title: '示例概览', path: 'examples/index' },
      { title: 'Hello World', path: 'examples/hello-world' },
      { title: '计数器', path: 'examples/counter' },
    ],
  },
  {
    title: '测试',
    path: 'testing',
  },
  {
    title: 'GPUI 类型词汇表',
    path: 'gpui-types-glossary',
  },
]

