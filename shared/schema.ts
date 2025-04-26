import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Original user schema required by template
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Algorithm results schema
export const algorithmResults = pgTable("algorithm_results", {
  id: serial("id").primaryKey(),
  algorithm_type: text("algorithm_type").notNull(), // "pathfinding" or "sorting"
  algorithm_name: text("algorithm_name").notNull(), 
  params: json("params").notNull(), // JSON with algorithm parameters
  metrics: json("metrics").notNull(), // Operations count, time complexity, etc.
  created_at: text("created_at").notNull()
});

export const insertAlgorithmResultSchema = createInsertSchema(algorithmResults).pick({
  algorithm_type: true,
  algorithm_name: true,
  params: true,
  metrics: true,
  created_at: true
});

export type InsertAlgorithmResult = z.infer<typeof insertAlgorithmResultSchema>;
export type AlgorithmResult = typeof algorithmResults.$inferSelect;

// Common types used throughout the app
export type NodeType = 'empty' | 'wall' | 'weight' | 'start' | 'end' | 'visited' | 'path';
export type Tool = 'start' | 'end' | 'wall' | 'weight' | 'erase';

export type GridNode = {
  row: number;
  col: number;
  type: NodeType;
  weight: number;
  isVisited: boolean;
  distance: number;
  fScore: number;
  gScore: number;
  hScore: number;
  previousNode: GridNode | null;
};

export type SortingAlgorithm = 'quicksort' | 'mergesort' | 'bubblesort' | 'heapsort' | 'insertionsort';
export type PathfindingAlgorithm = 'astar' | 'dijkstra' | 'bfs' | 'dfs';

export type ArrayElement = {
  value: number;
  state: 'default' | 'comparing' | 'sorted' | 'outOfPlace';
};

export type AlgorithmMetrics = {
  nodesVisited?: number;
  pathLength?: number;
  comparisons?: number;
  swaps?: number;
  timeElapsed: number;
  timeComplexity: string;
};

export type PathfindingParams = {
  gridSize: { rows: number; cols: number };
  startNode: { row: number; col: number };
  endNode: { row: number; col: number };
  algorithm: PathfindingAlgorithm;
  walls: Array<{ row: number; col: number }>;
  weights: Array<{ row: number; col: number; weight: number }>;
};

export type SortingParams = {
  arraySize: number;
  algorithm: SortingAlgorithm;
  initialArray: number[];
};
