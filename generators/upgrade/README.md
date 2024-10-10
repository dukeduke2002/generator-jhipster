# upgrade sub-generator

将应用程序升级到更新的 generator-jhipster 版本。

升级过程生成 4 个提交：

- 参考应用程序
- 具有不相关历史记录的合并提交
- 升级应用程序
- 将升级提交应用于现有应用程序的合并提交

## 从 v7 升级

要升级到 v8，由于节点 v18v20 兼容性，您需要先升级到 v7.9.4。
如果使用使用 jhipster v7 的 blueprint，则需要使用 [jhipster-migrate](https://github.com/jhipster/generator-jhipster-migrate/)。

## 更改应用程序配置

可以使用升级过程应用配置更改。

For example to switch databases:

```
jhipster upgrade --apply-config --db postgresql
```

To remove admin ui:

```
jhipster upgrade --apply-config --no-with-admin-ui
```

For more configuration options run:

```
jhipster app --help
```
