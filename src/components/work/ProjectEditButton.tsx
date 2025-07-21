"use client";

import { useContext } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { AdminAuthContext } from "@/components/home/AdminAuthProvider";

interface ProjectEditButtonProps {
  slug: string;
}

export default function ProjectEditButton({ slug }: ProjectEditButtonProps) {
  const { isAdmin } = useContext(AdminAuthContext);
  if (!isAdmin) return null;

  return (
    <Link href={`/projects/${slug}/edit`}>
      <Button variant="outline" className="flex items-center gap-2">
        <Edit className="h-4 w-4" />
        Edit Project
      </Button>
    </Link>
  );
} 