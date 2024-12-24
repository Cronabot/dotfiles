# znap
[[ -r ~/Repos/znap/znap.zsh ]] ||
    git clone --depth 1 -- \
        https://github.com/marlonrichert/zsh-snap.git ~/Repos/znap
source ~/Repos/znap/znap.zsh

# General Config
HISTFILE=~/.zsh_history
HISTSIZE=10000
SAVEHIST=10000
setopt appendhistory

## Env
export SUDO_PROMPT="password: "
export EDITOR=nvim
export VISUAL=nvim
export PATH=$PATH:/home/ec/.spicetify
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

## Aliases
alias l="lsd -a"
alias nv="nvim"
alias nc="ncat"
alias ta="tmux a"
alias tm="auto-tmux-session.sh"

## Binds

bindkey "^[[1;5C" forward-word
bindkey "^[[1;5D" backward-word

bindkey '\t' menu-select "$terminfo[kcbt]" menu-select
bindkey -M menuselect '\t' menu-complete "$terminfo[kcbt]" reverse-menu-complete

# Init

## Plugins
znap source marlonrichert/zsh-autocomplete
znap source ajeetdsouza/zoxide
znap eval ohmyposh 'oh-my-posh init zsh --config ~/.omp.toml'
znap eval fzf 'fzf --zsh'
# znap eval starship 'starship init zsh'

echo ""
fastfetch
