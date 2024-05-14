vim.api.nvim_create_autocmd({"BufRead", "BufNewFile"}, {
    pattern = {"*.md"},
    command = "set wrap | setlocal spell spelllang=en_gb"
})
