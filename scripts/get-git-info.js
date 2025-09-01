const { execSync } = require('child_process');

try {
  const lastCommit = execSync('git log -1 --format=%cd --date=iso').toString().trim();
  const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
  
  const gitInfo = {
    lastCommit,
    commitHash,
    buildTime: new Date().toISOString()
  };
  
  // Write to a JSON file that your app can import
  require('fs').writeFileSync(
    'src/lib/git-info.json',
    JSON.stringify(gitInfo, null, 2)
  );
  
  console.log('✅ Git info captured:', gitInfo);
} catch (error) {
  console.warn('⚠️ Git commands failed, using fallback info:', error.message);
  
  // Fallback if git commands fail
  const fallbackInfo = {
    lastCommit: new Date().toISOString(),
    commitHash: 'unknown',
    buildTime: new Date().toISOString()
  };
  
  require('fs').writeFileSync(
    'src/lib/git-info.json',
    JSON.stringify(fallbackInfo, null, 2)
  );
  
  console.log('✅ Fallback git info written:', fallbackInfo);
} 