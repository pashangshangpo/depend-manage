# 简介

nodejs 依赖下载工具

## 使用示例

```cli
download-depend --config depend.config.js
```

如果不写配置文件路径，默认为 depend.config.js

depend.config.js
```js
module.exports = {
  // 输出的路径
  output: 'src/node_modules',
  // 为所有 repo 设置是否安装依赖，独立设置大于此配置
  install: false,
  repos: [
    {
      // 仓库地址
      url: 'https://github.com/pashangshangpo/node-tool.git',
      // 是否下载依赖
      install: false
    },
    'https://github.com/pashangshangpo/shell-tool.git'
  ],
}
```
