import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _forgot_password_code from  "./forgot_password_code.js";
import _group_members from  "./group_members.js";
import _groups from  "./groups.js";
import _likes from  "./likes.js";
import _menu_sidebar from  "./menu_sidebar.js";
import _messages from  "./messages.js";
import _permissions from  "./permissions.js";
import _role_permissions from  "./role_permissions.js";
import _roles from  "./roles.js";
import _subscriptions from  "./subscriptions.js";
import _user_chats from  "./user_chats.js";
import _user_roles from  "./user_roles.js";
import _users from  "./users.js";
import _video_comments from  "./video_comments.js";
import _video_types from  "./video_types.js";
import _videos from  "./videos.js";

export default function initModels(sequelize) {
  const forgot_password_code = _forgot_password_code.init(sequelize, DataTypes);
  const group_members = _group_members.init(sequelize, DataTypes);
  const groups = _groups.init(sequelize, DataTypes);
  const likes = _likes.init(sequelize, DataTypes);
  const menu_sidebar = _menu_sidebar.init(sequelize, DataTypes);
  const messages = _messages.init(sequelize, DataTypes);
  const permissions = _permissions.init(sequelize, DataTypes);
  const role_permissions = _role_permissions.init(sequelize, DataTypes);
  const roles = _roles.init(sequelize, DataTypes);
  const subscriptions = _subscriptions.init(sequelize, DataTypes);
  const user_chats = _user_chats.init(sequelize, DataTypes);
  const user_roles = _user_roles.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);
  const video_comments = _video_comments.init(sequelize, DataTypes);
  const video_types = _video_types.init(sequelize, DataTypes);
  const videos = _videos.init(sequelize, DataTypes);

  group_members.belongsTo(groups, { as: "group", foreignKey: "group_id"});
  groups.hasMany(group_members, { as: "group_members", foreignKey: "group_id"});
  messages.belongsTo(groups, { as: "group", foreignKey: "group_id"});
  groups.hasMany(messages, { as: "messages", foreignKey: "group_id"});
  role_permissions.belongsTo(permissions, { as: "permission", foreignKey: "permission_id"});
  permissions.hasMany(role_permissions, { as: "role_permissions", foreignKey: "permission_id"});
  role_permissions.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(role_permissions, { as: "role_permissions", foreignKey: "role_id"});
  user_roles.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(user_roles, { as: "user_roles", foreignKey: "role_id"});
  forgot_password_code.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(forgot_password_code, { as: "forgot_password_codes", foreignKey: "user_id"});
  group_members.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(group_members, { as: "group_members", foreignKey: "user_id"});
  likes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(likes, { as: "likes", foreignKey: "user_id"});
  messages.belongsTo(users, { as: "sender", foreignKey: "sender_id"});
  users.hasMany(messages, { as: "messages", foreignKey: "sender_id"});
  messages.belongsTo(users, { as: "receiver", foreignKey: "receiver_id"});
  users.hasMany(messages, { as: "receiver_messages", foreignKey: "receiver_id"});
  subscriptions.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(subscriptions, { as: "subscriptions", foreignKey: "user_id"});
  subscriptions.belongsTo(users, { as: "subscriber", foreignKey: "subscriber_id"});
  users.hasMany(subscriptions, { as: "subscriber_subscriptions", foreignKey: "subscriber_id"});
  user_chats.belongsTo(users, { as: "user1", foreignKey: "user1_id"});
  users.hasMany(user_chats, { as: "user_chats", foreignKey: "user1_id"});
  user_chats.belongsTo(users, { as: "user2", foreignKey: "user2_id"});
  users.hasMany(user_chats, { as: "user2_user_chats", foreignKey: "user2_id"});
  user_roles.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_roles, { as: "user_roles", foreignKey: "user_id"});
  video_comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(video_comments, { as: "video_comments", foreignKey: "user_id"});
  videos.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(videos, { as: "videos", foreignKey: "user_id"});
  videos.belongsTo(video_types, { as: "type", foreignKey: "type_id"});
  video_types.hasMany(videos, { as: "videos", foreignKey: "type_id"});
  likes.belongsTo(videos, { as: "video", foreignKey: "video_id"});
  videos.hasMany(likes, { as: "likes", foreignKey: "video_id"});
  video_comments.belongsTo(videos, { as: "video", foreignKey: "video_id"});
  videos.hasMany(video_comments, { as: "video_comments", foreignKey: "video_id"});

  return {
    forgot_password_code,
    group_members,
    groups,
    likes,
    menu_sidebar,
    messages,
    permissions,
    role_permissions,
    roles,
    subscriptions,
    user_chats,
    user_roles,
    users,
    video_comments,
    video_types,
    videos,
  };
}
