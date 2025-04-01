import { Databases, ID } from "node-appwrite";
import { TypesEnum } from "../utils/index.js";

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
      "wencai", // 数据库ID
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

// 批量生成数据
export async function gen_init_data(client) {
  try {
    // 生成类型
    await _gen_types_data(client);
  } catch (error) {
    throw error;
  }
}

async function _gen_types_data(client) {
  try {
    const database = new Databases(client);

    return Promise.all(
      TypesEnum.map((item) => {
        return database.createDocument("wencai", "types", ID.unique(), {
          ...item,
        });
      })
    );
  } catch (error) {
    throw error;
  }
}
