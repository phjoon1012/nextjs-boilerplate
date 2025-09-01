# Git Info Script

This script automatically captures git commit information during the build process and makes it available to your Next.js application.

## How it works

1. **Prebuild Hook**: The script runs automatically before `npm run build` via the `prebuild` script in package.json
2. **Git Info Capture**: It captures:
   - `lastCommit`: The timestamp of the most recent git commit
   - `commitHash`: The short hash of the current commit
   - `buildTime`: When the build was executed
3. **JSON Output**: Creates `src/lib/git-info.json` that your components can import
4. **Fallback**: If git commands fail, it provides fallback information

## Usage

### In Components

```tsx
import gitInfo from "@/lib/git-info.json";

// Display last commit time
const lastUpdate = new Date(gitInfo.lastCommit).toLocaleDateString();

// Display commit hash
const commitHash = gitInfo.commitHash;
```

### Build Process

```bash
npm run build  # Automatically runs prebuild script first
```

## Files

- `scripts/get-git-info.js` - The build script
- `src/lib/git-info.json` - Generated git info (gitignored)
- `src/lib/git-info.d.ts` - TypeScript declarations
- `.gitignore` - Excludes the generated JSON file

## Customization

You can modify the script to capture additional git information:

```javascript
// Add more git info
const branch = execSync('git branch --show-current').toString().trim();
const author = execSync('git log -1 --format=%an').toString().trim();

const gitInfo = {
  lastCommit,
  commitHash,
  branch,
  author,
  buildTime: new Date().toISOString()
};
```

## Troubleshooting

- **Git not found**: Make sure you're in a git repository
- **Permission errors**: Ensure the script has execute permissions
- **Build failures**: Check that the `src/lib/` directory exists 