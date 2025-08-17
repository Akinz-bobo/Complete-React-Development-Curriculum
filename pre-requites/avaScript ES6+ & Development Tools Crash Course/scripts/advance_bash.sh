# ========== Advanced Git Operations ==========

# Stashing changes
git stash                                # Stash current changes
git stash push -m "Work in progress"     # Stash with message
git stash list                           # List all stashes
git stash pop                            # Apply and remove latest stash
git stash apply stash@{1}                # Apply specific stash
git stash drop stash@{1}                 # Delete specific stash
git stash clear                          # Delete all stashes

# Cherry picking
git cherry-pick commit-hash              # Apply specific commit to current branch
git cherry-pick commit1 commit2          # Apply multiple commits
git cherry-pick --no-commit commit-hash  # Apply without creating commit

# Resetting changes
git reset HEAD file.txt                  # Unstage file
git reset --soft HEAD~1                  # Undo last commit, keep changes staged
git reset --mixed HEAD~1                 # Undo last commit, unstage changes
git reset --hard HEAD~1                  # Undo last commit, discard all changes
git reset --hard origin/main             # Reset to match remote branch

# Reverting changes
git revert commit-hash                   # Create new commit that undoes changes
git revert HEAD                          # Revert last commit
git revert --no-commit commit-hash       # Revert without creating commit

# Cleaning repository
git clean -f                             # Remove untracked files
git clean -fd                            # Remove untracked files and directories
git clean -fx                            # Remove untracked and ignored files
git clean -n                             # Dry run (show what would be removed)

# ========== Git Workflow Examples ==========

# Feature branch workflow
git checkout main
git pull origin main
git checkout -b feature/user-auth
# ... make changes ...
git add .
git commit -m "Add user authentication"
git push -u origin feature/user-auth
# ... create pull request ...
git checkout main
git pull origin main
git branch -d feature/user-auth

# Hotfix workflow
git checkout main
git checkout -b hotfix/security-patch
# ... make critical fix ...
git add .
git commit -m "Fix security vulnerability"
git push -u origin hotfix/security-patch
# ... emergency merge to main ...
git checkout main
git merge hotfix/security-patch
git push origin main
git branch -d hotfix/security-patch

# Release workflow
git checkout main
git checkout -b release/v1.2.0
# ... update version numbers, final testing ...
git add .
git commit -m "Prepare release v1.2.0"
git checkout main
git merge release/v1.2.0
git tag -a v1.2.0 -m "Version 1.2.0"
git push origin main --tags
git branch -d release/v1.2.0

# ========== Conflict Resolution ==========

# When merge conflicts occur:
# 1. Git will mark conflicted files
# 2. Edit files to resolve conflicts
# 3. Remove conflict markers (<<<<<<<, =======, >>>>>>>)
# 4. Add resolved files
# 5. Complete the merge

git status                               # See conflicted files
# Edit files to resolve conflicts
git add conflicted-file.js
git commit                               # Complete the merge

# Using merge tools
git mergetool                            # Open configured merge tool
git mergetool --tool=vimdiff             # Use specific merge tool

# ========== Git Tags ==========

# Creating tags
git tag v1.0.0                           # Lightweight tag
git tag -a v1.0.0 -m "Version 1.0.0"    # Annotated tag
git tag -a v1.0.0 commit-hash -m "Version 1.0.0"  # Tag specific commit

# Listing and managing tags
git tag                                  # List all tags
git tag -l "v1.*"                        # List tags matching pattern
git show v1.0.0                          # Show tag information
git tag -d v1.0.0                        # Delete local tag
git push origin --delete v1.0.0          # Delete remote tag

# Pushing tags
git push origin v1.0.0                   # Push specific tag
git push origin --tags                   # Push all tags

# ========== Git Hooks ==========

# Common hooks (in .git/hooks/ directory)
# pre-commit: Run before each commit
# post-commit: Run after each commit
# pre-push: Run before push
# post-receive: Run on server after receiving push

# Example pre-commit hook (make executable)
#!/bin/sh
# .git/hooks/pre-commit

echo "Running pre-commit checks..."

# Run linting
npm run lint
if [ $? -ne 0 ]; then
    echo "Linting failed. Commit aborted."
    exit 1
fi

# Run tests
npm test
if [ $? -ne 0 ]; then
    echo "Tests failed. Commit aborted."
    exit 1
fi

echo "Pre-commit checks passed!"

# ========== Git Aliases and Shortcuts ==========

# Add to ~/.gitconfig or use git config --global
[alias]
    st = status
    co = checkout
    br = branch
    cm = commit
    cp = cherry-pick
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
    lg = log --oneline --graph --decorate --all
    adog = log --all --decorate --oneline --graph
    aliases = config --get-regexp alias
    amend = commit --amend --no-edit
    undo = reset --soft HEAD~1
    wipe = reset --hard HEAD~1
    save = stash push -m
    load = stash pop
    graph = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

# ========== Git Best Practices ==========

# Commit message conventions
# Format: <type>(<scope>): <subject>
# 
# Types: feat, fix, docs, style, refactor, test, chore
# Examples:
feat(auth): add user login functionality
fix(api): resolve token expiration issue
docs(readme): update installation instructions
style(css): fix indentation in main.css
refactor(utils): simplify date formatting function
test(user): add unit tests for user service
chore(deps): update dependencies to latest versions

# Branch naming conventions
feature/user-authentication
bugfix/login-error
hotfix/security-patch
release/v1.2.0
chore/update-dependencies

# Workflow best practices
# 1. Keep commits small and focused
# 2. Write descriptive commit messages
# 3. Test before committing
# 4. Use feature branches
# 5. Regular pulls from main branch
# 6. Clean up merged branches
# 7. Use .gitignore effectively
# 8. Don't commit sensitive data