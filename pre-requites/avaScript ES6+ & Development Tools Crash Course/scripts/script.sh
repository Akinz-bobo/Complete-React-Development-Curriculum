# ========== Git Setup and Configuration ==========

# First-time setup
git --version                              # Check Git version
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global init.defaultBranch main
git config --global core.autocrlf true    # Windows
git config --global core.autocrlf input   # Mac/Linux

# Useful global configurations
git config --global core.editor "code --wait"  # VS Code as default editor
git config --global merge.tool vscode          # VS Code as merge tool
git config --global diff.tool vscode           # VS Code as diff tool
git config --global alias.st status            # Create alias 'git st' for 'git status'
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.lg "log --oneline --graph --decorate --all"

# View configuration
git config --list                         # Show all configuration
git config --global --list               # Show global configuration
git config user.name                     # Show specific setting

# ========== Repository Initialization ==========

# Create new repository
git init                                  # Initialize empty repository
git init my-project                       # Initialize repository in new directory
git clone https://github.com/user/repo.git  # Clone existing repository
git clone https://github.com/user/repo.git my-folder  # Clone to specific folder

# Remote repositories
git remote -v                            # Show remote URLs
git remote add origin https://github.com/user/repo.git  # Add remote
git remote set-url origin https://github.com/user/new-repo.git  # Change remote URL
git remote remove origin                 # Remove remote

# ========== Basic Git Workflow ==========

# Check repository status
git status                               # Show working directory status
git status -s                           # Short status format
git status --porcelain                  # Machine-readable format

# Adding files to staging area
git add file.txt                        # Add specific file
git add .                               # Add all files in current directory
git add -A                              # Add all files in repository
git add *.js                            # Add all JavaScript files
git add src/                            # Add all files in src directory
git add -p                              # Interactive staging (patch mode)

# Committing changes
git commit -m "Add user authentication"  # Commit with message
git commit -am "Fix login bug"          # Add and commit in one step
git commit --amend                       # Modify last commit
git commit --amend -m "New message"     # Change last commit message
git commit --amend --no-edit            # Add to last commit without changing message

# Viewing history
git log                                  # Show commit history
git log --oneline                        # Compact log format
git log --graph --oneline --decorate     # Visual graph of commits
git log --author="John Doe"             # Commits by specific author
git log --since="2 weeks ago"           # Commits from last 2 weeks
git log --grep="bug"                     # Search commit messages
git log -p                               # Show changes in each commit
git log --stat                           # Show file change statistics

# Viewing differences
git diff                                 # Changes in working directory
git diff --staged                        # Changes in staging area
git diff HEAD                            # All changes since last commit
git diff commit1 commit2                 # Differences between commits
git diff branch1 branch2                 # Differences between branches

# ========== Branching and Merging ==========

# Branch management
git branch                               # List local branches
git branch -a                            # List all branches (local and remote)
git branch -r                            # List remote branches
git branch feature-login                 # Create new branch
git checkout feature-login               # Switch to branch
git checkout -b feature-signup           # Create and switch to new branch
git switch feature-login                 # Modern way to switch branches
git switch -c feature-payment            # Create and switch (modern)

# Branch operations
git branch -d feature-login              # Delete branch (safe)
git branch -D feature-login              # Force delete branch
git branch -m old-name new-name          # Rename branch
git push origin --delete feature-login   # Delete remote branch

# Merging
git merge feature-login                  # Merge branch into current branch
git merge --no-ff feature-login          # Force merge commit
git merge --squash feature-login         # Squash commits before merging

# Rebasing
git rebase main                          # Rebase current branch onto main
git rebase -i HEAD~3                     # Interactive rebase last 3 commits
git rebase --continue                    # Continue rebase after resolving conflicts
git rebase --abort                       # Abort rebase operation

# ========== Remote Operations ==========

# Fetching and pulling
git fetch                                # Download changes from remote
git fetch origin                         # Fetch from specific remote
git pull                                 # Fetch and merge remote changes
git pull --rebase                        # Fetch and rebase instead of merge
git pull origin main                     # Pull specific branch

# Pushing
git push                                 # Push to default remote/branch
git push origin main                     # Push to specific remote/branch
git push -u origin feature-login         # Push and set upstream
git push --force                         # Force push (dangerous!)
git push --force-with-lease              # Safer force push
git push --tags                          # Push tags to remote

# ========== Working with Files ==========

# File operations
git rm file.txt                          # Remove file from Git and filesystem
git rm --cached file.txt                 # Remove from Git but keep on filesystem
git mv oldname.txt newname.txt           # Rename/move file

# Ignoring files (.gitignore)