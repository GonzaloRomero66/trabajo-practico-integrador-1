import UserModel from "./User.js";
import ProfileModel from "./Profile.js";
import ArticleModel from "./Article.js";
import TagModel from "./Tag.js";
import ArticleTagModel from "./ArticleTag.js";

// 1 : 1
UserModel.hasOne(ProfileModel, {
    foreignKey: "user_id",
    as: "profile",
    onDelete: "CASCADE"
});

ProfileModel.belongsTo(UserModel, {
    foreignKey: "user_id",
    as: "user"
});

// 1 : N
UserModel.hasMany(ArticleModel, {
    foreignKey: "user_id",
    as: "articles",
    onDelete: "CASCADE"
});

ArticleModel.belongsTo(UserModel, {
    foreignKey: "user_id",
    as: "author"
});

// N : M
ArticleModel.belongsToMany(TagModel, {
    through: ArticleTagModel,
    foreignKey: "article_id",
    otherKey: "tag_id",
    as: "tags",
    onDelete: "CASCADE"
});

TagModel.belongsToMany(ArticleModel, {
    through: ArticleTagModel,
    foreignKey: "tag_id",
    otherKey: "article_id",
    as: "articles",
    onDelete: "CASCADE"
});

export {
    UserModel,
    ProfileModel,
    ArticleModel,
    TagModel,
    ArticleTagModel
};