vim.api.nvim_create_autocmd({"BufRead", "BufNewFile"}, {
    pattern = {"*.md", "*.txt"},
    command = "set wrap | setlocal spell spelllang=en_gb | set conceallevel=1"
})
