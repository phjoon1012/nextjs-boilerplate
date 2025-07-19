"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface ProjectEditButtonProps {
  slug: string;
}

export default function ProjectEditButton({ slug }: ProjectEditButtonProps) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Client-side admin check
    const checkAdmin = () => {
      return localStorage.getItem('isAdmin') === 'true' || 
             window.location.search.includes('admin=true');
    };
    
    setIsAdmin(checkAdmin());
  }, []);

  if (!isAdmin) {
    return null;
  }

  return (
    <Link href={`/projects/${slug}/edit`}>
      <Button variant="outline" className="flex items-center gap-2">
        <Edit className="h-4 w-4" />
        Edit Project
      </Button>
    </Link>
  );
} 