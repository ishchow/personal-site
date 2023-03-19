---
title: Pull ssh key from password manager if it doesn't already exist using chezmoi
date: 2023-03-19T00:00:00Z
tags:
    - dotfiles
    - chezmoi
---

# Background

I've been using chezmoi for a few years now to manage my dotfiles across both Windows and Linux. One really useful feature of chezmoi is that it can integrate with [password managers](https://www.chezmoi.io/user-guide/password-managers/). This is useful to pull down secrets, SSH keys, GPG keys, etc.

Here's a naive way to pull down an ssh key from a password manager using chezmoi. I'm grabbing the ssh key from an attachment to a bitwarden entry.

<u>private_dot_ssh/id_rsa.tmpl</u>:

```
{{- (bitwardenAttachment "id_rsa" "feb3d011-094e-4749-9cfb-ac22004ff685") -}}
```

Run `chezmoi apply` and this will pull your SSH key from bitwarden and copy it's contents to `~/.ssh/id_rsa`.

But now the problem is that everytime you run `chezmoi apply` this template will execute which means chezmoi will connect to bitwarden, pull down ssh key, and replace contents of `~/.ssh/id_rsa` with downloaded ssh key everytime you make a change to your dotifles. Even unrelated changes. This makes applying changes take much longer.

The contents of your ssh keys don't change very frequently, so it would be nice to not have to connect to bitwarden everytime.

# Solution

Here's a fixed version of the template that will only connect to bitwarden and replace contents of file with downloaded ssh key if it doesn't already exist. If the ssh key already exists on the filesystem, then it will replace contents of the ssh key with what is already in the filesystem.

<u>private_dot_ssh/id_rsa.tmpl</u>:

```
{{- if (joinPath .chezmoi.homeDir ".ssh" "id_rsa" | lstat) -}}
{{- include (joinPath .chezmoi.homeDir ".ssh" "id_rsa") -}}
{{- else -}}
{{- (bitwardenAttachment "id_rsa" "feb3d011-094e-4749-9cfb-ac22004ff685") -}}
{{- end -}}
```

I think this will technically always modify the file due to the way chezmoi's templating works. The contents won't actually change but the last write time probably will. So, this is kind of a hack but works well enough for me.
