import React, { useState } from 'react';
import { HelpCircle, FileText, CheckCircle2, AlertTriangle, MessageSquare, Bot, User, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Badge = ({ children, variant = 'gray' }: { children: React.ReactNode, variant?: 'gray' | 'blue' | 'magenta' | 'green' | 'amber' }) => {
  const colors = {
    gray: 'bg-wm-gray-light text-wm-gray-dark',
    blue: 'bg-blue-100 text-wm-blue-highlight',
    magenta: 'bg-pink-100 text-wm-magenta',
    green: 'bg-green-100 text-green-700',
    amber: 'bg-amber-100 text-amber-700'
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[variant]}`}>
      {children}
    </span>
  );
};

export const AITask = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100 shadow-sm relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1 h-full bg-wm-blue-highlight"></div>
    <Bot className="w-5 h-5 text-wm-blue-highlight mt-0.5 shrink-0" />
    <div>
      <p className="text-[10px] font-bold text-wm-blue-highlight uppercase tracking-wider mb-1">AI Action</p>
      <div className="text-sm text-wm-gray-dark leading-relaxed font-medium">{children}</div>
    </div>
  </div>
);

export const HumanTask = ({ children, done }: { children: React.ReactNode, done?: boolean }) => (
  <div className={`flex items-start gap-3 p-4 rounded-lg border shadow-sm relative overflow-hidden transition-colors ${done ? 'bg-green-50/50 border-green-200' : 'bg-white border-wm-gray-med'}`}>
    <div className={`absolute top-0 left-0 w-1 h-full ${done ? 'bg-green-400' : 'bg-wm-blue'}`}></div>
    {done ? <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" /> : <User className="w-5 h-5 text-wm-blue mt-0.5 shrink-0" />}
    <div>
      <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${done ? 'text-green-700' : 'text-wm-blue'}`}>Human Review & Decision</p>
      <div className={`text-sm leading-relaxed font-medium ${done ? 'text-green-800' : 'text-wm-gray-dark'}`}>{children}</div>
    </div>
  </div>
);

export const Button = ({ children, onClick, variant = 'primary', className = '', disabled, Icon }: { children: React.ReactNode, onClick: () => void, variant?: 'primary' | 'secondary' | 'outline', className?: string, disabled?: boolean, Icon?: any }) => {
  const base = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-wm-blue-highlight focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const styles = {
    primary: "bg-wm-blue-highlight hover:bg-blue-700 text-white shadow-sm",
    secondary: "bg-wm-gray-light hover:bg-wm-gray-med text-wm-blue",
    outline: "border border-wm-gray-med hover:bg-wm-gray-light text-wm-blue"
  };
  const size = "px-4 py-2 text-sm rounded-md";
  
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${styles[variant]} ${size} ${className}`}>
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};
