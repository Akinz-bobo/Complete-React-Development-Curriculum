# 08. Git and Command Line Essentials 🎯

## Master Professional Development Tools

Git version control and command line proficiency are fundamental skills for every developer. This section will transform you from a GUI-dependent developer to a command-line power user who can manage code, collaborate effectively, and automate workflows. These skills are essential for professional development teams and open-source contributions.

## 🎓 Learning Objectives

By the end of this section, you will:
- Master command line navigation and file operations
- Understand Git fundamentals and advanced workflows
- Collaborate effectively with branching and merging strategies
- Manage project deployments and CI/CD basics
- Use shell scripting for automation tasks
- Build and deploy a Portfolio Website with Git workflow

## 📚 Topics Covered

### 1. Command Line Fundamentals
- Terminal/Command Prompt navigation and basics
- File and directory operations (ls, cd, mkdir, rm, cp, mv)
- File content operations (cat, head, tail, grep, find)
- Process management and system information
- Environment variables and PATH configuration

### 2. Git Basics
- Git installation and configuration
- Repository initialization and cloning
- Basic workflow (add, commit, push, pull)
- Working directory, staging area, and repository
- Git status and log interpretation

### 3. Branching and Merging
- Creating and switching branches
- Merge strategies (fast-forward, three-way merge)
- Handling merge conflicts resolution
- Branch management and cleanup
- Git flow and branching strategies

### 4. Remote Repositories
- Working with GitHub, GitLab, and other platforms
- Remote management (origin, upstream, multiple remotes)
- Collaboration workflows (fork, clone, pull request)
- SSH keys and authentication setup
- Repository settings and permissions

### 5. Advanced Git Operations
- Interactive staging and partial commits
- Stashing changes and work-in-progress management
- Rebasing and history rewriting
- Cherry-picking specific commits
- Git hooks and automation

### 6. Collaboration and Workflows
- Team collaboration best practices
- Code review processes and pull request etiquette
- Issue tracking and project management integration
- Release management and semantic versioning
- Open source contribution guidelines

### 7. Command Line Productivity
- Shell shortcuts and productivity tips
- Custom aliases and configuration
- Basic shell scripting for automation
- Package managers (npm, yarn, brew, apt)
- Development environment setup

## 🛠️ Files in This Section

- **`command-line-basics.md`** - Terminal navigation and file operations
- **`git-fundamentals.md`** - Core Git concepts and commands
- **`branching-merging.md`** - Advanced Git workflows
- **`collaboration-workflows.md`** - Team development practices
- **`automation-scripts/`** - Shell scripts for common tasks
- **`exercises.md`** - Hands-on practice scenarios
- **`portfolio-website-project/`** - Deploy a site with Git workflow

## 💡 Key Concepts to Master

### Command Line Navigation

```bash
# Directory navigation
pwd                    # Print working directory
cd /path/to/directory  # Change directory
cd ..                  # Go up one directory
cd ~                   # Go to home directory
cd -                   # Go to previous directory

# File and directory operations
ls -la                 # List all files with details
mkdir new-folder       # Create directory
mkdir -p path/to/deep/folder  # Create nested directories
rm file.txt            # Remove file
rm -rf folder/         # Remove directory recursively
cp source dest         # Copy file
mv old-name new-name   # Move/rename file

# File content operations
cat file.txt           # Display file content
head -n 10 file.txt    # Show first 10 lines
tail -f log.txt        # Follow file changes
grep "pattern" file.txt # Search for pattern
find . -name "*.js"    # Find JavaScript files
```

### Git Workflow Fundamentals

```bash
# Repository setup
git init                    # Initialize new repository
git clone <url>            # Clone existing repository
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Basic workflow
git status                 # Check repository status
git add file.txt          # Stage specific file
git add .                  # Stage all changes
git commit -m "message"    # Commit with message
git push origin main       # Push to remote
git pull origin main       # Pull latest changes

# Branch operations
git branch                 # List branches
git branch feature-branch  # Create new branch
git checkout feature-branch # Switch to branch
git checkout -b new-feature # Create and switch
git merge feature-branch   # Merge branch
git branch -d feature-branch # Delete branch
```

### Advanced Git Operations

```bash
# Stashing work-in-progress
git stash                  # Stash current changes
git stash list            # List all stashes
git stash pop             # Apply and remove latest stash
git stash apply stash@{0} # Apply specific stash

# Interactive operations
git add -i                # Interactive staging
git add -p               # Patch mode staging
git commit --amend       # Amend last commit
git rebase -i HEAD~3     # Interactive rebase

# History and investigation
git log --oneline        # Compact log
git log --graph --all    # Visual branch history
git show commit-hash     # Show specific commit
git blame file.txt       # Show line-by-line history
git diff HEAD~1          # Compare with previous commit
```

### Collaboration Workflows

```bash
# Fork and contribute workflow
git clone <your-fork-url>
git remote add upstream <original-repo-url>
git checkout -b feature-branch
# Make changes and commit
git push origin feature-branch
# Create pull request through web interface

# Keeping fork updated
git fetch upstream
git checkout main
git merge upstream/main
git push origin main

# Handling merge conflicts
git status               # See conflicted files
# Edit files to resolve conflicts
git add resolved-file.txt
git commit              # Complete the merge
```

