return {
	{
		"nvim-telescope/telescope.nvim",
		lazy = false,
		dependencies = {
			"nvim-lua/plenary.nvim",
			"nvim-telescope/telescope-file-browser.nvim",
			"nvim-telescope/telescope-media-files.nvim",
		},
		config = function()
			local t = require("telescope")
			local builtin = require("telescope.builtin")

			t.setup({
				extensions = {
					file_browser = {
						hijack_netrw = true,
						path = "%:p:h",
					},
					fzf = {
						fuzzy = true, -- false will only do exact matching
						override_generic_sorter = true, -- override the generic sorter
						override_file_sorter = true, -- override the file sorter
						case_mode = "smart_case", -- or "ignore_case" or "respect_case"
						-- the default case_mode is "smart_case"
					},
				},
			})

			t.load_extension("file_browser")
			t.load_extension("media_files")
		end,
		keys = function()
			local t = require("telescope")
			local builtin = require("telescope.builtin")

			return {
				{
					"<leader>ff",
					function()
						builtin.find_files()
					end,
				},
				{
					"<leader>fg",
					function()
						builtin.git_files()
					end,
				},
				{
					"<leader>fs",
					function()
						builtin.live_grep()
					end,
				},
				{
					"<leader>fr",
					function()
						builtin.lsp_references()
					end,
				},
				{
					"<leader>fv",
					function()
						t.extensions.file_browser.file_browser()
					end,
				},
			}
		end,
	},
	{
		"nvim-telescope/telescope-fzf-native.nvim",
		build = "make",
	},
	{
		"christoomey/vim-tmux-navigator",
		cmd = {
			"TmuxNavigateLeft",
			"TmuxNavigateDown",
			"TmuxNavigateUp",
			"TmuxNavigateRight",
			"TmuxNavigatePrevious",
		},
		keys = {
			{ "<c-h>", "<cmd><C-U>TmuxNavigateLeft<cr>" },
			{ "<c-j>", "<cmd><C-U>TmuxNavigateDown<cr>" },
			{ "<c-k>", "<cmd><C-U>TmuxNavigateUp<cr>" },
			{ "<c-l>", "<cmd><C-U>TmuxNavigateRight<cr>" },
			{ "<c-\\>", "<cmd><C-U>TmuxNavigatePrevious<cr>" },
		},
	},
	{
		"knubie/vim-kitty-navigator",
		event = "VeryLazy",
	},
	{
		"nvim-lualine/lualine.nvim",
		event = "VeryLazy",
		dependencies = { "nvim-tree/nvim-web-devicons" },
	},

	{
		"mbbill/undotree",
		event = "VeryLazy",
		keys = {
			{ "<leader>u", vim.cmd.UndotreeToggle },
		},
	},
}
