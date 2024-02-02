return {
    {
        "nvim-telescope/telescope.nvim",
        lazy = false,
        dependencies = {
            "nvim-lua/plenary.nvim",
            "nvim-telescope/telescope-file-browser.nvim",
            "nvim-telescope/telescope-media-files.nvim"
        },
        config = function()
            local t = require("telescope")
            local builtin = require("telescope.builtin")
            vim.keymap.set("n", "<leader>ff", builtin.find_files, {})
            vim.keymap.set("n", "<leader>fg", builtin.git_files, {})
            vim.keymap.set("n", "<leader>fs", builtin.grep_string, {})

            vim.keymap.set("n", "<leader>fv", t.extensions.file_browser.file_browser, {})

            t.setup({
                extensions = {
                    file_browser = {
                        hijack_netrw = true,
                        path = "%:p:h",
                    }
                }
            })

            t.load_extension("file_browser")
            t.load_extension("media_files")
        end
    },

    { 
        "nvim-lualine/lualine.nvim",
        event = "VeryLazy",
        dependencies = { "nvim-tree/nvim-web-devicons" },
        config = function() 
            require('lualine').setup()
        end
    },

    {
        "mbbill/undotree",
        event = "VeryLazy",
        keys = {
            { "<leader>u", vim.cmd.UndotreeToggle }
        }    
    },
}
