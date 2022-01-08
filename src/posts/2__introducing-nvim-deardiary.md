---
title: Introducing nvim-deardiary
date: 2021-02-07T00:00:00-08:00
tags:
    - neovim
    - lua
    - nvim-deardiary
---

I've been working on a Neovim plugin written in Lua for a while now called
[nvim-deardiary](https://github.com/ishchow/nvim-deardiary). I've been using it
regularly over the past month or so and I think it's now in a good enough state
to release.

## Motivation

I used to use [vimwiki](https://github.com/vimwiki/vimwiki) which is
a very popular vim plugin that lets you manage a number of personal wikis.
I never actually used the wiki functionality but it did have one cool feature
that lets you keep a daily journal per wiki using a few simple key bindings.
However, I found vimwiki to be lacking in several ways:

1. Journal entries can only be kept per day. I often like having entries per week as
   well and I didn't find a built in way to do weekly entries in vimwiki.
1. Flat file structure. Vimwiki keeps entries in "YYYY-MM-DD" format under
   a single directory but I found it hard to navigate in the filesystem since
   there can be many files. Over years, the directory could have thousands of
   files which I didn't like the thought of. I prefer a nested structure like
   "YYYY/MM/DD" to keep entries organized when I need to look at them
   directly. Typically, I use fuzzy finders to search through my wiki so having
   an index file of all the entries in one directory was unnecessary for me.
1. No built-in way to template journal entries. I often like all entries in
   a journal to have a standard format and there wasn't a built-in way to
   do templating with vimwiki. It's possible to do it but it requires using
   python/bash scripts and some autocommands. It worked but it always felt like
   a hack.
1. Vimwiki was too big of a plugin for my taste. The plugin has so many features
   and I spent a lot of time configuring it to work with markdown. I didn't like
   how vimwiki provides it's own filetype even when using the markdown mode
   since it caused conflicts with other plugins.

Ultimately, I didn't really need a wiki just a journaling plugin so I decided to
create my own.

## Project Overview

nvim-deardiary has the following features:

- Manage multiple journals
- Set different frequencies of entries per journal (ex. daily, weekly)
- Custom frequencies of journal entries (ex. can add quarterly frequencies)
- Control filesystem paths of new entries
- Templating of new entires

Note: Neovim 0.5+ is a requirement since the plugin is written in Lua and uses
apis that may not be present in 0.4.4 or earlier.

Visit the [repo](https://github.com/ishchow/nvim-deardiary) to learn how to
install, configure, and use the plugin. Please open an issue for bugs and
feature requests.

An example of an advanced configuration can be found in my
[dotfiles](https://github.com/ishchow/dotfiles/blob/master/.config/nvim/lua/diary.lua).

## Design Decisions

Since plugins for Neovim nightly can be created in either Lua or Vimscript,
I had to seriously evaluate between these two options for creating my plugin.
I went with Lua since it had several advantages over Vimscript for 
my use case:

1. A simple, one file [datetime library](https://tieske.github.io/date/) that
   I could vendor with my plugin. This library had all the datetime manipulation
   methods I needed. I couldn't find an alternative in Vimscript, at least not
   one with documentation as thorough as this Lua library.
1. Unit testing using [busted](https://olivinelabs.com/busted/). busted is
   a pretty fully featured unit testing library in Lua. It comes with all the
   basics you can expect in a unit testing library and it's very ergonomic.
   I didn't know if Vimscript has an equivalent to busted or if I did find them,
   I couldn't figure out how to use them.
1. Access to [luarocks](https://luarocks.org/). My plugin doesn't need luarocks
   to function since the datetime library is actually contained with the plugin
   source. However, access to luarocks was invaluable for testing since I could
   access filesystem and path manipulation libraries. Using 
   [penlight](https://stevedonovan.github.io/Penlight/api/index.html), I could 
   create mocks of any neovim apis that I used which allowed me to unit test my 
   plugin easily. It's super useful for running tests in CI without actually building
   Neovim and using its plugin infrastructure to test your plugin. Although
   that method of plugin testing was overkill for me, it is a perfectly viable
   option for some use cases as described in this 
   [blog post](https://github.com/KillTheMule/KillTheMule.github.io/blob/master/test_plugins_from_neovim.md).
1. Clean and easy syntax. This point is purely subjective but I found Lua to be
   more approachable as a programming language than Vimscript. Vimscript is nice
   for configuring Neovim/Vim but I liked the idea of writing something in Lua 
   much more than Vimscript.

I'm very happy with my choice of writing the plugin in Lua. Inspired by popular 
Lua plugins, I chose to expose configuration of journal
[frequencies](https://github.com/ishchow/nvim-deardiary/blob/main/lua/deardiary/config.lua)
using callbacks since this provides a lot of flexbility for configuration. Ever
since [packer.nvim](https://github.com/wbthomason/packer.nvim) got luarocks
support I've been using [penlight
templating](https://stevedonovan.github.io/Penlight/api/libraries/pl.template.html)
to template journal entries in my dotfiles. No need for the python scripts I 
used before with vimiwki. Overall, writing the plugin in Lua was rewarding 
experience. I could never imagine myself writing a plugin for Neovim before.
I'm very excited for the future of Neovim and it's plugin
ecosystem.
