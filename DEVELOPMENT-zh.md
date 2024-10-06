# JHipster开发

- [生成器开发设置](#setup)

## <a name="setup"></a> 生成器开发设置

JHipster is a [Yeoman Generator](http://yeoman.io/), so you must follow the [Yeoman authoring documentation](http://yeoman.io/authoring/) in order to be able to run and test your changes.
JHipster是一个[Yeoman生成器](http://yeoman.io/)，因此您必须遵循[Yeoman创作文档](http://yeoman.io/authoring/) 才能运行和测试您的更改。
以下是最重要的步骤。

### Fork the generator-jhipster 项目

转到 [generator-jhipster 项目](https://github.com/jhipster/generator-jhipster) 并单击 “fork” 按钮。 然后，您可以克隆自己的项目分支，并开始处理它。

[请阅读 GitHub fork文档以获取更多信息](https://help.github.com/articles/fork-a-repo)

### 设置 `jhipster` 命令以使用克隆的项目

从 v8 开始，`generator-jhipster` 是用 TypeScript 编写的。
要运行它，您需要编译为 JavaScript 或使用即时编译。

####  运行 jit 可执行文件

可执行文件位于 `bin/jhipster.cjs`.
您可以将其别名为 'jhipster' 命令:

```shell
alias jhipster="GLOBAL_PATH/generator-jhipster/bin/jhipster.cjs"
```

#### 全局链接的编译包

在克隆的 `generator-jhipster` 项目中，运行 `npm ci` ，然后运行 `npm link`.

`npm ci` 将对所有项目依赖项进行全新安装并编译源代码。
`npm run build` 可用于在每次更改后编译源代码。

`npm link` 将从全局 `node_modules` 版本创建一个符号链接以指向此文件夹，因此当我们运行 `jhipster`时，您现在将使用 JHipster 的开发版本。

### 测试生成应用程序

为了测试，您将需要生成一个应用程序，这里存在一个特定问题：对于每个应用程序，JHipster都会安装其自身的本地版本。这样做是为了使多个应用程序每个应用程序都使用特定的JHipster版本（应用程序A使用JHipster 3.1.0，应用程序B使用JHipster 3.2.0）。

要克服此问题，您还需要在生成的项目文件夹上运行 `npm link generator-jhipster` ，以便本地版本具有指向JHipster开发版本的符号链接。还要添加选项 `--skip-jhipster-dependencies` 来生成忽略JHipster依赖项的应用程序（否则每次调用npm installci时都会安装发布版本）。 您可以稍后使用命令 `jhipster --no-skip-jhipster-dependencies`重新添加依赖项。

简而言之，您需要：

1.  在 `generator-jhipster` 项目上运行 `npm link`  （全局链接） 或配置 jit 可执行文件
2.  在生成的应用程序文件夹上运行 `jhipster --skip-jhipster-dependencies` 

您可以执行  `jhipster --install-path` 来检查从何处执行 JHipster。

您可以通过在克隆的生成器中进行一些小的更改，并在现有的JHipster项目上再次运行来测试您的设置：

对于具有JHipster第三方库（即react-jhipster等）的项目，您还需要在库项目上运行 `npm link` ，然后从生成的项目上运行 `npm link` 原始框架（即react）到库项目： `cd react-jhipster && npm link <path-to-generated-project>/node_modules/react`.

```shell
jhipster
```

根据你更改了生成器的哪些部分，不要忘记使用适当的参数运行 `jhipster` 命令，例如，当更新实体模板时，运行：

```shell
jhipster --with-entities
```

你应该会看到你的更改反映在生成的项目中。

注意：如果生成器使用的是 [jhipster/jhipster-bom](https://github.com/jhipster/jhipster-bom)的快照版本，则生成的项目可能无法正确构建。这个问题在 https://github.com/jhipster/generator-jhipster/issues/9571. In
中。在这种情况下，请克隆 jhipster/jhipster-bom 项目并使用以下方法构建它：

```shell script
./mvnw clean install -Dgpg.skip=true
```

或在Windows上：

```
.\mvnw.cmd clean install -D"gpg.skip=true"
```

### 使用文本编辑器

由于修改JHipster生成器包括修改Java和JavaScript模板，因此大多数IDE将无法正常工作。我们建议您使用文本编辑器（如[VSCode](https://code.visualstudio.com/) 或 [IntelliJ IDEA](https://www.jetbrains.com/idea/) t对更改进行编码。 建议使用 ESLint 和 EditorConfig 扩展来帮助遵守代码约定。

### 使用调试器

可以使用Node.js调试器调试JHipster的代码。要实现此目的，请将调试器设置为启动 `cli/jhipster.js`.

#### 使用VSCode进行调试

要开始使用 **VSCode**调试JHipster，请在工作区中打开生成器代码，然后按F5 (或单击可通过Ctrl/Cmd+Shift+D访问的**Debug**菜单中的绿色箭头). 这将在调试模式下启动生成器，并在 [test-integration/samples/app-sample-dev](test-integration/samples/app-sample-dev) 文件夹中生成文件。

也可以通过选择其他调试选项之一（例如 `jhipster entity`）来调试子生成器。这些调试配置在 `.vscode/launch.json`文件中指定。

## 生成器实现

### 重要配置对象

## 生成器测试和快照

使用 lint/prettier 运行每个测试
`npm test`

不使用 lint/prettier 运行每个测试
`npx esmocha`

更新每个测试快照
`npm run update-snapshots`

运行特定测试
`npx esmocha <path>`

按顺序运行特定测试（改进的错误报告）
`npx esmocha <path> --no-parallel`

更新特定测试快照
`npm run update-snapshot -- <path>` 或 `npx esmocha <path> --no-parallel --update-snapshot`

修复 lint 和 prettier 错误
`npm run lint-fix`

##  生成和测试样本

样本生成由 `generator-jhipster` 本地蓝图提供，我们将其称为 `dev blueprint`.
通过在 JIT 模式下运行 jhipster（相对于此文件执行 `./bin/jhipster.cjs` 文件）来启用开发蓝图。

### 使用开发蓝图

`jhipster generate-sample ng-default` 生成样本将在当前文件夹中生成 `ng-default` 样本。

#### 每日生成示例

每日生成示例的前缀为 `daily-`.

#### Samples 文件夹

如果使用 `--global` 选项，例如 `jhipster generate-sample ng-default --global`，将使用一个常见的 samples 文件夹。
首次执行时，提示将要求提供 samples 文件夹，所选值将在下次执行时重复使用。
在 samples 文件夹中，生成一个  `jhipster-samples.code-workspace`。它为 `generator-jhipster` 和在 samples 文件夹中生成的样本提供了一个 vscode 工作区。它非常适合快速浏览。

### 测试示例

CI 测试使用以下命令：

```
npm ci:backend:test
npm ci:frontend:test
npm run ci:e2e:package # Builds the application
npm run ci:e2e:prepare # Starts the application using docker
npm run ci:e2e:run # Runs e2e tests
```

## DX 使用 vscode

`generator-jhipster` 添加一系列 vscode 配置，以获得更好的开发人员体验。

### 开发容器

容器是使用`generator-jhipster`推荐的 Java、Node 和 npm 构建的。
一旦启动，您应该拥有堆栈维护者推荐的。

### 执行快捷方式

提供快捷方式以轻松生成集成测试示例。

- 转到 `Execute and Debug`.
- 选择示例的 GitHub 工作流。
- 运行快捷方式。
- 选择样本。
- 样本在  `../jhipster-samples/` 文件夹与 `generator-jhipster` 文件夹相对。

也提供了一些每日构建示例。

### 生成器测试

在 test 选项卡中，您可以运行和调试单个测试。

## <a name="templates"></a> 模板指南

yeoman 使用的模板引擎是 [EJS](http://ejs.co/), 它的语法相当简单。
对于简单的代码（几行），可以将逻辑嵌入到主文件中，但如果逻辑变得更加复杂，最好将 JS 片段外部化为第一个包含并位于同一文件夹中的子模板。

子模板应该用 `ejs` 扩展名命名，因为它是默认的，它使编辑者能够应用正确的语法高亮显示，它使我们能够使用非常简洁的语法：

    <%- include('../common/field_validators', {field, reactive}); -%>

这句话的意思是 [_PersistClass_.java.jhi.jakarta_validation.ejs](generators/server/templates/entity/src/main/java/package/domain/_PersistClass_.java.jhi.jakarta_validation.ejs)  模板包括 [field_validators.ejs](generators/server/templates/entity/src/main/java/package/common/field_validators.ejs) 子模板。

子模板可以进行单元测试。
