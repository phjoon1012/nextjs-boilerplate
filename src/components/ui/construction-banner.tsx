"use client";

import { X, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import gitInfo from "@/lib/git-info.json";

interface ConstructionBannerProps {
  defaultVisible?: boolean;
}

const ConstructionBanner = ({
  defaultVisible = true,
}: ConstructionBannerProps) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <section className="bg-muted w-full p-3 border-b border-border">
      <div className="w-full">
        <div className="relative flex items-center justify-between w-full">
          {/* Spacer for mobile close button */}
          <div className="w-6 md:hidden"></div>
          
          {/* Centered content */}
          <div className="flex-1 flex justify-center w-full">
            <div className="text-foreground flex flex-col items-center gap-1">
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs font-medium text-center">
                  Website under construction
                </span>
              </div>
              <span className="text-xs text-muted-foreground text-center">
                Some features aren't available • Content may differ from facts • Last updated: {(() => {
                  try {
                    if (gitInfo && gitInfo.lastCommit) {
                      return new Date(gitInfo.lastCommit).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) + ` (commit: ${gitInfo.commitHash || 'unknown'})`;
                    }
                  } catch (error) {
                    console.warn('Failed to parse git info:', error);
                  }
                  return new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                })()}
              </span>
            </div>
          </div>

          {/* Close buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:bg-muted-foreground/10"
            onClick={handleClose}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { ConstructionBanner };
