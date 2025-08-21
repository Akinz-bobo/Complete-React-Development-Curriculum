/*
 * PROJECT 4: REAL-TIME CHAT SIMULATOR
 *
 * Concepts Tested:
 * - Advanced ES6 Classes with inheritance
 * - Modules and import/export simulation
 * - Generators for message streaming
 * - Proxies for reactive data
 * - WeakMap and WeakSet for private data
 * - Symbols for private methods
 * - Advanced async patterns
 * - Event-driven architecture
 * - Complex state management
 * - Iterator and iterable protocols
 * - Template literals with tagged templates
 * - Advanced destructuring patterns
 */

// ===== UTILITY MODULES (simulated imports) =====

// Event Emitter utility class
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
    return () => this.off(event, listener); // Return unsubscribe function
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach((listener) => {
        try {
          listener(...args);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }
}

// Private symbols for encapsulation
const _messages = Symbol("messages");
const _users = Symbol("users");
const _rooms = Symbol("rooms");
const _privateData = Symbol("privateData");
const _generateId = Symbol("generateId");
const _validatePermissions = Symbol("validatePermissions");

// WeakMap for storing private instance data
const privateInstances = new WeakMap();

// Message types enum
const MESSAGE_TYPES = {
  TEXT: "text",
  IMAGE: "image",
  FILE: "file",
  SYSTEM: "system",
  TYPING: "typing",
  REACTION: "reaction",
};

const USER_STATUS = {
  ONLINE: "online",
  AWAY: "away",
  BUSY: "busy",
  OFFLINE: "offline",
};

const ROOM_TYPES = {
  PUBLIC: "public",
  PRIVATE: "private",
  DIRECT: "direct",
};

// Tagged template literal for message formatting
function formatMessage(strings, ...values) {
  const timestamp = new Date().toLocaleTimeString();
  return (
    strings.reduce((result, string, i) => {
      const value = values[i]
        ? `<span class="highlight">${values[i]}</span>`
        : "";
      return result + string + value;
    }, "") + ` <span class="timestamp">[${timestamp}]</span>`
  );
}

// Base User class with advanced features
class User {
  constructor(username, { email = "", avatar = "", role = "member" } = {}) {
    this.id = this[_generateId]();
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.role = role;
    this.status = USER_STATUS.ONLINE;
    this.lastSeen = new Date();
    this.joinedAt = new Date();

    // Private data using WeakMap
    privateInstances.set(this, {
      settings: {
        notifications: true,
        soundEnabled: true,
        theme: "light",
      },
      blockedUsers: new Set(),
      mutedRooms: new Set(),
    });

    // Proxy for reactive properties
    return new Proxy(this, {
      set(target, property, value) {
        const oldValue = target[property];
        target[property] = value;

        // Emit change events for specific properties
        if (["status", "username"].includes(property) && oldValue !== value) {
          target.emit?.("userUpdated", { property, oldValue, newValue: value });
        }

        return true;
      },
    });
  }

  [_generateId]() {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Getter for private settings
  get settings() {
    return privateInstances.get(this)?.settings || {};
  }

  // Update user settings
  updateSettings(newSettings) {
    const privateData = privateInstances.get(this);
    if (privateData) {
      Object.assign(privateData.settings, newSettings);
    }
  }

  // Block/unblock users
  blockUser(userId) {
    const privateData = privateInstances.get(this);
    privateData?.blockedUsers.add(userId);
  }

  unblockUser(userId) {
    const privateData = privateInstances.get(this);
    privateData?.blockedUsers.delete(userId);
  }

  isBlocked(userId) {
    const privateData = privateInstances.get(this);
    return privateData?.blockedUsers.has(userId) || false;
  }

  // Mute/unmute rooms
  muteRoom(roomId) {
    const privateData = privateInstances.get(this);
    privateData?.mutedRooms.add(roomId);
  }

  unmuteRoom(roomId) {
    const privateData = privateInstances.get(this);
    privateData?.mutedRooms.delete(roomId);
  }

  isRoomMuted(roomId) {
    const privateData = privateInstances.get(this);
    return privateData?.mutedRooms.has(roomId) || false;
  }

  // Update status with automatic last seen
  setStatus(status) {
    if (Object.values(USER_STATUS).includes(status)) {
      this.status = status;
      this.lastSeen = new Date();
    }
  }

  // Get formatted user info
  getDisplayInfo() {
    const statusEmoji = {
      [USER_STATUS.ONLINE]: "🟢",
      [USER_STATUS.AWAY]: "🟡",
      [USER_STATUS.BUSY]: "🔴",
      [USER_STATUS.OFFLINE]: "⚫",
    };

    return {
      id: this.id,
      username: this.username,
      status: this.status,
      statusEmoji: statusEmoji[this.status],
      lastSeen: this.lastSeen,
      isActive: this.status !== USER_STATUS.OFFLINE,
    };
  }
}

// Advanced Message class with reactions and threading
class Message {
  constructor({
    content,
    senderId,
    roomId,
    type = MESSAGE_TYPES.TEXT,
    replyTo = null,
  }) {
    this.id = this[_generateId]();
    this.content = content;
    this.senderId = senderId;
    this.roomId = roomId;
    this.type = type;
    this.timestamp = new Date();
    this.edited = false;
    this.editedAt = null;
    this.replyTo = replyTo;
    this.reactions = new Map(); // emoji -> Set of user IDs
    this.threadMessages = [];
    this.metadata = {};
  }

  [_generateId]() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Add reaction to message
  addReaction(emoji, userId) {
    if (!this.reactions.has(emoji)) {
      this.reactions.set(emoji, new Set());
    }
    this.reactions.get(emoji).add(userId);
  }

  // Remove reaction
  removeReaction(emoji, userId) {
    if (this.reactions.has(emoji)) {
      this.reactions.get(emoji).delete(userId);
      if (this.reactions.get(emoji).size === 0) {
        this.reactions.delete(emoji);
      }
    }
  }

  // Get reaction summary
  getReactionSummary() {
    const summary = {};
    this.reactions.forEach((userIds, emoji) => {
      summary[emoji] = {
        count: userIds.size,
        users: [...userIds],
      };
    });
    return summary;
  }

  // Edit message content
  edit(newContent, userId) {
    if (this.senderId === userId) {
      this.content = newContent;
      this.edited = true;
      this.editedAt = new Date();
      return true;
    }
    return false;
  }

  // Add to thread
  addToThread(message) {
    this.threadMessages.push(message);
  }

  // Get formatted message
  getFormattedContent() {
    const editedText = this.edited ? " (edited)" : "";
    const reactionText =
      this.reactions.size > 0
        ? ` [${[...this.reactions.keys()].join("")}]`
        : "";

    return `${this.content}${editedText}${reactionText}`;
  }
}

// Chat Room class with advanced features
class ChatRoom extends EventEmitter {
  constructor(
    name,
    { type = ROOM_TYPES.PUBLIC, description = "", maxUsers = 100 } = {}
  ) {
    super();
    this.id = this[_generateId]();
    this.name = name;
    this.type = type;
    this.description = description;
    this.maxUsers = maxUsers;
    this.createdAt = new Date();

    this[_messages] = [];
    this[_users] = new Map();

    // Private room data
    privateInstances.set(this, {
      moderators: new Set(),
      bannedUsers: new Set(),
      settings: {
        allowImages: true,
        allowFiles: true,
        messageHistoryLimit: 1000,
        slowMode: 0, // seconds between messages
      },
    });
  }

  [_generateId]() {
    return `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  [_validatePermissions](userId, action) {
    const privateData = privateInstances.get(this);
    const user = this[_users].get(userId);

    if (!user) return false;
    if (privateData?.bannedUsers.has(userId)) return false;

    const isModerator = privateData?.moderators.has(userId);
    const isOwner = user.role === "owner";

    switch (action) {
      case "moderate":
        return isModerator || isOwner;
      case "send":
        return true; // All joined users can send
      case "manage":
        return isOwner;
      default:
        return false;
    }
  }

  // Join room
  async addUser(user) {
    if (this[_users].size >= this.maxUsers) {
      throw new Error("Room is full");
    }

    if (this[_users].has(user.id)) {
      throw new Error("User already in room");
    }

    const privateData = privateInstances.get(this);
    if (privateData?.bannedUsers.has(user.id)) {
      throw new Error("User is banned from this room");
    }

    this[_users].set(user.id, user);

    // Send system message
    const joinMessage = new Message({
      content: `${user.username} joined the room`,
      senderId: "system",
      roomId: this.id,
      type: MESSAGE_TYPES.SYSTEM,
    });

    this.addMessage(joinMessage);
    this.emit("userJoined", { user, room: this });

    return true;
  }

  // Leave room
  removeUser(userId) {
    const user = this[_users].get(userId);
    if (!user) return false;

    this[_users].delete(userId);

    const leaveMessage = new Message({
      content: `${user.username} left the room`,
      senderId: "system",
      roomId: this.id,
      type: MESSAGE_TYPES.SYSTEM,
    });

    this.addMessage(leaveMessage);
    this.emit("userLeft", { user, room: this });

    return true;
  }

  // Add message to room
  addMessage(message) {
    // Validate permissions
    if (
      message.type !== MESSAGE_TYPES.SYSTEM &&
      !this[_validatePermissions](message.senderId, "send")
    ) {
      throw new Error("Insufficient permissions to send message");
    }

    this[_messages].push(message);

    // Limit message history
    const privateData = privateInstances.get(this);
    const limit = privateData?.settings.messageHistoryLimit || 1000;

    if (this[_messages].length > limit) {
      this[_messages].splice(0, this[_messages].length - limit);
    }

    this.emit("newMessage", { message, room: this });
  }

  // Get recent messages with pagination
  getMessages({ limit = 50, before = null, after = null } = {}) {
    let messages = [...this[_messages]];

    if (before) {
      const beforeIndex = messages.findIndex((m) => m.id === before);
      if (beforeIndex > 0) {
        messages = messages.slice(0, beforeIndex);
      }
    }

    if (after) {
      const afterIndex = messages.findIndex((m) => m.id === after);
      if (afterIndex >= 0) {
        messages = messages.slice(afterIndex + 1);
      }
    }

    return messages.slice(-limit);
  }

  // Search messages
  searchMessages(query, { type = null, userId = null, since = null } = {}) {
    return this[_messages].filter((message) => {
      // Text search
      if (!message.content.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      // Type filter
      if (type && message.type !== type) return false;

      // User filter
      if (userId && message.senderId !== userId) return false;

      // Date filter
      if (since && message.timestamp < since) return false;

      return true;
    });
  }

  // Get room statistics
  getStatistics() {
    const messages = this[_messages];
    const users = this[_users];

    const messagesByUser = new Map();
    const messagesByType = new Map();

    messages.forEach((message) => {
      // Count by user
      messagesByUser.set(
        message.senderId,
        (messagesByUser.get(message.senderId) || 0) + 1
      );

      // Count by type
      messagesByType.set(
        message.type,
        (messagesByType.get(message.type) || 0) + 1
      );
    });

    return {
      totalMessages: messages.length,
      totalUsers: users.size,
      activeUsers: [...users.values()].filter(
        (u) => u.status === USER_STATUS.ONLINE
      ).length,
      messagesByUser: Object.fromEntries(messagesByUser),
      messagesByType: Object.fromEntries(messagesByType),
      oldestMessage: messages[0]?.timestamp,
      newestMessage: messages[messages.length - 1]?.timestamp,
    };
  }

  // Get user list
  getUsers() {
    return [...this[_users].values()];
  }

  // Moderation methods
  addModerator(userId) {
    const privateData = privateInstances.get(this);
    privateData?.moderators.add(userId);
  }

  banUser(userId, moderatorId) {
    if (!this[_validatePermissions](moderatorId, "moderate")) {
      throw new Error("Insufficient permissions to ban user");
    }

    const privateData = privateInstances.get(this);
    privateData?.bannedUsers.add(userId);
    this.removeUser(userId);
  }
}

// Message streaming generator
function* messageStreamGenerator(messages) {
  let index = 0;

  while (index < messages.length) {
    const message = messages[index];
    yield {
      message,
      index,
      hasMore: index < messages.length - 1,
      progress: ((index + 1) / messages.length) * 100,
    };
    index++;
  }
}

// Typing indicator manager
class TypingIndicatorManager {
  constructor() {
    this.typingUsers = new Map(); // roomId -> Map(userId -> timeout)
  }

  startTyping(roomId, userId, timeout = 3000) {
    if (!this.typingUsers.has(roomId)) {
      this.typingUsers.set(roomId, new Map());
    }

    const roomTyping = this.typingUsers.get(roomId);

    // Clear existing timeout
    if (roomTyping.has(userId)) {
      clearTimeout(roomTyping.get(userId));
    }

    // Set new timeout
    const timeoutId = setTimeout(() => {
      this.stopTyping(roomId, userId);
    }, timeout);

    roomTyping.set(userId, timeoutId);
  }

  stopTyping(roomId, userId) {
    if (this.typingUsers.has(roomId)) {
      const roomTyping = this.typingUsers.get(roomId);
      if (roomTyping.has(userId)) {
        clearTimeout(roomTyping.get(userId));
        roomTyping.delete(userId);
      }
    }
  }

  getTypingUsers(roomId) {
    return this.typingUsers.has(roomId)
      ? [...this.typingUsers.get(roomId).keys()]
      : [];
  }
}

// Main Chat Application class
class ChatApplication extends EventEmitter {
  constructor() {
    super();
    this[_users] = new Map();
    this[_rooms] = new Map();
    this.typingManager = new TypingIndicatorManager();
    this.messageQueue = [];
    this.isProcessingQueue = false;

    // Start message processing
    this.processMessageQueue();
  }

  // User management
  createUser(username, options = {}) {
    const user = new User(username, options);
    this[_users].set(user.id, user);
    this.emit("userCreated", user);
    return user;
  }

  getUser(userId) {
    return this[_users].get(userId);
  }

  getAllUsers() {
    return [...this[_users].values()];
  }

  // Room management
  createRoom(name, options = {}) {
    const room = new ChatRoom(name, options);
    this[_rooms].set(room.id, room);

    // Listen to room events
    room.on("newMessage", ({ message, room }) => {
      this.emit("messageReceived", { message, room });
    });

    room.on("userJoined", ({ user, room }) => {
      this.emit("userJoinedRoom", { user, room });
    });

    this.emit("roomCreated", room);
    return room;
  }

  getRoom(roomId) {
    return this[_rooms].get(roomId);
  }

  getAllRooms() {
    return [...this[_rooms].values()];
  }

  // Message sending with queue
  async sendMessage(roomId, userId, content, options = {}) {
    const { type = MESSAGE_TYPES.TEXT, replyTo = null } = options;

    const room = this.getRoom(roomId);
    const user = this.getUser(userId);

    if (!room) throw new Error("Room not found");
    if (!user) throw new Error("User not found");

    const message = new Message({
      content,
      senderId: userId,
      roomId,
      type,
      replyTo,
    });

    // Add to processing queue
    this.messageQueue.push({ room, message });

    return message;
  }

  // Process message queue (simulates async processing)
  async processMessageQueue() {
    if (this.isProcessingQueue) return;

    this.isProcessingQueue = true;

    while (this.messageQueue.length > 0) {
      const { room, message } = this.messageQueue.shift();

      try {
        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 10));

        room.addMessage(message);

        // Stop typing indicator
        this.typingManager.stopTyping(room.id, message.senderId);
      } catch (error) {
        console.error("Failed to process message:", error);
        this.emit("messageError", { message, error });
      }
    }

    this.isProcessingQueue = false;

    // Continue processing if more messages arrived
    if (this.messageQueue.length > 0) {
      setTimeout(() => this.processMessageQueue(), 0);
    }
  }

  // Advanced message retrieval with generators
  async *getMessageStream(roomId, options = {}) {
    const room = this.getRoom(roomId);
    if (!room) return;

    const messages = room.getMessages(options);

    for (const streamItem of messageStreamGenerator(messages)) {
      // Simulate streaming delay
      await new Promise((resolve) => setTimeout(resolve, 50));
      yield streamItem;
    }
  }

  // Bulk operations
  async sendBulkMessages(roomId, userId, messages) {
    const results = [];

    for (const messageContent of messages) {
      try {
        const message = await this.sendMessage(roomId, userId, messageContent);
        results.push({ success: true, message });
      } catch (error) {
        results.push({
          success: false,
          error: error.message,
          content: messageContent,
        });
      }
    }

    return results;
  }

  // Search across all rooms
  globalSearch(query, options = {}) {
    const { roomIds = null, userId = null, messageType = null } = options;
    const results = new Map(); // roomId -> messages

    const roomsToSearch = roomIds
      ? roomIds.map((id) => this.getRoom(id)).filter(Boolean)
      : this.getAllRooms();

    roomsToSearch.forEach((room) => {
      const messages = room.searchMessages(query, {
        type: messageType,
        userId,
      });

      if (messages.length > 0) {
        results.set(room.id, {
          room: room,
          messages: messages,
          count: messages.length,
        });
      }
    });

    return results;
  }

  // Analytics and reporting
  generateAnalyticsReport(timeframe = "24h") {
    const cutoffTime = new Date();

    switch (timeframe) {
      case "1h":
        cutoffTime.setHours(cutoffTime.getHours() - 1);
        break;
      case "24h":
        cutoffTime.setDate(cutoffTime.getDate() - 1);
        break;
      case "7d":
        cutoffTime.setDate(cutoffTime.getDate() - 7);
        break;
      default:
        cutoffTime.setDate(cutoffTime.getDate() - 1);
    }

    const report = {
      timeframe,
      totalUsers: this[_users].size,
      totalRooms: this[_rooms].size,
      activeUsers: 0,
      totalMessages: 0,
      messagesByRoom: {},
      userActivity: {},
      popularRooms: [],
      busyHours: new Array(24).fill(0),
    };

    // Calculate statistics
    this.getAllUsers().forEach((user) => {
      if (user.status === USER_STATUS.ONLINE) {
        report.activeUsers++;
      }
    });

    this.getAllRooms().forEach((room) => {
      const stats = room.getStatistics();
      const recentMessages = room
        .getMessages()
        .filter((msg) => msg.timestamp >= cutoffTime);

      report.totalMessages += recentMessages.length;
      report.messagesByRoom[room.name] = recentMessages.length;

      // Track message distribution by hour
      recentMessages.forEach((msg) => {
        const hour = msg.timestamp.getHours();
        report.busyHours[hour]++;
      });
    });

    // Sort rooms by activity
    report.popularRooms = Object.entries(report.messagesByRoom)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, messageCount: count }));

    return report;
  }

  // Export data for backup/migration
  exportData() {
    const userData = [...this[_users].values()].map((user) => ({
      ...user.getDisplayInfo(),
      settings: user.settings,
    }));

    const roomData = [...this[_rooms].values()].map((room) => ({
      id: room.id,
      name: room.name,
      type: room.type,
      description: room.description,
      createdAt: room.createdAt,
      users: room.getUsers().map((u) => u.id),
      messages: room.getMessages().map((msg) => ({
        id: msg.id,
        content: msg.content,
        senderId: msg.senderId,
        timestamp: msg.timestamp,
        type: msg.type,
        reactions: Object.fromEntries(msg.reactions),
      })),
      statistics: room.getStatistics(),
    }));

    return {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      users: userData,
      rooms: roomData,
      totalUsers: userData.length,
      totalRooms: roomData.length,
      totalMessages: roomData.reduce(
        (sum, room) => sum + room.messages.length,
        0
      ),
    };
  }
}

// Demo usage and comprehensive testing
async function demonstrateChatApplication() {
  console.log("💬 REAL-TIME CHAT SIMULATOR DEMO\n");

  const chat = new ChatApplication();

  // Create users with different roles
  console.log("=== 1. CREATING USERS ===");
  const alice = chat.createUser("Alice", {
    email: "alice@chat.com",
    role: "admin",
  });

  const bob = chat.createUser("Bob", {
    email: "bob@chat.com",
    role: "moderator",
  });

  const charlie = chat.createUser("Charlie", {
    email: "charlie@chat.com",
  });

  const diana = chat.createUser("Diana", {
    email: "diana@chat.com",
  });

  console.log(`✅ Created ${chat.getAllUsers().length} users:`);
  chat.getAllUsers().forEach((user) => {
    const info = user.getDisplayInfo();
    console.log(`   ${info.statusEmoji} ${info.username} (${user.role})`);
  });
  console.log();

  // Create different types of rooms
  console.log("=== 2. CREATING CHAT ROOMS ===");
  const generalRoom = chat.createRoom("General Discussion", {
    type: ROOM_TYPES.PUBLIC,
    description: "Main chat room for everyone",
    maxUsers: 50,
  });

  const devRoom = chat.createRoom("Development Team", {
    type: ROOM_TYPES.PRIVATE,
    description: "Private room for developers",
    maxUsers: 10,
  });

  const randomRoom = chat.createRoom("Random", {
    type: ROOM_TYPES.PUBLIC,
    description: "Off-topic discussions",
  });

  console.log(`✅ Created ${chat.getAllRooms().length} rooms:`);
  chat.getAllRooms().forEach((room) => {
    console.log(`   🏠 ${room.name} (${room.type}) - ${room.description}`);
  });
  console.log();

  // Join users to rooms
  console.log("=== 3. JOINING ROOMS ===");
  await generalRoom.addUser(alice);
  await generalRoom.addUser(bob);
  await generalRoom.addUser(charlie);
  await generalRoom.addUser(diana);

  await devRoom.addUser(alice);
  await devRoom.addUser(bob);

  await randomRoom.addUser(charlie);
  await randomRoom.addUser(diana);

  console.log("✅ Users joined rooms successfully");
  console.log();

  // Send various types of messages
  console.log("=== 4. SENDING MESSAGES ===");
  const messages = [
    {
      roomId: generalRoom.id,
      userId: alice.id,
      content: "Hello everyone! Welcome to the chat!",
    },
    {
      roomId: generalRoom.id,
      userId: bob.id,
      content: "Hey Alice! Great to be here 👋",
    },
    {
      roomId: generalRoom.id,
      userId: charlie.id,
      content: "This is awesome! When did this chat start?",
    },
    {
      roomId: devRoom.id,
      userId: alice.id,
      content: "Team meeting in 10 minutes",
    },
    { roomId: devRoom.id, userId: bob.id, content: "Roger that, Alice!" },
    {
      roomId: randomRoom.id,
      userId: diana.id,
      content: "Anyone seen that new movie?",
    },
    {
      roomId: generalRoom.id,
      userId: diana.id,
      content: "I love the new chat features!",
    },
  ];

  for (const { roomId, userId, content } of messages) {
    await chat.sendMessage(roomId, userId, content);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate typing delay
  }

  console.log(`✅ Sent ${messages.length} messages across rooms`);
  console.log();

  // Demonstrate message reactions
  console.log("=== 5. MESSAGE REACTIONS ===");
  const firstMessage = generalRoom.getMessages()[1]; // Bob's message
  firstMessage.addReaction("👍", alice.id);
  firstMessage.addReaction("👍", charlie.id);
  firstMessage.addReaction("❤️", diana.id);

  console.log(`✅ Added reactions to message: "${firstMessage.content}"`);
  console.log(
    `   Reactions: ${JSON.stringify(firstMessage.getReactionSummary())}`
  );
  console.log();

  // Show typing indicators
  console.log("=== 6. TYPING INDICATORS ===");
  chat.typingManager.startTyping(generalRoom.id, charlie.id);
  chat.typingManager.startTyping(generalRoom.id, diana.id);

  console.log(
    `✅ Typing users in ${generalRoom.name}:`,
    chat.typingManager
      .getTypingUsers(generalRoom.id)
      .map((id) => chat.getUser(id).username)
      .join(", ")
  );
  console.log();

  // Demonstrate message streaming
  console.log("=== 7. MESSAGE STREAMING ===");
  console.log("📡 Streaming messages from General Discussion:");

  let messageCount = 0;
  for await (const streamItem of chat.getMessageStream(generalRoom.id, {
    limit: 3,
  })) {
    const { message, progress } = streamItem;
    const user = chat.getUser(message.senderId);
    const userName = user ? user.username : "System";

    console.log(
      `   [${progress.toFixed(
        0
      )}%] ${userName}: ${message.getFormattedContent()}`
    );
    messageCount++;
  }
  console.log(`✅ Streamed ${messageCount} messages`);
  console.log();

  // Search functionality
  console.log("=== 8. SEARCH FUNCTIONALITY ===");
  const searchResults = chat.globalSearch("hello", {
    messageType: MESSAGE_TYPES.TEXT,
  });

  console.log(`🔍 Global search results for "hello":`);
  searchResults.forEach((result, roomId) => {
    const room = chat.getRoom(roomId);
    console.log(`   ${room.name}: ${result.count} messages found`);
    result.messages.forEach((msg) => {
      const user = chat.getUser(msg.senderId);
      console.log(`     - ${user.username}: ${msg.content}`);
    });
  });
  console.log();

  // User settings and preferences
  console.log("=== 9. USER SETTINGS ===");
  alice.updateSettings({
    theme: "dark",
    notifications: false,
    soundEnabled: true,
  });

  bob.blockUser(charlie.id);
  diana.muteRoom(randomRoom.id);

  console.log(`✅ Updated user settings:`);
  console.log(`   Alice settings:`, alice.settings);
  console.log(`   Bob blocked Charlie:`, bob.isBlocked(charlie.id));
  console.log(`   Diana muted Random room:`, diana.isRoomMuted(randomRoom.id));
  console.log();

  // Room statistics
  console.log("=== 10. ROOM STATISTICS ===");
  const generalStats = generalRoom.getStatistics();
  console.log(`📊 ${generalRoom.name} Statistics:`);
  console.log(`   Total Messages: ${generalStats.totalMessages}`);
  console.log(`   Total Users: ${generalStats.totalUsers}`);
  console.log(`   Active Users: ${generalStats.activeUsers}`);
  console.log(`   Messages by Type:`, generalStats.messagesByType);
  console.log();

  // Analytics report
  console.log("=== 11. ANALYTICS REPORT ===");
  const report = chat.generateAnalyticsReport("24h");
  console.log(`📈 24-hour Analytics Report:`);
  console.log(`   Total Users: ${report.totalUsers}`);
  console.log(`   Active Users: ${report.activeUsers}`);
  console.log(`   Total Messages: ${report.totalMessages}`);
  console.log(`   Popular Rooms:`, report.popularRooms.slice(0, 3));
  console.log();

  // Bulk message sending
  console.log("=== 12. BULK OPERATIONS ===");
  const bulkMessages = [
    "Testing bulk message 1",
    "Testing bulk message 2",
    "Testing bulk message 3",
  ];

  const bulkResults = await chat.sendBulkMessages(
    randomRoom.id,
    charlie.id,
    bulkMessages
  );
  const successful = bulkResults.filter((r) => r.success);
  console.log(
    `✅ Bulk operation: ${successful.length}/${bulkResults.length} messages sent successfully`
  );
  console.log();

  // Data export
  console.log("=== 13. DATA EXPORT ===");
  const exportData = chat.exportData();
  console.log(`💾 Exported chat data:`);
  console.log(`   Version: ${exportData.version}`);
  console.log(`   Total Users: ${exportData.totalUsers}`);
  console.log(`   Total Rooms: ${exportData.totalRooms}`);
  console.log(`   Total Messages: ${exportData.totalMessages}`);
  console.log(
    `   Export Size: ${JSON.stringify(exportData).length} characters`
  );
  console.log();

  // Advanced features demonstration
  console.log("=== 14. ADVANCED FEATURES ===");

  // Message editing
  const editableMessage = generalRoom
    .getMessages()
    .find((m) => m.senderId === alice.id);
  if (editableMessage) {
    editableMessage.edit(
      "Hello everyone! Welcome to our amazing chat platform!",
      alice.id
    );
    console.log(`✏️ Message edited: "${editableMessage.content}"`);
  }

  // Thread conversation
  const replyMessage = await chat.sendMessage(
    generalRoom.id,
    bob.id,
    "Thanks for the warm welcome!",
    { replyTo: editableMessage.id }
  );

  console.log(
    `🧵 Reply message created with reference to: ${editableMessage.id}`
  );
  console.log();

  // Event listeners demonstration
  console.log("=== 15. EVENT SYSTEM ===");
  let eventCount = 0;

  chat.on("messageReceived", ({ message, room }) => {
    eventCount++;
    console.log(
      `📨 Event: New message in ${room.name} by ${
        chat.getUser(message.senderId)?.username
      }`
    );
  });

  // Send a final message to trigger events
  await chat.sendMessage(
    generalRoom.id,
    diana.id,
    "This should trigger an event!"
  );

  setTimeout(() => {
    console.log(`✅ Event system working: ${eventCount} events captured`);
    console.log("\n🎉 Real-time Chat Simulator Demo Complete!");
  }, 100);
}

// Performance testing
async function performanceTest() {
  console.log("\n⚡ PERFORMANCE TESTING\n");

  const chat = new ChatApplication();
  const testRoom = chat.createRoom("Performance Test");

  // Create many users
  const users = [];
  const userCount = 100;

  console.log(`Creating ${userCount} users...`);
  const startTime = Date.now();

  for (let i = 0; i < userCount; i++) {
    const user = chat.createUser(`User${i}`, { email: `user${i}@test.com` });
    users.push(user);
    await testRoom.addUser(user);
  }

  const userCreationTime = Date.now() - startTime;
  console.log(
    `✅ Created and added ${userCount} users in ${userCreationTime}ms`
  );

  // Send many messages
  const messageCount = 1000;
  console.log(`Sending ${messageCount} messages...`);

  const messageStartTime = Date.now();

  for (let i = 0; i < messageCount; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    await chat.sendMessage(
      testRoom.id,
      randomUser.id,
      `Performance test message ${i}`
    );
  }

  const messageTime = Date.now() - messageStartTime;
  console.log(`✅ Sent ${messageCount} messages in ${messageTime}ms`);
  console.log(
    `   Average: ${(messageTime / messageCount).toFixed(2)}ms per message`
  );

  // Memory usage estimation
  const exportData = chat.exportData();
  const dataSize = JSON.stringify(exportData).length;
  console.log(`📊 Memory footprint: ~${(dataSize / 1024).toFixed(2)}KB`);
}

// Error handling demonstration
async function errorHandlingDemo() {
  console.log("\n❌ ERROR HANDLING DEMO\n");

  const chat = new ChatApplication();
  const user = chat.createUser("TestUser");

  try {
    // Try to send message to non-existent room
    await chat.sendMessage("non-existent-room", user.id, "This should fail");
  } catch (error) {
    console.log(`✅ Caught expected error: ${error.message}`);
  }

  try {
    // Try to join full room
    const smallRoom = chat.createRoom("Tiny Room", { maxUsers: 1 });
    await smallRoom.addUser(user);

    const user2 = chat.createUser("TestUser2");
    await smallRoom.addUser(user2); // This should fail
  } catch (error) {
    console.log(`✅ Caught room capacity error: ${error.message}`);
  }

  console.log("✅ Error handling working correctly");
}

// Run all demonstrations
console.log("🚀 Starting Real-time Chat Simulator...\n");

demonstrateChatApplication()
  .then(() => performanceTest())
  .then(() => errorHandlingDemo())
  .catch((error) => {
    console.error("💥 Demo failed:", error);
  });
