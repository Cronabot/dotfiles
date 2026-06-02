return {
    {
        url = "https://codeberg.org/andyg/leap.nvim",
        event = "VeryLazy",
        keys = {
            { "s", "<Plug>(leap-forward)" },
            { "S", "<Plug>(leap-backward)" },
            { "gs", "<Plug>(leap-from-window)" },
        },
    },
    {
        "windwp/nvim-autopairs",
        event = "VeryLazy",
    },
    {
        "lukas-reineke/indent-blankline.nvim",
        main = "ibl",
        event = "VeryLazy",
    },
    {
        "mason-org/mason.nvim",
        event = "VeryLazy",
        opts = {}
    },
    {
        "mfussenegger/nvim-dap",
        event = "VeryLazy",
        dependencies = {
            "rcarriga/nvim-dap-ui",
            "nvim-neotest/nvim-nio",
            "jay-babu/mason-nvim-dap.nvim",
            "theHamsta/nvim-dap-virtual-text",
        },
    },
}
