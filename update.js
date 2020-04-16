const package = require('./package.json')
const fs = require('fs')
const path = require('path')
const devDep = []
const dep = []
for (const key in package.devDependencies) {
  if (package.devDependencies.hasOwnProperty(key)) {
    devDep.push(key)
  }
}
for (const key in package.dependencies) {
  if (package.dependencies.hasOwnProperty(key)) {
    dep.push(key)
  }
}
package.dependencies = {}
package.devDependencies = {}
console.log(package)
fs.writeFile(`./package.json`,JSON.stringify(package,null,4),(a,b)=>{
  
})
console.log(`npm i -save-dev ${devDep.join(' ')}`)
console.log('====================')
console.log(`npm i -save ${dep.join(' ')}`)