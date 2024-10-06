# JHipster框架 

## Yeoman基础

在内部，JHipster使用[Yeoman](https://yeoman.io)作为核心。JHipster是[有史以来最受欢迎的生成器](https://yeoman.io/generators/).

## 文件目录

- `.blueprint` - 开发蓝图，用于生成和管理示例
- `.devcontainer` - VSCode 的 DevContainer 定义
- `.github` - github配置
- `.vscode` - vscode配置
- `bin` - JIT 可执行文件和帮助程序
- `cli` - (被导出的) cli实现
- `generators/*` - (被导出的) 代码生成器
  - `command.m[tj]s` - cli选项, cli参数定义
  - `generator.m[tj]s` - generator实现
  - `index.m[tj]s` - generator导出. 必须将代码生成器重新导出为默认导出
  - `internal` - 未导出的支持库
  - `resources` - 支持资源
  - `jdl` - 代码生成器的JDL规范
  - `support` - (被导出的) 导出的支持库
  - `templates` - templates文件夹
- `jdl` - (被导出的) jdl 解析器实现
- `rfcs` - (RFCs)[CONTRIBUTING.md#rfcs]
- `test` - 测试包
- `test-integration` - CI 相关的示例、脚本

## 生命周期

- [CLI entry point](https://github.com/jhipster/generator-jhipster/blob/main/cli/jhipster.cjs)
- [Basic environment validation](https://github.com/jhipster/generator-jhipster/blob/main/cli/cli.js)
- [Cli arguments parsing and Environment bootstrap](https://github.com/jhipster/generator-jhipster/blob/main/cli/program.js)
  - 查找代码生成器和蓝图 
  - 构建 CLI 选项和参数定义
  - 解析选项和参数
- 运行 Generator（启动环境）传递选项和参数 
- 从最高优先级运行每个任务，直到没有更多待处理任务

### 优先度

#### 初始化 （yeoman）

初始代码生成器信息。 

- 说生成器特定的你好
- 初始环境检查
- 加载参数和选项

```ts
get [Generator.INITIALIZING]() {
  return this.asInitializingTaskGroup() {
    sayHelloTask() {
      this.log.info('Welcome to your generator');
    },
    envChecks() {
      checkNode();
      checkDocker();
    },
    async loadOptions() {
      this.parseJHipsterArguments(command.arguments);
      this.parseJHipsterOptions(command.options);
    },
  }
}
```

#### 提示 (yeoman)

配置的提示。

```ts
get [Generator.PROMPTING]() {
  return this.asPromptingTaskGroup() {
    async prompting() {
      await this.prompt(this.prepareQuestions(command.configs));
    },
  }
}
```

#### 配置 (yeoman)

检查并修复配置:

```ts
get [Generator.CONFIGURING]() {
  return this.asConfiguringTaskGroup() {
    checkConfig() {
      if (this.jhipsterConfigWithDefaults.reactive && this.jhipsterConfigWithDefaults.cacheProvider !== 'no') {
        this.log.warn("Reactive applications doesn't support cache. Disabling");
        this.jhipsterConfig.cacheProvider = 'no';
      }
    },
  }
}
```

#### 组合 (基础)

与其他生成器组合：

```ts
get [Generator.COMPOSING]() {
  return this.asComposingTaskGroup() {
    async composing() {
      if (this.jhipsterConfigWithDefaults.clientFramework === 'angular') {
        await this.composeWithJHipster('angular');
      }
    },
  }
}
```

#### 加载 (基础)

加载配置:

```ts
get [Generator.LOADING]() {
  return this.asLoadingTaskGroup() {
    loading({ application }) {
      application.myCustomConfig = this.jhipsterConfig.myCustomConfig;
      application.myBlueprintCustomConfig = this.blueprintConfig.myBlueprintCustomConfig;
    },
  }
}
```

#### 准备 (基础)

生成属性以提高理解：

```ts
get [Generator.PREPARING]() {
  return this.asPreparingTaskGroup() {
    preparing({ application }) {
      application.myCustomConfigFoo = this.jhipsterConfig.myCustomConfig === 'foo';
      application.myCustomConfigBar = this.jhipsterConfig.myCustomConfig === 'bar';
      application.myCustomConfigNo = !this.jhipsterConfig.myCustomConfig || this.jhipsterConfig.myCustomConfig === 'no';
    },
  }
}
```

#### 配置每个实体 (base-application)

配置并检查实体的配置:

```ts
get [Generator.CONFIGURING_EACH_ENTITY]() {
  return this.asConfiguringEachEntityTaskGroup() {
    configuring({ application, entityConfig }) {
      if (application.searchEngineNo && entityConfig.searchEngine && entityConfig.searchEngine !== 'no') {
        this.log.warn("Search engine cannot be enabled at entity because it's disabled at application");
        entityConfig.searchEngine = 'no';
      }
    },
  }
}
```

#### 加载entities (base-application)

通常为空：默认情况下会加载整个实体配置。

#### 准备每个实体 (base-application)

生成属性以提高实体级别的理解：

```ts
get [Generator.PREPARING_EACH_ENTITY]() {
  return this.asPreparingEachEntityTaskGroup() {
    preparing({ application, entity }) {
      entity.dtoMapstruct = entity.dto === 'mapstruct';
    },
  }
}
```

#### 准备每个实体字段 (base-application)

生成属性以提高字段级别的理解：

```ts
get [Generator.PREPARING_EACH_ENTITY_FIELD]() {
  return this.asPreparingEachEntityFieldTaskGroup() {
    preparing({ application, entity, field }) {
      field.technologyFieldTypeIntegerMap = field.fieldType === 'Integer';
    },
  }
}
```

#### 准备每个实体关系 (base-application)

生成属性以提高关系级别的理解：

```ts
get [Generator.PREPARING_EACH_ENTITY_RELATIONSHIP]() {
  return this.asPreparingEachEntityRelationshipTaskGroup() {
    preparing({ application, entity, relationship }) {
      relationship.technologyRelationshipDbName = relationship.relationshipTypeOneToOne ? 'foo' : 'bar';
    },
  };
}
```

#### 默认 (yeoman)

生成属性以提高对依赖于其他属性的理解：

```ts
get [Generator.DEFAULT]() {
  return this.asDefaultTaskGroup() {
    preparing({ application, entities }) {
      application.hasEntityFieldInteger = entities.some(entity => entity.fields.some(field => field.fieldTypeInteger));
    },
  };
}
```

#### 协作 (yeoman)

将文件写入内存中文件系统。

有很多 API 可用于写入文件、复制文件和删除文件。
'writeFiles（）' 方法是官方生成器中最常用的方法。

```ts
get [Generator.WRITING]() {
  return this.asWritingTaskGroup({
    async writingTask({ application }) {
      await this.writeFiles({
        blocks: [
          {
            condition: ctx => ctx.shouldWrite,
            templates: ['template.file'],
          }
        ],
        context: application,
      });
    },
  });
}
```

#### 编写实体 (base-application)

将实体文件写入内存中文件系统。

写入实体是一个单独的优先级，以便在使用 '--skip-application' 和 '--single-entity' 等选项时保持工作流程的正确。

```ts
get [Generator.WRITING_ENTITIES]() {
  return this.asWritingTaskGroup({
    async writingTask({ application, entities }) {
      for (const entity of entities) {
        await this.writeFiles({
          blocks: [
            {
              condition: ctx => ctx.shouldWrite,
              templates: ['entity.template.file'],
            }
          ],
          context: { ...application, ...entity },
        });
      }
    },
  });
}
```

#### 编写之后 (基础)

在生成的源代码中注入代码。

##### 使用提供的 API （针） 注入代码

JHipster添加了用于代码注入的API：

```ts
get [Generator.POST_WRITING]() {
  return this.asPostWritingTaskGroup({
    postWritingTask({ source }) {
      source.someProvidedInjectionApi({ code: 'some code' });
    }
  });
}
```

##### 自定义代码注入

每个文件都可以手动编辑。

```ts
get [Generator.POST_WRITING]() {
  return this.asPostWritingTaskGroup({
    postWritingTask({ source }) {
      this.editFile('path/to/some/file', content => content.replaceAll('some content', 'another content'));
    }
  });
}
```

#### 安装 (yeoman)

通常是空的。
安装任务通过检测“package.json”更改来排队。

#### 结束 (yeoman)

打印生成器结果和信息：

```ts
get [Generator.END]() {
  return this.asEndTaskGroup() {
    preparing({ application }) {
      this.log.success('Tech application generated successfully');
      this.log.log(`Start the application running 'npm run start:app'`);
    },
  };
}
```

## 蓝图

Blueprint 支持允许自定义生成过程。

Blueprint 包可以包含任意数量的子生成器，每个子生成器可以是替换蓝图、并排蓝图或独立蓝图。

- 普通蓝图将用替换子生成器完全替换蓝图化的子生成器。
- 并排蓝图不会更改生成过程，而是对其进行自定义。
- 独立蓝图不挂接到子生成器。

示例:

- [Micronaut](https://github.com/jhipster/generator-jhipster-micronaut)有一个 [server](https://github.com/jhipster/generator-jhipster-micronaut/tree/0818dd9d90f4a550e008133adc7fad6b17089caa/generators/server) 替换蓝图，一个[angular](https://github.com/jhipster/generator-jhipster-micronaut/tree/0818dd9d90f4a550e008133adc7fad6b17089caa/generators/angular), [client](https://github.com/jhipster/generator-jhipster-micronaut/tree/0818dd9d90f4a550e008133adc7fad6b17089caa/generators/client), [cypress](https://github.com/jhipster/generator-jhipster-micronaut/tree/0818dd9d90f4a550e008133adc7fad6b17089caa/generators/cypress), [docker](https://github.com/jhipster/generator-jhipster-micronaut/tree/0818dd9d90f4a550e008133adc7fad6b17089caa/generators/docker) 和 [react](https://github.com/jhipster/generator-jhipster-micronaut/tree/0818dd9d90f4a550e008133adc7fad6b17089caa/generators/react)并排的蓝图，以及一个 [micronaut-cache](https://github.com/jhipster/generator-jhipster-micronaut/tree/0818dd9d90f4a550e008133adc7fad6b17089caa/generators/micronaut-cache) 独立蓝图

更多信息可在以下网址找到：

[扩展和定制](https://www.jhipster.tech/modules/extending-and-customizing/)
[创建独立蓝图](https://www.jhipster.tech/modules/creating-a-module/)
[创建蓝图](https://www.jhipster.tech/modules/creating-a-blueprint/)

### 蓝图生命周期

#### 替换蓝图

| Priority     | Blueprinted sub-gen                   | Blueprint sub-gen              |
| ------------ | ------------------------------------- | ------------------------------ |
| beforeQueue  | composes with blueprints/dependencies | composes with dependencies     |
| initializing | X                                     | replacement initializing tasks |
| prompting    | X                                     | replacement prompting tasks    |
| ...          | X                                     | ...                            |

#### 并排蓝图

| Priority     | Blueprinted sub-gen                   | Blueprint sub-gen             | Another blueprint sub-gen     |
| ------------ | ------------------------------------- | ----------------------------- | ----------------------------- |
| beforeQueue  | composes with blueprints/dependencies | composes with dependencies    | composes with dependencies    |
| initializing | initializing tasks                    | additional initializing tasks | additional initializing tasks |
| prompting    | prompting tasks                       | additional prompting tasks    | additional prompting tasks    |
| ...          | ...                                   | ...                           | ...                           |

#### 独立蓝图

| Priority     | Blueprint sub-gen          |
| ------------ | -------------------------- |
| beforeQueue  | composes with dependencies |
| initializing | initializing tasks         |
| prompting    | prompting tasks            |
| ...          | ...                        |

## 生成器层次结构

### 生成器基础核心

将自定义 API 添加到 'yeoman-generator' 并自定义行为。

### 生成器基础

添加蓝图合成 API。

### Generator应用

添加与实体相关的 api。
