import { RelationMutate, Permission, Role } from "node-appwrite";

// 创建集合
export async function createCollection(database, databaseId, options) {
  // Step 1: 创建集合
  const collection = await database.createCollection(
    databaseId,
    options.name, // 集合ID
    options.name, // 名称
    [Permission.read(Role.any()), Permission.write(Role.users())]
  );

  // Step 2: 添加属性
  for (const attr of options.attributes) {
    if (attr.type === "string") {
      await database.createStringAttribute(
        databaseId,
        collection.$id,
        attr.key,
        attr.size || 255,
        attr.required || false,
        null,
        attr.array || false
      );
    } else if (attr.type === "boolean") {
      await database.createBooleanAttribute(
        databaseId,
        collection.$id,
        attr.key,
        attr.required || false
      );
    } else if (attr.type === "enum") {
      await database.createEnumAttribute(
        databaseId,
        collection.$id,
        attr.key,
        attr.elements || [], // elements
        attr.required || false // required
      );
    } else if (attr.type === "number") {
      await database.createIntegerAttribute(
        databaseId,
        collection.$id,
        attr.key,
        attr.required || false,
        attr.min || null,
        attr.max || null,
        null,
        attr.array || false
      );
    }
    // 可以根据需要添加更多类型的处理
  }

  // Step 3: 创建索引
  if (options.indexes) {
    for (const index of options.indexes) {
      await database.createIndex(
        databaseId,
        collection.$id,
        index.name,
        index.type,
        index.attributes,
        index.orders || []
      );
    }
  }
}

/**
 * @description 关系属性
 * @type {string} collection - RELATED_COLLECTION_ID.
 * @type {string} type - The type of relationship, in this case, "one-to-one".
 * @type {string} target - The target collection for the relationship, in this case, "users".
 * @type {string} localKey - The local key in the current collection, in this case, "user".
 * @type {string} foreignKey - The foreign key in the target collection, in this case, "profile".
 * @type {boolean} twoWay - Indicates if the relationship is bidirectional, in this case, true.
 * @type {RelationMutate} onDelete - The action to take on delete, in this case, RelationMutate.SetNull.
 */
export const RelationshipAttributeFn = (
  database,
  databaseId,
  Collections = []
) => {
  const promiseArray = [];
  Collections.forEach((collection) => {
    if (collection.relationships) {
      collection.relationships.forEach((relationship) => {
        promiseArray.push(
          database.createRelationshipAttribute(
            databaseId,
            collection.name,
            relationship.target,
            relationship.type,
            relationship.twoWay,
            relationship.localKey,
            relationship.foreignKey,
            relationship.onDelete || RelationMutate.SetNull
          )
        );
      });
    }
  });

  return Promise.all(promiseArray);
};
