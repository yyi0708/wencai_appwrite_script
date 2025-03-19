import { Databases, ID } from "node-appwrite";
import {
  Collections,
  createCollection,
  RelationshipAttributeFn,
} from "../utils/index.js";

// Create a new database
export async function createDatabaseOpt(client) {
  try {
    const database = new Databases(client);

    const db = await database.create(
      ID.unique(), // 数据库ID
      "wencai" // 显示名称
    );

    // Create collections
    await Promise.all(
      Collections.map((collection) =>
        createCollection(database, db.$id, collection)
      )
    );

    // Create relationships
    await RelationshipAttributeFn(database, db.$id, Collections);
  } catch (error) {
    console.error("Database creation failed:", error);
    throw error;
  }
}
