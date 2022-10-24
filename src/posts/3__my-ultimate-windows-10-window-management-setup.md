---
title: My Ultimate Windows 10 Window Management Setup
date: 2022-10-23T00:00:00-07:00
imageNameKey: win10wmsetup
---

# Background

I've always been disappointed with the default experience of managing application windows and searching (for files, open apps, anything really) in the Windows 10.

Below is a list of features I need from my graphical shell:

- Manipulate application windows and navigate virtual desktops using keyboard shortcuts
- Quickly switch between apps/windows using keyboard
- Search open windows in a view with large window previews
- Search files and launch applications quickly and reliably
- Automatically tile windows in order to keep things organized and make effective use of screen space
- Make it clear which application window has focus
- Reduce mouse movements as much as possible

I rely on a mix of default settings and shortcuts as well as external programs and scripts to make this workflow possible for me on Windows 10/11. It took me some time to figure out how to piece all these things together, so I decided to document how I created this workflow in this post. Hopefully, you find some of these settings/programs/scripts useful. If not, well at least I have this setup documented for myself.

# Built-in Settings/Shortcuts

These are a list of built-in Windows settings and keyboard shortcuts, related to window management, that I use on a daily basis.

## Basic window manipulation

`Win+Up` (may have to repeat again): Maximize window.
`Win+Down` (may have to repeat again): Minimize window.
`Alt+F4`: Close window.

Although there are shortcuts for tiling windows to the left/right half of screen or quarters of a screen, I don't use them since I rely on FancyWM to perform these actions.

## Switch between virtual desktops

`Ctrl+Win+Left` : Switch to the previous virtual desktop.
`Ctrl+Win+Right`: Switch to the next virtual desktop.
Note: You don't need to be in the task switcher view to switch desktops.

`Win+Tab` -> Open the virtual desktop switcher. I mainly use this to see which virtual desktops are empty and move to them. You can move to other desktops by clicking on them. Hit the shortcut again or hit `Esc` to exit out of this view.

![](win10wmsetup-desktop-switcher.png)

## Move window to next/previous monitor

`Shift+Win+Left`: Send window to the previous monitor.
`Shift+Win+Right`: Send window to the next monitor.

## Navigating elements within popups

`Tab`: Cycle to next element (ex. a button).
`Shift+Tab`: Cycle to the previous element (ex. a button).

Works not just in popups but in UAC prompts, notification tray, and many other UI elements.

## Open notification view

`Win+A`: Open the notification tray.

We can use the `Tab`/`Shift+Tab`  shortcuts from the above section to navigate the notification view. Hit `Shift+Tab` a few times after opening the view to get to the clear all notifications button. Then hit `Enter` to clear all notifications.

I find this technique to clear the notifications from my tray invaluable when I'm using my 43" 4K monitor for work, since it's a pain to move the mouse to the other side of the screen just to clear notifications.

![](win10wmsetup-close-notifications-view.png)

## Active window border highlight using accent color

Open Settings > Personalization > Colors. Pick a specific accent color or pick accent color automatically based on wallpaper. We need to have an accent color set since that will be the color the active window border is highlighted with.

![](win10wmsetup-personalization-settings-color.png)

Here's what application windows look by default, without active window border highlight.

![](win10wmsetup-wt-focused-no-highlight.png)

Windows terminal is the active window here. But it's really hard to tell that.

Now, here's what it looks like when active window border highlight is on. It's much more obvious that Windows Terminal is the focused window.

![](win10wmsetup-wt-focused-highlight.png)

The active window highlight built in to windows does have some limitations. It doesn't seem to work on apps built with Electron.

## Switch between apps on task bar using keyboard

On each machine, I pin my 10 most used applications at the beginning of the taskbar. That way I can leverage the default shortcuts to switch to any of the first 10 pinned apps on the taskbar.

`Win+1`: Switch to first pinned app on the taskbar
`Win+2`: Switch to second pinned app on the taskbar
...
`Win+9`: Switch to the ninth pinned app on the taskbar
`Win+0`: Switch to the tenth pinned app on the taskbar

Here's an illustration from my taskbar. 

