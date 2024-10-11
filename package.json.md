# package.json 这些属性含义

## 常见的字段

| 字段               | 描述                                                                                                                                                                                                                              |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name             | 名称，通常与项目的仓库名称一致。命名时要符合 npm 包的命名规则                                                                                                                                                                                               |
| version          | 版本号，遵循语义化版本（SemVer）规范。格式为 MAJOR.MINOR.PATCH，如 1.0.0                                                                                                                                                                             |
| description      | 简短描述，通常用于描述项目的功能和用途                                                                                                                                                                                                             |
| main             | 入口文件。该字段指定了模块的主文件，通常是 index.js                                                                                                                                                                                                  |
| scripts          | 一个脚本集合，用于定义在项目中可运行的命令。例如，npm start 会运行 scripts 中定义的 start 脚本                                                                                                                                                                    |
| keywords         | 一个数组，用于指定与项目相关的关键词，这些关键词可以帮助用户在 npm 上搜索到该项目                                                                                                                                                                                     |
| author           | 作者信息，通常包括作者的姓名和电子邮件地址                                                                                                                                                                                                           |
| license          | 许可证类型，通常为开源许可证，如 MIT 或 ISC                                                                                                                                                                                                      |
| dependencies     | 运行时所依赖的包，这些包会在项目上线时被安装。版本号可以使用语义化版本控制（如 ^1.0.0）                                                                                                                                                                                 |
| devDependencies  | 开发和测试阶段所需的依赖包，这些包不会在生产环境中安装                                                                                                                                                                                                     |
| repository       | 代码库信息，包括代码库的类型（如 git）和地址                                                                                                                                                                                                        |
| bugs             | 报告项目错误的地址，通常是一个 issue 跟踪系统的 URL                                                                                                                                                                                                 |
| homepage         | 主页 URL                                                                                                                                                                                                                          |
| scripts          | scripts属性是一个对象，里边指定了项目的生命周期个各个环节需要执行的命令。key是生命周期中的事件，value是要执行的命令。具体的内容有 install start stop 等，详见https://docs.npmjs.com/misc/scripts                                                                                             |
| homepage         | 主页 URL                                                                                                                                                                                                                          |
| repository       | 指定一个代码存放地址，对想要为你的项目贡献代码的人有帮助。                                                                                                                                                                                                   |
| bin              | 很多模块有一个或多个需要配置到PATH路径下的可执行模块，npm让这个工作变得十分简单（实际上npm本身也是通过bin属性安装为一个可执行命令的）,如果要用npm的这个功能，在package.json里边配置一个bin属性。bin属性是一个已命令名称为key。                                                                                              |
| files             | “files"属性的值是一个数组，内容是模块下文件名或者文件夹名，如果是文件夹名，则文件夹下所有的文件也会被包含进来（除非文件被另一些配置排除了）. 你也可以在模块根目录下创建一个.npmignore文件（windows下无法直接创建以”."开头的文件，使用linux命令行工具创建如git bash），写在这个文件里边的文件即便被写在files属性里边也会被排除在外，这个文件的写法.gitignore类似。                   |
| engines             | 你可以指定项目运行的node版本范围，如下：{ “engines” : { “node” : “>=0.10.3 <0.12” } } 和dependencies一样，如果你不指定版本范围或者指定为*，任何版本的node都可以。也可以指定一些npm版本可以正确的安装你的模块，例如：{ “engines” : { “npm” : “~1.0.20” } } 要注意的是，除非你设置了engine-strict属性，engines属性是仅供参考的。 |
| overrides         | overrides 可以重写项目依赖的依赖，及其依赖树下某个依赖的版本号，进行包的替换。  overrides 支持任意深度的嵌套。         |

## package.json依赖相关属性
package.json中跟依赖相关的配置属性包含了dependencies、devDependencies、peerDependencies和peerDependenciesMeta等。

dependencies是项目的依赖，而devDependencies是开发所需要的模块，所以我们可以在开发过程中需要的安装上去，来提高我们的开发效率。这里需要注意的时，在自己的项目中尽量的规范使用，形如webpack、babel等是开发依赖，而不是项目本身的依赖，不要放在dependencies中。

dependencies除了dependencies和devDependencies，本文重点介绍的是peerDependencies和peerDependenciesMeta。

### peerDependencies
peerDependencies是package.json中的依赖项,可以解决核心库被下载多次，以及统一核心库版本的问题。

```
//package/pkg
----- node_modules
      |-- npm-a -> 依赖了react,react-dom
      |-- npm-b -> 依赖了react,react-dom
      |-- index.js
```

比如上述的例子中如果子npm包a,b都以来了react和react-dom,此时如果我们在子npm包a,b的package.json中声明了PeerDependicies后，相应的依赖就不会重新安装。需要注意的有两点：

- 对于子npm包a,在npm7中，如果单独安装子npm a,其peerDependicies中的包，会被安装下来。但是npm7之前是不会的。
- 请规范和详细的指定PeerDependicies的配置，笔者在看到有些react组件库，不在PeerDependicies中指定react和react-dom，或者将react和react-dom放到了dependicies中，这两种不规范的指定都会存在一些问题。

其二，正确的指定PeerDependicies中npm包的版本，react-focus-lock\@2.8.1[1],peerDependicies指定的是："react": "^16.8.0 || ^17.0.0 || ^18.0.0"，但实际上，这个react-focus-lock并不支持18.x的react

### peerDependenciesMeta
看到“Meta”就有元数据的意思，这里的peerDependenciesMeta就是详细修饰了peerDependicies，比如在react-redux这个npm包中的package.json中有这么一段：

```json
"peerDependencies": {
  "react": "^16.8.3 || ^17 || ^18"
},
"peerDependenciesMeta": {
  "react-dom": {
    "optional": true
  },
  "react-native": {
    "optional": true
  }
}
```

这里指定了"react-dom","react-native"在peerDependenciesMeta中，且为可选项，因此如果项目中检测没有安装"react-dom"和"react-native"都不会报错。

值得注意的是，通过peerDependenciesMeta我们确实是取消了限制，但是这里经常存在非A即B的场景，比如上述例子中，我们需要的是“react-dom”和"react-native"需要安装一个，但是实际上通过上述的声明，我们实现不了这种提示。
