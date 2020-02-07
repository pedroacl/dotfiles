set nocompatible              " be iMproved, required
filetype off                  " required
set number
set relativenumber
set expandtab
set cursorline
set guifont=Monaco\ 12
set linespace=6
" set colorcolumn=80

" Prettier
let g:prettier#config#use_tabs = 'true'
let g:prettier#config#semi = 'false'
let g:prettier#config#bracket_spacing = 'true'
let g:prettier#config#trailing_comma = 'none'
let g:prettier#config#jsx_bracket_same_line = 'false'

let g:ackprg = 'ag --nogroup --nocolor --column'
let g:ctrlp_custom_ignore = 'node_modules\|DS_Store\|git'
let g:ctrlp_max_files = 0
let g:rainbow_active = 1

autocmd FileType javascript setlocal ts=4 sts=0 sw=4 noexpandtab

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'
Plugin 'mileszs/ack.vim'
Plugin 'tpope/vim-rails'
Plugin 'tpope/vim-fugitive'
Plugin 'tpope/vim-surround'
Plugin 'tpope/vim-commentary'
Plugin 'prettier/vim-prettier'
Plugin 'drewtempelmeyer/palenight.vim'
Plugin 'godlygeek/tabular'
Plugin 'ayu-theme/ayu-vim'
Plugin 'vim-ruby/vim-ruby'
Plugin 'morhetz/gruvbox'
Plugin 'pangloss/vim-javascript'
Plugin 'mxw/vim-jsx'
Plugin 'ctrlpvim/ctrlp.vim'
Plugin 'git://git.wincent.com/command-t.git'
Plugin 'zivyangll/git-blame.vim'
Plugin 'elixir-editors/vim-elixir'
Plugin 'alvan/vim-closetag'
Plugin 'w0rp/ale'
Plugin 'leafgarland/typescript-vim'
Plugin 'peitalin/vim-jsx-typescript'
Plugin 'jiangmiao/auto-pairs'
Plugin 'othree/yajs.vim'
Plugin 'valloric/youcompleteme'

" Plugin 'git://git.ngmy.com/vim-rubocop.git'
" plugin from http://vim-scripts.org/vim/scripts.html
" Plugin 'L9'
" The sparkup vim script is in a subdirectory of this repo called vim.
" Pass the path to set the runtimepath properly.
Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
" Install L9 and avoid a Naming conflict if you've already installed a
" different version somewhere else.
" Plugin 'ascenator/L9', {'name': 'newL9'}

execute pathogen#infect()

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line

imap jk <Esc>

"set background=dark
"colorscheme gruvbox

" Prettier
let g:prettier#autoformat = 0
let g:prettier#config#use_tabs = 'false'
autocmd BufWritePre *.js,*.jsx,*.mjs,*.ts,*.tsx,*.css,*.less,*.scss,*.json,*.graphql,*.md,*.vue PrettierAsync

set background=dark
colorscheme palenight

" highlight trailing whitespaces
highlight RedundantSpaces ctermbg=red guibg=red
match RedundantSpaces /\s\+$/

" FORMATTERS
au FileType javascript setlocal formatprg=prettier
au FileType javascript.jsx setlocal formatprg=prettier
au FileType typescript setlocal formatprg=prettier\ --parser\ typescript
au FileType html setlocal formatprg=js-beautify\ --type\ html
au FileType scss setlocal formatprg=prettier\ --parser\ css
au FileType css setlocal formatprg=prettier\ --parser\ css
