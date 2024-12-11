import "dotenv/config";
import { MongoClient } from "mongodb";

class DBClient {
  constructor() {
    console.log(process.env.DB_URL)
    const dbURL = process.env.DB_URL || "mongodb://localhost:27017/files_manager";
    this.isConnectedToDB = false;

    this.client = new MongoClient(dbURL);

    // Connect to the database asynchronously
    this.connectToDB();
  }

  async connectToDB() {
    try {
      await this.client.connect();
      this.isConnectedToDB = true;
      console.log("Successfully connected to the database.");
    } catch (error) {
      this.isConnectedToDB = false;
      console.error("Failed to connect to the database:", error);
    }
  }

  isAlive = () => {
    return this.isConnectedToDB;
  };

  async nbUsers() {
    try {
      return this.client.db().collection("users").countDocuments();
    } catch (error) {
      console.error("Error counting users:", error);
      return 0;
    }
  }

  async nbFiles() {
    try {
      return this.client.db().collection("files").countDocuments();
    } catch (error) {
      console.error("Error counting files:", error);
      return 0;
    }
  }

  async userCollection() {
    return this.client.db().collection("users");
  }

  async filesCollection() {
    return this.client.db().collection("files");
  }
}

const dbClient = new DBClient();
export default dbClient;
