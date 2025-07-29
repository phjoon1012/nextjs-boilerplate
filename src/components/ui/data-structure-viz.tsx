'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataStructureVizProps {
  type: 'stack' | 'queue' | 'tree' | 'linked-list' | 'graph';
  title: string;
  description: string;
}

export default function DataStructureViz({ type, title, description }: DataStructureVizProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<any[]>([]);

  // Initialize data based on type
  useEffect(() => {
    switch (type) {
      case 'stack':
        setData(['Push(5)', 'Push(3)', 'Push(7)', 'Pop()', 'Push(2)']);
        break;
      case 'queue':
        setData(['Enqueue(1)', 'Enqueue(4)', 'Dequeue()', 'Enqueue(9)', 'Dequeue()']);
        break;
      case 'tree':
        setData(['Insert(8)', 'Insert(3)', 'Insert(10)', 'Insert(1)', 'Insert(6)']);
        break;
      case 'linked-list':
        setData(['Add(5)', 'Add(2)', 'Add(8)', 'Remove(2)', 'Add(1)']);
        break;
      case 'graph':
        setData(['Add Node A', 'Add Node B', 'Add Edge A-B', 'Add Node C', 'Add Edge B-C']);
        break;
    }
  }, [type]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (currentStep < data.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && currentStep < data.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (currentStep >= data.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, data.length]);

  const renderStack = () => (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-32 h-48 border-2 border-gray-300 rounded-lg bg-gray-50 relative">
        <div className="absolute bottom-0 left-0 right-0 p-2">
          {data.slice(0, currentStep + 1).reverse().map((item, index) => (
            <div
              key={index}
              className="bg-blue-500 text-white p-2 mb-1 rounded text-sm text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.includes('Push') ? item.split('(')[1].replace(')', '') : 'Pop'}
            </div>
          ))}
        </div>
        <div className="absolute top-2 left-2 text-xs text-gray-500">TOP</div>
      </div>
      <div className="text-sm text-muted-foreground">
        {data[currentStep]}
      </div>
    </div>
  );

  const renderQueue = () => (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-2">
        {data.slice(0, currentStep + 1).map((item, index) => (
          <div
            key={index}
            className="bg-green-500 text-white p-3 rounded-lg text-sm"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {item.includes('Enqueue') ? item.split('(')[1].replace(')', '') : 'Dequeue'}
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
        <span>Front</span>
        <ArrowRight className="h-4 w-4" />
        <span>Back</span>
      </div>
      <div className="text-sm text-muted-foreground">
        {data[currentStep]}
      </div>
    </div>
  );

  const renderTree = () => (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {/* Tree visualization */}
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-purple-500 text-white p-2 rounded-full w-12 h-12 flex items-center justify-center text-sm">
            8
          </div>
          <div className="flex space-x-8">
            <div className="flex flex-col items-center">
              <div className="bg-purple-400 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-xs">
                3
              </div>
              <div className="flex space-x-4 mt-2">
                <div className="bg-purple-300 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center text-xs">
                  1
                </div>
                <div className="bg-purple-300 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center text-xs">
                  6
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-400 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-xs">
                10
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        {data[currentStep]}
      </div>
    </div>
  );

  const renderLinkedList = () => (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-2">
        {data.slice(0, currentStep + 1).map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="bg-orange-500 text-white p-3 rounded-lg text-sm">
              {item.includes('Add') ? item.split('(')[1].replace(')', '') : 'Removed'}
            </div>
            {index < data.slice(0, currentStep + 1).length - 1 && (
              <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
            )}
          </div>
        ))}
      </div>
      <div className="text-sm text-muted-foreground">
        {data[currentStep]}
      </div>
    </div>
  );

  const renderGraph = () => (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-48 h-32">
        {/* Graph nodes */}
        <div className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-xs">
          A
        </div>
        <div className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-xs">
          B
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-xs">
          C
        </div>
        
        {/* Edges */}
        <svg className="absolute inset-0 w-full h-full">
          <line x1="20" y1="20" x2="180" y2="20" stroke="#6b7280" strokeWidth="2" />
          <line x1="100" y1="20" x2="100" y2="100" stroke="#6b7280" strokeWidth="2" />
        </svg>
      </div>
      <div className="text-sm text-muted-foreground">
        {data[currentStep]}
      </div>
    </div>
  );

  const renderVisualization = () => {
    switch (type) {
      case 'stack':
        return renderStack();
      case 'queue':
        return renderQueue();
      case 'tree':
        return renderTree();
      case 'linked-list':
        return renderLinkedList();
      case 'graph':
        return renderGraph();
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="flex justify-center mb-6">
        {renderVisualization()}
      </div>

      <div className="flex justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePlay}
          className="flex items-center gap-2"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentStep >= data.length - 1}
          className="flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          Next
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="mt-4 text-center">
        <div className="flex justify-center space-x-1">
          {data.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index <= currentStep ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Step {currentStep + 1} of {data.length}
        </p>
      </div>
    </div>
  );
} 