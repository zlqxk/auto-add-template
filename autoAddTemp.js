const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const watcher = chokidar.watch("./src/pages", {
  ignored: /[\/\\]\./,
  persistent: true,
});
const generateTmp = () => {
  const rootpath = path.resolve("./src/pages");
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
          console.log(filedir, "filedir");
          const newFiledir = filedir
            .replace(/(\w|\W)+(?=\/src)/g, "")
            .replace(".tsx", "")
            .replace(".jsx", "")
            .replace(".js", "");
          if (newFiledir.indexOf("index") > -1) {
            addressMap.push("." + newFiledir);
          }
        }
        if (isDir) {
          loopFile(filedir);
        }
      });
  };
  loopFile(rootpath);
  addressMap
    .map(item => {
      console.log(item, "item");
      return {
        name: item.match(/\w+(?=\/index)/g)
          ? item.match(/\w+(?=\/index)/g)[0]
          : "",
        adress: item,
        path: item.replace(/\.\/src\/pages|\/index/g, ""),
      };
    })
    .forEach(item => {
      importTemp += `import ${item.name} from '${item.adress}';\n`;
      componentMapTemp += `{path: '${item.path.toLowerCase()}', component: ${
        item.name
      }, exact: true},\n`;
      return;
    });
  const result = importTemp + `export const routeMap = [\n${componentMapTemp}]`;
  console.log(result);

  // 插入
  // const data = fs.readFileSync('./localRouteMap.js', 'utf-8').split('\n')

  // let startIdex = 0;
  // let endIdx = 0;
  // data.forEach((item, index) => {
  //   if (item.indexOf('script_start') > -1) {
  //     startIdex = index
  //   }
  //   if (item.indexOf('script_end') > -1) {
  //     endIdx = index
  //   }
  // })
  // data.splice(startIdex + 1, endIdx - startIdex - 1, result)
  fs.writeFileSync("./localRouteMap.js", result, "utf-8");
};
watcher.on("addDir", generateTmp).on("unlinkDir", generateTmp);
