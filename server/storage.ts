import { users, type User, type InsertUser, type AlgorithmResult, type InsertAlgorithmResult } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveAlgorithmResult(result: InsertAlgorithmResult): Promise<AlgorithmResult>;
  getAlgorithmResults(): Promise<AlgorithmResult[]>;
  getAlgorithmResultsByType(type: string): Promise<AlgorithmResult[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private algorithmResults: Map<number, AlgorithmResult>;
  private userCurrentId: number;
  private resultCurrentId: number;

  constructor() {
    this.users = new Map();
    this.algorithmResults = new Map();
    this.userCurrentId = 1;
    this.resultCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveAlgorithmResult(insertResult: InsertAlgorithmResult): Promise<AlgorithmResult> {
    const id = this.resultCurrentId++;
    const result: AlgorithmResult = { ...insertResult, id };
    this.algorithmResults.set(id, result);
    return result;
  }

  async getAlgorithmResults(): Promise<AlgorithmResult[]> {
    return Array.from(this.algorithmResults.values());
  }

  async getAlgorithmResultsByType(type: string): Promise<AlgorithmResult[]> {
    return Array.from(this.algorithmResults.values()).filter(
      (result) => result.algorithm_type === type,
    );
  }
}

export const storage = new MemStorage();
