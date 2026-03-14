# 路由策略

## ROA

Route Server 会对路由进行严格的 ROA 检查，任何 ROA 无效或未知的路由都会被拒收。

## OTC

任何带有 OTC 属性的路由都会被拒收。

在两端都声明了 local role 的情况下，这种情况不会发生。

## 全表泄露 ☠️

如果发生了全表泄露，管理员可能会临时禁用相关会话，直到整改完毕。

## Large Communitiy

见 [§ Large Communities](/large-communities)。
