return {
    {
        "ggandor/leap.nvim",
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
}
