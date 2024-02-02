return {
    {
        "ggandor/leap.nvim",
        event = "VeryLazy",
        config = function()
            require('leap').add_default_mappings()
        end
    },
    {
        "windwp/nvim-autopairs",
        event = "VeryLazy",
        config = function()
            require("nvim-autopairs").setup()
        end
    },
}
