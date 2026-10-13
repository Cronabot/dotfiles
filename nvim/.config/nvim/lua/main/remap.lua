-- Common Commands
vim.keymap.set("n", "<leader>s", ":w<CR>")
vim.keymap.set("n", "<C-w>l", ":vs<CR>")
vim.keymap.set("n", "<C-w>h", ":vs<CR>")
vim.keymap.set("n", "<C-w>j", ":sv<CR>")
vim.keymap.set("n", "<C-w>k", ":sv<CR>")

-- Visual
vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")

-- Centering view after certain commands
vim.keymap.set("n", "<C-d>", "<C-d>zz")
vim.keymap.set("n", "<C-u>", "<C-u>zz")
vim.keymap.set("n", "<C-o>", "<C-u>zz")
vim.keymap.set("n", "{", "{zz")
vim.keymap.set("n", "}", "}zz")
