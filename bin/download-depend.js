#!/usr/bin/env node

Promise.resolve().then(async () => {
  const Cli = require('commander')
  const Path = require('path')
  const { Git, CheckYarnInstall, Shell, Exec } = require('shell-tool')

  Cli
    .version('0.0.1')
    .description('依赖下载工具')
    .option('-c, --config [config]', '配置文件路径')
    .parse(process.argv)
})