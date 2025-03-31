import { Client, Teams, ID, Storage } from "node-appwrite";
import "dotenv/config";

import { createDatabaseOpt } from "./src/database/index.js";

const { ENDPOINT_ADRESS, API_KEY, PROJECT_ID } = process.env;

async function boot() {
  console.log(ENDPOINT_ADRESS, API_KEY, PROJECT_ID);

  const client = new Client()
    .setEndpoint(ENDPOINT_ADRESS)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

  // create a team
  const teams = new Teams(client);
  const team_result = await teams.list();
  if (team_result.total === 0) {
    await teams.create(ID.unique(), "jych", ["member", "admin", "disabled"]);
  }

  const storage = new Storage(client);
  const storage_result = await storage.listBuckets();
  console.log(storage_result);

  if (storage_result.total === 0) {
    await Promise.all([
      storage.createBucket("wencai-user", "用户上传", [
        `read("any")`,
        `write("any")`,
      ]),
      storage.createBucket("wencai-admin", "管理员上传", [
        `read("any")`,
        `write("any")`,
      ]),
      storage.createBucket("wencai-radio", "音视频", [
        `read("any")`,
        `write("any")`,
      ]),
    ]);
  }

  // database operation
  await createDatabaseOpt(client);

  console.log("初始化创建完毕");
}

boot();
