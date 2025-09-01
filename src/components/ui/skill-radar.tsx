'use client';

import { useEffect, useRef } from 'react';

interface SkillData {
  category: string;
  skills: {
    name: string;
    proficiency: number; // 0-100
    color?: string;
  }[];
}

interface SkillRadarProps {
  data: SkillData[];
  size?: number;
}

export default function SkillRadar({ data, size = 400 }: SkillRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw background circles
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      const r = (radius * i) / 5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Draw category lines
    const categories = data.length;
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    for (let i = 0; i < categories; i++) {
      const angle = (i * 2 * Math.PI) / categories - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Draw category labels
      ctx.fillStyle = '#6b7280';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      const labelRadius = radius + 30;
      const labelX = centerX + labelRadius * Math.cos(angle);
      const labelY = centerY + labelRadius * Math.sin(angle);
      ctx.fillText(data[i].category, labelX, labelY);
    }

    // Draw polygon connecting all skill points
    const polygonPoints: { x: number; y: number }[] = [];
    
    data.forEach((category, categoryIndex) => {
      const categoryAngle = (categoryIndex * 2 * Math.PI) / categories - Math.PI / 2;
      const skillRadius = (radius * category.skills[0].proficiency) / 100;
      
      const x = centerX + skillRadius * Math.cos(categoryAngle);
      const y = centerY + skillRadius * Math.sin(categoryAngle);
      
      polygonPoints.push({ x, y });
    });

    // Draw filled polygon
    if (polygonPoints.length > 0) {
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'; // Blue with transparency
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
      for (let i = 1; i < polygonPoints.length; i++) {
        ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Draw skill points
    polygonPoints.forEach((point) => {
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
      ctx.fill();
      
      // Add white border to points
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [data, size]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        className="border rounded-lg bg-white"
        style={{ width: size, height: size }}
      />
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Proficiency levels: <span className="text-primary font-medium">Expert (90-100%)</span> → <span className="text-muted-foreground">Advanced (70-89%)</span> → <span className="text-muted-foreground">Intermediate (50-69%)</span>
        </p>
      </div>
    </div>
  );
} 