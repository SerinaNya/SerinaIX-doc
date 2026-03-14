# 配置 BGP 会话

<!-- <!-- markdownlint-disable -->
<div align="center" style="line-height: 1.5em;font-size: 1.25em;padding: 1em 1em;margin: 1em 0px;border: 1px solid var(--vp-c-text-1);border-radius: 8px;font-family: monospace;"> SerinaIX <br> AS4242423625 </div>

<!-- markdownlint-restore -->

在 SerinaIX 中，你至少应该与 Route Servers 建立 BGP 会话。除此之外，也可以直接与 IX 中的其他接入者建立 BGP 会话。

> [!WARNING]
> 别把整个 DN42 的路由表发送给 Route Server！

## Route Servers

Route Server 是 eBGP 中相当于 iBGP 的 Route Reflector 的设备，简化了 IX 中所需的直接点对点 eBGP 会话数量。

以下是 SerinaIX 中的 Route Servers 列表：

| ID | IPv6 本地链路地址 | 地理位置 |
| --- | --- | --- |
| RS1 | fe80::89:58ff:fe96:4c77 | 上海 |
| RS2 | N/A | 上海 |

## 前置条件

以下是必须满足的条件：

- MP-BGP
- IPv4 通道上的 `extended next hop`
- `local role rs_client`

以下是建议启用的功能：

- BFD
- `add paths rx`
- `enable extended messages`

## BIRD2 配置

以下是使用 BIRD2 的示例配置文件：

<<< @/snippets/rs-session.bird2.conf{bird2:line-numbers}
