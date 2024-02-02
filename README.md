# Cronabot's Dotfiles

This repository contains my personal dotfiles, built on [Hyprland](https://github.com/hyprwm/Hyprland) with heavy use of [ags](https://github.com/Aylur/ags/)

## Installation

### Requirements

- [git](https://git-scm.com/) (source control)
- [Hyprland](https://github.com/hyprwm/Hyprland) (Wayland compositor)
- [ags](https://github.com/Aylur/ags) (bar + widgets)
- [kitty](https://github.com/kovidgoyal/kitty) (terminal)
- [zsh](https://www.zsh.org/) (shell)
- [stow](https://www.gnu.org/software/stow) (dotfiles manager)
- [node]

#### Optional Programs

- [neovim](https://github.com/neovim/neovim) (text editor)
- [ncspot](https://github.com/hrkfdn/ncspot) (spotify client)
- [cava](https://github.com/karlstav/cava) (audio visualiser)
- [neofetch](https://github.com/dylanaraps/neofetch) (system information)

### Install

First, install all of the [required programs](#Requirements).

Next, clone this repository to your $HOME directory

```
$ git clone git@github.com:Cronabot/dotfiles.git
$ cd dotfiles
```

then use [stow](https://www.gnu.org/software/stow) to create symlinks to your actual home path.

> [!NOTE]
> You may need to remove any files you currently have which may cause conflicts.

```
$ stow *
```

Finally, npm install ags

```
cd ~/.config/ags && npm i
```