![](win10wmsetup-taskbar-switch.png)

Now, these keyboard shortcuts has some interesting behaviour:

1. When a pinned app has no windows open, hitting the shortcut will launch the app in the current virtual desktop. In my example, if I hit `Win+0`, it would open Bitwarden in the current virtual desktop.
2. When a pinned app has a single window open and the window is not focused, hitting the shortcut will switch to the virtual desktop the window is on and will focus the window. If the window was minimized, it will be restored.
3. When a pinned app has a single window open and the window is focused, hitting the shortcut will minimize it in the current virtual desktop.
4. When a pinned app has multiple windows open, hitting the shortcut will cycle through the windows of the application. Releasing the shortcut will switch to the selected window of the app.
	* Note: You can only cycle between windows of the application, you can't minimize/maximize any of the windows using the shortcut like you could when the app only had one window.

## Multitasking settings

Open `Settings > System > Multitasking`. I like to use the following settings. I especially rely on Alt+Tab showing only open windows and to show windows from all virtual desktops. I personally don't find switching between Edge tabs in my OS to be a useful feature since I can do that from within Edge just fine.

![](win10wmsetup-multitasking-settings.png)

## Improve Windows Search

Open `Settings > Search > Searching Windows`. Make sure Enhanced search is on, so Windows can find more files than by default.

![](win10wmsetup-windows-file-search-settings.png)

# Third-Party Programs

For me, the built-in settings and behaviours of Windows aren't enough. To create the workflow for managing windows and searching files that I want, this is my list of essential programs as well as relevant configuration for them.

## Everything

