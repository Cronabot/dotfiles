# znap
[[ -r ~/Repos/znap/znap.zsh ]] ||
    git clone --depth 1 -- \
        https://github.com/marlonrichert/zsh-snap.git ~/Repos/znap
source ~/Repos/znap/znap.zsh

# Aliases
alias l="lsd -a"
alias n="nvim ."
alias nv="nvim"

# starship
eval "$(starship init zsh)"

# bun completions
[ -s "/home/ec/.bun/_bun" ] && source "/home/ec/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
