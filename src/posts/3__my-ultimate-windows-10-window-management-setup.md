---
title: My Ultimate Windows 10 Window Management Setup
date: 2022-12-30T00:00:00-07:00
imageNameKey: win10wmsetup
---

# Background

I've always been disappointed with the default experience of managing application windows and searching (for files, open apps, anything really) in Windows 10. In general, I find that Windows isn't as keyboard driven as I'd like.

Below is a list of features I need from my graphical shell:

- Manipulate application windows and navigate virtual desktops using keyboard shortcuts
- Quickly switch between apps/windows using keyboard
- Search open windows using keyboard in a view with window previews
- Search files and launch applications quickly
- Automatically tile windows in order to keep things organized and make effective use of screen space
- Make it clear which application window is focused
- Reduce mouse movements as much as possible by having the mouse cursor automatically move according to focus events (ex. Alt-Tab)

I rely on a mix of built-in Windows settings and shortcuts as well as external programs and scripts to make this workflow possible for me on Windows 10/11. It took me some time to figure out how to piece all these things together into a coherent workflow, so I decided to document my steps in this post. Hopefully, you find the contents of this post useful. If not, at least I have this setup documented for myself.

# Built-in Settings/Shortcuts

These are a list of built-in Windows settings and keyboard shortcuts related to window management that I use on a daily basis.

## Basic window manipulation

`Win+Up` (may have to repeat again): Maximize window.
`Win+Down` (may have to repeat again): Minimize window.
`Alt+F4`: Close window.

Although there are built-in shortcuts for snapping windows to the left/right half of screen or quarters of a screen, I don't use them since I rely on FancyWM to perform these actions.

## Switch between virtual desktops

`Ctrl+Win+Left` : Switch to the previous virtual desktop.
`Ctrl+Win+Right`: Switch to the next virtual desktop.

`Win+Tab`: Open the virtual desktop switcher. I mainly use this to see which virtual desktops are empty and move to them. You can move to other desktops by clicking on them. Hit the shortcut again or hit `Esc` to exit out of this view.

{% image "./src/assets/media/win10wmsetup-desktop-switcher.png", "Virtual destkop switcher" %}
<!-- ![](win10wmsetup-desktop-switcher.png) -->

## Move window to next/previous monitor

`Shift+Win+Left`: Send window to the previous monitor.
`Shift+Win+Right`: Send window to the next monitor.

## Navigating elements within popups

`Tab`: Cycle to next element (ex. a button).
`Shift+Tab`: Cycle to the previous element (ex. a button).

Works not just in popups but in UAC prompts, notification tray, and many other UI elements.

## Open notification view

<u>Windows 10</u>:  `Win+A`: Open the notification tray.
<u>Windows 11</u>:  `Win+N`: Open the notification tray.

We can use the `Tab`/`Shift+Tab`  shortcuts from the above section to navigate the notification view. Hit `Shift+Tab` a few times after opening the view to get to the clear all notifications button. Then hit `Enter` to clear all notifications.

I find this trick is really useful when I'm using my 43" 4K monitor for work, since it's a pain to move the mouse to the other side of the screen just to clear notifications.

{% image "./src/assets/media/win10wmsetup-close-notifications-view.png", "Close notification view" %}
<!-- ![](win10wmsetup-close-notifications-view.png) -->

## Active window border highlight using accent color

Open Settings > Personalization > Colors. Pick a specific accent color or pick accent color automatically based on wallpaper. We need to have an accent color set since that will be the color the active window border is highlighted with.

{% image "./src/assets/media/win10wmsetup-personalization-settings-color.png", "Color settings" %}
<!-- ![](win10wmsetup-personalization-settings-color.png) -->

Here's what application windows look by default, without active window border highlight.

{% image "./src/assets/media/win10wmsetup-wt-focused-no-highlight.png", "Windows Termianl focused with active window border highlight off" %}
<!-- ![](win10wmsetup-wt-focused-no-highlight.png) -->

Windows terminal is the active window here. But it's really hard to tell that.

