# Quick Local Setup Guide for AlgorithmViz

## One-Time Setup

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/ (version 18+)
   - Verify: `node --version` and `npm --version`

2. **Download this project**
   - Extract all files to a folder on your computer
   - Open terminal/command prompt in that folder

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Go to: http://localhost:5000
   - The app should now be running!

## What You'll See

- **Homepage**: Overview of sorting and pathfinding algorithms
- **Sorting Page**: Visualize QuickSort, MergeSort, BubbleSort, HeapSort, InsertionSort
- **Pathfinding Page**: Visualize A*, Dijkstra, BFS, DFS algorithms
- **About Page**: Information about the project

## Quick Tips

- Use **smaller array sizes** (6-10 elements) for clearer sorting visualization
- Start with **slower animation speeds** to understand the algorithms better
- Try **different grid configurations** for pathfinding algorithms
- Toggle between **light and dark themes** using the button in the top-right

## If Something Goes Wrong

1. **Port 5000 already in use?**
   ```bash
   npx kill-port 5000
   ```

2. **Module errors?**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Still having issues?**
   - Close other browser tabs
   - Try refreshing the page
   - Restart the `npm run dev` command

## Project Structure

```
algorithm-viz/
├── client/          # Frontend (React + TypeScript)
├── server/          # Backend (Express.js)
├── shared/          # Shared types
├── docs/            # Documentation
└── package.json     # Dependencies
```

## Next Steps

Once running successfully:
- Explore different algorithms and their visualizations
- Read the detailed documentation in the `docs/` folder
- Try modifying algorithm parameters to see different behaviors

That's it! You now have AlgorithmViz running locally on your machine.