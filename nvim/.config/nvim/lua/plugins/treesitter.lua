return {
    {
        "nvim-treesitter/nvim-treesitter",
        build = ":TSUpdate",
        event = "BufReadPost",
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
                "lua",
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
        ---@param opts TSConfig
        config = function(plugin, opts)
            if plugin.ensure_installed then
                require("lazyvim.util").deprecate("treesitter.ensure_installed", "treesitter.opts.ensure_installed")
            end
            require("nvim-treesitter.configs").setup(opts)
        end,
    },
}
