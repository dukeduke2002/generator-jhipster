# JHipster蓝图

蓝图允许添加新功能或更改当前功能。

## 创建蓝图

```
jhipster generate-blueprint
```

创建蓝图时，将蓝图转发到自定义生成器并保持主生成器（如 client/common/server）具有自定义功能会更简洁。
示例 [jOOQ Blueprint](https://github.com/jhipster/generator-jhipster-jooq/blob/ce48a06a2b031013383db01cc787bbe94aa2c683/generators/server/generator.mjs#L21)

## 维护蓝图

### 升级到新的JHipster版本

#### 升级并同步生成的蓝图

每个JHipster版本都会带来更新的依赖项。
您应该重新生成蓝图以更新依赖项。

```
npx --package generator-jhipster@latest jhipster generate-blueprint
```

从JHipster次要版本更新时，您可能希望忽略（按s）每个生成器并测试冲突。
Ignore （i 选项而不是 s） 会将文件存储在 '.yo-resolve' 中，因此默认情况下，后续的 'generate-blueprint' 执行将忽略这些文件。

generate-blueprint 可能会不时生成不同的代码。
因此，重新生成每个文件，忽略 '.yo-resolve' 执行 'jhipster generate-blueprint --skip-yo-resolve' 并检查差异。

### 蓝图依赖项

'generator-jhipster' 的每个依赖项都使用确切版本。
如果蓝图也使用确切版本，则具有不同版本的重复依赖项将添加到 'node_modules' 中。
因此，请尝试在 blueprint dependencies_ _avoid确切版本并禁用自动更新，因为每次使用 'generate-blueprint' 重新生成 Blueprint 时，依赖项都会更新。

### 从 v7 升级到 v8

- 'entity-' 生成器被删除，替换是特定于技术生成器（server、angular、spring-data-relational 等）的实体的特定优先级。
  动机可以在 https://github.com/jhipster/generator-jhipster/blob/main/rfcs/4-jhipster-rfc-entity-as-core.md 中找到。
- 优先级名称是生成器类中的静态常量。
  `get initializing() {}` -> `get [Generator.INITIALIZING]() {}` 
  动机可以在 https://github.com/jhipster/generator-jhipster/blob/main/rfcs/3-jhipster-rfc-unambiguous-priorities.md 中找到。
- 通过在构造函数中启用 jhipster7Migration' 功能，可以警告许多属性迁移。
- 代码生成器底座中不再实现指针。
  它们被注入到以某些优先级提供的源对象中，并像 https://github.com/jhipster/generator-jhipster/blob/6373c9c76e57d01c4c1451a276f0d78bfbdd2c42/generators/spring-cache/generator.mts#L97-L101