Now, here's what it looks like when active window border highlight is on. It's much more obvious that Windows Terminal is the focused window since the border is highlighted in red.

{% image "./src/assets/media/win10wmsetup-wt-focused-highlight.png", "Windows Terminal focused with active window border highlight on" %}
<!-- ![](win10wmsetup-wt-focused-highlight.png) -->

The built-in active window highlight does have some limitations though. Mainly, it doesn't seem to work on apps built with Electron.

## Switch between apps on task bar using keyboard

On each machine, I pin my 10 most used applications at the beginning of the taskbar. That way I can leverage the default shortcuts to switch to any of the first 10 pinned apps on the taskbar.

`Win+1`: Switch to first pinned app on the taskbar
`Win+2`: Switch to second pinned app on the taskbar
...
`Win+9`: Switch to the ninth pinned app on the taskbar
`Win+0`: Switch to the tenth pinned app on the taskbar

Here's an illustration from my taskbar. 

{% image "./src/assets/media/win10wmsetup-taskbar-switch.png", "Taskbar App Numbering" %}
<!-- [](win10wmsetup-taskbar-switch.png) -->

Now, these keyboard shortcuts have some interesting behaviour:

1. When a pinned app has no windows open, hitting the shortcut will launch the app in the current virtual desktop. In my example, if I hit `Win+0`, it would open Bitwarden in the current virtual desktop.
2. When a pinned app has a single window open and the window is not focused, hitting the shortcut will switch to the virtual desktop the window is on and will focus the window. If the window was minimized, it will be restored.
3. When a pinned app has a single window open and the window is focused, hitting the shortcut will minimize it.
4. When a pinned app has multiple windows open, hitting the shortcut will cycle through the windows of the application. Releasing the shortcut will switch to the selected window of the app.
	* Note: You can only cycle between windows of the application, you can't minimize/maximize any of the windows using the shortcut like you could when the app only had one window.

## Other keyboard shortcuts

