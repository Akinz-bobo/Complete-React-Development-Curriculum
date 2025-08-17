# ========== Complex Git Scenarios ==========

# Scenario 1: Accidentally committed to wrong branch
git log --oneline -n 5                   # Find the commit hash
git reset --hard HEAD~1                  # Remove commit from current branch
git checkout correct-branch
git cherry-pick commit-hash               # Apply commit to correct branch

# Scenario 2: Need to split a large commit
git reset --soft HEAD~1                  # Undo commit but keep changes staged
git reset                                # Unstage all changes
git add file1.js                         # Stage files for first commit
git commit -m "First part of the change"
git add file2.js                         # Stage files for second commit
git commit -m "Second part of the change"

# Scenario 3: Fix commit message typos
git commit --amend -m "Correct commit message"  # Fix last commit message
# For older commits, use interactive rebase:
git rebase -i HEAD~3                      # Edit last 3 commits
# Change 'pick' to 'reword' for commits to edit

# Scenario 4: Combine multiple commits
git rebase -i HEAD~3                      # Interactive rebase
# Change 'pick' to 'squash' for commits to combine

# Scenario 5: Remove sensitive data from history
git filter-branch --tree-filter 'rm -f passwords.txt' HEAD
# Better approach with git-filter-repo:
git filter-repo --path passwords.txt --invert-paths

# Scenario 6: Recover deleted branch
git reflog                                # Find the commit hash
git checkout -b recovered-branch commit-hash

# Scenario 7: Undo a merge
git reset --hard HEAD~1                  # If merge hasn't been pushed
git revert -m 1 merge-commit-hash         # If merge has been pushed

# ========== Git Debugging ==========

# Find when a bug was introduced
git bisect start
git bisect bad HEAD                       # Current commit is bad
git bisect good v1.0.0                    # Last known good commit
# Git will checkout commits for testing
git bisect good                           # If current commit is good
git bisect bad                            # If current commit is bad
git bisect reset                          # End bisect session

# Find who changed what
git blame file.txt                        # Show who modified each line
git log -p file.txt                       # Show all changes to file
git log --follow file.txt                 # Track file through renames

# Search for content
git grep "function name"                  # Search for text in repository
git log -S "function name"                # Find commits that added/removed text
git log --grep="bug fix"                  # Search commit messages

# ========== Working with Multiple Remotes ==========

# Fork workflow
git clone https://github.com/yourname/fork.git
cd fork
git remote add upstream https://github.com/original/repo.git
git fetch upstream
git checkout main
git merge upstream/main
git push origin main

# Multiple environments
git remote add staging https://git.staging.com/repo.git
git remote add production https://git.production.com/repo.git
git push staging feature-branch
git push production main

# ========== Git Performance Tips ==========

# For large repositories
git config core.preloadindex true
git config core.fscache true
git config gc.auto 256

# Shallow clones for large repos
git clone --depth 1 https://github.com/user/large-repo.git

# Partial clones (Git 2.19+)
git clone --filter=blob:none https://github.com/user/repo.git

# ========== Git Maintenance ==========

# Clean up repository
git gc                                    # Garbage collection
git gc --aggressive                       # More thorough cleanup
git prune                                 # Remove unreachable objects
git fsck                                  # Check repository integrity

# Optimize repository
git repack -ad                            # Repack objects
git reflog expire --expire=90.days.ago --all  # Clean old reflog entries

# ========== Useful Git Scripts ==========

# Check if working directory is clean
#!/bin/bash
if [ -z "$(git status --porcelain)" ]; then
    echo "Working directory clean"
else
    echo "Uncommitted changes found"
    git status --short
fi

# Automated backup script
#!/bin/bash
git add .
git commit -m "Backup: $(date)"
git push origin backup-branch

# Branch cleanup script
#!/bin/bash
git branch --merged main | grep -v "main\|master" | xargs -n 1 git branch -d

# Pre-push validation script
#!/bin/bash
echo "Running pre-push validation..."
npm run lint && npm run test
if [ $? -eq 0 ]; then
    echo "Validation passed, pushing..."
    git push "$@"
else
    echo "Validation failed, push aborted!"
    exit 1
fi