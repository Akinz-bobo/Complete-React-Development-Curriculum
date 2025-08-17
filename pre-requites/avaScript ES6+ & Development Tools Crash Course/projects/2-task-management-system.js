/*
 * PROJECT 2: TASK MANAGEMENT SYSTEM
 * 
 * Concepts Tested:
 * - ES6 Classes with inheritance
 * - Symbols for private properties
 * - Advanced object destructuring
 * - Getters and setters
 * - Static methods
 * - Array methods (find, some, every)
 * - Object.assign, Object.entries
 * - Map and Set data structures
 */

// Symbols for private properties
const _tasks = Symbol('tasks');
const _users = Symbol('users');
const _projects = Symbol('projects');
const _nextId = Symbol('nextId');

// Enums using objects
const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  REVIEW: 'review',
  DONE: 'done'
};

const PRIORITY = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  URGENT: 4
};

const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  DEVELOPER: 'developer',
  DESIGNER: 'designer'
};

// Base class for common functionality
class BaseEntity {
  constructor(name, description = '') {
    this.id = this.generateId();
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static idCounter = 1;

  generateId() {
    return BaseEntity.idCounter++;
  }

  // Getter for formatted creation date
  get formattedCreatedAt() {
    return this.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Method to update entity
  update(updates) {
    Object.assign(this, updates, { updatedAt: new Date() });
    return this;
  }
}

// User class extending BaseEntity
class User extends BaseEntity {
  constructor(name, email, role = USER_ROLES.DEVELOPER) {
    super(name);
    this.email = email;
    this.role = role;
    this.assignedTasks = new Set();
  }

  // Getter for user permissions
  get permissions() {
    const rolePermissions = {
      [USER_ROLES.ADMIN]: ['create', 'read', 'update', 'delete', 'manage_users'],
      [USER_ROLES.MANAGER]: ['create', 'read', 'update', 'delete'],
      [USER_ROLES.DEVELOPER]: ['create', 'read', 'update'],
      [USER_ROLES.DESIGNER]: ['create', 'read', 'update']
    };
    return rolePermissions[this.role] || [];
  }

  // Method to check permissions
  hasPermission(permission) {
    return this.permissions.includes(permission);
  }

  // Add task to user's assigned tasks
  assignTask(taskId) {
    this.assignedTasks.add(taskId);
  }

  // Remove task from user's assigned tasks
  unassignTask(taskId) {
    this.assignedTasks.delete(taskId);
  }

  // Get number of assigned tasks
  get taskCount() {
    return this.assignedTasks.size;
  }
}

// Task class with advanced features
class Task extends BaseEntity {
  constructor({ name, description, assigneeId, projectId, priority = PRIORITY.MEDIUM, dueDate }) {
    super(name, description);
    this.assigneeId = assigneeId;
    this.projectId = projectId;
    this.priority = priority;
    this.status = TASK_STATUS.TODO;
    this.dueDate = dueDate ? new Date(dueDate) : null;
    this.comments = [];
    this.tags = new Set();
    this.estimatedHours = 0;
    this.actualHours = 0;
  }

  // Getter for priority label
  get priorityLabel() {
    const labels = {
      [PRIORITY.LOW]: 'Low',
      [PRIORITY.MEDIUM]: 'Medium', 
      [PRIORITY.HIGH]: 'High',
      [PRIORITY.URGENT]: 'Urgent'
    };
    return labels[this.priority];
  }

  // Getter for status emoji
  get statusEmoji() {
    const emojis = {
      [TASK_STATUS.TODO]: '📋',
      [TASK_STATUS.IN_PROGRESS]: '⚡',
      [TASK_STATUS.REVIEW]: '👀',
      [TASK_STATUS.DONE]: '✅'
    };
    return emojis[this.status];
  }

  // Setter for status with validation
  set taskStatus(newStatus) {
    const validStatuses = Object.values(TASK_STATUS);
    if (validStatuses.includes(newStatus)) {
      this.status = newStatus;
      this.updatedAt = new Date();
    } else {
      throw new Error(`Invalid status: ${newStatus}`);
    }
  }

  // Check if task is overdue
  get isOverdue() {
    return this.dueDate && this.dueDate < new Date() && this.status !== TASK_STATUS.DONE;
  }

  // Add comment to task
  addComment(userId, message) {
    const comment = {
      id: Date.now(),
      userId,
      message,
      timestamp: new Date()
    };
    this.comments.push(comment);
    return comment;
  }

  // Add tags using spread operator
  addTags(...newTags) {
    newTags.forEach(tag => this.tags.add(tag.toLowerCase()));
  }

  // Remove tags
  removeTags(...tagsToRemove) {
    tagsToRemove.forEach(tag => this.tags.delete(tag.toLowerCase()));
  }

  // Get formatted task info
  getFormattedInfo() {
    const { name, priorityLabel, statusEmoji, isOverdue } = this;
    const overdueText = isOverdue ? ' ⚠️ OVERDUE' : '';
    return `${statusEmoji} ${name} [${priorityLabel}]${overdueText}`;
  }
}

// Project class to group tasks
class Project extends BaseEntity {
  constructor(name, description, managerId) {
    super(name, description);
    this.managerId = managerId;
    this.memberIds = new Set([managerId]);
    this.taskIds = new Set();
    this.isActive = true;
  }

  // Add members using rest parameters
  addMembers(...userIds) {
    userIds.forEach(id => this.memberIds.add(id));
  }

  // Remove members
  removeMembers(...userIds) {
    userIds.forEach(id => this.memberIds.delete(id));
  }

  // Add tasks to project
  addTasks(...taskIds) {
    taskIds.forEach(id => this.taskIds.add(id));
  }

  // Get project member count
  get memberCount() {
    return this.memberIds.size;
  }

  // Get project task count
  get taskCount() {
    return this.taskIds.size;
  }
}

// Main Task Management System class
class TaskManagementSystem {
  constructor() {
    this[_tasks] = new Map();
    this[_users] = new Map();
    this[_projects] = new Map();
    this[_nextId] = 1;
  }

  // User management methods
  createUser({ name, email, role }) {
    const user = new User(name, email, role);
    this[_users].set(user.id, user);
    return user;
  }

  // Project management methods
  createProject({ name, description, managerId }) {
    const manager = this[_users].get(managerId);
    if (!manager) throw new Error('Manager not found');
    
    if (!manager.hasPermission('create')) {
      throw new Error('Insufficient permissions to create project');
    }

    const project = new Project(name, description, managerId);
    this[_projects].set(project.id, project);
    return project;
  }

  // Task management methods
  createTask(taskData) {
    const { assigneeId, projectId } = taskData;
    
    // Validate assignee and project exist
    if (assigneeId && !this[_users].has(assigneeId)) {
      throw new Error('Assignee not found');
    }
    
    if (projectId && !this[_projects].has(projectId)) {
      throw new Error('Project not found');
    }

    const task = new Task(taskData);
    this[_tasks].set(task.id, task);

    // Update relationships
    if (assigneeId) {
      this[_users].get(assigneeId).assignTask(task.id);
    }
    
    if (projectId) {
      this[_projects].get(projectId).addTasks(task.id);
    }

    return task;
  }

  // Update task with object destructuring
  updateTask(taskId, updates) {
    const task = this[_tasks].get(taskId);
    if (!task) throw new Error('Task not found');

    // Handle status change
    if (updates.status) {
      task.taskStatus = updates.status;
      delete updates.status; // Remove from updates to avoid direct assignment
    }

    // Handle assignee change
    if (updates.assigneeId !== undefined) {
      const oldAssigneeId = task.assigneeId;
      const newAssigneeId = updates.assigneeId;

      // Remove from old assignee
      if (oldAssigneeId && this[_users].has(oldAssigneeId)) {
        this[_users].get(oldAssigneeId).unassignTask(taskId);
      }

      // Add to new assignee
      if (newAssigneeId && this[_users].has(newAssigneeId)) {
        this[_users].get(newAssigneeId).assignTask(taskId);
      }
    }

    // Apply other updates
    Object.assign(task, updates, { updatedAt: new Date() });
    return task;
  }

  // Advanced filtering with object destructuring
  filterTasks({ 
    status = null, 
    priority = null, 
    assigneeId = null, 
    projectId = null, 
    overdue = false,
    tags = [] 
  } = {}) {
    
    return [...this[_tasks].values()].filter(task => {
      // Status filter
      if (status && task.status !== status) return false;
      
      // Priority filter
      if (priority && task.priority !== priority) return false;
      
      // Assignee filter
      if (assigneeId && task.assigneeId !== assigneeId) return false;
      
      // Project filter
      if (projectId && task.projectId !== projectId) return false;
      
      // Overdue filter
      if (overdue && !task.isOverdue) return false;
      
      // Tags filter (task must have all specified tags)
      if (tags.length > 0) {
        const hasAllTags = tags.every(tag => task.tags.has(tag.toLowerCase()));
        if (!hasAllTags) return false;
      }
      
      return true;
    });
  }

  // Get task statistics using array methods
  getTaskStatistics() {
    const tasks = [...this[_tasks].values()];
    
    const stats = {
      total: tasks.length,
      byStatus: {},
      byPriority: {},
      overdue: tasks.filter(task => task.isOverdue).length,
      completed: tasks.filter(task => task.status === TASK_STATUS.DONE).length
    };

    // Count by status
    Object.values(TASK_STATUS).forEach(status => {
      stats.byStatus[status] = tasks.filter(task => task.status === status).length;
    });

    // Count by priority
    Object.values(PRIORITY).forEach(priority => {
      stats.byPriority[priority] = tasks.filter(task => task.priority === priority).length;
    });

    return stats;
  }

  // Get user workload analysis
  getUserWorkload() {
    const users = [...this[_users].values()];
    
    return users.map(user => {
      const userTasks = [...user.assignedTasks].map(taskId => this[_tasks].get(taskId));
      const activeTasks = userTasks.filter(task => task.status !== TASK_STATUS.DONE);
      
      return {
        userId: user.id,
        name: user.name,
        role: user.role,
        totalTasks: userTasks.length,
        activeTasks: activeTasks.length,
        overdueTasks: activeTasks.filter(task => task.isOverdue).length,
        highPriorityTasks: activeTasks.filter(task => task.priority >= PRIORITY.HIGH).length
      };
    });
  }

  // Project progress report using advanced array methods
  getProjectProgress(projectId) {
    const project = this[_projects].get(projectId);
    if (!project) throw new Error('Project not found');

    const projectTasks = [...project.taskIds].map(taskId => this[_tasks].get(taskId));
    
    const progress = {
      projectName: project.name,
      totalTasks: projectTasks.length,
      completedTasks: projectTasks.filter(task => task.status === TASK_STATUS.DONE).length,
      inProgressTasks: projectTasks.filter(task => task.status === TASK_STATUS.IN_PROGRESS).length,
      overdueTasks: projectTasks.filter(task => task.isOverdue).length
    };

    progress.completionPercentage = progress.totalTasks > 0 
      ? Math.round((progress.completedTasks / progress.totalTasks) * 100)
      : 0;

    return progress;
  }

  // Export data using spread operator and object manipulation
  exportData() {
    return {
      users: [...this[_users].values()].map(user => ({
        ...user,
        assignedTasks: [...user.assignedTasks]
      })),
      projects: [...this[_projects].values()].map(project => ({
        ...project,
        memberIds: [...project.memberIds],
        taskIds: [...project.taskIds]
      })),
      tasks: [...this[_tasks].values()].map(task => ({
        ...task,
        tags: [...task.tags]
      }))
    };
  }

  // Search functionality with multiple criteria
  searchTasks(query, { includeCompleted = false, searchInComments = false } = {}) {
    const tasks = [...this[_tasks].values()];
    const searchTerm = query.toLowerCase();

    return tasks.filter(task => {
      // Skip completed tasks if not included
      if (!includeCompleted && task.status === TASK_STATUS.DONE) {
        return false;
      }

      // Search in task name and description
      const inNameOrDescription = 
        task.name.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm);

      // Search in tags
      const inTags = [...task.tags].some(tag => tag.includes(searchTerm));

      // Search in comments if enabled
      const inComments = searchInComments && 
        task.comments.some(comment => comment.message.toLowerCase().includes(searchTerm));

      return inNameOrDescription || inTags || inComments;
    });
  }
}

// Demo usage
console.log('📋 TASK MANAGEMENT SYSTEM DEMO\n');

const tms = new TaskManagementSystem();

// Create users with different roles
const admin = tms.createUser({ 
  name: 'Alice Admin', 
  email: 'alice@company.com', 
  role: USER_ROLES.ADMIN 
});

const manager = tms.createUser({ 
  name: 'Bob Manager', 
  email: 'bob@company.com', 
  role: USER_ROLES.MANAGER 
});

const developer1 = tms.createUser({ 
  name: 'Charlie Dev', 
  email: 'charlie@company.com', 
  role: USER_ROLES.DEVELOPER 
});

const developer2 = tms.createUser({ 
  name: 'Diana Dev', 
  email: 'diana@company.com', 
  role: USER_ROLES.DEVELOPER 
});

console.log('👥 Users created:');
[admin, manager, developer1, developer2].forEach(user => {
  console.log(`- ${user.name} (${user.role}) - Permissions: ${user.permissions.join(', ')}`);
});
console.log();

// Create projects
const webProject = tms.createProject({
  name: 'E-commerce Website',
  description: 'Build a modern e-commerce platform',
  managerId: manager.id
});

const mobileProject = tms.createProject({
  name: 'Mobile App',
  description: 'iOS and Android app development',
  managerId: manager.id
});

// Add team members to projects
webProject.addMembers(developer1.id, developer2.id);
mobileProject.addMembers(developer1.id);

console.log('🚀 Projects created:');
console.log(`- ${webProject.name}: ${webProject.memberCount} members, ${webProject.taskCount} tasks`);
console.log(`- ${mobileProject.name}: ${mobileProject.memberCount} members, ${mobileProject.taskCount} tasks`);
console.log();

// Create tasks with different properties
const tasks = [
  tms.createTask({
    name: 'Setup development environment',
    description: 'Configure webpack, babel, and testing framework',
    assigneeId: developer1.id,
    projectId: webProject.id,
    priority: PRIORITY.HIGH,
    dueDate: '2024-02-01'
  }),
  
  tms.createTask({
    name: 'Design user authentication system',
    description: 'Create login/register flow with validation',
    assigneeId: developer2.id,
    projectId: webProject.id,
    priority: PRIORITY.MEDIUM,
    dueDate: '2024-02-15'
  }),
  
  tms.createTask({
    name: 'Implement shopping cart functionality',
    description: 'Add, remove, update cart items with persistence',
    assigneeId: developer1.id,
    projectId: webProject.id,
    priority: PRIORITY.HIGH,
    dueDate: '2024-01-15' // Overdue task
  }),
  
  tms.createTask({
    name: 'Mobile app wireframes',
    description: 'Create wireframes for all app screens',
    assigneeId: developer1.id,
    projectId: mobileProject.id,
    priority: PRIORITY.LOW,
    dueDate: '2024-03-01'
  })
];

// Add tags and comments to tasks
tasks[0].addTags('setup', 'configuration', 'tools');
tasks[1].addTags('authentication', 'security', 'forms');
tasks[2].addTags('cart', 'ecommerce', 'javascript');
tasks[3].addTags('mobile', 'design', 'wireframes');

// Add comments
tasks[0].addComment(manager.id, 'Make sure to include Jest for testing');
tasks[1].addComment(developer1.id, 'Should we use JWT for authentication?');
tasks[2].addComment(manager.id, 'This is blocking other features, please prioritize');

// Update some task statuses
tms.updateTask(tasks[0].id, { status: TASK_STATUS.IN_PROGRESS });
tms.updateTask(tasks[1].id, { status: TASK_STATUS.REVIEW });

console.log('📝 Tasks created and updated:');
tasks.forEach(task => {
  console.log(`- ${task.getFormattedInfo()}`);
  if (task.tags.size > 0) {
    console.log(`  Tags: ${[...task.tags].join(', ')}`);
  }
  if (task.comments.length > 0) {
    console.log(`  Comments: ${task.comments.length}`);
  }
});
console.log();

// Demonstrate filtering with object destructuring
console.log('🔍 Task Filtering Examples:');

const highPriorityTasks = tms.filterTasks({ priority: PRIORITY.HIGH });
console.log(`High priority tasks: ${highPriorityTasks.length}`);
highPriorityTasks.forEach(task => console.log(`  - ${task.name}`));

const overdueTasks = tms.filterTasks({ overdue: true });
console.log(`Overdue tasks: ${overdueTasks.length}`);
overdueTasks.forEach(task => console.log(`  - ${task.name}`));

const developer1Tasks = tms.filterTasks({ assigneeId: developer1.id });
console.log(`Tasks assigned to ${developer1.name}: ${developer1Tasks.length}`);
console.log();

// Show statistics
console.log('📊 Task Statistics:');
const stats = tms.getTaskStatistics();
console.log(`Total tasks: ${stats.total}`);
console.log(`Completed: ${stats.completed}`);
console.log(`Overdue: ${stats.overdue}`);
console.log('By Status:', Object.entries(stats.byStatus).map(([status, count]) => `${status}: ${count}`).join(', '));
console.log();

// User workload analysis
console.log('👤 User Workload Analysis:');
const workload = tms.getUserWorkload();
workload.forEach(({ name, role, totalTasks, activeTasks, overdueTasks, highPriorityTasks }) => {
  console.log(`${name} (${role}): ${activeTasks}/${totalTasks} active tasks, ${overdueTasks} overdue, ${highPriorityTasks} high priority`);
});
console.log();

// Project progress
console.log('📈 Project Progress:');
const webProgress = tms.getProjectProgress(webProject.id);
console.log(`${webProgress.projectName}: ${webProgress.completionPercentage}% complete (${webProgress.completedTasks}/${webProgress.totalTasks} tasks)`);

const mobileProgress = tms.getProjectProgress(mobileProject.id);
console.log(`${mobileProgress.projectName}: ${mobileProgress.completionPercentage}% complete (${mobileProgress.completedTasks}/${mobileProgress.totalTasks} tasks)`);
console.log();

// Search functionality
console.log('🔎 Search Results for "authentication":');
const searchResults = tms.searchTasks('authentication', { searchInComments: true });
searchResults.forEach(task => console.log(`  - ${task.name}`));

console.log('\n🎉 Task Management System Demo Complete!');