I only listed my most used keyboard shortcuts in this article but you can find full list of them [here](https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec#WindowsVersion=Windows_10).

## Multitasking settings

Open `Settings > System > Multitasking`. I like to use the following settings. I especially rely on Alt+Tab showing windows from all virtual desktops. I personally don't find switching between Edge tabs in my OS to be a useful feature since I can do that from within Edge just fine.

{% image "./src/assets/media/win10wmsetup-multitasking-settings.png", "Windows Multi-tasking Settings" %}
<!-- ![](win10wmsetup-multitasking-settings.png) -->

## Improve Windows Search

Open `Settings > Search > Searching Windows`. Make sure Enhanced search is on, so Windows can find more files than by default.

{% image "./src/assets/media/win10wmsetup-windows-file-search-settings.png", "Windows File Search Settings" %}
<!-- ![](win10wmsetup-windows-file-search-settings.png) -->

# Third-Party Programs

For me, the built-in settings and behaviours of Windows aren't enough. To create the workflow for managing windows and searching files that I want, this is my list of essential programs as well as relevant configuration for them.

## Everything

Even with Enhanced Windows Search enabled, I sometimes can't find what I'm looking for. So I use [Everything](https://www.voidtools.com/) in those cases.

## PowerToys

[PowerToys](https://learn.microsoft.com/en-us/windows/powertoys/) is a collection of useful utilities that make Windows so much more useful. Here I will focus on the utilities and the settings for those utilities that are related to window management and searching.

In terms of general settings, I always run PowerToys as Admin, so I can use the utilities on admin windows.

{% image "./src/assets/media/win10wmsetup-powertoys-admin.png", "Run PowerToys as Admin" %}
<!-- ![](win10wmsetup-powertoys-admin.png) -->

### PowerToys Run

[PowerToys Run](https://learn.microsoft.com/en-us/windows/powertoys/run) is an application launcher for Windows. You can use it to search applications, open windows, files, do currency conversions, and much more. I like to think of it as a superpowered Windows search. I've been a user of application launchers across multiple platforms (Launchy, KRunner) for years now. I can't live without them anymore!

Here's some basic settings I enable for PowerToys Run:

{% image "./src/assets/media/win10wmsetup-powertoys-run-settings.png", "PowerToys Run Settings" %}
<!-- ![](win10wmsetup-powertoys-run-settings.png) -->

For built-in plugins, I disable `Web Search` and `OneNote`. I enable everything else. The `Visual Studio Code Workspaces` plugin is particularly handy for me.

I install an unofficial [Everything Plugin](https://github.com/lin-ycv/EverythingPowerToys/releases) for PowerToys run. The link will take you to the releases page which has the installation instructions. The only thing to note is that you need to extract the zip file using 7z instead the built-in archiver. Alternately, can install the plugin from [chocolatey](https://community.chocolatey.org/packages/everythingpowertoys).

After installing the plugin, restart PowerToys. Then enable the plugin and set a global activation key.

{% image "./src/assets/media/win10wmsetup-powertoys-run-everything.png", "PowerToys Run EveryThing Plugin Settings" %}
<!-- ![](win10wmsetup-powertoys-run-everything.png) -->

This is how I typically run searches using Everything. I rarely use the actual Everything application.

### FancyZones

[FancyZones](https://learn.microsoft.com/en-us/windows/powertoys/fancyzones) is a utility that extends the built-in window snapping/tiling features of Windows. You can specify custom zones that you can manually snap windows to using the mouse. By default, Windows can only snap windows to half or a quarter of the screen. But with FancyZones, you can create your own custom zones which you pre-define and then you snap to these zones.

I actually find the core functionality of FancyZones to be useless. It's too much work for me to manually snap windows using my mouse compared to using a tiling WM extension like FancyWM. But there is one useful thing that FancyZones does for me.

When using multiple monitors, by default Windows will open applications on the primary monitor, not the current active monitor. This drives me nuts since I always want apps to open on the monitor that has focus because that's where I usually need the application to be and that's also typically where my mouse cursor is. Without FancyZones and this specific setting enabled, I would always have to drag the window to the monitor that previously had focus if it wasn't the primary monitor which was a pain!

{% image "./src/assets/media/win10wmsetup-fancyzones-window-settings.png", "FancyZones Window Settings" %}
<!-- ![](win10wmsetup-fancyzones-window-settings.png) -->

I also like to make sure these settings for FancyZones are enabled to prevent dragging windows using mouse from activating FancyZones.

{% image "./src/assets/media/win10wmsetup-fancyzones-zone-settings.png", "FancyZones Zone Settings" %}
<!-- ![](win10wmsetup-fancyzones-zone-settings.png) -->

## Alt-Tab Terminator

[Alt-Tab Terminator](https://www.ntwind.com/software/alttabter.html) is a program that replaces the default Windows Alt+Tab view (which shows windows with small previews in a grid) with a list view that is searchable and has much larger window previews.

Here's a screenshot of the program running:

{% image "./src/assets/media/win10wmsetup-alt-tab-terminator.png", "Alt-Tab Terminator" %}
<!-- ![](win10wmsetup-alt-tab-terminator.png) -->

For me the app has a few killer features:
- Search and preview open applications (this is super useful when you have a lot of apps open)
- Ability to set a keyboard shortcut to cycle through windows of same application
	- By default Windows can't do this
	- On OSX/Linux typically this behaviour is bound to Alt + \`  by default

These are my preferred settings for this program:

{% image "./src/assets/media/win10wmsetup-alt-tab-terminator-settings-general.png", "Alt-Tab Terminator Settings: General" %}
<!-- ![](win10wmsetup-alt-tab-terminator-settings-general.png) -->

{% image "./src/assets/media/win10wmsetup-alt-tab-terminator-settings-appearance.png", "Alt-Tab Terminator Settings: Appearance" %}
<!-- ![](win10wmsetup-alt-tab-terminator-settings-appearance.png) -->

{% image "./src/assets/media/win10wmsetup-alt-tab-terminator-settings-hotkeys.png", "Alt-Tab Terminator Settings: HotKeys" %}
<!-- ![](win10wmsetup-alt-tab-terminator-settings-hotkeys.png) -->

As you can see, I don't actually use Alt+Tab Terminator to replace Alt+Tab. In general, I only use Alt+Tab to switch between the current window and previously focused window. The default Alt+Tab is fine for that. Beyond that, I typically switch between my most common applications using `Win + Number` shortcuts. I use Alt+Tab Terminator only to switch to applications that I can't switch to using `Win + Number` . I launch Alt-Tab Terminator by using a custom keyboard shortcut `CapsLock + Tab`. This keyboard shortcut invokes Alt-Tab Terminator by invoking it's exe directly (see kanata section for more details). I don't use Alt+Tab Terminator to replace `Win + Tab`  since the virtual desktop preview is pretty useful for me.

## FancyWM

[FancyWM](https://apps.microsoft.com/store/detail/fancywm-dynamic-tiling-window-manager/9P1741LKHQS9?hl=en-us&gl=us) is a tiling window manager extension for the Windows Desktop. It doesn't replace the built-in Window Manager, it simply hooks into it and provides tiling capabilities over it. It's similar in concept to [Pop Shell](https://github.com/pop-os/shell), [Bismuth](https://github.com/Bismuth-Forge/bismuth), or [yabai](https://github.com/koekeishiya/yabai).

I personally find a tiling window manager to be really useful. It helps me keeps my application windows organized and lets me navigate open windows easily with the keyboard. When using a laptop, I don't have to use the trackpad as much to get around. When using a large 4K monitor, it lets me create layouts on the fly to effectively use all that space without getting eye strain or having to use the mouse too much.

There are a lot of other projects out there trying to bring tiling window manager capabilities to the Windows Desktop. But I found those projects were either unstable, hard to configure, hard to use, or didn't integrate well with Windows.

These are the things I really like about FancyWM:
- Easy to install (just grab it from the MS Store)
- Easy to use
	- Almost no configuration required
	- Don't need to remember complicated keyboard shortcuts to start using it
		- FancyWM uses an activation key sequence (default `Shift+Win` ) from which you then type in another keyboard shortcut to perform some action. If you haven't typed another shortcut after hitting the activation sequence, a menu with all available shortcuts will popup making it so you don't really need to memorize anything to start using FancyWM.
- It only tiles restored windows
	- FancyWM doesn't tile maximized windows so you can use the entire screen when the situation calls for it
	- When the window is restored (ie. unmaximized), FancyWM will then automatically tile it
- Can manipulate tiled windows with both mouse and keyboard shortcuts
	- Can resize and move Windows around using mouse and they will still be automatically tiled.
	- Can even move around entire panels using mouse (I think this is the only way, I haven't found keyboard shortcut for it).
- Integrates with native Windows Virtual Desktops
	- Other tiling WM projects for Windows try to create their own "workspace" functionality outside of native virtual desktops and that has never worked well for me. The built-in virtual desktop implementation in Windows is fine, I just need more keyboard shortcuts to work with them than what comes baked into Windows (which FancyWM does deliver).
	
Here's a short demo of FancyWM. These are the features of FancyWM I'm showing (all using keyboard shortcuts):
- Split panel horizontally or vertically
- Stack windows in same panel
- Focus windows in a direction
- Move and swap windows in a direction
- Resize windows
- Temporarily float windows

<iframe width="1123" height="631" src="https://www.youtube.com/embed/nNFbUpHJmG4" title="win10wmsetup fancywm demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<!-- ![](win10wmsetup-fancywm-demo.gif) -->

Now here's another demo of FancyWM focusing on handling of virtual desktops. I'm demoing the following features (all using keyboard shortcuts):
- Focus specific virtual desktop by number (`Shift+Win`  followed by `Number` after short delay)
	- This shortcuts seems to even work in the Virtual Desktop Switcher
- Move window to specific virtual desktop by number (`Shift+Win`  followed by `Shift+Number` after short delay)
- Focus previous virtual desktop (`Shift+Win`  followed by `Q` after short delay)
	- This shortcuts seems to even work in the Virtual Desktop Switcher
- Move window to previous virtual desktop (`Shift+Win`  followed by `Shift+Q` after short delay)


<!-- ![](win10wmsetup-fancywm-virtual-desktops-demo.gif) -->

FancyWM has a lot of other cool features that I haven't gone into (ex. moving window to specific monitor number, etc.) and new features are added regularly.

While the activation sequence makes FancyWM very user friendly, it also introduces a lot of extra keystrokes everytime you need to do something. Luckily, FancyWM has the capability to call it's executable directly to perform these actions. To focus to the window on the left you can use this command in a shell: `cmd fancywm.exe --action MoveFocusLeft`. Then, you can use a keyboard remapping software like AutoHotKey or kanata to bind these commands to custom keyboard shortcuts.

## Kanata

[kanata](https://github.com/jtroo/kanata) is an advanced keyboard remapping software that allows you to segment your keyboard into several "layers" of functionality and to perform different actions depending on how you press a key (tapping a key versus holding a key can perform two different actions). You can set up your keyboard so that holding a specific key will activate a new layer on your keyboard where keys will behave differently than on your default layer.

Here's an example. When you're typing normally the default layer is active. In this case, when you type `n`, it will output 'n' as normal. Say you hold `Tab` and while it's held you enter another layer. In this layer, when you hit `n` instead of outputting 'n' you output `Ctrl+Win+Left` which is the keyboard shortcut for moving to the virtual desktop on the left.

My main use of kanata is to create a navigation layer that is activated while I hold the `Tab` key. When I press any other key while holding tab, it will execute a navigation command (usually a call to `fancywm.exe`). This way, I can directionally focus and move windows without using the FancyWM activation sequence which saves me a lot of keystrokes.

Why use kanata for this purpose over AutoHotKey (or some other software)?
1. Setting up layers on the keyboard and doing different actions based on tapping vs holding a key is much easier in kanata than AutoHotKey.
	1. My kanata config for remapping keys is significantly shorter and more powerful than the AutoHotKey script I previously used for the same purpose.
2. kanata supports remapping your keyboard at a much lower level than AutoHotKey and similar software. kanata has an alternate implementation in windows (`kanata_wintercept.exe`)  that uses the [interception](http://www.oblita.com/interception) kernel driver to remap keys. This allows you to remap keys from admin programs without running kanata as admin and to use it in places where AutoHotKey or the regular kanata implementation (`kanata.exe`) wouldn't work such as the login screen.

To install kanata, download `kanata_cmd_allowed.exe` and `kanata_wintercept_cmd_allowed.exe` from the [releases](https://github.com/jtroo/kanata/releases) page and download it somewhere on your computer. I stick with the latest stable release. 

Here's my full kanata config file:

<u>kanata.kbd</u>:

```
;;Layer template
;;(deflayer name
;;  _    _    _    _    _    _    _    _    _    _    _    _    _          _    _    _
;;  _    _    _    _    _    _    _    _    _    _    _    _    _    _     _    _    _
;;  _    _    _    _    _    _    _    _    _    _    _    _    _    _     _    _    _
;;  _    _    _    _    _    _    _    _    _    _    _    _    _          _
;;  _    _    _    _    _    _    _    _    _    _    _    _                    _
;;  _    _    _              _              _    _    _    _               _    _    _
;;)

(defcfg
  process-unmapped-keys yes
  danger-enable-cmd yes
)

(defsrc
  esc  f1   f2   f3   f4   f5   f6   f7   f8   f9   f10  f11  f12        ssrq slck pause
  grv  1    2    3    4    5    6    7    8    9    0    -    =    bspc  ins  home pgup
  tab  q    w    e    r    t    y    u    i    o    p    [    ]    \     del  end  pgdn
  caps a    s    d    f    g    h    j    k    l    ;    '    ret        prnt
  lsft z    x    c    v    b    n    m    ,    .    /    rsft                 up
  lctl lmet lalt           spc            ralt rmet cmp  rctl            left down rght
)

(defalias
  lprn S-9
  rprn S-0
  * S-8
  + S-=
  cap (tap-hold-press 200 200 esc (layer-while-held modal))
  tab (tap-hold-press 200 200 tab (layer-while-held nav))
  grv (tap-hold-press 200 200 grv (layer-while-held numbers))
  lsft (tap-hold-press 200 200 @lprn lsft)
  rsft (tap-hold-press 200 200 @rprn lsft)
  kw A-f4
  vdp C-M-lft
  vdn C-M-rght
  ptr C-A-S-M-spc
  lsm C-esc

  ;; Alt-Tab Terminator
  ;; Note: C:\Program Files\Alt-Tab Terminator needs to be in System Path for this to run
  ;; att (cmd AltTabTer.exe) ;; Doesn't work: https://github.com/jtroo/kanata/issues/234
  att (cmd cmd.exe /c AltTabTer.exe)

  ;; FancyWM bindings
  ;; Note: need to run kanata as admin if FancyWM run as admin
  fwfl (cmd fancywm.exe --action MoveFocusLeft)
  fwfd (cmd fancywm.exe --action MoveFocusDown)
  fwfu (cmd fancywm.exe --action MoveFocusUp)
  fwfr (cmd fancywm.exe --action MoveFocusRight)
  fwml (cmd fancywm.exe --action MoveLeft)
  fwmd (cmd fancywm.exe --action MoveDown)
  fwmu (cmd fancywm.exe --action MoveUp)
  fwmr (cmd fancywm.exe --action MoveRight)
  fwpu (cmd fancywm.exe --action PullWindowUp)
  fwhp (cmd fancywm.exe --action CreateHorizontalPanel)
  fwvp (cmd fancywm.exe --action CreateVerticalPanel)
  fwtf (cmd fancywm.exe --action ToggleFloatingMode)
  fwtm (cmd fancywm.exe --action ToggleManager)
  fwrw (cmd fancywm.exe --action RefreshWorkspace)
  fwsp (cmd fancywm.exe --action CreateStackPanel)
  fwd1 (tap-dance 200 ((cmd fancywm.exe --action SwitchToDesktop1) (cmd fancywm.exe --action MoveToDesktop1)))
  fwd2 (tap-dance 200 ((cmd fancywm.exe --action SwitchToDesktop2) (cmd fancywm.exe --action MoveToDesktop2)))
  fwd3 (tap-dance 200 ((cmd fancywm.exe --action SwitchToDesktop3) (cmd fancywm.exe --action MoveToDesktop3)))
  fwd4 (tap-dance 200 ((cmd fancywm.exe --action SwitchToDesktop4) (cmd fancywm.exe --action MoveToDesktop4)))
  fwd5 (tap-dance 200 ((cmd fancywm.exe --action SwitchToDesktop5) (cmd fancywm.exe --action MoveToDesktop5)))
  fwd6 (tap-dance 200 ((cmd fancywm.exe --action SwitchToDesktop6) (cmd fancywm.exe --action MoveToDesktop6)))
  fwd7 (tap-dance 200 ((cmd fancywm.exe --action SwitchToDesktop7) (cmd fancywm.exe --action MoveToDesktop7)))
  fwd8 (tap-dance 200 ((cmd fancywm.exe --action SwitchToDesktop8) (cmd fancywm.exe --action MoveToDesktop8)))
  fwd9 (tap-dance 200 ((cmd fancywm.exe --action SwitchToDesktop9) (cmd fancywm.exe --action MoveToDesktop9)))
)

(deflayer default
  _    _    _    _    _    _    _    _    _    _    _    _    _          _    _    _
  @grv    _    _    _    _    _    _    _    _    _    _    _    _    _     XX   _    _
  @tab    _    _    _    _    _    _    _    _    _    _    _    _    _     _    _    _
  @cap    _    _    _    _    _    _    _    _    _    _    _    _       @ptr
  @lsft    _    _    _    _    _    _    _    _    _    _    @rsft                    _
  _    _    _              _              _    _    @ptr    _               _    _    _
)

(deflayer modal
  _    _    _    _    _    _    _    _    _    _    _    _    _          _    _    _
  _    _    _    _    _    _    _    _    _    _    _    _    _    _     lrld    _    _
  @att    _    @kw    _    _    _    home    pgdn    pgup    end    _    mlft    mrgt    _     _    _    _
  _    lmet    lalt    lsft    lctl    @lsm    lft    down    up    rght    _    _    _    _
  _    _    _    _    _    _    -    _    _    _    _    _                    _
  _    _    _              @ptr              _    _    _    _               _    _    _
)

(deflayer nav
  _    _    _    _    _    _    _    _    _    _    _    _    _          _    _    _
  _    @fwd1    @fwd2    @fwd3    @fwd4    @fwd5    @fwd6    @fwd7    @fwd8    @fwd9    _    _    _    _     _    _    _
  XX    _    _    _    @fwrw    @fwtf    @fwml    @fwmd    @fwmu    @fwmr    _    _    _    _     _    _    _
  _    _    _    _    _    _    @fwfl    @fwfd    @fwfu    @fwfr    _    _    _          _
  _    _    _    _    @fwtm    @vdp    @vdn    @fwpu    @fwhp    @fwvp    @fwsp    _                    _
  _    _    _              _              _    _    _    _               _    _    _
)

(deflayer numbers
  _    _    _    _    _    _    _    _    _    _    _    _    _          _    _    _
  _    _    _    _    _    _    _    7    8    9    _    _    _    _     _    _    _
  _    _    _    _    _    _    _    4    5    6    @+    _    _    _     _    _    _
  _    _    _    _    _    _    _    1    2    3    -    ret    _          _
  _    _    _    _    _    _    _    0    .    @*    /    _                    _
  _    _    _              _              _    _    _    _               _    _    _
)
```

In addition to the navigation layer behaviour described above, there are some other interesting things we can do with this kanata configuration. When typing normally (in the default layer) if you tap `CapsLock` it will send `Esc`. If you hold `CapsLock` and/or hit another key, you will enter the modal layer. The modal layer will be active as long as `CapsLock` is held. In the modal layer, `CapsLock+Tab` will open Alt-Tab Terminator. `CapsLock+h` will send left arrow. `CapsLock+df` will send `Ctrl+Shift`.  Hold `CapsLock+df` with one hand and then hold `h`  and this essentially sends `Ctrl+Shift+Left(hold)` which is the standard shortcut for selecting text to the left. These remaps in the modal layer essentially allow me to navigate text using vim-like bindings in any application!

Holding the backtick key will activate the numbers layer and the layer will be active while the backtick key is held. When in the numbers layer, typing certain keys will send numbers instead of the keys (ex. `k` sends `2`). This effectively allows you to get numpad-like functionality on keyboards without it (ex. laptop keyboard).

To use this kanata configuration, save the above config file in the same location that you store that kanata executables. Then you can run kanata with this custom config:

```
.\kanata_cmd_allowed.exe --cfg kanata.kbd
```

Or if you want to use the interception driver instead of the default keyboard hook mechanism:

```
.\kanata_wintercept_cmd_allowed.exe --cfg kanata.kbd
```

To automatically start kanata at startup, you can use the [Windows Task Scheduler](https://github.com/jtroo/kanata/discussions/193#discussioncomment-4499387).

## AutoHotKey

[AutoHotKey](https://www.autohotkey.com/) is a scripting language to automate things in Windows.

When installing AutoHotKey, make sure the circled option is checked since it will allow AutoHotKey scripts to handle programs running as Admin.

{% image "./src/assets/media/win10wmsetup-autohotkey-install.png", "AutoHotkey Installation" %}
<!-- ![](win10wmsetup-autohotkey-install.png) -->

### Mouse Follows Focus

This is an AutoHotKey script that automatically centers the mouse on a newly focused window that was focused due to a keyboard shortcut (ex. `Alt-Tab`, `Win+Number`). Focus events that were caused by mouse movements will not change mouse position.

<u>mouse_follows_focus.ahk</u>:
```
; Makes the mouse cursor follow window focus, but ONLY if the focus change
; wasn't caused by the mouse - e.g. Alt-Tab, Win+<Number>, hotkeys, ...
; Saves a lot of mousing around on multi-monitor setups!
; Source: https://gist.githubusercontent.com/bladeSk/9feeeb6c2ba9939faa3c88cc9133700c/raw/cabc86477ca9bc23856cf84146ecc55eda74ff32/mouse%2520cursor%2520follows%2520focus.ahk

#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
#UseHook
#InstallKeybdHook
#SingleInstance force

Gui +LastFound 

lastMouseClickTime := 0
hWnd := WinExist()

DllCall("RegisterShellHookWindow", UInt, hWnd)
msgNum := DllCall("RegisterWindowMessage", Str, "SHELLHOOK")
OnMessage(msgNum, "OnShellMessage")
OnMessage(WM_MOUSEMOVE:=0x0201, "OnMouseDown")
Return

OnShellMessage( wParam, lParam )
{
	global
	; HSHELL_WINDOWACTIVATED | HSHELL_RUDEAPPACTIVATED
	If (wParam = 4 or wParam = 32772) {
		; ignore when dragging
		GetKeyState, mouseDown, LButton
		if (mouseDown <> "D" and A_TickCount - lastMouseClickTime > 500) {
			; delay a tiny bit to ignore taskbar focus on Win+Number switching
			Sleep, 200
			CoordMode, Mouse, Screen
			WinGetPos, wx, wy, width, height, A
			WinGet, processName, ProcessName, A

			; these processes send a lot of focus events and thus behave weirdly
			if (processName != "steam.exe")
			{
				; puts the cursor in middle of the active window, tweak to your needs
				mx := Round(wx + width * 0.50)
				my := Round(wy + height * 0.50)

				DllCall("SetCursorPos", int, mx, int, my)
			}
		}
	}
}

*~LButton::
	lastMouseClickTime := A_TickCount
Return

*~RButton::
	lastMouseClickTime := A_TickCount
Return

*~MButton::
	lastMouseClickTime := A_TickCount
Return
```

Below is a demonstration of the default Windows behaviour when switching between application windows using keyboard shortcuts (in this case, `Win+Number`). You can see that the focused window changes but the mouse cursor still stays at the same position.

<!-- ![](win10wmsetup-mff-off.gif) -->

Below is a demonstration of 'Mouse Follows Focus'. Now when I switch windows using keyboard shortcuts, the mouse cursor is automatically moved to the center of the newly focused window. This is especially useful when working with multi-monitor setups, since you can avoid having to physically drag your mouse to move the cursor to another monitor when the focused window changes via keyboard. But I also like this when working on a laptop on the couch since I don't have to use the trackpad so much.

<!-- ![](win10wmsetup-mff-on.gif) -->

### Handling admin windows with AutoHotKey

AutoHotKey scripts won't work on Admin windows by default. Need to follow this [guide](https://stackoverflow.com/a/68855449) to be able to make an AutoHotKey script handle Admin windows without running it as admin. 

### Running AutoHotKey script on startup

I also use the Windows Task Scheduler to run `mouse_follows_focus.ahk` on startup. Alternately, you could make a shortcut to your script and then place it in `shell:startup`.

# Problems

## When mouse cursor follows focus, sometimes mouse cursor is focused on the taskbar instead of an application window

When window focus events are invoked, it seems that Windows will switch focus to the taskbar and then focus on the actual window. The script adds a short delay to compensate for this but sometimes it's not enough, so you end up in a situation where the mouse cursor is still on the taskbar and hasn't moved to the application window (as shown below).

<!-- ![](win10wmsetup-mff-at-taskbar.gif) -->

Usually hitting Alt+Tab once or twice would help to recenter the mouse.

# Conclusion

Although it took a bit of time to set this all up, I'm really happy with the result. I find I'm now much more productive in Windows.