## 🏗️ Project: Portfolio Website with Git Workflow

Build and deploy a professional portfolio website demonstrating complete Git workflow:

**Project Structure:**
```
portfolio-website/
├── README.md
├── .gitignore
├── package.json
├── src/
│   ├── index.html
│   ├── styles/
│   ├── scripts/
│   └── assets/
├── docs/              # GitHub Pages deployment
├── scripts/           # Automation scripts
└── .github/           # GitHub Actions CI/CD
    └── workflows/
```

**Development Workflow:**
1. **Setup**: Repository initialization and remote configuration
2. **Feature Branches**: Separate branches for each section/feature
3. **Code Review**: Pull request process with reviews
4. **Testing**: Automated testing with GitHub Actions
5. **Deployment**: Automatic deployment to GitHub Pages
6. **Maintenance**: Issue tracking and release management

**Git Workflow Features:**
- **Branching Strategy**: GitFlow with main, develop, feature branches
- **Commit Conventions**: Semantic commit messages
- **Code Review**: Pull request templates and review process
- **CI/CD Pipeline**: Automated testing and deployment
- **Release Management**: Tagged releases and changelog generation
- **Issue Tracking**: GitHub Issues integration

## 🎯 Real-World Development Scenarios

### Professional Team Workflow

```bash
# Daily development routine
git checkout develop
git pull origin develop          # Get latest changes
git checkout -b feature/user-auth # Create feature branch

# Work on feature
git add -A
git commit -m "feat: add user authentication"
git commit -m "test: add auth unit tests"
git commit -m "docs: update API documentation"

# Push and create pull request
git push origin feature/user-auth
# Create PR through web interface

# After review and approval
git checkout develop
git pull origin develop          # Get any new changes
git merge feature/user-auth      # Merge feature
git branch -d feature/user-auth  # Clean up local branch
git push origin --delete feature/user-auth # Clean up remote
```

### Release Management Process

```bash
# Prepare release
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# Update version numbers and changelog
npm version minor               # Update package.json version
git add .
git commit -m "chore: bump version to 1.2.0"

# Merge to main and tag
git checkout main
git merge release/v1.2.0
git tag -a v1.2.0 -m "Release version 1.2.0"
git push origin main --tags

# Merge back to develop
git checkout develop
git merge main
git branch -d release/v1.2.0
```

### Emergency Hotfix Workflow

```bash
# Critical bug in production
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# Fix the bug
git add .
git commit -m "fix: resolve critical security issue"

# Deploy hotfix
git checkout main
git merge hotfix/critical-bug
git tag -a v1.2.1 -m "Hotfix version 1.2.1"
git push origin main --tags

# Update develop branch
git checkout develop
git merge main
git branch -d hotfix/critical-bug
```

## 🚀 Getting Started

1. **Command Line**: Master basic terminal/command prompt operations
2. **Git Setup**: Install and configure Git with proper credentials
3. **Basic Workflow**: Practice add, commit, push, pull cycle
4. **Branching**: Learn branch creation, switching, and merging
5. **Remote Repos**: Connect to GitHub and manage remotes
6. **Collaboration**: Practice fork, clone, pull request workflow
7. **Automation**: Create scripts for common development tasks
8. **Build Project**: Develop and deploy portfolio website

## 🏆 Skills Development Levels

### Beginner Level
- [ ] Navigate command line confidently
- [ ] Use basic Git commands (add, commit, push, pull)
- [ ] Create and switch between branches
- [ ] Resolve simple merge conflicts

### Intermediate Level
- [ ] Implement proper branching strategies
- [ ] Use advanced Git features (stash, rebase, cherry-pick)
- [ ] Set up and manage remote repositories
- [ ] Collaborate through pull requests

### Advanced Level
- [ ] Design Git workflows for team collaboration
- [ ] Automate processes with shell scripts
- [ ] Set up CI/CD pipelines
- [ ] Manage complex project releases

## ✅ Section Completion Checklist

- [ ] Navigate command line efficiently
- [ ] Master core Git commands and concepts
- [ ] Understand branching and merging strategies
- [ ] Can resolve merge conflicts confidently
- [ ] Set up and manage remote repositories
- [ ] Collaborate effectively through pull requests
- [ ] Create basic automation scripts
- [ ] Complete the portfolio website project with full Git workflow
- [ ] Understand professional development practices
- [ ] Can teach Git concepts to others

## 🔗 Professional Development Impact

Git and command line skills provide:
- **Collaboration**: Essential for team development
- **Version Control**: Track and manage code changes
- **Backup and Recovery**: Protect against code loss
- **Code Quality**: Review and approval processes
- **Deployment**: Automated and reliable releases
- **Productivity**: Efficient development workflows
- **Career Growth**: Fundamental professional skills

## 🎯 Next Steps

After mastering Git and command line, you'll be ready for **Section 09: Progressive Projects**, where you'll build increasingly complex applications that demonstrate all the skills you've learned throughout the course.

**Pro Tip**: Git and command line mastery is what separates professional developers from beginners. These skills will serve you throughout your entire career and make you much more valuable to development teams!

---

**Ready to become a command line and Git master? Let's build professional development skills!** 🚀