"use client";
import React from "react";

interface InfoCardProps {
  title: string;
  icon?: string;
  items?: string[];
  children?: React.ReactNode;
  className?: string;
}

export default function InfoCard({ 
  title, 
  icon, 
  items, 
  children, 
  className 
}: InfoCardProps) {
  return (
    <div className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] bg-white/90 dark:bg-zinc-900 text-gray-900 dark:text-white border border-border ${className || ""}`}>
      <h3 className="text-2xl font-bold text-primary dark:text-primary-foreground mb-4">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h3>
      
      {items && (
        <ul className="space-y-2 text-base text-gray-800 dark:text-zinc-200">
          {items.map((item, idx) => (
            <li 
              key={idx} 
              className="hover:text-primary dark:hover:text-primary/80 transition-colors duration-200"
              dangerouslySetInnerHTML={{ __html: item }} 
            />
          ))}
        </ul>
      )}
      
      {children && (
        <div className="mt-4 text-sm text-gray-600 dark:text-zinc-300">
          {children}
        </div>
      )}
    </div>
  );
}
