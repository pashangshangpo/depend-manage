#!/usr/bin/env node

const Cli = require('commander')
const { Path } = require('@xiaozhihua/node-tool')
const { Git, CheckYarnInstall, Exec } = require('@xiaozhihua/shell-tool')

const CONFIGPATH = 'depend.config.js'

const DownLoadDepend = async ({ repos, output, install } = config) => {
  let all = []
  let checkYarn = await CheckYarnInstall()
  let installType = checkYarn ? 'yarn' : 'npm install'

  for (let repo of repos) {
    let gitPath = repo;
    let installDepend = install != null ? install : true;
    let branch = "master";

    if (typeof repo === "object") {
      gitPath = repo.url;

      if (repo.branch) {
        branch = repo.branch;
      }

      if (repo.install === false) {
        installDepend = false;
      }
    }

    all.push(
      new Promise(resolve => {
        console.log(`正在克隆 ${gitPath}, 分支${branch}`);

        Git.Clone(gitPath, output, branch)
          .then(res => {
            if (res.code === 0) {
              return res.targetPath;
            } else {
              console.error(res.error);

              process.exit(1);
            }
          })
          .then(targetPath => {
            if (installDepend) {
              console.log(`正在安装依赖 ${targetPath}`);

            Exec(`cd ${targetPath} && ${installType}`).then(() => {
              resolve()
            })
          }
        })
    }))
  }

  return Promise.all(all);
};

Promise.resolve().then(async () => {
  Cli.version("0.0.1")
    .description("依赖下载工具")
    .option("-c, --config [config]", "配置文件路径")
    .parse(process.argv);

  let configPath = Path.joinApp(Cli.config || CONFIGPATH)

  if (!(await Path.exists(configPath))) {
    console.log(`${configPath} 文件不存在`);
    process.exit(0);
  }

  let config = require(configPath);

  await DownLoadDepend({
    repos: config.repos,
    output: Path.joinApp(config.output),
    install: config.install
  });

  console.log("全部依赖下载完成");
});
