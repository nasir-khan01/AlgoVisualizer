# Local Deployment Guide for AlgorithmViz

This guide will help you set up and run AlgorithmViz on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (version 18 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`
- **Git** (optional, for cloning the repository)
  - Download from: https://git-scm.com/

## Installation Steps

### 1. Download the Project

**Option A: Clone from Git (if available)**
```bash
git clone <repository-url>
cd algorithm-visualization-tool
```

**Option B: Download and Extract**
- Download the project files as a ZIP
- Extract to your desired location
- Open terminal/command prompt in the project directory

### 2. Install Dependencies

```bash
npm install
```

This will install all the required packages listed in `package.json`.

### 3. Start the Development Server

```bash
npm run dev
```

This command will:
- Start the Express backend server on port 5000
- Start the Vite development server for the frontend
- Automatically open your browser to http://localhost:5000

## Project Structure

```
algorithm-visualization-tool/
├── client/              # Frontend React application
├── server/              # Backend Express server
├── shared/              # Shared types and schemas
├── docs/                # Documentation files
├── package.json         # Dependencies and scripts
└── README.md           # Project overview
```

## Available Scripts

- `npm run dev` - Start the development server (frontend + backend)
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## Environment Configuration

The project is configured to work locally out of the box. No environment variables are required for basic functionality.

If you need to configure specific settings:

1. Create a `.env` file in the root directory
2. Add any custom environment variables:
   ```
   PORT=5000
   NODE_ENV=development
   ```

## Browser Compatibility

AlgorithmViz works best with modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Common Issues

**Port Already in Use**
If port 5000 is already in use:
```bash
# Find and kill the process using port 5000
npx kill-port 5000
```
Or modify the port in `server/index.ts`

**Module Not Found Errors**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build Errors**
```bash
# Clear build cache
rm -rf dist
npm run build
```

### Performance Tips

1. **Close unnecessary browser tabs** while running the application
2. **Use smaller array sizes** (6-10 elements) for better visualization performance
3. **Reduce grid size** for pathfinding algorithms if experiencing lag

## Development Mode Features

When running in development mode, you'll have access to:
- Hot module replacement (changes reflect immediately)
- Detailed error messages
- Console logging for debugging
- Source maps for easier debugging

## Building for Production

To create a production build:

```bash
npm run build
```

This creates optimized files in the `dist` directory.

To preview the production build:
```bash
npm run preview
```

## Customization

### Changing Default Settings

- **Array size range**: Modify the min/max values in `client/src/pages/Sorting.tsx`
- **Grid size options**: Update options in `client/src/pages/Pathfinding.tsx`
- **Animation speed range**: Adjust in `client/src/hooks/useAnimation.ts`
- **Theme colors**: Modify `client/src/index.css` and Tailwind configuration

### Adding New Algorithms

Follow the detailed guide in `docs/ADDING_ALGORITHMS.md` to add new sorting or pathfinding algorithms.

## Getting Help

If you encounter issues:

1. Check this troubleshooting section
2. Review the documentation in the `docs/` folder
3. Check the browser console for error messages
4. Ensure all dependencies are properly installed

## Next Steps

Once you have the application running locally:

1. Explore the sorting algorithms visualization
2. Try the pathfinding algorithms with different grid configurations
3. Experiment with different animation speeds
4. Read the user guide in `docs/USER_GUIDE.md` for detailed feature explanations

Enjoy exploring algorithms with AlgorithmViz!