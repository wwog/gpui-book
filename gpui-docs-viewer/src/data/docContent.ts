export function getDocContent(path: string): string {
  const content = docContents[path]
  return content || '# 文档未找到\n\n该文档内容尚未添加。'
}

const docContents: Record<string, string> = {
  'introduction': `# 介绍

GPUI 是一个快速、高效且功能丰富的 GPU 加速 Rust UI 框架，采用混合即时模式和保留模式渲染 API，旨在支持各种类型的应用程序。它被著名的 [Zed 编辑器](https://zed.dev/) 所使用。

## 什么是 GPUI？

**通俗解释：** GPUI 就像是一个专门为 Rust 语言设计的"界面构建工具包"。想象一下，如果你要建房子，GPUI 就是给你提供各种建筑材料和工具的供应商。它利用 GPU（图形处理器）的强大计算能力来快速绘制界面，就像用专业的绘图工具而不是普通的画笔一样。

**核心特点：**
- **GPU 加速**：利用显卡的强大性能，让界面渲染更快更流畅
- **混合渲染模式**：结合了即时模式和保留模式的优点，既灵活又高效
- **Rust 原生**：完全用 Rust 编写，享受 Rust 的安全性和性能优势

本书将教你创建自己的 GPUI 应用程序所需的概念。

本书的章节大致按难度递增的顺序排列，每章中的部分也遵循这个顺序。`,

  'getting-started/index': `# 快速开始

在本章中，你将学习如何通过使用 [Create GPUI App](https://github.com/zed-industries/create-gpui-app) 或手动创建自己的 Rust 项目来开始一个基本的 GPUI 应用程序。

## 安装 GPUI

GPUI 的版本会定期发布到 [crates.io 注册的 crate](https://crates.io/crates/gpui)。

**通俗解释：** crates.io 就像是 Rust 的"应用商店"，你可以从这里下载和使用各种 Rust 库（crate）。GPUI 就是其中一个库。

使用 GPUI 可以通过 crates.io crate 或通过 git 依赖在你的 \`Cargo.toml\` 中完成，GPUI crate 保存在 [Zed 仓库](https://github.com/zed-industries/zed) 中，因为它随着 Zed 的需求而不断演进。

\`\`\`toml
gpui = { version = "*" } # 指定特定版本
# 或者
gpui = { git = "https://github.com/zed-industries/zed" }
\`\`\`

**通俗解释：** 
- **版本号方式**：使用稳定发布的版本，适合生产环境
- **Git 方式**：直接从 GitHub 获取最新代码，适合想要最新功能的开发者`,

  'getting-started/create-gpui-app': `## 创建 GPUI 应用

[Create GPUI App](https://github.com/zed-industries/create-gpui-app) 是一个官方 CLI 工具，可以让你快速设置并开始使用 GPUI 应用程序。

**通俗解释：** 这就像是一个"项目生成器"，你只需要运行一个命令，它就会自动为你创建一个完整的项目结构，包括所有必要的配置文件和初始代码。就像使用脚手架工具一样，省去了手动创建的麻烦。

### 构建和安装

\`\`\`properties
cargo install create-gpui-app
\`\`\`

**通俗解释：** 这个命令会从 crates.io 下载并安装 \`create-gpui-app\` 工具到你的系统中，之后你就可以在任何地方使用它了。

### 使用方法

#### 单体结构

\`\`\`properties
create-gpui-app --name my-app
cd my-app
\`\`\`

**通俗解释：** 单体结构意味着所有代码都在一个项目中，适合小型应用。

\`\`\`properties
my-app
├── src
│   └── main.rs
├── Cargo.toml
└── README.md
\`\`\`

#### 工作区结构

\`\`\`properties
create-gpui-app --workspace --name my-app
cd my-app
\`\`\`

**通俗解释：** 工作区结构允许你将项目分成多个 crate（库），适合大型应用。就像把一个大房子分成多个房间，每个房间有独立的用途。

\`\`\`properties
my-app
├── Cargo.toml
├── crates
│   └── my-app
│       ├── Cargo.toml
│       └── src
│           └── main.rs
└── README.md
\`\`\``,

  'getting-started/manual-project': `## 手动创建项目

本节将介绍如何在不使用 \`create-gpui-app\` CLI 工具的情况下，手动为你的 GPUI 应用程序设置单体项目结构。

**通俗解释：** 如果你想要完全控制项目的创建过程，或者想要了解项目的每个部分是如何配置的，手动创建是个好选择。就像自己动手组装家具，虽然麻烦一些，但能更好地理解每个部件的作用。

### 设置

\`\`\`properties
cargo new my-app
cd my-app
\`\`\`

你可以使用 crates.io crate 或 git 仓库来添加 \`gpui\`。

**通俗解释：** 
- **crates.io**：使用官方发布的稳定版本
- **git 仓库**：使用最新的开发版本，可能包含新功能但可能不够稳定

使用 crates.io 依赖将 \`gpui\` 添加到 \`Cargo.toml\`。

\`\`\`properties
cargo add gpui
\`\`\`

使用 git 依赖将 \`gpui\` 添加到 \`Cargo.toml\`。

\`\`\`properties
cargo add gpui --git https://github.com/zed-industries/zed
\`\`\`

### Hello World 示例

将基本的 Hello World 示例代码添加到 \`main.rs\`。

\`\`\`rust
use gpui::{
    AppContext, Application, Context, IntoElement, ParentElement, Render, Styled, Window,
    WindowOptions, div, white,
};

struct RootView;

impl Render for RootView {
    fn render(&mut self, _window: &mut Window, _cx: &mut Context<Self>) -> impl IntoElement {
        div()
            .size_full()
            .flex()
            .items_center()
            .justify_center()
            .bg(white())
            .child("Hello World!")
    }
}

fn main() {
    Application::new().run(|app| {
        app.open_window(WindowOptions::default(), |_window, app| {
            app.new(|_cx| RootView)
        })
        .unwrap();
    });
}
\`\`\`

**代码解释：**
1. **RootView**：这是你的根视图组件，类似于网页中的根元素
2. **Render trait**：实现这个 trait 让你的结构体可以渲染到屏幕上
3. **div()**：创建一个 div 元素，类似于 HTML 的 div
4. **链式调用**：通过链式调用设置样式和属性，非常直观
5. **Application::new().run()**：创建应用并运行，这是程序的入口点`,

  'architecture/index': `# 架构

在本章中，你将学习 GPUI 的架构。

## 架构概览

**通俗解释：** GPUI 的架构就像是一个公司的组织结构：

- **Application（应用程序）**：公司的 CEO，是整个应用的入口点
- **App（应用状态）**：公司的管理层，负责管理整个应用的状态和资源
- **Window（窗口）**：公司的办公室，是用户看到和交互的界面
- **Context（上下文）**：部门经理，负责管理特定实体的上下文信息
- **Entity（实体）**：公司的员工，是应用中的数据和状态载体

这些组件相互协作，共同构建了一个完整的应用程序。`,

  'architecture/application': `## Application（应用程序）

\`Application\` 是你的 GPUI 应用程序的入口点。

**通俗解释：** 想象 Application 就像是一辆汽车的引擎启动按钮。当你按下按钮（创建 Application）时，整个系统开始运转。它是你与 GPUI 框架交互的第一个接口。

### 创建应用程序

\`new\` 函数创建 \`Application\`。

\`\`\`rust
use gpui::Application;

fn main() {
    let app = Application::new();
}
\`\`\`

**通俗解释：** 这就像是在说"我要创建一个新的应用程序了"。此时应用程序还没有运行，只是被创建出来了。

### 运行应用程序

\`run\` 函数消费 \`Application\` 并接受一个回调函数，该回调在应用程序完成加载后触发。这个回调是你的应用程序的入口点，提供了一个 \`App\` 的可变引用，你可以用它来控制应用程序的各个方面，比如[打开窗口](./app.md#opening-a-window)。

\`\`\`rust
use gpui::Application;

fn main() {
    Application::new().run(|app| {
        // 这里可以开始控制应用程序
        // app 是一个 App 类型的可变引用
    });
}
\`\`\`

**通俗解释：** 
- **消费（consume）**：意味着 Application 被"用掉"了，之后不能再使用原来的 Application
- **回调函数**：就像是一个"准备好了"的通知，当应用程序初始化完成后，这个函数会被调用
- **可变引用**：允许你修改 App 的状态，比如打开窗口、注册事件处理器等

**实际应用场景：** 在回调函数中，你通常会：
1. 打开一个窗口
2. 设置全局状态
3. 注册事件处理器
4. 初始化应用的数据`,

  'architecture/app': `## App（应用状态）

\`App\` 包含整个应用程序的状态，它允许你控制应用程序功能的许多方面，例如管理 \`Entity\` 的状态。

**通俗解释：** App 就像是应用程序的"大脑"，它知道：
- 当前打开了哪些窗口
- 应用程序的全局设置
- 所有实体的状态
- 如何处理用户的操作

### 打开窗口

使用 \`App\` 你可以访问 \`open_window\` 函数，它接受一个 \`WindowOptions\` 和一个回调函数，该回调提供 \`Window\` 和 \`App\` 的可变引用，用于构建根视图。要了解更多关于如何创建视图的信息，可以阅读[渲染部分](../rendering/render.md)。

\`\`\`rust
use gpui::{App, WindowOptions};

app.open_window(WindowOptions::default(), |window, app| {
    // 在这里构建你的根视图
});
\`\`\`

**通俗解释：** 
- **WindowOptions**：窗口的配置选项，比如大小、位置、标题等
- **回调函数**：当窗口创建成功后，这个函数会被调用，你可以在里面创建视图
- **window 和 app**：都是可变引用，允许你修改窗口和应用的状态

**实际例子：** 就像打开一个浏览器标签页，你可以设置标签页的大小、位置，然后在里面加载网页内容。

### On Action（全局动作）

使用 \`App\` 你可以使用 \`on_action\` 函数在整个应用程序中全局绑定一个回调到动作的触发。

\`\`\`rust
use gpui::App;

app.on_action(|action, cx| {
    // 处理全局动作
});
\`\`\`

**通俗解释：** 这就像是设置一个"全局快捷键"或"全局事件监听器"。无论用户在应用的哪个地方执行某个动作，这个回调都会被触发。

**使用场景：** 
- 处理全局快捷键（如 Ctrl+S 保存）
- 处理全局命令（如退出应用）
- 处理应用级别的通知

### Spawn（异步任务）

使用 \`App\` 你可以使用 \`spawn\` 函数在主线程上排队一个 future，它接受一个 \`AsyncFnOnce\`，当异步闭包被调用时会提供 \`AsyncApp\`。\`AsyncApp\` 允许你访问应用程序状态。

\`\`\`rust
use gpui::App;

app.spawn(|cx: &mut AsyncApp| async move {
    // 异步任务代码
    // 可以访问应用状态
}).detach();
\`\`\`

**通俗解释：** 
- **Spawn**：就像是在后台启动一个任务，不会阻塞主线程
- **Future**：Rust 中的异步任务，类似于 JavaScript 的 Promise
- **AsyncApp**：在异步上下文中访问应用状态的接口

**使用场景：** 
- 从网络加载数据
- 执行耗时的计算
- 读取文件系统
- 任何需要等待的操作`,

  'architecture/window': `## Window（窗口）

\`Window\` 代表一个平台窗口，它允许你控制窗口功能的许多方面。

**通俗解释：** Window 就像是应用程序的"窗户"，用户通过这个窗户看到你的应用界面。每个窗口都是独立的，可以有自己的大小、位置和内容。

### Bounds（边界）

给出平台窗口的原点和大小。

\`\`\`rust
use gpui::Window;

let bounds = window.bounds();
println!("窗口位置: {:?}, 大小: {:?}", bounds.origin, bounds.size);
\`\`\`

**通俗解释：** Bounds 告诉你窗口在屏幕上的位置和大小。就像知道一个房间的坐标和尺寸一样。

**实际应用：** 
- 保存窗口位置，下次打开时恢复
- 根据窗口大小调整布局
- 限制窗口的最小/最大尺寸

### Mouse Position（鼠标位置）

给出相对于窗口的鼠标 x 和 y 位置。

\`\`\`rust
use gpui::Window;

let mouse_pos = window.mouse_position();
println!("鼠标位置: x={}, y={}", mouse_pos.x, mouse_pos.y);
\`\`\`

**通俗解释：** 这告诉你鼠标在窗口内的精确位置。就像知道鼠标指针在屏幕上的坐标一样。

**使用场景：** 
- 实现拖拽功能
- 显示工具提示
- 实现自定义鼠标交互
- 绘制跟随鼠标的元素`,

  'architecture/context': `## Context（上下文）

\`Context\` 解引用到 \`App\`，所以它拥有 [App](./app.md) 的所有功能，并且还具有控制它所属的 \`Entity\` 的额外功能。

**通俗解释：** Context 就像是"带上下文的 App"。它不仅拥有 App 的所有能力，还知道当前正在处理的是哪个 Entity（实体）。就像是一个部门经理，既知道公司的整体情况，也知道自己部门的具体情况。

### Notify（通知）

\`notify\` 函数通知 GPUI 该 \`Entity\` 已更新，应该通知它的观察者。如果 \`Context<T>\` 的 \`T\` 类型实现了 \`Render\`，那么视图将被重新渲染。

\`\`\`rust
use gpui::Context;

cx.notify();
\`\`\`

**通俗解释：** 
- **Notify**：就像是在说"嘿，我的数据变了，需要更新界面！"
- **观察者模式**：其他关注这个 Entity 的组件会被通知，可以相应地更新
- **自动重新渲染**：如果 Entity 实现了 Render，界面会自动更新

**为什么需要 notify？** 
GPUI 使用响应式系统，只有当数据真正改变时才重新渲染。notify 就是告诉系统"数据变了"的信号。

**使用场景：** 
- 修改了 Entity 的字段后
- 从异步任务中更新状态后
- 需要强制刷新视图时`,

  'state-management/index': `# 状态管理

在本章中，你将学习如何在 GPUI 应用程序中管理状态。

**通俗解释：** 状态管理就像是应用程序的"记忆系统"。它需要记住：
- 用户输入了什么
- 当前显示什么内容
- 应用的各种设置
- 数据的变化历史

## 两种主要的状态存储方式

在 GPUI 中，有两种主要的方式来存储应用程序状态：

- **[Entity（实体）](entity.md)**：用于组件级别的状态
- **[Global（全局）](global.md)**：用于应用程序级别的状态

**通俗对比：**

| 特性 | Entity | Global |
|------|--------|--------|
| 作用域 | 组件级别 | 应用级别 |
| 生命周期 | 随组件创建和销毁 | 应用运行期间一直存在 |
| 使用场景 | 表单数据、UI 状态 | 用户设置、主题、全局配置 |
| 类比 | 房间里的物品 | 房子的基础设施 |

**选择建议：**
- 如果状态只属于某个组件 → 使用 Entity
- 如果状态需要在多个组件间共享 → 使用 Global`,

  'elements/index': `# 元素

在本章中，你将学习 GPUI 中可用的各种原始元素。

**通俗解释：** 元素就像是构建界面的"积木块"。就像用乐高积木搭建模型一样，你可以用这些元素组合出复杂的界面。

## 什么是元素？

元素是 GPUI 中最基本的 UI 组件。每个元素都有：
- **外观**：它看起来是什么样子
- **行为**：它可以做什么
- **样式**：如何自定义它的外观

要学习如何创建自己的元素，请阅读[实现元素](../implementing-element/index.md)章节。

## 可用的元素类型

GPUI 提供了多种内置元素：

- **Div**：容器元素，类似于 HTML 的 div
- **Text**：文本元素，用于显示文字
- **Img**：图片元素，用于显示图像
- **Deferred**：延迟加载元素，用于性能优化
- **Svg**：SVG 图形元素
- **Canvas**：画布元素，用于自定义绘制

**通俗类比：**
- **Div** = 盒子，用来装其他东西
- **Text** = 标签，用来显示文字
- **Img** = 相框，用来展示图片
- **Deferred** = 懒加载的盒子，需要时才加载内容`,

  'examples/hello-world': `## Hello World

一个简单的 "Hello World!" 示例。

![Hello World](../src/examples/images/hello_world.webp)

### 实现

\`\`\`rust
use gpui::{
    AppContext, Application, Context, IntoElement, ParentElement, Render, Styled, Window,
    WindowOptions, div, white,
};

struct RootView;

impl Render for RootView {
    fn render(&mut self, _window: &mut Window, _cx: &mut Context<Self>) -> impl IntoElement {
        div()
            .size_full()
            .flex()
            .items_center()
            .justify_center()
            .bg(white())
            .child("Hello World!")
    }
}

fn main() {
    Application::new().run(|app| {
        app.open_window(WindowOptions::default(), |_window, app| {
            app.new(|_cx| RootView)
        })
        .unwrap();
    });
}
\`\`\`

### 代码解释

**通俗解释：** 这个例子展示了 GPUI 应用的基本结构。

1. **RootView 结构体**：这是你的根视图，类似于网页的 body 元素
2. **实现 Render trait**：这让 RootView 可以渲染到屏幕上
3. **div() 链式调用**：
   - \`.size_full()\`：占满整个窗口
   - \`.flex()\`：使用 flexbox 布局
   - \`.items_center()\`：垂直居中
   - \`.justify_center()\`：水平居中
   - \`.bg(white())\`：设置白色背景
   - \`.child("Hello World!")\`：添加文本内容
4. **main 函数**：
   - 创建 Application
   - 运行应用
   - 打开窗口
   - 创建 RootView

**运行结果：** 会在窗口中央显示 "Hello World!" 文本。`,

  'elements/div': `## Div（容器元素）

\`Div\` 元素是 GPUI 中最常用的元素。它作为其他元素的容器，可以通过样式和交互性来增强，以构建各种组件。

**通俗解释：** Div 就像是 HTML 中的 div 标签，是一个"盒子"，用来装其他东西。你可以：
- 在里面放其他元素（子元素）
- 给它设置样式（颜色、大小、位置等）
- 让它响应鼠标点击、悬停等交互

要学习如何设置样式和使元素具有交互性，请前往相应的章节[样式](../styling/index.md)和[交互性](../interactivity/index.md)。

### 创建 Div

\`\`\`rust
use gpui::div;

let my_div = div();
\`\`\`

**通俗解释：** 这就像是在说"我要创建一个新的盒子"。此时盒子还是空的，没有任何内容或样式。

### 向 Div 添加子元素

\`\`\`rust
use gpui::{div, prelude::*};

div()
    .child("Hello")
\`\`\`

**通俗解释：** \`.child()\` 方法可以在 div 里面放一个子元素。就像在盒子里放东西一样。

### 向 Div 添加多个子元素

\`\`\`rust
use gpui::{div, prelude::*};

div()
    .children(vec!["Hello", "World"])
\`\`\`

**通俗解释：** \`.children()\` 方法可以一次性添加多个子元素。就像在盒子里放多个物品一样。

**实际应用：** 
- 创建布局容器
- 组织 UI 组件
- 实现卡片、面板等组件`,

  'elements/text': `## Text（文本元素）

GPUI 中有多种不同的类型允许你渲染文本。

**通俗解释：** 文本元素就像是"标签纸"，用来显示文字。根据不同的使用场景，GPUI 提供了不同类型的文本，就像有不同材质的标签纸一样。

要学习如何设置文本样式，请阅读[文本样式](../styling/text.md)章节。

### &'static str（静态字符串）

\`\`\`rust
use gpui::prelude::*;

div().child("Hello World")
\`\`\`

**通俗解释：** 这是最简单的文本类型，适用于不会改变的固定文本。就像打印在纸上的文字，不会改变。

**使用场景：** 
- 固定的标签文字
- 按钮文本
- 标题和说明文字

### String（动态字符串）

使用 \`String\` 应该谨慎，因为它会在每次重新渲染时导致堆分配，阅读关于 [SharedString](#sharedstring) 的内容以了解如何避免这种情况。

\`\`\`rust
use gpui::prelude::*;

let text = String::from("Hello World");
div().child(text)
\`\`\`

**通俗解释：** String 是动态的，可以修改。但每次渲染时都会分配新的内存，性能较差。

**性能问题：** 
- 每次渲染都会创建新的 String
- 导致内存分配和释放
- 影响性能，特别是频繁更新的场景

### SharedString（共享字符串）

\`SharedString\` 是一个可以廉价克隆的不可变字符串，这在 \`render\` 函数中特别有用，因为它避免了在使用 \`String\` 时每次重新渲染都会发生的堆分配。

\`SharedString\` 通常存储在 \`Entity\` 状态中，可以在 \`render\` 函数中访问。

\`\`\`rust
use gpui::{prelude::*, SharedString};

struct MyView {
    text: SharedString,
}

impl Render for MyView {
    fn render(&mut self, _: &mut Window, _: &mut Context<Self>) -> impl IntoElement {
        div().child(self.text.clone())
    }
}
\`\`\`

**通俗解释：** SharedString 就像是"共享的文本"，可以被多个地方使用而不需要复制。克隆它很便宜，不会分配新内存。

**优势：** 
- 克隆成本低（不分配新内存）
- 适合在 render 函数中使用
- 性能更好

**使用场景：** 
- 需要频繁更新的文本
- 存储在 Entity 中的文本
- 需要在多个地方使用的文本

### StyledText（样式文本）

\`StyledText\` 组件允许你对文本的特定范围应用不同的样式，这些文本范围称为 \`TextRun\`。如果你的整个文本范围使用相同的样式，则不需要使用 \`StyledText\`。

\`\`\`rust
use gpui::{prelude::*, StyledText, TextRun};

let styled_text = StyledText::new("Hello World")
    .with_text_run(TextRun::new(0..5).with_color(red()))
    .with_text_run(TextRun::new(6..11).with_color(blue()));
\`\`\`

**通俗解释：** StyledText 就像是"彩色文字"，可以对文字的不同部分设置不同的颜色、字体等样式。

**使用场景：** 
- 代码高亮
- 富文本编辑器
- 需要部分文字特殊样式的场景

### InteractiveText（交互式文本）

\`InteractiveText\` 组件允许你使文本的特定范围具有交互性，它允许你为特定的文本范围添加点击和悬停监听器。该组件接受一个 \`ElementId\`，必须在每一帧都相同，以及一个 [StyledText](#styledtext)。

\`\`\`rust
use gpui::{prelude::*, InteractiveText, StyledText, ElementId};

let interactive_text = InteractiveText::new(
    ElementId::from("my-text"),
    StyledText::new("Click me!")
);
\`\`\`

**通俗解释：** InteractiveText 就像是"可点击的文字"，用户点击或悬停时会有反应。

**使用场景：** 
- 链接
- 可点击的标签
- 交互式文档
- 代码编辑器中的符号跳转`,

  'styling/index': `# 样式

在本章中，你将学习如何在 GPUI 应用程序中设置元素的样式。

**通俗解释：** 样式就像是给界面元素"化妆"，让它们看起来更美观、更符合设计需求。就像给房子装修一样，样式决定了界面的外观。

## 布局引擎

GPUI 使用 [Taffy](https://github.com/DioxusLabs/taffy) 作为底层布局引擎，它负责元素如何布局。

**通俗解释：** Taffy 就像是界面的"建筑师"，负责决定每个元素应该放在哪里、有多大、如何排列。它使用类似 CSS Flexbox 的布局算法。

## 样式设置方式

元素的样式可以通过两种方式设置：
1. **工具类 CSS 样式 API**：类似 CSS 的简洁函数
2. **修改底层 Style 结构体**：直接操作样式对象

**通俗解释：** 
- **工具类 API**：就像使用快捷方式，写起来简单快速
- **Style 结构体**：就像直接操作底层数据，更灵活但更繁琐

两种方式都能达到相同的效果，你可以根据喜好选择，甚至可以创建自己的自定义快捷函数。

### 工具类 CSS 样式 API（推荐）

\`\`\`rust
impl Render for SomeView {
    fn render(&mut self, _window: &mut Window, _cx: &mut Context<Self>) -> impl IntoElement {
        div().flex().flex_col().child("Hello").child("World")
    }
}
\`\`\`

**优点：** 简洁、易读、链式调用

### 修改底层 Style 结构体

\`\`\`rust
impl Render for SomeView {
    fn render(&mut self, _window: &mut Window, _cx: &mut Context<Self>) -> impl IntoElement {
        let mut element = div().child("Hello").child("World");
        
        let style = element.style();
        style.display = Some(Display::Flex);
        style.flex_direction = Some(FlexDirection::Column);
        
        element
    }
}
\`\`\`

**优点：** 更灵活，可以批量设置样式`,

  'styling/element': `## 元素样式

任何实现了 \`Styled\` trait 的元素都允许通过 \`.style()\` 函数或工具类 CSS 样式函数来修改其样式。

**通俗解释：** 就像所有可以"化妆"的元素都有一个共同的接口，通过这个接口可以改变它们的外观。

### 常用样式属性

以下是 GPUI 中可用的主要样式属性：

#### 布局相关

- **Display（显示方式）**：控制子元素的布局方式（Block、Flex、Grid、None）
- **Flex Direction（Flex 方向）**：控制 Flex 子元素的排列方向（Row、Column 等）
- **Flex Wrap（Flex 换行）**：控制是否换行
- **Justify Content（主轴对齐）**：控制主轴方向的对齐方式
- **Align Items（交叉轴对齐）**：控制交叉轴方向的对齐方式
- **Gap（间距）**：控制子元素之间的间距

**通俗解释：** 这些属性就像是控制"盒子里的物品如何排列"的规则。

#### 尺寸相关

- **Size（大小）**：控制元素的宽高
- **Min Size（最小尺寸）**：控制元素的最小宽高
- **Max Size（最大尺寸）**：控制元素的最大宽高
- **Aspect Ratio（宽高比）**：控制宽高比例

**通俗解释：** 就像给元素设置"尺寸限制"，确保它不会太大或太小。

#### 间距相关

- **Margin（外边距）**：元素外部的空白区域
- **Padding（内边距）**：元素内部的空白区域
- **Inset（偏移）**：元素相对于容器的偏移

**通俗解释：** 
- Margin = 元素和周围其他元素的距离
- Padding = 元素内容和边框的距离

#### 外观相关

- **Background（背景）**：背景填充
- **Border Color（边框颜色）**：边框颜色
- **Corner Radii（圆角）**：圆角半径
- **Box Shadow（阴影）**：盒子阴影
- **Opacity（透明度）**：透明度（0-1）
- **Visibility（可见性）**：是否可见

**通俗解释：** 这些属性控制元素的"外观装饰"，让界面更美观。

#### 其他

- **Position（定位）**：定位方式（Relative、Absolute）
- **Overflow（溢出）**：内容溢出时的处理方式
- **Mouse Cursor（鼠标光标）**：鼠标悬停时的光标样式
- **Text（文本样式）**：子文本元素的绘制方式

**使用建议：** 
- 优先使用工具类 API（如 \`.flex()\`、\`.items_center()\`）
- 需要复杂样式时再使用 \`.style()\` 直接操作`,

  'styling/text': `## 文本样式

任何实现了 \`Styled\` trait 的元素都允许通过 \`.text_style()\` 函数或工具类 CSS 样式函数来修改其文本样式。

**通俗解释：** 文本样式就像是"文字的装饰"，可以改变文字的颜色、大小、字体等。

### 文本样式属性

#### 字体相关

- **Font Family（字体族）**：渲染文本时使用的字体族
- **Font Size（字体大小）**：字体的大小
- **Font Weight（字体粗细）**：字体的粗细程度
- **Font Style（字体样式）**：字体样式（Normal、Italic、Oblique）
- **Font Features（字体特性）**：可配置的 OpenType 特性

**通俗解释：** 就像选择不同的"字体工具"，可以改变文字的外观风格。

#### 颜色相关

- **Color（颜色）**：文本的颜色
- **Background Color（背景颜色）**：文本的背景颜色

**使用场景：** 
- 强调重要文字
- 创建高亮效果
- 实现文本背景色块

#### 布局相关

- **Text Align（文本对齐）**：文本的对齐方式（Left、Center、Right）
- **Line Height（行高）**：文本行的高度
- **Line Clamp（行数限制）**：在截断文本之前的行数
- **Text Overflow（文本溢出）**：文本溢出宽度时是否截断
- **White Space（空白处理）**：文本换行时的空白处理方式（Normal、Nowrap）

**通俗解释：** 这些属性控制"文字如何排列和显示"。

#### 装饰相关

- **Underline（下划线）**：下划线样式，可配置粗细、颜色、是否波浪线
- **Strikethrough（删除线）**：删除线样式，可配置粗细和颜色

**使用场景：** 
- 链接的下划线
- 错误文本的删除线
- 特殊文本的装饰效果

### 使用示例

\`\`\`rust
div()
    .text_3xl()           // 大号字体
    .text_center()        // 居中对齐
    .text_color(red())    // 红色文字
    .font_bold()          // 粗体
    .child("Hello World")
\`\`\`

**提示：** 大多数文本样式都有对应的工具类函数，使用起来非常方便！`,

  'animations/index': `# 动画

在本章中，你将学习如何在 GPUI 中为元素添加动画效果。

**通俗解释：** 动画就像是让界面元素"动起来"，比如淡入淡出、滑动、缩放等效果。就像电影中的特效一样，让界面更有生命力。

## 什么是动画？

动画是让界面元素在一段时间内平滑地从一个状态过渡到另一个状态的过程。

**核心概念：**
- **持续时间（Duration）**：动画持续多长时间
- **缓动函数（Easing）**：动画的速度曲线（匀速、加速、减速等）
- **重复（Repeat）**：动画是否重复播放

**使用场景：** 
- 页面切换效果
- 按钮点击反馈
- 加载动画
- 数据更新时的过渡效果`,

  'animations/animation': `## Animation（动画配置）

\`Animation\` 允许你配置一个特定的动画，包括以下属性：持续时间、缓动函数，以及是否重复。这个动画可以通过 [\`with_animation\`](with_animation.md#with_animation) 应用到元素上。

**通俗解释：** Animation 就像是动画的"配置单"，定义了动画的所有参数。就像电影的拍摄计划，规定了镜头要拍多久、用什么速度等。

### 创建动画

\`new\` 函数接受一个 \`Duration\`（持续时间）并返回 \`Animation\`。

\`\`\`rust
use std::time::Duration;
use gpui::Animation;

let animation = Animation::new(Duration::from_secs(1));
\`\`\`

**通俗解释：** 这创建了一个持续 1 秒的动画。此时动画还没有应用到任何元素上，只是定义了动画的基本参数。

### 重复动画

\`repeat\` 函数将使动画无限重复。

\`\`\`rust
let animation = Animation::new(Duration::from_secs(1))
    .repeat();
\`\`\`

**通俗解释：** 就像让动画"循环播放"，适合加载动画、呼吸灯效果等。

**使用场景：** 
- 加载指示器
- 脉冲效果
- 持续的状态提示

### 缓动动画

\`with_easing\` 函数接受一个 \`impl Fn(f32) -> f32\` 闭包，这个闭包接受一个 delta（0.0 到 1.0）并允许你在动画期间修改 delta，从而实现缓动效果。

**通俗解释：** 缓动函数就像是动画的"速度曲线"：
- **线性（linear）**：匀速运动，像匀速行驶的汽车
- **二次（quadratic）**：加速或减速，像启动或刹车的汽车
- **缓入缓出（ease_in_out）**：开始慢、中间快、结束慢，像自然运动

GPUI 提供了各种缓动函数，如 \`linear\`、\`quadratic\`、\`ease_in_out\`、\`ease_out_quint\` 等。

\`\`\`rust
use gpui::Animation;

let animation = Animation::new(Duration::from_secs(1))
    .with_easing(gpui::ease_in_out);
\`\`\`

**常用缓动函数：** 
- \`linear\`：线性，匀速
- \`ease_in\`：缓入，开始慢
- \`ease_out\`：缓出，结束慢
- \`ease_in_out\`：缓入缓出，开始和结束都慢
- \`ease_out_quint\`：五次方缓出，更强烈的减速效果`,

  'animations/with_animation': `## With Animation（应用动画）

本节解释如何使用 \`with_animation\` 将 [\`Animation\`](animation.md) 应用到元素上。

**通俗解释：** \`with_animation\` 就像是"动画播放器"，它接收动画配置，然后让元素按照这个配置动起来。

### with_animation

\`with_animation\` 函数接受三个参数：
1. **ElementId**：元素的唯一标识符，必须在每一帧都相同
2. **Animation**：动画配置
3. **闭包**：\`impl Fn(Self, f32) -> Self\`，用于根据动画进度设置元素样式

这个函数返回 \`AnimationElement<Self>\`，其中 \`Self\` 是任何可以转换为元素的类型。

**通俗解释：** 
- **ElementId**：就像给元素一个"身份证号"，让系统知道这是同一个元素
- **闭包中的 f32**：这是动画进度，从 0.0 开始，到 1.0 结束
- **根据进度设置样式**：在闭包中，你可以根据这个进度值来改变元素的样式

\`\`\`rust
use gpui::{div, Animation};
use std::time::Duration;

let element = div()
    .id("my-element")
    .with_animation(
        "my-element",
        Animation::new(Duration::from_secs(1)),
        |element, delta| {
            // delta 从 0.0 到 1.0
            element.opacity(delta)  // 从透明到不透明
        }
    );
\`\`\`

**实际应用示例：**

1. **淡入效果**：\`opacity(delta)\` - 从透明到不透明
2. **滑动效果**：\`translate_x(delta * 100)\` - 从左侧滑入
3. **缩放效果**：\`scale(delta)\` - 从小变大
4. **旋转效果**：\`rotate(delta * 360)\` - 旋转 360 度

**提示：** 如果动画配置了 \`repeat()\`，delta 会在 0.0 和 1.0 之间循环。`,

  'interactivity/index': `# 交互性

在本章中，你将学习如何使你的 GPUI 应用程序具有交互性。

**通俗解释：** 交互性就像是让界面"能听懂用户的话"，用户点击、悬停、按键时，界面能够做出相应的反应。就像智能家居系统，你按一下按钮，灯就亮了。

## 什么是交互？

交互是用户与应用程序之间的双向通信：
- **用户输入**：鼠标点击、键盘按键、鼠标移动等
- **应用响应**：更新界面、执行操作、显示反馈等

## 交互类型

GPUI 支持两种主要的交互方式：

1. **鼠标交互**：点击、悬停、拖拽等
2. **键盘交互**：按键、快捷键、命令等

**通俗类比：** 
- **鼠标交互** = 触摸操作，直接点击和移动
- **键盘交互** = 语音命令，通过按键触发操作`,

  'interactivity/mouse': `## 鼠标交互

任何实现了 \`InteractiveElement\` trait 的元素都可以访问不需要状态的交互事件处理器。一些交互事件处理器（如 \`on_click\` 和 \`on_hover\`）需要 \`StatefulInteractiveElement\` trait，这允许它们在渲染之间保持一些元素状态。

**通俗解释：** 
- **InteractiveElement**：基本的交互能力，就像"能感知触摸"的元素
- **StatefulInteractiveElement**：有状态的交互能力，就像"能记住状态"的元素

### 使元素有状态

要使元素有状态，你必须使用 \`InteractiveElement\` trait 提供的 \`id\` 函数，它接受一个 \`Into<ElementId>\`。这个 ID 在渲染之间不能改变，以允许其状态被跟踪。

**通俗解释：** 给元素一个固定的"身份证号"，这样系统就能记住它的状态了。

\`\`\`rust
div()
    .id("my-button")  // 固定 ID，不能改变
    .on_click(|_event, _window, _app| {
        // 处理点击
    })
\`\`\`

### On Click（点击事件）

\`on_click\` 函数允许你在用户完成鼠标左键点击元素时绑定一个回调，回调在用户释放左键时触发。该函数接受一个闭包，提供 \`ClickEvent\`、\`Window\` 和 \`App\`。

\`\`\`rust
use gpui::prelude::*;

div()
    .id("my-button")
    .on_click(|event, window, app| {
        println!("按钮被点击了！");
        // 可以访问事件信息、窗口和应用状态
    })
\`\`\`

**通俗解释：** 就像给按钮安装一个"点击传感器"，用户点击时就会触发回调函数。

**使用场景：** 
- 按钮点击
- 卡片选择
- 菜单项点击
- 任何需要点击响应的元素

### On Hover（悬停事件）

\`on_hover\` 函数允许你在用户悬停在元素上或离开元素时绑定一个回调，回调在用户进入悬停和离开悬停时触发。该函数接受一个闭包，提供一个 \`bool\`（true 表示悬停开始，false 表示悬停结束），以及 \`Window\` 和 \`App\`。

\`\`\`rust
use gpui::prelude::*;

div()
    .id("my-element")
    .on_hover(|is_hovering, window, app| {
        if is_hovering {
            println!("鼠标进入");
        } else {
            println!("鼠标离开");
        }
    })
\`\`\`

**通俗解释：** 就像给元素安装一个"接近传感器"，鼠标靠近或离开时就会触发。

**使用场景：** 
- 显示工具提示
- 高亮效果
- 预览内容
- 交互式提示`,

  'interactivity/keyboard': `## 键盘交互

键盘交互允许用户通过按键来触发应用程序中的操作。

**通俗解释：** 就像给应用程序设置"快捷键"，用户按特定键组合就能执行操作。

### Actions Macro（动作宏）

要创建动作，你可以使用 \`actions\` 宏，它接受两个参数：
1. 命名空间的名称，将分配给这组动作
2. 名称切片，将用作创建的单元结构体的标识符

**通俗解释：** \`actions\` 宏就像是"动作定义工具"，帮你快速创建一系列可用的动作。

下面的代码片段使用 \`actions\` 宏在 \`actions_namespace\` 命名空间下创建一个名为 \`Enter\` 的动作。

\`\`\`rust
use gpui::actions;

actions!(actions_namespace, [Enter]);
\`\`\`

**实际应用：** 
- 定义应用的所有可用操作
- 创建命令系统
- 实现快捷键功能

### Key Binding（按键绑定）

要绑定并为特定动作创建按键绑定，你必须首先使用 \`KeyBinding::new\` 函数创建实际的 \`KeyBinding\` 结构体，然后使用 \`App\` 的 \`bind_keys\` 函数将按键绑定绑定到应用程序。

**通俗解释：** 就像把"动作"和"按键"连接起来，告诉系统"按这个键就执行这个动作"。

下面的代码片段将一个 \`KeyBinding\` 绑定到应用程序，\`KeyBinding\` 将 Enter 键分配为按键，动作为 \`Enter\`，键上下文指定为 \`None\`。

\`\`\`rust
use gpui::{App, KeyBinding, actions};

actions!(my_actions, [Enter]);

app.bind_keys([
    KeyBinding::new("enter", my_actions::Enter, None)
]);
\`\`\`

#### 按键修饰符

要创建带修饰符的按键，只需添加修饰符名称（或多个修饰符名称）和特定键，用字符 \`-\` 分隔。

**示例：** 带有 \`control\` 和 \`shift\` 修饰符的 \`F\` 键看起来像这样：\`ctrl-shift-f\`

**修饰符名称：** 
- \`ctrl\`：Control 键
- \`alt\`：Alt 键
- \`shift\`：Shift 键
- \`fn\`：Function 键
- \`cmd\` 或 \`super\` 或 \`win\`：平台修饰符（Mac 上是 Command，Windows 上是 Windows 键）

**特殊修饰符：** 
- \`secondary\`：平台特定行为
  - macOS：转换为 \`platform\` 修饰符
  - 其他平台：转换为 \`control\` 修饰符

**常见快捷键示例：** 
- \`ctrl-s\`：保存
- \`ctrl-shift-z\`：重做
- \`cmd-c\`（Mac）或 \`ctrl-c\`（Windows）：复制

#### 键上下文

使用 \`App\` 的 \`bind_keys\` 时，你还可以指定一个可选的上下文（作为 \`&str\`），这允许你将动作的按键绑定限制到特定的键上下文。

**通俗解释：** 就像给快捷键设置"使用场景"，只有在特定场景下才生效。

可以使用 \`InteractiveElement\` trait 提供的 \`key_context\` 函数来指定键上下文，它接受一个 \`&str\`。如果上下文与绑定的按键绑定匹配，则动作将被分派到 \`on_action\` 的任何相关绑定回调。

### On Action（动作处理）

\`InteractiveElement\` trait 提供的 \`on_action\` 函数允许你将回调绑定到元素上特定动作的触发。使用 \`on_action\` 的元素必须获得焦点，动作才能被分派，这通过 \`track_focus\` 函数完成，它接受一个 \`FocusHandle\`，这个 \`FocusHandle\` 必须被聚焦。

**通俗解释：** 
- **焦点**：就像"选中"这个元素，告诉系统"我现在关注这个元素"
- **on_action**：当特定动作触发时执行的回调

如果你想在整个应用程序中全局绑定动作触发的回调，请使用 \`App\` 的 [on_action](../architecture/app.md#on-action)。

下面的代码片段使用 \`track_focus\` 来跟踪给定的 \`FocusHandle\`，这允许在它获得焦点时分派动作，并使用 \`on_action\` 绑定一个回调，当通过按 Enter 键分派 \`Enter\` 动作时打印消息。

\`\`\`rust
use gpui::{prelude::*, FocusHandle, actions};

actions!(my_actions, [Enter]);

struct MyView {
    focus_handle: FocusHandle,
}

impl Render for MyView {
    fn render(&mut self, _: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        div()
            .track_focus(&self.focus_handle)
            .on_action(|action: &my_actions::Enter, _window, _app| {
                println!("Enter 键被按下！");
            })
    }
}
\`\`\`

**使用流程：** 
1. 创建动作（使用 \`actions!\` 宏）
2. 绑定按键（使用 \`bind_keys\`）
3. 跟踪焦点（使用 \`track_focus\`）
4. 处理动作（使用 \`on_action\`）`,

  'rendering/index': `# 渲染

在本章中，你将学习如何组合元素来创建你的 GPUI 应用程序。

**通俗解释：** 渲染就像是"把设计图变成真实的界面"，将代码中定义的元素绘制到屏幕上，让用户能看到和交互。

## 渲染模式

GPUI 使用混合渲染模式，结合了两种渲染方式的优点：

1. **保留模式（Retained Mode）**：通过 \`Render\` trait 实现
2. **即时模式（Immediate Mode）**：通过 \`RenderOnce\` trait 实现

**通俗对比：** 
- **保留模式**：就像"有记忆的画家"，会记住画了什么，只在需要时更新
- **即时模式**：就像"每次都重新画"，每次渲染都重新创建

## 两种渲染方式

在 GPUI 中，有两种 trait 实现允许你渲染元素：

- **[Render](render.md)**：保留模式渲染，用于视图
- **[RenderOnce](render-once.md)**：即时模式渲染，用于组件

**选择建议：** 
- 需要保持状态的视图 → 使用 \`Render\`
- 不需要状态的简单组件 → 使用 \`RenderOnce\``,

  'rendering/render': `## Render（保留模式渲染）

\`Render\` trait 允许一个类型将元素绘制到屏幕上。这就是将 \`Entity<T>\` 的 \`T\` 类型转换为通常称为视图（view）的东西。

**通俗解释：** 
- **View（视图）**：GPUI 的保留模式渲染，除非被通知，否则不会重新渲染
- **有状态**：视图可以保持状态，就像"有记忆的组件"

视图可以包含实现 \`RenderOnce\` 的组件，这些组件是 GPUI 的即时模式渲染，你可以在 [RenderOnce](render-once.md) 部分了解更多。

### 实现

\`\`\`rust
use gpui::{AppContext, Application, Context, IntoElement, Render, Window, WindowOptions, div};

struct RootView;

impl Render for RootView {
    fn render(&mut self, _window: &mut Window, _cx: &mut Context<Self>) -> impl IntoElement {
        div()
    }
}

fn main() {
    Application::new().run(|app| {
        app.open_window(WindowOptions::default(), |_window, app| {
            app.new(|_cx| RootView)
        })
        .unwrap();
    });
}
\`\`\`

### 关键特点

1. **可变引用**：\`render\` 函数接受 \`&mut self\`，允许修改状态
2. **Context 参数**：提供 \`Context<Self>\`，可以访问应用状态和通知更新
3. **按需渲染**：只有在调用 \`notify()\` 时才会重新渲染

**使用场景：** 
- 需要保持状态的视图
- 需要响应数据变化的组件
- 复杂的交互式界面

**性能优势：** 
- 只在需要时重新渲染
- 可以缓存渲染结果
- 适合复杂的 UI 组件`,

  'rendering/render-once': `## RenderOnce（即时模式渲染）

与 \`Render\` trait 相反，\`RenderOnce\` trait 用于创建组件而不是视图。顾名思义，它们只渲染一次，被构造、渲染，然后被丢弃。这是在保留模式视图内部完成的即时模式渲染。

**通俗解释：** 
- **组件**：不需要保持状态的简单 UI 元素
- **即时渲染**：每次需要时都重新创建，不保留状态
- **轻量级**：适合简单的、无状态的 UI 片段

### 与 Render 的区别

与 \`Render\` 不同，\`RenderOnce\` 的 \`render\` 函数接受 \`self\` 的所有权，而不是 \`Render\` 提供的 \`self\` 的可变引用。这对于不需要存储任何可变应用程序状态的组件很有用。

**通俗对比：** 

| 特性 | Render | RenderOnce |
|------|--------|------------|
| 状态 | 可以保持状态 | 无状态 |
| 参数 | \`&mut self\` | \`self\`（所有权） |
| 重新渲染 | 按需（通过 notify） | 每次父组件渲染时 |
| 使用场景 | 复杂视图 | 简单组件 |

### 实现

\`\`\`rust
use gpui::{IntoElement, RenderOnce, div};

struct MyComponent;

impl RenderOnce for MyComponent {
    fn render_once(self) -> impl IntoElement {
        div()
            .child("这是一个简单的组件")
    }
}
\`\`\`

### 使用场景

**适合使用 RenderOnce：** 
- 静态内容展示
- 简单的 UI 片段
- 不需要交互的组件
- 纯展示型组件

**不适合使用 RenderOnce：** 
- 需要保持状态的组件
- 需要响应用户交互的组件
- 需要访问应用状态的组件

**性能特点：** 
- 每次父组件渲染时都会重新创建
- 没有状态管理开销
- 适合频繁更新的简单组件`,

  'state-management/entity': `## Entity（实体）

\`Entity<T>\` 用于当你需要存储必须在应用程序的不同部分之间通信的应用程序状态时使用。它们由 GPUI 拥有，可以通过任何实现 \`AppContext\` trait 的类型来管理，\`App\` 和 \`Context<T>\` 是 GPUI 中常见的两个实现 \`AppContext\` 的类型。

**通俗解释：** Entity 就像是应用程序中的"数据容器"，可以存储状态并在不同组件间共享。

### 核心概念

- **所有权**：所有实体都由 GPUI 拥有，存储在 \`App\` 中
- **访问方式**：通过 \`AppContext\` trait 访问（\`App\` 和 \`Context<T>\` 都实现了它）
- **视图**：如果 \`Entity<T>\` 的 \`T\` 类型实现了 \`Render\` trait，它通常被称为视图（view）

**通俗类比：** Entity 就像是"共享的存储箱"，多个组件可以访问和修改里面的数据。

### 创建 Entity

这将创建一个具有给定状态的 \`Entity\`。

\`\`\`rust
use gpui::{AppContext, Application};

pub struct SomeState {
    some_value: bool,
}

fn main() {
    Application::new().run(|app| {
        let entity = app.new(|_cx| SomeState { some_value: true });
    });
}
\`\`\`

**通俗解释：** \`app.new()\` 创建一个新的实体，传入的闭包返回要存储的状态。

### 读取 Entity

这将给你一个状态的引用。

\`\`\`rust
use gpui::AppContext;

let state = entity.read(cx);
println!("值: {}", state.some_value);
\`\`\`

**通俗解释：** 就像"查看存储箱里的东西"，只能看不能改。

### 更新 Entity

这将更新状态。

\`\`\`rust
use gpui::AppContext;

entity.update(cx, |state| {
    state.some_value = false;
});
\`\`\`

**通俗解释：** 就像"修改存储箱里的东西"，可以改变状态。

**重要提示：** 更新后需要调用 \`cx.notify()\` 来触发重新渲染。

### 降级 Entity

这将把 \`Entity\` 转换为 \`WeakEntity\`，这是一个弱指针。

\`\`\`rust
let weak_entity = entity.downgrade();
\`\`\`

**通俗解释：** 弱指针就像是"不会阻止删除的引用"，如果实体被删除，弱指针不会阻止它。

**使用场景：** 
- 避免循环引用
- 临时引用，不持有所有权
- 缓存引用，允许实体被清理`,

  'state-management/global': `## Global（全局状态）

\`Global\` 用于当你需要与整个应用程序共享某些状态时使用。全局状态的一个常见例子是应用程序的设置。任何实现 \`Global\` 标记 trait 的类型都可以存储为全局状态，类似于 [Entity](entity.md)，它们由 GPUI 拥有。

**通俗解释：** Global 就像是应用程序的"全局配置中心"，所有组件都可以访问，比如主题设置、用户偏好等。

### 与 Entity 的区别

| 特性 | Entity | Global |
|------|--------|--------|
| 作用域 | 组件级别 | 应用级别 |
| 生命周期 | 随组件创建和销毁 | 应用运行期间一直存在 |
| 数量 | 可以有多个实例 | 每种类型只有一个实例 |
| 使用场景 | 组件状态 | 全局配置、设置 |

**通俗类比：** 
- **Entity** = 房间里的物品（每个房间不同）
- **Global** = 房子的基础设施（所有房间共享）

### 标记类型为 Global

在将某个类型设置为全局之前，它必须实现 \`Global\` 标记 trait。

\`\`\`rust
use gpui::Global;

struct AppSettings {
    theme: String,
    language: String,
}

impl Global for AppSettings {}
\`\`\`

**通俗解释：** 就像给类型贴一个"全局标签"，告诉系统"这个类型可以作为全局状态使用"。

### 设置 Global

这将为给定类型设置全局状态。该类型必须实现 \`Global\`。

\`\`\`rust
use gpui::{App, Global};

app.set_global(AppSettings {
    theme: "dark".to_string(),
    language: "zh-CN".to_string(),
});
\`\`\`

### 访问 Global

这将给你一个全局状态的引用。访问未设置的全局状态会导致 panic。

\`\`\`rust
use gpui::AppContext;

let settings = app.global::<AppSettings>();
println!("主题: {}", settings.theme);
\`\`\`

**注意：** 确保在访问前已经设置了全局状态，否则会崩溃。

### 可变访问 Global

这将给你一个全局状态的可变引用。访问未设置的全局状态会导致 panic。

\`\`\`rust
let settings = app.global_mut::<AppSettings>();
settings.theme = "light".to_string();
\`\`\`

### 尝试访问 Global

这将给你一个包装在 \`Option<T>\` 中的全局状态引用。

\`\`\`rust
if let Some(settings) = app.try_global::<AppSettings>() {
    println!("主题: {}", settings.theme);
} else {
    println!("设置尚未初始化");
}
\`\`\`

**推荐使用：** 这种方式更安全，不会因为未设置而崩溃。

### 检查 Global 是否已设置

这将检查是否为给定类型设置了全局状态。

\`\`\`rust
if app.has_global::<AppSettings>() {
    // 全局状态已设置
}
\`\`\`

### 移除 Global

这将移除给定类型的全局状态。

\`\`\`rust
app.remove_global::<AppSettings>();
\`\`\`

### 使用默认值访问 Global

这将给你一个全局状态的可变引用。如果全局状态尚未设置，它将设置为该类型的 \`Default\` trait 实现给出的默认值。

\`\`\`rust
let settings = app.global_with_default::<AppSettings>(|| AppSettings {
    theme: "light".to_string(),
    language: "en".to_string(),
});
\`\`\`

**使用场景：** 当你希望全局状态有默认值，但不想手动初始化时。

### 观察 Global

这将注册一个回调，当全局状态更新时将被调用。

\`\`\`rust
app.observe_global::<AppSettings>(|settings| {
    println!("设置已更新: {:?}", settings);
});
\`\`\`

**使用场景：** 
- 响应主题变化
- 同步设置到本地存储
- 通知其他组件状态变化

**实际应用示例：** 
- 应用主题（深色/浅色）
- 用户偏好设置
- 语言设置
- 全局配置选项`,

  'examples/index': `# 示例

在本章中，你将看到一些 GPUI 应用程序的实际示例。

**通俗解释：** 示例就像是"参考案例"，通过看别人是怎么做的，你可以更好地理解如何使用 GPUI 构建应用。

## 可用示例

- **[Hello World](hello-world.md)**：最简单的入门示例
- **[Counter（计数器）](counter.md)**：带交互的计数器应用

**学习建议：** 
1. 先看 Hello World 了解基本结构
2. 再看 Counter 学习状态管理和交互
3. 尝试修改示例代码，观察效果变化`,

  'examples/counter': `## Counter（计数器）

一个带有增加和减少按钮的数字计数器。

![Counter](../src/examples/images/counter.webp)

### 实现

\`\`\`rust
use gpui::{
    AppContext, Application, ClickEvent, Context, InteractiveElement, IntoElement, ParentElement,
    Render, StatefulInteractiveElement, Styled, Window, WindowOptions, black, div, green, red,
    white,
};

struct RootView {
    count: isize,
}

impl Render for RootView {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        div()
            .size_full()
            .flex()
            .items_center()
            .justify_center()
            .gap_5()
            .bg(white())
            .child(
                div()
                    .id("decrement_button")
                    .cursor_pointer()
                    .flex()
                    .items_center()
                    .justify_center()
                    .size_8()
                    .rounded_md()
                    .border_1()
                    .border_color(black())
                    .child("-")
                    .hover(|style| style.bg(red()))
                    .on_click(cx.listener(Self::decrement)),
            )
            .child(
                div()
                    .min_w_16()
                    .text_3xl()
                    .text_center()
                    .child(self.count.to_string()),
            )
            .child(
                div()
                    .id("increment_button")
                    .cursor_pointer()
                    .flex()
                    .items_center()
                    .justify_center()
                    .size_8()
                    .rounded_md()
                    .border_1()
                    .border_color(black())
                    .child("+")
                    .hover(|style| style.bg(green()))
                    .on_click(cx.listener(Self::increment)),
            )
    }
}

impl RootView {
    fn increment(&mut self, _event: &ClickEvent, _window: &mut Window, cx: &mut Context<Self>) {
        self.count += 1;
        cx.notify();
    }

    fn decrement(&mut self, _event: &ClickEvent, _window: &mut Window, cx: &mut Context<Self>) {
        self.count -= 1;
        cx.notify();
    }
}

fn main() {
    Application::new().run(|app| {
        app.open_window(WindowOptions::default(), |_window, app| {
            app.new(|_cx| RootView { count: 0 })
        })
        .unwrap();
    });
}
\`\`\`

### 代码解释

**通俗解释：** 这个例子展示了如何创建一个有状态的交互式应用，是学习 GPUI 状态管理和交互的绝佳示例。

**关键概念：**

1. **状态存储**：
   - \`RootView\` 结构体直接存储 \`count\` 字段
   - 这是最简单的状态管理方式，适合简单的组件
   - 状态存储在视图本身中

2. **交互处理**：
   - \`.on_click(cx.listener(Self::increment))\` 绑定点击事件
   - \`cx.listener()\` 创建一个监听器，自动处理生命周期
   - 在回调函数中修改状态并调用 \`cx.notify()\` 触发重新渲染

3. **悬停效果**：
   - \`.hover(|style| style.bg(red()))\` 设置悬停时的背景色
   - 鼠标悬停时按钮会变色，提供视觉反馈

4. **布局和样式**：
   - \`.flex()\` 使用 Flexbox 布局
   - \`.items_center()\` 和 \`.justify_center()\` 居中
   - \`.gap_5()\` 设置间距
   - \`.size_8()\` 设置按钮大小
   - \`.rounded_md()\` 设置圆角
   - \`.border_1()\` 和 \`.border_color()\` 设置边框

**代码流程：**

1. 用户点击 "+" 或 "-" 按钮
2. 触发 \`increment()\` 或 \`decrement()\` 方法
3. 修改 \`self.count\` 的值
4. 调用 \`cx.notify()\` 通知 GPUI 状态已改变
5. GPUI 重新渲染视图，显示新的计数值

**学习要点：**

- **cx.listener()**：这是处理事件的标准方式，比直接传递闭包更安全
- **cx.notify()**：必须调用才能触发重新渲染
- **id()**：给交互元素固定 ID，确保状态正确跟踪
- **状态管理**：对于简单状态，可以直接存储在视图中；复杂状态应使用 Entity

**扩展练习：** 
- 添加重置按钮
- 添加最大值/最小值限制
- 添加动画效果（点击时的缩放动画）
- 保存计数到本地存储
- 使用 Entity 重构，实现多个计数器实例`,
}