Even with Enhanced Windows Search enabled, I sometimes can't find what I'm looking for. So I use [Everything](https://www.voidtools.com/) in those cases.

## PowerToys

[PowerToys](https://learn.microsoft.com/en-us/windows/powertoys/) is a collection of useful utilities that make Windows so much more useful. Here I will focus on the utilities and the settings for those utilities that are related to window management and searching.

In terms of general settings, I always run PowerToys as Admin, so I can use the utilities on admin windows.

![](win10wmsetup-powertoys-admin.png)

### PowerToys Run

[PowerToys Run](https://learn.microsoft.com/en-us/windows/powertoys/run) is an application launcher for Windows. You can use it to search applications, open windows, files, do currency conversions, and much more. I like to think of it as a superpowered Windows search. I've been a user of application launchers across multiple platforms (Launchy, KRunner) for years now. I can't live without them anymore!

Here's some basic settings I enable for PowerToys Run:

![](win10wmsetup-powertoys-run-settings.png)

For built-in plugins, I disable `Web Search` and `OneNote`. I enable everything else. The `Visual Studio Code Workspaces` plugin is particularly handy for me!

I install an unofficial [Everything Plugin](https://github.com/lin-ycv/EverythingPowerToys/releases) for PowerToys run. The link will take you to the releases page which has the installation instructions. The only thing to note is that you need to extract the zip file using 7z instead the built-in archiver.

After installing the plugin, restart PowerToys. Then enable the plugin and set a global activation key.

![](win10wmsetup-powertoys-run-everything.png)

This is how I typically run searches using Everything. I rarely use the actual Everything application.

### FancyZones

[FancyZones](https://learn.microsoft.com/en-us/windows/powertoys/fancyzones) is a utility that extends the built-in window snapping/tiling features of Windows. You can specify custom zones that you can manually snap windows to using the mouse. By default, Windows can only snap windows to half or a quarter of the screen. But with FancyZones, you can create your own custom zones which you pre-define and then you snap to these zones.

I actually find the core functionality of FancyZones to be useless. It's too much work for me to manually snap windows using my mouse compared to using a tiling WM extension like FancyWM. Also, FancyWM can stack multiple windows in the same panel while FancyZones can't stack multiple windows in the same zone.

![](win10wmsetup-fancyzones-window-settings.png)

When using multiple monitors, by default Windows will open applications on the primary monitor, not the current active monitor. This drives me nuts since I always want apps to open on the monitor that has focus because that's where I usually need the application to be and that's also typically where my mouse cursor is. Without FancyZones and this specific setting enabled, I would always have to drag the window to the monitor that previously had focus if it wasn't the primary monitor which was a pain!

I also like to make sure this setting for FancyZones is enabled to prevent dragging windows using mouse from activating FancyZones.

![](win10wmsetup-fancyzones-zone-settings.png)

## Alt-Tab Terminator

[Alt-Tab Terminator](https://www.ntwind.com/software/alttabter.html) is a program that replaces the default Windows Alt+Tab view (which shows windows with small previews in a grid) with a list view that is searchable and has much larger 
 window previews.

Here's a screenshot of the program running.

![](win10wmsetup-alt-tab-terminator.png)

For me the app has a few killer features:
- Search and preview open applications (this is super useful when you have a lot of apps open)
- Ability to set a keyboard shortcut to cycle through windows of same application
	- By default Windows can't do this
	- On OSX/Linux typically this behaviour is bound to Alt + \`  by default

These are my preferred settings for this program:

![](win10wmsetup-alt-tab-terminator-settings-general.png)

![](win10wmsetup-alt-tab-terminator-settings-appearance.png)

![](win10wmsetup-alt-tab-terminator-settings-hotkeys.png)

As you can see, I don't actually use Alt+Tab Terminator to replace Alt+Tab. In general, I only use Alt+Tab to switch between current window and previously focused window. The default Alt+Tab is fine for that. Beyond that, I typically switch between my most common applications using `Win + Number` shortcuts. I use Alt+Tab Terminator only to switch to applications that I can't switch to using `Win + Number` . I especially don't like using Alt+Tab Terminator to replace `Win + Tab`  since the virtual desktop preview is way too useful for me. Instead, I use AutoHotKey to launch Alt+Tab Terminator using a custom shortcut (`CapsLock + Tab`). See AutoHotKey section for code.

## FancyWM

[FancyWM](https://apps.microsoft.com/store/detail/fancywm-dynamic-tiling-window-manager/9P1741LKHQS9?hl=en-us&gl=us) is a tiling window manager extension for the Windows Desktop. It doesn't replace the built-in Window Manager, it simply hooks into it and provides tiling capabilities over it. It's similar in concept to [Pop Shell](https://github.com/pop-os/shell), [Bismuth](https://github.com/Bismuth-Forge/bismuth), or [yabai](https://github.com/koekeishiya/yabai).

I personally find a tiling window manager to be really useful. It helps me keeps my application windows organized and lets me navigate open windows easily with the keyboard. When using a laptop, I don't have to use the trackpad as much to get around. When using a large 4K monitor, it lets me create layouts on the fly to effectively use all that space without getting eye strain or having to use the mouse too much.

There are a lot of other projects out there trying to bring tiling window manager capabilities to the Windows Desktop. But I disliked a lot of those projects since they were either unstable, hard to configure, hard to use, or didn't integrate well with Windows.

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
	- Can even move around entire stack panels using mouse (I think this is the only way, I haven't found keyboard shortcut for it).
- Integrates with native Windows Virtual Desktops
	- Other tiling WM projects for Windows try to create their own workspace functionality outside of native virtual desktops and I always found that to be frustrating to use. For those other projects, if the tiling wm crashed, those workspaces were gone and you had to recreate them! This was a huge pain when you have a lot of workspaces and a lot of windows open.
	- Since FancyWM uses native Windows virtual desktops, if it crashes, your windows will still remain in their respective desktop but they will no longer be tiled and you have to recreate your desired layout.
	- FancyWM exposes keyboard shortcuts to focus a specific virtual desktop by number and move a window to a virtual desktop by number. This is invaluable since there are no default keyboard shortcuts in Windows to do these things.
- Directly invoke window actions using commandline
	- When I got more adept at using FancyWM, I found that the activation key sequence slowed me down since it added extra keystrokes everytime I wanted to do something. I wanted to script FancyWM and create my own keyboard shortcuts for it.
	- FancyWM allows you to directly invoke actions by calling `fancywm.exe`.
		- Ex. here's how to focus to the window on the left: `fancywm.exe --action MoveFocusLeft`
		- If you use AutoHotKey, you can create your own custom keyboard shortcuts that call into `fancywm.exe`, allowing you to manipulate windows with fewer keystrokes. See the AutoHotKey section for example code.
	
Here's a short demo of FancyWM. These are the features of FancyWM I'm showing (all using keyboard shortcuts):
- Split panel horizontally or vertically
- Stack windows in same panel
- Focus windows in a direction
- Move and swap windows in a direction
- Resize windows
- Temporarily float windows

![](win10wmsetup-fancywm-demo.gif)

Now here's another demo of FancyWM focusing on it's handling of virtual desktops. I'm demoing the following features (all using keyboard shortcuts):
- Focus specific virtual desktop by number (`Shift+Win`  followed by `Number` after short delay)
	- This shortcuts seems to even work in the Virtual Desktop Switcher
- Move window to specific virtual desktop by number (`Shift+Win`  followed by `Shift+Number` after short delay)
- Focus previous virtual desktop (`Shift+Win`  followed by `Q` after short delay)
	- This shortcuts seems to even work in the Virtual Desktop Switcher
- Move window to previous virtual desktop (`Shift+Win`  followed by `Shift+Q` after short delay)

![](win10wmsetup-fancywm-virtual-desktops-demo.gif)

FancyWM has a lot of other cool features that I haven't gone into (ex. moving window to specific monitor number, etc.) and new features are added regularly.

## AutoHotKey

[AutoHotKey](https://www.autohotkey.com/) is a scripting language to automate the Windows Desktop that's really useful for making keyboard remaps among other things.

When installing AutoHotKey, make sure the circled option is checked since it will allow AutoHotKey scripts to handle programs running as Admin.

![](win10wmsetup-autohotkey-install.png)

### Script structure

I'm keeping all my autohotkey scripts in one folder in my filesystem, `ahk`. Within the folder, there is one main script `ahk\ahkrc.ahk` that I run. This main script will include other subscripts under `ahk\Lib\`. The reason I couldn't run the scripts under `Lib` separately is that I needed to have one place to set the capslock state to off. Otherwise, the two scripts I had didn't play nicely when run separately. I prefer this structure anyways since I have only one script to run but the code of the scripts is still modularized.

````
ahk\
	Lib\
		modal_capslock.ahk
		mouse_cursor_follows_focus.ahk
	ahkrc.ahk
````

`ahk\ahkrc.ahk`:

````
#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
#UseHook
#InstallKeybdHook
#SingleInstance force

; Deactivate capslock completely.
; Needs to be at top of file and defined before all other keybindings
; and all includes. Otherwise, capslock might be able to be activated.
SetCapslockState, AlwaysOff

; Disable Windows 10 Show Desktop Button
Control, Hide, , TrayShowDesktopButtonWClass1, ahk_class Shell_TrayWnd

#Include %A_ScriptDir%\Lib\mouse_cursor_follows_focus.ahk
#Include %A_ScriptDir%\Lib\modal_capslock.ahk

SetTimer, ReloadScript,% 30*1000 ;30 seconds

ReloadScript()
{
	Reload
}
````

### Mouse Follows Focus

The following script (which is included in the main script) implements a behaviour called 'Mouse Follows Focus' which moves the mouse automatically according to window focus events.

`ahk\Lib\mouse_cursor_follows_focus.ahk`:

````
; Makes the mouse cursor follow window focus, but ONLY if the focus change
; wasn't caused by the mouse - e.g. Alt-Tab, Win+<Number>, hotkeys, ...
; Saves a lot of mousing around on multi-monitor setups!
; Source: https://gist.githubusercontent.com/bladeSk/9feeeb6c2ba9939faa3c88cc9133700c/raw/cabc86477ca9bc23856cf84146ecc55eda74ff32/mouse%2520cursor%2520follows%2520focus.ahk

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
````

Below is a demonstration of the default Windows behaviour when switching between application windows using keyboard shortcuts (in this case, `Win+Number`). You can see that the focused window changes but the mouse cursor still stays at the same position.

![](win10wmsetup-mff-off.gif)

Below is a demonstration of 'Mouse Follows Focus'. Now when I switch windows using keyboard shortcuts, the mouse cursor is automatically moved to the center of the newly focused window. This is especially useful when working with multi-monitor setups, since you can avoid having to physically drag your mouse to move the cursor to another monitor when the focused window changes via keyboard. But I also like this when working on a laptop on the couch since I don't have to use the trackpad so much.


![](win10wmsetup-mff-on.gif)

### Using CapsLock as both Escape and an extra modifier key

The following script (which is included in the main script) modifies `Caps Lock` behaviour in a two interesting ways. Firstly, pressing just `Caps Lock` will send `Escape` which is useful when using vim bindings in my IDE. Second, pressing `Caps Lock` with another key combo invokes a custom action, effectively turning `Caps Lock` into another modifier key. I mainly use these extra modifier shortcuts to invoke FancyWM actions directly instead of using the activation sequence, run Alt+Tab Terminator, and remap default shortcuts into ones easier to type (ex. close window can be invoked `CapsLock + W` in addition to it's default `Alt+F4`).

`ahk\Lib\modal_capslock.ahk`:

````
; Invokes key press after activation shortcut
InvokeFancyWmAction(key, downDelay:=100, upDelay:=100)
{
	Send, {LWin down}{Shift down}
	Sleep, downDelay
	Send, {LWin up}{Shift up}
	Sleep, upDelay
	Send, {%key%}
	Return
}

Capslock UP::
	if (A_PriorKey = "Capslock")
	{
		Send {Esc}
	}
return

; modal shortcuts using CapsLock
#If GetKeyState("Capslock","P") ;"P" means "pressed".
	; Turn caps lock off in case it was turned on. CapsLock + Ctrl + Shift + Win + C.
	^+#c::SetCapslockState, off

	; Move the focused window out of its containing panel. CapsLock + Shift + Enter
	+Enter::RunWait, fancywm.exe --action PullWindowUp, , Hide

	; Change focused windows. CapsLock + Alt + Vim keys
	!h::RunWait, fancywm.exe --action MoveFocusLeft, , Hide
	!j::RunWait, fancywm.exe --action MoveFocusDown, , Hide
	!k::RunWait, fancywm.exe --action MoveFocusUp, , Hide
	!l::RunWait, fancywm.exe --action MoveFocusRight, , Hide

	; Move the focused window in a given direction. CapsLock + Alt + Shift + Vim direction keys
	!+h::RunWait, fancywm.exe --action MoveLeft, , Hide
	!+j::RunWait, fancywm.exe --action MoveDown, , Hide
	!+k::RunWait, fancywm.exe --action MoveUp, , Hide
	!+l::RunWait, fancywm.exe --action MoveRight, , Hide

	; Embed the focused window in a panel. CapsLock + Shift + {,./}
	+,::RunWait, fancywm.exe --action CreateHorizontalPanel, , Hide
	+.::RunWait, fancywm.exe --action CreateVerticalPanel, , Hide
	+/::RunWait, fancywm.exe --action CreateStackPanel, , Hide

	; Change the width/height of the focused window. CapsLock + Ctrl + Vim keys
	; Decrease width
	^h::InvokeFancyWmAction("[")

	; Decrease height
	^j::InvokeFancyWmAction(";")

	; Increase height
	^k::InvokeFancyWmAction("'")

	; Increase width
	^l::InvokeFancyWmAction("]")

	; Doesn't work, see https://github.com/FancyWM/fancywm-issues/issues/77
	;^h::RunWait, fancywm.exe --action DecreaseWidth, , Hide
	;^j::RunWait, fancywm.exe --action DecreaseHeight, , Hide
	;^k::RunWait, fancywm.exe --action IncreaseHeight, , Hide
	;^l::RunWait, fancywm.exe --action IncreaseWidth, , Hide

	; Switch to the selected virtual desktop. CapsLock + Alt + Number
	!1::RunWait, fancywm.exe --action SwitchToDesktop1, , Hide
	!2::RunWait, fancywm.exe --action SwitchToDesktop2, , Hide
	!3::RunWait, fancywm.exe --action SwitchToDesktop3, , Hide
	!4::RunWait, fancywm.exe --action SwitchToDesktop4, , Hide
	!5::RunWait, fancywm.exe --action SwitchToDesktop5, , Hide
	!6::RunWait, fancywm.exe --action SwitchToDesktop6, , Hide
	!7::RunWait, fancywm.exe --action SwitchToDesktop7, , Hide
	!8::RunWait, fancywm.exe --action SwitchToDesktop8, , Hide
	!9::RunWait, fancywm.exe --action SwitchToDesktop9, , Hide

	; Send the focused window to the selected virtual desktop. CapsLock + Shift + Number
	+1::RunWait, fancywm.exe --action MoveToDesktop1, , Hide
	+2::RunWait, fancywm.exe --action MoveToDesktop2, , Hide
	+3::RunWait, fancywm.exe --action MoveToDesktop3, , Hide
	+4::RunWait, fancywm.exe --action MoveToDesktop4, , Hide
	+5::RunWait, fancywm.exe --action MoveToDesktop5, , Hide
	+6::RunWait, fancywm.exe --action MoveToDesktop6, , Hide
	+7::RunWait, fancywm.exe --action MoveToDesktop7, , Hide
	+8::RunWait, fancywm.exe --action MoveToDesktop8, , Hide
	+9::RunWait, fancywm.exe --action MoveToDesktop9, , Hide

	; Move focused window to workspace (basically MoveToDesktopX + SwitchToDesktopX), CapsLock + Alt + Shift + Number
	!+1::
	RunWait, fancywm.exe --action MoveToDesktop1, , Hide
	RunWait, fancywm.exe --action SwitchToDesktop1, , Hide
	return

	!+2::
	RunWait, fancywm.exe --action MoveToDesktop2, , Hide
	RunWait, fancywm.exe --action SwitchToDesktop2, , Hide
	return

	!+3::
	RunWait, fancywm.exe --action MoveToDesktop3, , Hide
	RunWait, fancywm.exe --action SwitchToDesktop3, , Hide
	return

	!+4::
	RunWait, fancywm.exe --action MoveToDesktop4, , Hide
	RunWait, fancywm.exe --action SwitchToDesktop4, , Hide
	return

	!+5::
	RunWait, fancywm.exe --action MoveToDesktop5, , Hide
	RunWait, fancywm.exe --action SwitchToDesktop5, , Hide
	return

	!+6::
	RunWait, fancywm.exe --action MoveToDesktop6, , Hide
	RunWait, fancywm.exe --action SwitchToDesktop6, , Hide
	return

	!+7::
	RunWait, fancywm.exe --action MoveToDesktop7, , Hide
	RunWait, fancywm.exe --action SwitchToDesktop7, , Hide
	return

	!+8::
	RunWait, fancywm.exe --action MoveToDesktop8, , Hide
	RunWait, fancywm.exe --action SwitchToDesktop8, , Hide
	return

	!+9::
	RunWait, fancywm.exe --action MoveToDesktop9, , Hide
	RunWait, fancywm.exe --action SwitchToDesktop9, , Hide
	return

	; Toggle floating mode for the active window. CapsLock + Shift + F
	+f::RunWait, fancywm.exe --action ToggleFloatingMode, , Hide

	; Temporarily toggle the window management functionality in FancyWM. CapsLock + Alt + Shift + F
	!+f::RunWait, fancywm.exe --action ToggleManager, , Hide

	; Manually refresh the window positions. CapsLock + Shift + R.
	+r::RunWait, fancywm.exe --action RefreshWorkspace, , Hide

	; Reload current ahk script, CapsLock + Alt + Shift + '
	!+'::reload

	; Kill application/window. CapsLock + W
	w::!F4

	; Focus virtual desktop to the right. CapsLock + N
	n::Send,^#{Right}

	; Focus virtual desktop to left. CapsLock + B
	b::Send,^#{Left}

	; Left click mouse. CapsLock + [
	[::Click

	; Right click mouse. CapsLock + ]
	]::Click Right

	; Open PowerToys Run. CapsLock + Space
	Space::Send,!{Space}

	; Open start menu. CapsLock + G
	g::Send,{LWin}

	; Launch Alt+Tab Terminator. CapsLock + Tab
	Tab::RunWait, "C:\Program Files\Alt-Tab Terminator\AltTabTer.exe", "C:\Program Files\Alt-Tab Terminator", Hide

	; CapsLock + any unhandled key combo + vim keys to key combo + arrow keys.
	; * is the wildcard prefix, it matches any key combo. {Blind} is the wildcard key combo.
	; Example: Can use CapsLock + Vim keys to navigate as if using arrow keys.
	; Example: Can use CapsLock + Shift + Vim keys to select text in specified direction by character.
	; Example: Can use CapsLock + Ctrl + Shift + Vim keys to select text in specified direction by word.
	; Note: I think this has to go last after all other bindings with hjkl since we use hjkl in many other key combos earlier in the script.
	*h::Send,{Blind}{Left}
	*l::Send,{Blind}{Right}
	*k::Send,{Blind}{Up}
	*j::Send,{Blind}{Down}

	; CapsLock + any unhandled key combo + yuio to key combo + Home/Page Down/Page Up/End.
	*y::Send,{Blind}{Home}
	*u::Send,{Blind}{PgDn}
	*i::Send,{Blind}{PgUp}
	*o::Send,{Blind}{End}
#If
````

### Have `ahk\ahkrc.ahk` handle admin windows

AutoHotKey scripts won't work on Admin windows by default. Need to follow this [guide](https://stackoverflow.com/a/68855449) to be able to make an AutoHotKey script handle Admin windows without running it as admin. You only need to do this for `ahk\ahkrc.ahk` since that is the only script that will be directly invoked.

### Run `ahk\ahkrc.ahk` at startup

Due to the directory structure I chose for my autohotkey scripts, I couldn't just stick a shortcut to `ahk\ahkrc.ahk` in `shell:startup`. I could have done so if I decide to compile my autohotkey script as an exe and then move the compiled exe to `shell:startup`. But this is too much of a pain when I need to make some changes to my script. So, I ended up using the Windows Task Scheduler to start `ahk\ahkrc.ahk` at login.

![](win10wmsetup-autohotkey-tasksch-1.png)

![](win10wmsetup-autohotkey-tasksch-2.png)

![](win10wmsetup-autohotkey-tasksch-3.png)

![](win10wmsetup-autohotkey-tasksch-4.png)

![](win10wmsetup-autohotkey-tasksch-5.png)

# Problems

## When mouse cursor follows focus, sometimes mouse cursor is focused on the taskbar instead of an application window

When window focus events are invoked, it seems that Windows will switch focus to the taskbar and then focus on the actual window. The script adds a short delay to compensate for this but sometimes it's not enough, so you end up in a situation where the mouse cursor is still on the taskbar and hasn't moved to the application window (as shown below).

![](win10wmsetup-mff-at-taskbar.gif)

Usually hitting Alt+Tab twice would help to recenter the mouse by switching to last window and back to new window.

## AHK script silently dies

For some reason, `ahk\ahkrc.ahk`, will silently die after several days (sometimes even hours) of uptime. Other times, the keyboard starts acting funky (ie. wrong keys are fired from even non-remaped keys). In these cases I usually either:

1. Reload script
2. Exit script and restart it (if reloading doesn't work)

While I would like to get to figure out why this is happening, I can live with this mild annoyance.

## FancyWM less stable when using from within an RDP session

FancyWM is a life-changing program for me. I can't use Windows without it now and it's been very stable when not using in an RDP session.

At my workplace, I often do development on remote machines (desktop on office, Azure VMs) which I connect to using RDP. I install FancyWM onto the remote machines as well and I can use it over RDP. Most of the time, it works just as well as when not using it over RDP. But sometimes, when reconnecting to RDP sessions or when the display configuration changes in the RDP session (ex. resizing RDP window, attaching extra monitor), FancyWM doesn't always handle it gracefully and may crash. It doesn't happen all the time but it's still annoying when it does happen since I have to rearrange my windows.

# Conclusion

Although it took a bit of time to set this all up, I'm really happy with the results. I find I'm now much more productive in Windows.