declare module "@/lib/git-info.json" {
  const value: {
    lastCommit: string;
    commitHash: string;
    buildTime: string;
  };
  export default value;
} 