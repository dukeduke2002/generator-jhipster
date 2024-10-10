# Gatling 子生成器

使用 [Gatling](https://gatling.io/)为实体生成负载测试模拟。

## 日志记录提示

```
LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
{
    // Log all HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("TRACE"));
    // Log failed HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("DEBUG"));
}
```
