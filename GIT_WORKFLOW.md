# Git 迭代工作流（完整版）

> 适用对象：所有人（无论用 cmd / PowerShell / Bash、无论 Windows / macOS / Linux、无论 Gitee / GitHub / GitLab）
>
> 文档目标：把 Git 日常会用到的命令、思路、踩坑一次讲清。
>
> 阅读方式：可以直接通读，也可以当成字典「忘了再查」。

---

## 目录

- [第 1 章 起步](#第-1-章-起步)
- [第 2 章 三大区域（最核心的概念）](#第-2-章-三大区域最核心的概念)
- [第 3 章 提交（commit）](#第-3-章-提交commit)
- [第 4 章 查看历史](#第-4-章-查看历史)
- [第 5 章 分支（branch）](#第-5-章-分支branch)
- [第 6 章 合并（merge）](#第-6-章-合并merge)
- [第 7 章 变基（rebase）](#第-7-章-变基rebase)
- [第 8 章 撤销与回滚](#第-8-章-撤销与回滚)
- [第 9 章 标签（tag）](#第-9-章-标签tag)
- [第 10 章 远程仓库](#第-10-章-远程仓库)
- [第 11 章 高级技巧](#第-11-章-高级技巧)
- [第 12 章 团队工作流](#第-12-章-团队工作流)
- [附录 A .gitignore 模板](#附录-a-gitignore-模板)
- [附录 B commit 规范（Conventional Commits）](#附录-b-commit-规范conventional-commits)
- [附录 C 常见错误速查表](#附录-c-常见错误速查表)
- [附录 D 一张图看懂 Git](#附录-d-一张图看懂-git)

---

## 第 1 章 起步

### 1.1 Git 是什么

Git 是一个**分布式版本控制系统**。它的核心能力：

1. **记录变更历史**：每一次保存的快照都可以随时调出来对比、回滚
2. **分支并行开发**：不同的人 / 不同的功能可以互不干扰地推进
3. **多人协作**：把不同人的修改合并到一起，并解决冲突

它和"网盘 + 文件名加日期"的区别：
- 网盘存的是「最终状态」
- Git 存的是「**每一次变化**」+「最终状态」，且能告诉你「为什么这么改」

### 1.2 安装 Git

- **Windows**：<https://git-scm.com/download/win>，下载后一路下一步
- **macOS**：`xcode-select --install`，或装 Homebrew 后 `brew install git`
- **Linux**：`sudo apt install git`（Ubuntu/Debian）或 `sudo yum install git`（CentOS）

验证安装：

```bash
git --version
# 应该输出类似：git version 2.43.0
```

### 1.3 第一次使用必须配：用户名 + 邮箱

**这是必须做的**，否则 commit 会报错：

```bash
git config --global user.name "你的名字"
git config --global user.email "your@email.com"
```

> `--global` 表示对这台电脑**所有仓库**生效。如果只想配当前仓库，去掉 `--global`。

**检查当前配置**：

```bash
git config --list          # 所有配置
git config user.name       # 只查名字
git config user.email      # 只查邮箱
```

### 1.4 初始化一个新仓库

**场景**：你本地有一个项目，要开始用 Git 管它。

```bash
cd /path/to/your/project
git init
```

执行后会在目录下生成一个 `.git` 隐藏目录 —— Git 把所有历史都存在这里。

**`git init` 默认创建的分支**：
- Git 2.28+（2020 年 7 月之后）默认是 `main`
- 老版本默认是 `master`

**统一用 main**（业界规范）：

```bash
git init --initial-branch=main     # 创建时就用 main
# 或者创建后改名
git init && git branch -m main
```

### 1.5 克隆（clone）一个已有仓库

**场景**：你要参与一个已有的项目（GitHub / Gitee / 公司内网 GitLab）。

```bash
git clone https://gitee.com/xxx/yyy.git
```

克隆会自动做三件事：
1. 下载整个仓库到当前目录的 `yyy` 子目录
2. 默认建一个 `main` 分支并切过去
3. 自动加一个名为 `origin` 的远程仓库别名

**克隆到指定目录**：

```bash
git clone https://gitee.com/xxx/yyy.git my-folder
```

**只克隆最近一次（省时间、浅克隆）**：

```bash
git clone --depth 1 https://gitee.com/xxx/yyy.git
```

### 1.6 我们在赛博算卦项目里就是这么用的

```bash
cd /d d:\dai_ma\赛博算卦
git init
# Initialized empty Git repository in D:/dai_ma/赛博算卦/.git/
git branch -m main
git status
# On branch main
```

---

## 第 2 章 三大区域（最核心的概念）

### 2.1 Git 的三个区域

Git 的工作流可以简化为**三个区域**之间的移动：

```
┌──────────┐    git add     ┌──────────┐   git commit    ┌──────────┐
│ 工作区    │ ────────────▶ │ 暂存区    │ ─────────────▶ │  本地仓库  │
│ Working  │                │ Staging  │                │ Repository│
│  Directory│               │  Area    │                │  (.git/)  │
└──────────┘                └──────────┘                └──────────┘
     ▲                                                      │
     │                                                      │
     └──────────────── git checkout ─────────────────────── ┘
```

- **工作区**：你能在文件管理器里看到的真实文件
- **暂存区**（也称 Index / Stage）：一个"准备打包"的清单
- **本地仓库**：`.git/` 里保存的所有历史快照

### 2.2 文件的四种状态

每个文件在任意时刻都属于下面四种状态之一：

| 状态 | 英文 | 颜色（git status 默认） | 含义 |
|---|---|---|---|
| 未修改 | Unmodified | （不显示） | 和上一次 commit 一样 |
| 已修改 | Modified | 红色 | 你改了，但还没 `git add` |
| 已暂存 | Staged | 绿色 | 已 `git add`，下次 commit 会带上它 |
| 未追踪 | Untracked | 红色 | Git 完全不知道这个文件（一般是新建的） |

### 2.3 一图看懂四个状态之间的转换

```
未追踪 ── git add ──▶ 已暂存 ── git commit ──▶ 未修改
   │                    │                          │
   │                    │                          │
   └──── 编辑文件 ──────┴── 编辑文件 ──────────────┴── 编辑文件 ────▶ 已修改
                                                                  │
                                                                  │
                                                ┌──── git add ───┘
                                                ▼
                                              已暂存

未修改 ── git rm ──▶ 未追踪
```

### 2.4 看状态：`git status`

这是**你每天敲得最多的命令**，比 `ls` 还多。

```bash
git status
```

输出解读：

```
On branch main                            ← 当前分支
Changes not staged for commit:           ← 红字区：已修改但未暂存
        modified:   README.md

Changes to be committed:                  ← 绿字区：已暂存
        new file:   docs/api.md

Untracked files:                          ← 红字区：未追踪（新建文件）
        tmp/test.log
```

> 习惯：**改完代码第一件事永远是 `git status`**，看自己在什么状态。

### 2.5 实战演示（赛博算卦项目）

```bash
# 1. 在 feat/qimen-dunjia 分支上，新建一个文件
echo "// 奇门遁甲" > src/utils/qimenCalculator.ts
git status
# → Untracked files: src/utils/qimenCalculator.ts（红字）

# 2. 告诉 Git：我要这个文件
git add src/utils/qimenCalculator.ts
git status
# → Changes to be committed: new file: ...（绿字）

# 3. 确认 OK，打包
git commit -m "feat: 改一下奇门计算器"
git status
# → nothing to commit, working tree clean（什么状态都没有）
```

---

## 第 3 章 提交（commit）

### 3.1 一次完整提交：`add` + `commit`

```bash
git add <文件>
git commit -m "说明文字"
```

也可以**一次提交所有已修改 + 已暂存的文件**（注意：不包含 Untracked）：

```bash
git commit -a -m "说明文字"
# 或者
git commit -am "说明文字"
```

### 3.2 commit message 怎么写

**好的 commit message 长这样：**

```
feat: 首页加上"我的"入口
fix: 修复日期选择器跨年显示错误
docs: 补充 CONTRIBUTING.md
refactor: 把 utils 里的日期处理抽成独立模块
```

格式：**`<类型>: <一句话说明>`**（英文冒号 + 空格）

详细规范见 [附录 B commit 规范（Conventional Commits）](#附录-b-commit-规范conventional-commits)。

### 3.3 多行 commit message

如果是复杂改动，可以写多行：

```bash
git commit
```

会打开一个编辑器（默认 vim / nano / VS Code，看你配置），在里面写：

```
feat: 重构起卦流程

- 拆分计算器为 pure / io 两层
- 新增单元测试覆盖三枚铜钱场景
- 更新 README 中的算法说明

Closes #42
```

### 3.4 修改最近一次 commit

```bash
git commit --amend
```

**用途**：
1. 改了文件，**还没 commit**，想合并到上次 commit：
   ```bash
   echo "more" >> README.md
   git add README.md
   git commit --amend --no-edit   # --no-edit 保留原 message
   ```
2. 想**只改 message**：
   ```bash
   git commit --amend -m "新 message"
   ```

> ⚠️ **警告**：`--amend` 会**重写最近一次 commit 的哈希**。如果已经 push 到远程，会和别人冲突。已 push 的 commit 永远不要 amend。

### 3.5 跳过暂存区，直接提交

```bash
git commit -am "fix: 改个 typo"
```

这只对**已追踪的文件**的修改生效，对**新文件（Untracked）无效**。

### 3.6 常用命令速查

| 命令 | 作用 |
|---|---|
| `git add <file>` | 把文件加到暂存区 |
| `git add .` | 把当前目录所有变化加到暂存区 |
| `git add -A` | 把**整个仓库**所有变化加到暂存区（更彻底） |
| `git add -p` | 交互式 add（一个大改动只 stage 部分） |
| `git commit -m "..."` | 提交 |
| `git commit -am "..."` | 跳过 add（仅限已追踪文件） |
| `git commit --amend` | 修改最近一次 commit |

### 3.7 赛博算卦项目实战

```bash
git add src/utils/qimenCalculator.ts
git commit -m "feat: 改一下奇门计算器"
# [feat/qimen-dunjia 89fc9c2] feat: 改一下奇门计算器
#  1 file changed, 0 insertions(+), 0 deletions(-)

git log --oneline
# 89fc9c2 (HEAD -> feat/qimen-dunjia) feat: 改一下奇门计算器
# 859756e (main) chore: initial commit - 赛博算卦脚手架
```

---

## 第 4 章 查看历史

### 4.1 看 commit 列表：`git log`

```bash
git log                      # 完整哈希 + 作者 + 日期 + message
git log --oneline            # 一行一个，最常用
git log --oneline -n 10      # 只看最近 10 条
git log --oneline --all      # 所有分支的所有 commit
git log --graph              # 画 ASCII 树状图
git log --graph --oneline --all   # 推荐组合：树状图 + 一行 + 所有分支
git log --author="xyc"       # 按作者过滤
git log --since="2026-01-01" # 按时间过滤
git log <file>               # 看某个文件的历史
```

### 4.2 看某个 commit 的详情：`git show`

```bash
git show <commit-hash>       # 显示 commit 信息 + diff
git show HEAD                # 最新一次
git show v1.0                # tag 也可以
```

### 4.3 看文件变化：`git diff`

```bash
git diff                     # 工作区 vs 暂存区
git diff --staged            # 暂存区 vs 上次 commit（即将提交啥）
git diff HEAD                # 工作区 vs 上次 commit
git diff main..feat/x        # 两个分支的差异
git diff <commit1>..<commit2>  # 两个 commit 之间的差异
```

### 4.4 找出"谁改坏了这一行"：`git blame`

```bash
git blame <file>
```

会逐行列出：commit hash、作者、时间、代码。

只关心某几行：

```bash
git blame -L 10,20 <file>    # 第 10-20 行
```

### 4.5 找包含某个词的 commit

```bash
git log --grep="登录"        # 在 commit message 里搜
git log -S "functionName"    # 在代码里搜（会找新增/删除这个字符串的 commit）
```

### 4.6 赛博算卦项目实战

```bash
git log --oneline
# 89fc9c2 (HEAD -> main, tag: v0.1.0, feat/qimen-dunjia) feat: 改一下奇门计算器
# 859756e chore: initial commit - 赛博算卦脚手架

git show v0.1.0 --stat
# 显示 v0.1.0 这个版本包含的 commit 和改动的文件
```

---

## 第 5 章 分支（branch）

### 5.1 分支是什么

Git 的分支不是"复制一份文件夹"，而是一个**可移动的指针**，指向某个 commit。

```
* main         → 指向 89fc9c2
  feat/login   → 指向 a1b2c3d
  hotfix/bug   → 指向 f4e5d6c
```

创建分支几乎瞬间完成（指针 + 几十字节），所以 Git 鼓励**大量使用分支**。

### 5.2 常用命令

```bash
git branch                 # 列出本地分支（* 标记当前）
git branch -a              # 列出所有分支（含远程）
git branch -r              # 只列远程分支
git branch <name>          # 基于当前 commit 建分支
git branch -m <old> <new>  # 重命名分支
git branch -d <name>       # 删除分支（已合并才能删）
git branch -D <name>       # 强制删除（不管有没有合并）

git checkout <name>        # 切换分支
git checkout -b <name>     # 建分支 + 切换（最常用）
git switch <name>          # 新命令，作用同 checkout（更清晰，推荐用这个）
git switch -c <name>       # 同 checkout -b
```

> Git 2.23+ 推荐 `git switch`（切换）和 `git restore`（撤销）替代老 `checkout`。但 `checkout` 还可用，老项目资料多。

### 5.3 分支命名规范

业界惯例：

| 前缀 | 用途 | 示例 |
|---|---|---|
| `feat/` | 新功能 | `feat/login-page` |
| `fix/` | 修 bug | `fix/date-picker-crash` |
| `docs/` | 文档 | `docs/api-guide` |
| `refactor/` | 重构 | `refactor/utils-splite` |
| `hotfix/` | 紧急修复（生产环境） | `hotfix/p0-payment-error` |
| `release/` | 发布准备 | `release/v1.2.0` |
| `chore/` | 杂事 | `chore/bump-deps` |

### 5.4 删分支前要确认

```bash
git branch -d feat/qimen-dunjia
# 如果分支还没合并，会提示：error: The branch 'feat/qimen-dunjia' is not fully merged.
# 真的要删吗？git branch -D feat/qimen-dunjia
```

### 5.5 赛博算卦项目实战

```bash
# 建分支
git checkout -b feat/qimen-dunjia
# Switched to a new branch 'feat/qimen-dunjia'

# 切回 main
git checkout main

# 看所有分支
git branch
# * main
#   feat/qimen-dunjia

# 删分支
git branch -d feat/qimen-dunjia
```

---

## 第 6 章 合并（merge）

### 6.1 两种合并模式

#### 6.1.1 Fast-forward（快进合并）

main 没动过，feat 分支领先，直接把 main 指针往前挪即可。**不产生新 commit**。

```
Before:                After:
A --- B (main)         A --- B --- C (main, feat)
         \
          C (feat)
```

#### 6.1.2 3-way Merge（三方合并）

main 和 feat 都各自往前走了，需要一次新 commit 来"汇合"。

```
Before:                After:
A --- B --- D (main)   A --- B --- D --- M (main)
         \                       \       /
          C --- E (feat)           C --- E (feat)
```

`M` 是 merge commit。

### 6.2 合并命令

```bash
# 1. 切到目标分支（一般是 main）
git checkout main

# 2. 把 feat 合进来
git merge feat/qimen-dunjia

# 3. 合并完删掉 feat（可选，但推荐）
git branch -d feat/qimen-dunjia
```

### 6.3 合并冲突

如果 main 和 feat 都改了同一行，Git 没法自动合并，会报冲突：

```
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

冲突文件里会出现这样的标记：

```markdown
<<<<<<< HEAD
这是 main 分支的内容
=======
这是 feat 分支的内容
>>>>>>> feat/qimen-dunjia
```

**解决步骤**：

1. 打开冲突文件
2. 决定保留哪部分（手动编辑，可以保留一方、合并两方、或重写）
3. 删掉 `<<<<<<<`、`=======`、`>>>>>>>` 标记
4. 标记冲突已解决：
   ```bash
   git add <冲突文件>
   ```
5. 完成合并：
   ```bash
   git commit
   ```
   （Git 已经预填好 merge message，直接保存即可）

**放弃合并**（遇到冲突不想解决了）：

```bash
git merge --abort
```

### 6.4 合并选项

```bash
git merge --no-ff feat/x      # 强制 3-way 合并，即使可以快进（保留分支痕迹）
git merge --squash feat/x    # 把 feat 的所有 commit 压成一个再合并
git merge --abort            # 放弃合并，恢复到合并前状态
```

> **`--no-ff` 的好处**：在历史里能看到「这里曾经有个 feat 分支」。代价是多一个 commit。

### 6.5 赛博算卦项目实战

```bash
git checkout main
git merge feat/qimen-dunjia
# Updating 859756e..89fc9c2
# Fast-forward
#  src/utils/qimenCalculator.ts | Bin 3668 -> 20 bytes
#  1 file changed, 0 insertions(+), 0 deletions(-)

git log --oneline
# 89fc9c2 (HEAD -> main, tag: v0.1.0, feat/qimen-dunjia) feat: 改一下奇门计算器
# 859756e chore: initial commit - 赛博算卦脚手架
```

---

## 第 7 章 变基（rebase）

### 7.1 rebase 是什么

把一条分支上的 commit **"重新播放"** 到另一条分支的最新 commit 之后。

```
Before rebase:                  After rebase:
A --- B --- C (main)            A --- B --- C --- D' --- E' (main)
         \                                    \
          D --- E (feat)                       (feat 分支没了，或单独留着)
```

### 7.2 为什么要 rebase

**目的**：让历史变成一条直线，好看、好用、好找 bug。

### 7.3 怎么 rebase

```bash
# 把 feat 合到 main 的最新
git checkout feat/qimen-dunjia
git rebase main
```

如果有冲突，解决方法和 merge 一样：

```bash
# 改完冲突文件后
git add <冲突文件>
git rebase --continue    # 继续 rebase
git rebase --abort       # 放弃，回到 rebase 前
```

rebase 完成后，切回 main 用 fast-forward 合并：

```bash
git checkout main
git merge feat/qimen-dunjia   # 这次一定是 Fast-forward
```

### 7.4 ⚠️ rebase 的黄金法则

> **永远不要对已经 push 到公共仓库的 commit 做 rebase。**

原因：rebase 会**重写 commit 哈希**。别人如果基于你的旧 commit 继续开发，rebase 后他们的本地就和远程"断了"。

口诀：
- ✅ 个人本地分支随便 rebase
- ✅ 自己 fork 出来的远端分支可以 rebase
- ❌ 团队共享的 main / develop / release 分支**不要** rebase

### 7.5 交互式 rebase：改写自己的历史

```bash
git rebase -i HEAD~3    # 改最近 3 个 commit
```

会打开编辑器，给出一个列表：

```
pick abc1234 第一个 commit
pick def5678 第二个 commit
pick ghi9012 第三个 commit
```

你可以把 `pick` 改成：

| 命令 | 作用 |
|---|---|
| `pick` | 保留 |
| `reword` | 改 message |
| `edit` | 停下来让你改代码 |
| `squash` | 把这个 commit 和上一个合并 |
| `fixup` | 同 squash，但丢掉这个 commit 的 message |
| `drop` | 删除这个 commit |

**典型用法**：

1. **合并最近几个 commit**（"我改了一堆小东西，提交前应该合成一个"）：
   ```
   pick abc1234 feat: 加登录入口
   squash def5678 typo 修正
   squash ghi9012 又改了点样式
   ```

2. **改最近一个 commit 的 message**：
   ```bash
   git rebase -i HEAD~1
   # 把 pick 改成 reword，保存后会打开编辑器让你改 message
   ```

### 7.6 merge vs rebase 怎么选

| 场景 | 推荐 |
|---|---|
| 合并公共分支（main / develop） | merge |
| 个人本地分支整理后合并 | rebase + merge |
| 想保留"曾经开过分支"的痕迹 | merge --no-ff |
| 想让历史干净 | rebase |

**最实用组合**：
> 个人分支开发完，先 `rebase main`（更新基线），再 `merge` 到 main（生成合并点）。这样既干净又有合并痕迹。

---

## 第 8 章 撤销与回滚

> **本章是 Git 最值钱的部分**。写错代码、改坏配置、误删文件 —— 都能救回来。

### 8.1 还没 add，怎么撤销？

```bash
git restore <file>          # 撤销工作区的修改（恢复到上次 commit 状态）
git restore .                # 撤销所有未暂存的修改
```

⚠️ **这个操作不可逆**，工作区修改会丢失。

### 8.2 已经 add，但还没 commit，怎么撤销？

```bash
git restore --staged <file>   # 取消暂存（文件回到"已修改"状态）
git restore --staged .        # 取消所有暂存
```

或者用旧命令：

```bash
git reset HEAD <file>         # 同上（老语法，现在还能用）
```

### 8.3 已经 commit，怎么撤销？

**三种 reset 模式**：

```bash
git reset --soft HEAD~1     # 撤销 commit，但改动保留在暂存区
git reset HEAD~1            # 撤销 commit，改动保留在工作区（默认）
git reset --hard HEAD~1     # 撤销 commit，连改动一起删除（慎用）
```

`HEAD~1` = 撤销最近 1 个 commit，`HEAD~3` = 撤销最近 3 个。

| 模式 | commit | 暂存区 | 工作区 | 用途 |
|---|---|---|---|---|
| `--soft` | ❌ 删除 | ✅ 保留 | ✅ 保留 | 想重新组织 commit |
| `--mixed`（默认） | ❌ 删除 | ❌ 清空 | ✅ 保留 | 撤销 commit 但保留改动 |
| `--hard` | ❌ 删除 | ❌ 清空 | ❌ 删除 | **完全回滚**（慎用） |

### 8.4 已经 push 到远程，怎么撤销？

```bash
git revert <commit-hash>
```

**`revert` 和 `reset` 的关键区别**：
- `reset` 是"删除 commit"
- `revert` 是"**新加一个 commit**，这个 commit 的内容和指定 commit **相反**"

所以 `revert` 不会改写历史，**适合远程公共分支**。

```bash
# 撤销最近一次 commit
git revert HEAD

# 撤销指定 commit
git revert 89fc9c2

# 撤销但不自动 commit（让你修改后再提交）
git revert --no-commit 89fc9c2
```

### 8.5 救命命令：`git reflog`

**任何操作**都会被 reflog 记录 30 天（默认）。即使你 `reset --hard` 把代码删了，也能找回来。

```bash
git reflog
```

输出示例：

```
89fc9c2 (HEAD -> main) HEAD@{0}: reset: moving to HEAD~1
859756e HEAD@{1}: commit: feat: 改一下奇门计算器
abc1234 HEAD@{2}: checkout: moving from feat to main
```

**救命场景**：

```bash
# 误操作 reset --hard 删了最新 commit
git reset --hard HEAD~1   # HEAD 现在指向老的 commit
git reflog                # 还能看到 89fc9c2 那个被删的 commit
git reset --hard 89fc9c2  # 回到它
```

### 8.6 已经合并到 main 的分支，怎么回滚整个合并？

```bash
git revert -m 1 <merge-commit-hash>
```

`-m 1` 表示"相对于第一个父分支（main）"。这是处理合并回滚的标准方法。

### 8.7 速查表

| 场景 | 命令 |
|---|---|
| 撤销工作区修改 | `git restore <file>` |
| 取消暂存 | `git restore --staged <file>` |
| 撤销最近 commit（保留改动） | `git reset HEAD~1` |
| 撤销最近 commit（彻底） | `git reset --hard HEAD~1` |
| 撤销已 push 的 commit | `git revert <hash>` |
| 找回误删的 commit | `git reflog` |

### 8.8 赛博算卦项目实战（推荐练习）

```bash
# 场景：刚刚 commit 了"feat: 改一下奇门计算器"，但写错了
git log --oneline
# 89fc9c2 (HEAD -> main) feat: 改一下奇门计算器   ← 这条要撤
# 859756e chore: initial commit

# 撤销（保留改动）
git reset HEAD~1
# → 工作区还有改动，但 main 退回到 859756e

# 想撤销后改 message 再提交
git reset --soft HEAD~1
# → 改动回到暂存区
git commit -m "feat: 新增奇门遁甲计算器骨架"

# 想直接放弃改动
git reset --hard HEAD~1
# → 工作区也清干净
```

---

## 第 9 章 标签（tag）

### 9.1 tag 是什么

tag 是给某个 commit 起一个**永久的名字**，通常用来标记发布版本（`v1.0.0`、`v0.1.0`）。

### 9.2 两种 tag

| 类型 | 命令 | 特点 |
|---|---|---|
| 轻量标签（lightweight） | `git tag v0.1` | 只是一个指针，不可记录额外信息 |
| 附注标签（annotated） | `git tag -a v1.0 -m "版本说明"` | 完整对象，记录作者、日期、message；**推荐用这种** |

### 9.3 常用命令

```bash
# 列出现有 tag
git tag
git tag -l "v1.*"           # 列所有 v1.x.x

# 打附注 tag（推荐）
git tag -a v1.0.0 -m "第一个正式版"

# 打轻量 tag
git tag v1.0.0-lite

# 给某个旧 commit 打 tag
git tag -a v0.9 859756e -m "v0.9 发布"

# 看 tag 详情
git show v1.0.0

# 删除 tag
git tag -d v1.0.0
```

### 9.4 推送 tag 到远程

```bash
git push origin v1.0.0         # 推一个
git push origin --tags         # 推所有
git push origin --tags --force # 强制推（覆盖远程同名 tag，慎用）

# 删除远程 tag
git push origin --delete v1.0.0
# 或
git push origin :refs/tags/v1.0.0
```

### 9.5 tag 命名规范（语义化版本 SemVer）

格式：`v主版本.次版本.修订号`（`vMAJOR.MINOR.PATCH`）

| 变化类型 | 改哪一位 | 例子 |
|---|---|---|
| 不兼容的 API 修改 | 主版本（MAJOR） | 1.0.0 → 2.0.0 |
| 向后兼容的功能新增 | 次版本（MINOR） | 1.0.0 → 1.1.0 |
| 向后兼容的 bug 修复 | 修订号（PATCH） | 1.0.0 → 1.0.1 |

预发布版本：

- `v1.0.0-alpha.1` — 内部测试
- `v1.0.0-beta.1` — 公开测试
- `v1.0.0-rc.1` — 候选发布

### 9.6 赛博算卦项目实战

```bash
git tag -a v0.1.0 -m "第一版脚手架"
git show v0.1.0 --stat
# commit 89fc9c2 (HEAD -> main, tag: v0.1.0, feat/qimen-dunjia)
# Author: xyc <16966617+xyc667@user.noreply.gitee.com>
#     feat: 改一下奇门计算器
```

---

## 第 10 章 远程仓库

### 10.1 远程仓库是什么

远程仓库 = 别人电脑（或服务器）上的同一个 Git 仓库。常用平台：

- **GitHub**：<https://github.com>（国际主流）
- **Gitee**：<https://gitee.com>（国内，速度快）
- **GitLab**：公司自建 / gitlab.com
- **Bitbucket**：和 Jira 集成好

### 10.2 概念：本地 vs 远程

```
本地（你这台电脑）                远程（服务器）
──────────────                  ──────────────
main ───▶ 89fc9c2              main ───▶ 89fc9c2
feat/x ▶ 12ab34                feat/x ▶ (没有)
```

本地领先远程 = 你有 commit 没 push
远程领先本地 = 别人 push 了新 commit，你没 pull

### 10.3 查看 / 添加远程

```bash
git remote -v                  # 看远程仓库地址
git remote add origin https://gitee.com/xxx/yyy.git   # 加一个叫 origin 的远程
git remote add upstream https://github.com/foo/bar.git # 再加一个叫 upstream 的远程
git remote remove origin       # 删除
git remote rename origin my    # 重命名
```

**约定俗成**：
- `origin` = 你的主要远程仓库（你自己的 fork 或主仓库）
- `upstream` = 上游仓库（你 fork 的那个原项目）

### 10.4 fetch vs pull

| 命令 | 作用 |
|---|---|
| `git fetch <remote>` | **只下载**远程的新数据，**不自动合并** |
| `git pull <remote> <branch>` | 下载 + **自动合并**（= fetch + merge） |

**推荐**：能 fetch 就别 pull。fetch 后你可以先 `git log HEAD..origin/main` 看看远程有什么，再决定怎么合并。

```bash
git fetch origin
git log HEAD..origin/main --oneline   # 看远程 main 比本地 main 多了哪些
git merge origin/main                 # 再合并
```

### 10.5 push：把本地推到远程

```bash
git push origin main                  # 推 main
git push origin feat/qimen-dunjia     # 推 feat 分支
git push -u origin feat/qimen-dunjia  # 第一次推，加 -u 设上游跟踪
git push --tags                       # 推所有 tag
```

`-u`（或 `--set-upstream`）作用：以后 `git pull` / `git push` 不用再指定 origin 和分支名。

### 10.6 clone 一个远程仓库

```bash
git clone https://gitee.com/xxx/yyy.git
```

克隆时自定义远程名：

```bash
git clone -o upstream https://github.com/foo/bar.git
# 远程默认叫 upstream 而非 origin
```

### 10.7 推送到远程时的常见问题

#### 问题 1：远程有更新，本地没 pull

```bash
git push
# ! [rejected]        main -> main (fetch first)
# error: failed to push some refs

# 解决
git pull --rebase origin main    # pull + rebase（推荐）
git push
```

#### 问题 2：没有上游分支

```bash
git push
# fatal: The current branch feat/x has no upstream branch.

# 解决
git push -u origin feat/x
```

#### 问题 3：远程平台差异

| 平台 | pull request / merge request | Issue | 私有仓库 |
|---|---|---|---|
| GitHub | Pull Request | Issues | 收费 |
| Gitee | Pull Request | Issue | 免费 |
| GitLab | Merge Request | Issue | 免费自建 |

### 10.8 SSH vs HTTPS

| 协议 | 优点 | 缺点 |
|---|---|---|
| HTTPS | 简单，clone 直接用 | 每次 push 要输密码（或配 token） |
| SSH | push 不用输密码（配好密钥后） | 首次要生成密钥、配公钥 |

**配 SSH（一次性）**：

```bash
# 1. 生成密钥（一直回车）
ssh-keygen -t ed25519 -C "your@email.com"

# 2. 复制公钥
cat ~/.ssh/id_ed25519.pub      # macOS/Linux
type %USERPROFILE%\.ssh\id_ed25519.pub   # Windows

# 3. 把公钥粘到 Gitee/GitHub 的 SSH 设置里

# 4. 之后用 SSH 协议 clone
git clone git@gitee.com:xxx/yyy.git
```

### 10.9 赛博算卦项目实战

你的远程信息显示是 Gitee（`xyc667@user.noreply.gitee.com`）。要推到 Gitee 的话：

```bash
# 第一次推
git remote add origin git@gitee.com:xyc667/cyber-divination.git
git push -u origin main
git push -u origin feat/qimen-dunjia     # 可选，推功能分支
git push --tags                          # 推 tag v0.1.0
```

---

## 第 11 章 高级技巧

### 11.1 stash：临时保存工作

**场景**：你正在改一个文件，突然要切到别的分支处理紧急 bug，但现在的改动不想 commit。

```bash
git stash                  # 把工作区和暂存区的改动打包存起来
git stash pop              # 恢复（最新一次）
git stash list             # 看所有 stash
git stash apply stash@{0}  # 恢复指定 stash
git stash drop stash@{0}   # 删除某个 stash
git stash clear            # 清空所有 stash
```

**带名字的 stash**：

```bash
git stash save "改了一半的登录页"
```

**stash 包含未追踪文件**：

```bash
git stash -u              # -u / --include-untracked
```

### 11.2 cherry-pick：挑一个 commit 合过来

**场景**：你在 fix 分支上修了一个 bug，想把这个 commit 单独提到 main 上，但不想合并整个分支。

```bash
git checkout main
git cherry-pick <commit-hash>
```

可以一次挑多个：

```bash
git cherry-pick <hash1> <hash2>
git cherry-pick <hash1>..<hash3>   # 范围
```

加 `-n`（不 commit，只把改动加到工作区）：

```bash
git cherry-pick -n <hash>
```

### 11.3 worktree：同一个仓库多个工作目录

**场景**：你有两个分支要同时开发（比如一个在写代码，一个在调试），不想来回 stash。

```bash
git worktree add ../my-project-debug feat/debug-branch   # 在另一个目录开新工作区
git worktree list                                          # 看所有 worktree
git worktree remove ../my-project-debug                    # 删掉
```

每个 worktree 独立的工作区，**但共用同一个 `.git/`**。

### 11.4 子模块（submodule）

**场景**：你的项目依赖另一个 Git 仓库（比如引用某个第三方库的特定版本）。

```bash
# 添加子模块
git submodule add https://gitee.com/xxx/lib.git libs/lib

# clone 包含子模块的项目
git clone --recurse-submodules https://gitee.com/xxx/main.git

# 拉取后单独初始化子模块
git submodule init
git submodule update
```

### 11.5 子树（subtree）

子模块的替代方案，子模块代码**自动跟随**父仓库 clone：

```bash
git subtree add --prefix=libs/lib https://gitee.com/xxx/lib.git main --squash
git subtree pull --prefix=libs/lib https://gitee.com/xxx/lib.git main --squash
git subtree push --prefix=libs/lib https://gitee.com/xxx/lib.git main
```

子模块 vs 子树怎么选：
- **子模块**：被引用方独立演进，你只定期更新（适合大型项目）
- **子树**：代码完全融入主仓库（适合引用量小的工具库）

### 11.6 清理

```bash
git clean -n               # 看看哪些 untracked 文件会被删（不真删）
git clean -fd              # 真删 untracked 文件和目录
git clean -fdx             # 连 .gitignore 里的也删（极危险）

git gc                     # 垃圾回收，压缩 .git
git prune                  # 删除悬空对象
```

### 11.7 配置别名（alias）

把常用命令变短：

```bash
git config --global alias.st status      # git st
git config --global alias.co checkout    # git co
git config --global alias.br branch      # git br
git config --global alias.lg "log --graph --oneline --all"  # git lg
git config --global alias.unstage "restore --staged"        # git unstage

# 查看所有别名
git config --global --get-regexp alias
```

---

## 第 12 章 团队工作流

### 12.1 三种主流模式对比

| 维度 | Git Flow | GitHub Flow | Trunk-based |
|---|---|---|---|
| 分支数 | 多（main / develop / feature / release / hotfix） | 少（main + feature） | 极少（main + 短命 feature） |
| 发布周期 | 周期长、版本化 | 持续部署 | 持续部署 |
| 适合 | 库 / 桌面软件 | Web 应用 | 高度自动化的项目 |
| 学习成本 | 高 | 低 | 最低 |

### 12.2 Git Flow（推荐用于库和桌面应用）

来源：<https://nvie.com/posts/a-successful-git-branching-model/>

**两条主分支**：
- `main`：稳定、可发布
- `develop`：开发主线

**三种辅助分支**：

| 分支 | 从哪拉 | 合回哪 | 命名 |
|---|---|---|---|
| feature | develop | develop | `feat/xxx` |
| release | develop | main + develop | `release/v1.2.0` |
| hotfix | main | main + develop | `hotfix/xxx` |

**典型流程**：

```
main:    A ──────────────── M ────────── H ───── M
                  ↑                     ↑        ↑
develop: B ── C ── D ──── E ─────────── F ───────┤
                ↑       ↑                         ↑
feat/x:        C' ───── D'                        │
                                                  │
hotfix/y:                                       H'─┘
```

**工具**：可以用 `git-flow` 扩展命令（<https://github.com/petervanderdoes/gitflow-avh>）

```bash
git flow init                              # 初始化（已有仓库会问问题）
git flow feature start my-new-feature      # 开始 feature
git flow feature finish my-new-feature     # 结束 feature（合回 develop，删分支）
git flow release start v1.2.0              # 开始 release
git flow release finish v1.2.0             # 结束 release（合回 main + develop，打 tag）
git flow hotfix start urgent-fix           # 开始 hotfix
git flow hotfix finish urgent-fix          # 结束 hotfix
```

### 12.3 GitHub Flow（推荐用于 Web / 持续部署）

来源：<https://guides.github.com/introduction/flow/>

**超简单**：只有 `main` + `feature` 分支。

```
main:     A ───── M ────────── M'
                 ↑            ↑
feat/x:   B ─── C ────┘
```

**流程**：

1. 从 main 拉一个 feature 分支
2. 在分支上开发 + commit
3. 开 Pull Request（让同事 review）
4. 通过 review 后合并到 main
5. 部署（main 部署即可）

### 12.4 Trunk-based（推荐用于极致自动化）

**原则**：所有 commit 直接进 main（或很短命的 feature 分支，几小时内合并）。

- 没有 develop，没有 release 分支
- 配合**功能开关（feature flag）**：未完成的功能藏在开关后面
- 强依赖 CI/CD 自动测试 + 自动部署

适合：Google、Facebook 这种每天部署数千次的大型团队。

### 12.5 Pull Request / Merge Request 怎么写

无论是 GitHub 的 PR、Gitee 的 PR、GitLab 的 MR，**好的描述都长这样**：

```markdown
## 改了什么
- 首页加上"我的"入口
- 优化登录页加载速度（首屏从 1.2s → 0.5s）

## 怎么测
1. 打开 /home
2. 点右上角头像
3. 应该看到"我的"菜单

## 关联 Issue
Closes #42

## 截图
（截图或录屏）

## Checklist
- [x] 自测通过
- [x] 加了单元测试
- [x] 更新了文档
```

### 12.6 Code Review 礼仪

**作为提交者**：
- PR 小而专（一个 PR 一个功能）
- 自己先 review 一遍代码
- 描述清楚改了什么、为什么改
- 及时回复 reviewer

**作为 reviewer**：
- 礼貌提建议（"建议..."而不是"这里错了"）
- 区分**必须改**和**建议改**（用 `nit:` / `suggestion:` 前缀）
- 及时 review，别让人等太久

### 12.7 选择建议

| 你的情况 | 推荐 |
|---|---|
| 个人项目 / 学习 | 简化的 GitHub Flow |
| 2-5 人小团队，做 Web | GitHub Flow |
| 2-5 人小团队，做库 / 桌面 | 简化版 Git Flow（main + dev + feature） |
| 大团队，有 CI/CD | GitHub Flow 或 Trunk-based |
| 严格版本化的产品 | 标准 Git Flow |

---

## 附录 A .gitignore 模板

直接复制到项目根目录的 `.gitignore` 文件里。

### A.1 通用模板

```gitignore
# ============ 操作系统 ============
.DS_Store              # macOS
Thumbs.db              # Windows
ehthumbs.db
Desktop.ini

# ============ IDE / 编辑器 ============
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea/                 # JetBrains
*.swp
*.swo
*.swn
*~                     # Vim

# ============ Node.js ============
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
.pnpm-store/
dist/
build/
.next/
.nuxt/
.cache/
coverage/
*.log

# ============ 环境变量 ============
.env
.env.local
.env.*.local
!.env.example

# ============ 测试 / 输出 ============
coverage/
*.lcov
.nyc_output/
junit.xml
playwright-report/
test-results/

# ============ 杂项 ============
*.bak
*.tmp
*.sw?
dist-package/
*.zip
!docs/**/*.zip
```

### A.2 各语言 / 框架补充

**Python**：

```gitignore
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
.venv/
env/
.pytest_cache/
.mypy_cache/
.ruff_cache/
```

**Java**：

```gitignore
*.class
*.jar
*.war
target/
.gradle/
build/
*.iml
.idea/
```

**Go**：

```gitignore
*.exe
*.dll
*.so
*.dylib
vendor/
go.sum    # 库项目保留；二进制项目忽略
```

**Rust**：

```gitignore
target/
Cargo.lock   # 库项目保留；二进制项目忽略
```

**前端（Vue/React/Angular 通用补充）**：

```gitignore
node_modules/
dist/
.cache/
.parcel-cache/
.eslintcache
.stylelintcache
*.local
```

### A.3 调试 .gitignore 不生效

```bash
# 看某个文件为什么被忽略
git check-ignore -v path/to/file

# 看哪些规则在生效
git check-ignore -v *
```

如果规则写错（比如多了空格），不会生效。

---

## 附录 B commit 规范（Conventional Commits）

### B.1 完整规范

来源：<https://www.conventionalcommits.org/zh-hans/>

**格式**：

```
<类型>(<作用域>): <简短说明>

<详细说明>

<页脚>
```

**类型（type）**：

| 类型 | 含义 |
|---|---|
| `feat` | 新功能 |
| `fix` | 修 bug |
| `docs` | 只改文档 |
| `style` | 格式调整（空格、分号等），不改逻辑 |
| `refactor` | 重构（既不是新功能也不是修 bug） |
| `perf` | 性能优化 |
| `test` | 加测试 / 改测试 |
| `build` | 构建系统、依赖 |
| `ci` | CI 配置 |
| `chore` | 杂事（不属以上） |
| `revert` | 撤销之前的 commit |

**作用域（scope）**：可选，标明影响范围。例：`feat(login): ...` `fix(api): ...`

**Breaking Change**：在不兼容的改动时，在 type 后加 `!`，或在 footer 写 `BREAKING CHANGE: ...`

### B.2 例子

```bash
# 简单
git commit -m "feat: 加登录页"

# 带作用域
git commit -m "feat(login): 加手机号验证码登录"

# 破坏性变更
git commit -m "feat(api)!: 重构用户 API，统一返回结构"

# 多行（写详细说明）
git commit -m "fix: 修复日期选择器跨年显示错误

旧版本在跨年夜显示为'去年'而不是'今年'。
原因是 Day.js 插件没正确加载。

Fixes #123"

# Breaking change 写在 footer
git commit -m "refactor: 重构 store

BREAKING CHANGE: zustand 从 v4 升级到 v5，API 有不兼容变化"
```

### B.3 工具链

**commitlint**：检查 commit message 格式

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional husky
npx husky init
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

**.cz-cli（commitizen）**：交互式生成规范 message

```bash
pnpm add -D commitizen cz-conventional-changelog
npx cz
```

**standard-version / release-please**：从 commit 自动生成 CHANGELOG + 版本号

```bash
pnpm add -D standard-version
npx standard-version    # 自动更新 version、打 tag、生成 CHANGELOG.md
```

### B.4 赛博算卦项目实战

```bash
git log --oneline
# 89fc9c2 (HEAD -> main, tag: v0.1.0, feat/qimen-dunjia) feat: 改一下奇门计算器
# 859756e chore: initial commit - 赛博算卦脚手架
```

两个 commit 都符合规范（`feat:` 和 `chore:`）。

---

## 附录 C 常见错误速查表

### C.1 提交相关

| 报错 / 现象 | 原因 | 解决 |
|---|---|---|
| `Please tell me who you are` | 没配用户名邮箱 | `git config --global user.email/name` |
| `nothing to commit, working tree clean` | 没改动 / 都 commit 了 | 检查改动 |
| 提交错了想撤 | 见第 8 章 | `git reset / revert` |
| `fatal: not a git repository` | 不在 git 目录里 | `cd` 到正确目录，或 `git init` |

### C.2 分支相关

| 报错 | 解决 |
|---|---|
| `The branch ... is not fully merged` | 用 `git branch -D` 强制删 |
| `The current branch X has no upstream branch` | `git push -u origin X` |
| 想撤销 `git checkout -b` 建的分支 | `git checkout main && git branch -D <误建分支>` |

### C.3 推送相关

| 报错 | 解决 |
|---|---|
| `[rejected] non-fast-forward` | 先 `git pull --rebase` 再 push |
| `Permission denied (publickey)` | SSH key 没配好，或没加到 Gitee/GitHub |
| `Could not resolve host gitee.com` | 网络问题 / DNS 问题 |
| `repository not found` | 远程地址错 / 没权限 |

### C.4 合并 / 冲突相关

| 报错 / 现象 | 解决 |
|---|---|
| `CONFLICT (...) Merge conflict` | 手动改冲突文件，再 `git add` + `git commit` |
| `Automatic merge failed` | 同上 |
| 想放弃合并 | `git merge --abort` |
| 想撤销 rebase | `git rebase --abort`（进行中）/ `git reflog` + `git reset`（已完成） |

### C.5 文件相关

| 现象 | 原因 | 解决 |
|---|---|---|
| 文件名乱码 | Windows + Git 默认编码不是 UTF-8 | `git config --global core.quotepath off` |
| `.gitignore` 不生效 | 之前已经 add 过 | `git rm --cached <file>` 再 add |
| `LF will be replaced by CRLF` 警告 | Windows 自动改换行 | 一般无害，要关可以 `git config core.autocrlf false` |
| 误删文件没 commit | 文件没进 Git 历史 | 只能靠备份 / IDE local history |

### C.6 网络 / 远程

| 现象 | 原因 | 解决 |
|---|---|---|
| `fatal: unable to access ...` | 网络 / 代理 | 配代理 `git config --global http.proxy ...` |
| Gitee 推不上去 | 没用 SSH / 密码错 | 配 SSH 或用 token |
| 远程 main 领先本地 | 别人 push 了 | `git pull --rebase` |

---

## 附录 D 一张图看懂 Git

### D.1 三大区域 + commit 流转

```
       工作区                   暂存区                本地仓库
   (Working Tree)          (Staging Area)          (Repository)
   ┌──────────────┐        ┌──────────┐           ┌──────────┐
   │  src/        │        │          │           │ C1 → C2  │
   │  README.md   │  git   │ 暂存清单 │  git      │  ↓       │
   │  package.json│ ─add─▶ │          │ ─commit─▶ │  HEAD    │
   │  ...         │        │          │           │          │
   └──────────────┘        └──────────┘           └──────────┘
         ▲                                            │
         │                                            │
         └──────────── git checkout ───────────────── ┘
```

### D.2 分支与提交的关系

```
* main          ──▶ 89fc9c2 ─┐
                              │  （main 没动，feat 领先）
  feat/qimen-dunjia ─▶ 12ab34│
                              │  merge 后：
                              ▼
* main          ──▶ 89fc9c2 ──▶ 12ab34 (Fast-forward)
  feat/qimen-dunjia ─▶ 12ab34/
```

```
* main          ──▶ 89fc9c2 ─┐
  │                           │
  └──▶ 67890ab ──┐            │   （main 和 feat 都往前走了）
                └──▶ 12ab34 ◀─┘
                       ↓
                  merge commit
                       ↓
* main          ──▶ 89fc9c2 ─▶ 67890ab ─┐
                                       ├──▶ M (merge commit)
                 feat/qimen-dunjia ─▶ 12ab34 ─┘
```

### D.3 远程协作全貌

```
   你（本地）                    远程（origin）
   ─────────                   ──────────
   main ─▶ A ─▶ B (本地最新)
                                  main ─▶ A (远程最新)

   git fetch     ←── 下载 ───
   main ─▶ A ─▶ B ─▶ C (C 是新的，远程领先)
                                  main ─▶ A ─▶ C

   git merge origin/main
   main ─▶ A ─▶ B ─▶ C ─▶ M (合并点)
                                  main ─▶ A ─▶ C

   git push     ─── 上传 ──▶
   main ─▶ A ─▶ B ─▶ C ─▶ M ─▶ D
                                  main ─▶ A ─▶ C ─▶ M ─▶ D
```

### D.4 救命循环图（任何时候都能从 reflog 恢复）

```
              ┌──────────────────────────────┐
              │                              │
              │      git reflog               │
              │   （30 天操作全记录）           │
              │                              │
              └──────────────────────────────┘
                          │
                          │  git reset --hard <hash>
                          ▼
                  回到任何历史状态
```

---

## 结语

Git 是个"学一次用一辈子"的工具。本文档涵盖了日常 90% 的场景，剩下 10% 临时查一下就行。

**三个最高频的口诀**：

1. **改完先 `git status`**：永远知道自己在什么状态
2. **三个区域要清楚**：工作区 → 暂存区 → 仓库
3. **救命的 `git reflog`**：就算 `reset --hard` 删错了也能找回来

**最后一条建议**：

> 多练。每学一个新命令，找个项目实操一遍，比看十遍文档记得牢。

---