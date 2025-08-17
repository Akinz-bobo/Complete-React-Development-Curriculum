# ========== Basic Navigation ==========

# Directory operations
pwd                          # Print working directory
ls                          # List files and directories
ls -la                      # List with details and hidden files
ls -lh                      # List with human-readable file sizes
ls -lt                      # List sorted by modification time
ls -lS                      # List sorted by file size
ls *.js                     # List JavaScript files only
ls src/                     # List contents of src directory

cd /path/to/directory       # Change directory (absolute path)
cd relative/path           # Change directory (relative path)
cd ..                      # Go up one directory
cd ~                       # Go to home directory
cd -                       # Go to previous directory
cd                         # Go to home directory (shortcut)

# File operations
touch filename.txt         # Create empty file or update timestamp
mkdir directory-name       # Create directory
mkdir -p path/to/nested/dir # Create nested directories
cp source.txt dest.txt     # Copy file
cp -r source-dir dest-dir  # Copy directory recursively
mv oldname.txt newname.txt # Rename/move file
rm filename.txt            # Delete file
rm -r directory/           # Delete directory recursively
rm -rf directory/          # Force delete directory (be careful!)
rmdir empty-directory/     # Remove empty directory

# File permissions
chmod 755 script.sh        # Change file permissions
chmod +x script.sh         # Make file executable
chown user:group file.txt  # Change file ownership

# ========== File Content Operations ==========

# Viewing files
cat file.txt               # Display entire file content
less file.txt              # View file with pagination (press q to quit)
more file.txt              # View file with pagination (older version)
head file.txt              # Show first 10 lines
head -n 5 file.txt         # Show first 5 lines
tail file.txt              # Show last 10 lines
tail -n 20 file.txt        # Show last 20 lines
tail -f logfile.txt        # Follow file changes (useful for logs)

# Searching in files
grep "search term" file.txt              # Search for text in file
grep -r "search term" directory/         # Search recursively in directory
grep -i "search term" file.txt           # Case-insensitive search
grep -n "search term" file.txt           # Show line numbers
grep -v "search term" file.txt           # Show lines that don't match
grep -E "pattern|another" file.txt       # Extended regex search
find . -name "*.js"                      # Find files by name pattern
find . -type f -name "*.txt"             # Find only files with .txt extension
find . -type d -name "node_modules"      # Find directories named node_modules
find . -size +1M                         # Find files larger than 1MB
find . -mtime -7                         # Find files modified in last 7 days

# Text processing
sort file.txt              # Sort lines alphabetically
sort -n numbers.txt        # Sort numerically
sort -r file.txt           # Sort in reverse order
uniq sorted-file.txt       # Remove duplicate lines (file must be sorted)
wc file.txt                # Count lines, words, and characters
wc -l file.txt             # Count lines only
cut -d',' -f1,3 data.csv   # Extract columns 1 and 3 from CSV
awk '{print $1}' file.txt  # Print first column of each line
sed 's/old/new/g' file.txt # Replace 'old' with 'new' globally

# ========== Input/Output Redirection ==========

# Redirecting output
command > file.txt         # Redirect output to file (overwrite)
command >> file.txt        # Redirect output to file (append)
command 2> error.log       # Redirect error output to file
command > output.txt 2>&1  # Redirect both output and errors to file

# Pipes (chain commands)
ls -la | grep ".js"        # List files and filter for .js files
cat file.txt | sort | uniq # Display, sort, and remove duplicates
ps aux | grep node        # Show processes and filter for node
history | grep git        # Search command history for git commands
cat access.log | grep "404" | wc -l  # Count 404 errors in log file

# Here documents
cat << EOF > config.txt
This is a multi-line
text that will be
written to config.txt
EOF

# ========== Process Management ==========

# Viewing processes
ps                         # Show running processes
ps aux                     # Show all processes with details
ps aux | grep node        # Find node processes
top                        # Real-time process viewer
htop                       # Enhanced process viewer (if installed)
jobs                       # Show background jobs

# Process control
command &                  # Run command in background
nohup command &            # Run command immune to hangups
Ctrl+Z                     # Suspend current process
bg                         # Resume suspended process in background
fg                         # Resume suspended process in foreground
kill PID                   # Terminate process by ID
kill -9 PID               # Force kill process
killall node              # Kill all processes named 'node'
pkill -f "node server"    # Kill processes matching pattern

# ========== Environment Variables ==========

# Working with environment variables
echo $HOME                 # Display HOME environment variable
echo $PATH                 # Display PATH environment variable
env                        # Show all environment variables
