return {
    {
        "nvim-treesitter/nvim-treesitter",
        build = ":TSUpdate",
        ---@type TSConfig
        opts = {
            sync_install = false,
            auto_install = true,
            highlight = { enable = true },
            indent = { enable = true },
            context_commentstring = { enable = true, enable_autocmd = false },
            ensure_installed = {
                "astro",
                "bash",
                "css",
                "html",
                "javascript",
                "json",
                "markdown",
                "markdown_inline",
                "python",
                "query",
                "regex",
                "scss",
                "svelte",
                "tsx",
                "typescript",
                "vim",
                "yaml",
            },
        },
--        ---@param opts TSConfig
--        config = function(plugin, opts)
--            local ts_filetypes = {}
--
--            vim.api.nvim_create_autocmd('FileType', {
--                pattern = ts_filetypes,
--                callback = function()
--                    -- enable syntax highlight
--                    vim.treesitter.start()
--
--                    -- enable folds
--                    vim.wo[0][0].foldexpr = 'v:lua.vim.treesitter.foldexpr()'
--                    vim.wo[0][0].foldmethod = 'expr'
--                end
--            })
--        end,
    },
}
