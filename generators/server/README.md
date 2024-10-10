# 服务器子生成器

 服务器生成器。

## 自定义

### 实体

#### 值得注意的自定义

##### 图层

默认情况下，会为每个实体生成每个图层。可以禁用图层。

```
@EntityDomainLayer(false)
@EntityPersistenceLayer(false)
@EntityRestLayer(false)
entity OptionalLayers {}
```
