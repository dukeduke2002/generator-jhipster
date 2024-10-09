# app 子生成器

`jhipster` 命令入口点，它由 `common`, `languages`, `server`, 和 `client`组成。

## 自定义

JHipster实现允许您覆盖生成过程的几乎所有方面。

[SQL/spring-data-relational customizations](https://github.com/jhipster/generator-jhipster/blob/skip_ci-architecture/generators/spring-data-relational/README.md#sqlspring-data-relational-sub-generator)

### 应用程序

JDL 不支持注释，自定义必须通过本地蓝图完成。

`.blueprint/app/generator.mjs` (要创建本地蓝图，请遵循 https://www.jhipster.tech/modules/creating-a-blueprint/#local-blueprints):

```js
get [Generator.PREPARING]() {
  return {
    customize({ application }) {
      application.baseNameHumanized = 'Custom application title';
    },
  };
}
```

### 实体

每个注解都作为实体属性加载，并将在生成过程中使用。

```jdl
@CustomsProp1(customValue)
entity Bar {}
```

`.jhipster/Bar.json`:

```json
{
  "name": "Bar",
  "annotations": {
    "customsProp1": "customValue"
  }
}
```

#### 值得注意的自定义

##### 标签

```
@EntityClassHumanized("Departamento")
@EntityClassPluralHumanized("Departamentos")
entity Department {}
```

##### 翻译变体 

翻译变体允许在适用时对实体进行不同的翻译。

```jdl
@EntityI18nVariant('female')
@EntityClassHumanized("Empresa")
@EntityClassPluralHumanized("Empresas")
entity Company {}
```

`female` 变体受 `pt-br` 区域设置支持。

##### 权限

使用权限保护实体。

```
@EntityAuthority(ROLE_ADMIN)
@EntityReadAuthority(ROLE_USER)
entity Department {}
```

##### 管理员实体 

将实体声明为管理员实体，如如 User 和 Authority。
该实体将添加到管理员菜单中，并使用 ROLE_ADMIN 权限进行保护。

```
@AdminEntity
entity Department {}
```

### 字段 

#### 值得注意的自定义项

##### 标签

```jdl
entity Company {
  @FieldNameHumanized('Company Name')
  company_name
}
```

### 关系 

#### 值得注意的自定义项

##### 标签

```jdl
relationship ManyToOne {
  @RelationshipNameHumanized('Company user') Company{user} to User
}
```

##### 预先加载关系

适用于 SQL/spring-data-relational，在 MongoDb/spring-data-mongodb上提供部分支持。
Neo4j默认加载每个关系。

JHipster UI仅使用id和`otherEntityFieldName`属性，默认情况下，只会获取UI使用的字段。

```jdl
relationship OneToMany {
  @RelationshipEagerLoad Bar to @RelationshipEagerLoad Foo
}
```

相关问题： (#23917)[https://github.com/jhipster/generator-jhipster/issues/23917]
