const fs = require("fs");
const path = require("path");
const chokidar = require('chokidar');
const watcher = chokidar.watch('./src/components', {
  ignored: /[\/\\]\./, persistent: true
});
const generateTmp = () => { 
  const rootpath = path.resolve("./src/components");
  const addressMap = [];
  let importTemp = "";
  let componentMapTemp = "";
  const loopFile = rootpath => {
    const files = fs.readdirSync(rootpath);
    Array.isArray(files) &&
      files.forEach(item => {
        const filedir = path.join(rootpath, item);
        const stats = fs.statSync(filedir);
        const isFile = stats.isFile();
        const isDir = stats.isDirectory();
        if (isFile) {
          const newFiledir = filedir.split("/src");
          addressMap.push("." + newFiledir[1].replace('.tsx', ''));
        }
        if (isDir) {
          loopFile(filedir);
        }
      });
  };
  loopFile(rootpath);
  addressMap.map(item => {
    const name = item.split("/")[2];
    return {
      name,
      adress: item,
    };
  }).forEach(item => {
    importTemp += `import ${item.name} from '${item.adress}';\n`;
    componentMapTemp += `{lable: '${item.name}', value: ${item.name}},\n`
    return;
  });
  const result = importTemp + `const componentMap = [\n${componentMapTemp}]`
  
  // 插入
  const data = fs.readFileSync('./src/index.tsx', 'utf-8').split('\n')
  
  let startIdex = 0;
  let endIdx = 0;
  data.forEach((item, index) => {
    if (item.indexOf('script_start') > -1) {
      startIdex = index
    }
    if (item.indexOf('script_end') > -1) {
      endIdx = index
    }
  })
  data.splice(startIdex + 1, endIdx - startIdex - 1, result)
  fs.writeFileSync('./src/index.tsx', data.join('\n'), 'utf-8')
}
watcher.on('addDir', generateTmp).on('unlinkDir', generateTmp)
