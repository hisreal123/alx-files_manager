import "dotenv/config";
import { MongoClient } from "mongodb";


class DBClient {
  constructor() {
    const host = process.env.DB_HOST || "localhost";
    const port = process.env.DB_PORT || 27017
    const database = process.env.DB_DATABASE || "files_manager";
    const dbURL = process.env.DB_URL;

    this.isConnecedToDB = false;

    this.client = new MongoClient(dbURL, { useUnifiedTopology: true })
    this.client.connect()
      .then(() => this.isConnecedToDB = true)
      .catch((_err) => this.isConnecedToDB = false);
  }

  isAlive = () => {
    return this.isConnecedToDB;
  };

  async nbUsers() {
    return this.client.db().collection("users").countDocuments();
  }

  async nbFiles() {
    return this.client.db().collection("files").countDocuments();
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
