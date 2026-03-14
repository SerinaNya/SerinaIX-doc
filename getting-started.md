# 开始接入

与 DN42 中现有的几个 IX 不同，它们通常在单一物理地点部署 VM / LXC 等虚拟设备，并将这些设备同时连接至 IX（通过本地链路）和接入者自己的 DN42 网络（通过 WireGuard 等协议）。

而 SerinaIX 则利用 [n2n](https://github.com/ntop/n2n)，将全球互联网转化为一个超大规模交换机，接入者仅需在自己的设备上部署 n2n 即可无缝接入 SerinaIX。

## 前置条件

在接入 SerinaIX 链路层之前，你必须确保你的设备满足以下条件：

- 位于中国内地
- 能够访问 IPv4 互联网
- 不是 Symmetric NAT

> [!CAUTION]
> 与任何其他网络互联都会带来潜在的、多方面的风险。在正式接入前，请务必确保你已经得到了许可。

## 安装 n2n

> [!IMPORTANT]
> SerinaIX 使用 n2n **3.1.1**，使用其他版本的 n2n 或 n3n 可能导致预料之外的问题。

可以在 [GitHub Releases](https://github.com/ntop/n2n/releases/tag/3.1.1) 中下载并安装 n2n **3.1.1** 版本，一些 Linux 发行版的软件仓库中可能也有此版本的 n2n 供下载。

OpenWrt 用户可从 [SerinaNya 的 n2n 下载站](https://oss-d37bc8e5.5050net.cn/n2n/) 中下载 `.ipk` 文件。

## 配置 n2n

SerinaIX 的 n2n edge 服务的配置文件一般为 `/etc/n2n/edge-serinaix.conf`。

> [!NOTE]
> 你需要联系 SerinaIX 的管理员（*@SerinaNya*）来获取配置文件的内容。

使用 systemctl 的用户可使用以下命令启动 edge 服务：

```bash
systemctl enable edge@serinaix --now
```

可以通过 journalctl 命令查看 edge 服务的日志：

```bash
journalctl -u edge@serinaix -f
```

可以通过 ip 命令查看创建的 TUN 接口：

```bash
ip a show n2n-serinaix
```

> [!INFO]
> 如果你在 LXC 内运行 n2n edge，可能遇到无法创建 TUN 接口的错误。
>
> 这需要将 `/dev/net/tun` 设备挂载至容器内，可以参考 [Proxmox-VE 开启 CT/LXC 容器 Wireguard/Tailscale 访问 TUN 权限 - HelloWood](https://blog.hellowood.dev/posts/proxmox-ve-%E5%BC%80%E5%90%AF-ct-lxc-%E5%AE%B9%E5%99%A8-wireguard-tailscale-%E8%AE%BF%E9%97%AE-tun-%E6%9D%83%E9%99%90/)。

### 固定 IPv6 本地链路地址

SerinaIX 内主要通过 IPv6 本地链路地址（*Link-local Address*）建立 BGP 会话， 其一般通过参考网络接口 MAC 地址的 EUI-64 算法生成。

而 n2n 的网络接口的 MAC 地址默认是在每次启动时随机生成的，为了固定住本地链路地址，最简单的方法就是固定住 n2n 的网络接口的 MAC 地址。

首次启动 n2n edge 服务后，将 `n2n-serinaix` 接口的 MAC 地址填入 `/etc/n2n/edge-serinaix.conf` 中的 `-m` 参数部分，然后重启 n2n edge 服务即可。

> [!NOTE]
> 也可以通过其他方法来自定义 IPv6 本地链路地址，此处仅介绍最简单的方法。

## 完成链路层接入

使用 ping 命令测试你的设备与其中一台 Route Server 的连通情况：

```bash
ping fe80::89:58ff:fe96:4c77%n2n-serinaix
```

确保一切正常后，就可以开始配置 BGP 会话了。
