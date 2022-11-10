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
