import { Client, Teams, ID } from "node-appwrite";
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
  await teams.create(ID.unique(), "LiteraryTeam", [
    "member",
    "admin",
    "disabled",
  ]);

  // database operation
  await createDatabaseOpt(client);

  console.log("初始化创建完毕");
}

boot();
