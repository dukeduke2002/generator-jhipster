# spring-boot 子生成器

Spring Boot 生成器。

## 自定义

### 实体

#### 值得注意的自定义

##### 层

自定义 @PreAuthorize Rest 层的注释。缺省使用 (@EntityAuthority)[../app/README.md#Authority] 。

```
@EntitySpringPreAuthorize("hasAuthority('ROLE_CUSTOM')")
@EntitySpringReadPreAuthorize("hasAuthority('ROLE_CUSTOM_READ')")
entity CustomPreAuthorize {}
```
