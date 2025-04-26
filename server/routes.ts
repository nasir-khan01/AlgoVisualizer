import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { algorithmResults } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Prefix all routes with /api
  
  // Get algorithm results
  app.get("/api/algorithm-results", async (req, res) => {
    try {
      const results = await storage.getAlgorithmResults();
      res.json(results);
    } catch (error) {
      console.error("Error fetching algorithm results:", error);
      res.status(500).json({ message: "Failed to fetch algorithm results" });
    }
  });

  // Get algorithm results by type
  app.get("/api/algorithm-results/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const results = await storage.getAlgorithmResultsByType(type);
      res.json(results);
    } catch (error) {
      console.error(`Error fetching algorithm results for type ${req.params.type}:`, error);
      res.status(500).json({ message: "Failed to fetch algorithm results" });
    }
  });

  // Save algorithm result
  app.post("/api/algorithm-results", async (req, res) => {
    try {
      const result = req.body;
      result.created_at = new Date().toISOString();
      const savedResult = await storage.saveAlgorithmResult(result);
      res.status(201).json(savedResult);
    } catch (error) {
      console.error("Error saving algorithm result:", error);
      res.status(500).json({ message: "Failed to save algorithm result" });
    }
  });

  // Execute pathfinding algorithm
  app.post("/api/execute/pathfinding", async (req, res) => {
    try {
      const params = req.body;
      // The actual execution happens in the frontend
      // This endpoint is mainly for logging/saving results
      res.json({ success: true });
    } catch (error) {
      console.error("Error executing pathfinding algorithm:", error);
      res.status(500).json({ message: "Failed to execute pathfinding algorithm" });
    }
  });

  // Execute sorting algorithm
  app.post("/api/execute/sorting", async (req, res) => {
    try {
      const params = req.body;
      // The actual execution happens in the frontend
      // This endpoint is mainly for logging/saving results
      res.json({ success: true });
    } catch (error) {
      console.error("Error executing sorting algorithm:", error);
      res.status(500).json({ message: "Failed to execute sorting algorithm" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
