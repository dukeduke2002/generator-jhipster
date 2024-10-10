# SQLspring-data-relational 子生成器

添加对 SQL 数据库和 Neo4j 的 liquibase 支持。

## 定制

定制基础知识可以在 [定制](../app/README.md#customizing)

### 值得注意的关系自定义

#### OnUpdate/OnDelete

```jdl
relationship ManyToOne {
  A to @OnDelete("SET NULL") @OnUpdate("CASCADE") B
}
```

允许的值: `NO ACTION | RESTRICT | CASCADE | SET NULL | SET DEFAULT`
