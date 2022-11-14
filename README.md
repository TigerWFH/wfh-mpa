# wfh-mpa 应用

- `异步请求情况下，反复点击按钮，会导致同一次的actionId不一致`
- `忽略了捕获阶段的场景，如果保留捕获阶段的场景，导致问题也是异步场景下网络行为的actionId可能不一致`

```javascript
/*
        劫持addeventlistener可以发现，React会在捕获阶段和冒泡阶段，自动注册大部分事件。
        如果都封装了劫持逻辑，在捕获和冒泡阶段都会被触发。区别在于有没有被委托的事件被执行。
        这也是为什么封装逻辑被执行了两次的原因
    */
```

## web

- `HTML5焦点管理`
  > TV web 交互方式和 web 传统方式不一样，TV 通过遥控器进行交互，它有点击、移动、返回、主页等操作。`移动`本质则是焦点切换
  ***
  > `tabindex属性：`[HTML5 规范](https://html.spec.whatwg.org/multipage/interaction.html#focus)，属性 tabindex 定义了元素是否可以聚焦。如果 tabindex=0，则当前元素允许聚焦。
  >
  > tabindex 取值：值域={正整数,0,负整数}，负整数无法使用 tab 切换
  ***
  > `导航顺序：`使用 tab 键进行焦点切换的顺序
  >
  > [HTML 聚焦参考资料](https://zhuanlan.zhihu.com/p/73992526)

### FocusEvent

> 提供了 focus, blur, focusin, focusout 等事件
>
> `Document.activeElement`的值随浏览器不同而不同（BUG）

- `触发对象：`Window(MDN 没有，W3C 规范上有，实测 chrome、safari 支持),Element

### ClipboardEvent

> 提供了 cut, copy, paste 事件
>
> `HTMLElement.contentEditable：` 该属性用于表明元素是否是可编辑
>
> [Clipboard 规范](https://www.w3.org/TR/clipboard-apis/#the-copy-action)

- `触发对象：`Window(实测 chrome、safari 支持), Element(获得焦点的元素)或者 body

### Web APIs

- `Selection：`表示用户选择的文本范围或插入符号的当前位置，代表页面中的文本选取，可能横跨多个元素

  > - anchorNode：选取起点所在节点
  > - anchorOffset：选取起点在 anchorNode 中的位置偏移量
  > - focusNode：
  > - focusOffset：
  > - isCollapsed：表示选区被压缩至一点，即光标位置
  > - rangeCount：返回选区所包含的连续范围的数量
  > - 方法：
  > - getRangeAt()
  > - collapse()
  > - extend()
  > - modify()
  > - toString()
  > - [更多资料](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)

- `window.getSelection()返回Selection实例`

## create-react-app

### config/paths.js

> 承载了路径配置文件
>
> 基于 create-react-app 项目，创建多页面应用

[参考资料](https://segmentfault.com/a/1190000022317580)

## React@18 问题

### componentDidMount(useEffect)被调用了两次

> https://www.programminghunter.com/article/66022463481/

### addeventlistener 问题

> https://ost.51cto.com/posts/33
