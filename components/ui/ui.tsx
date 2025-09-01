'use client'

import { ButtonHTMLAttributes, createContext, ReactNode, useContext, useState, FC } from 'react';

// ======================= Card =======================
interface CardProps {
  children: ReactNode;
  className?: string;
}
export function Card({ children, className }: CardProps) {
  return <div className={`bg-green-50 dark:bg-gray-800 rounded-lg shadow ${className}`}>{children}</div>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}
export function CardContent({ children, className }: CardContentProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

// ======================= Button =======================
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'destructive';
}
export function Button({ children, className = '', variant = 'default', disabled, ...props }: ButtonProps) {
  let baseClass = 'px-4 py-2 rounded-md font-medium transition-colors';
  if (variant === 'destructive') baseClass += ' bg-red-500 text-white hover:bg-red-600';
  else baseClass += ' bg-blue-500 text-white hover:bg-blue-600';

  if (disabled) baseClass += ' opacity-50 cursor-not-allowed';

  return (
    <button className={`${baseClass} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

// ======================= Switch =======================
interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}
export const Switch: FC<SwitchProps> = ({ checked, onCheckedChange }) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`w-12 h-6 rounded-full p-1 transition-colors ${checked ? 'bg-green-500' : 'bg-gray-300'}`}
    >
      <div
        className={`bg-green-50 w-4 h-4 rounded-full transform duration-200 ${checked ? 'translate-x-6' : ''}`}
      />
    </button>
  );
};

// ======================= Input =======================
import { InputHTMLAttributes, forwardRef } from 'react';
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white ${className}`}
      {...props}
    />
  )
);
Input.displayName = 'Input';

// ======================= Label =======================
interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
}
export function Label({ children, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {children}
    </label>
  );
}

// ======================= Tabs =======================
interface TabsContextProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
const TabsContext = createContext<TabsContextProps | undefined>(undefined);

interface TabsProps {
  children: ReactNode;
  value: string;
}
export function Tabs({ children, value }: TabsProps) {
  const [activeTab, setActiveTab] = useState(value);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: ReactNode;
}
export function TabsList({ children }: TabsListProps) {
  return (
    <div className="flex space-x-2 border-b border-gray-300 dark:border-gray-700 pb-2">
      {children}
    </div>
  );
}

interface TabsContentProps {
  children: ReactNode;
  value: string;
}
export function TabsContent({ children, value }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) return null;
  return context.activeTab === value ? <div className="mt-4">{children}</div> : null;
}

interface TabsTriggerProps {
  children: ReactNode;
  value: string;
}
export function TabsTrigger({ children, value }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) return null;
  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        context.activeTab === value
          ? "bg-blue-500 text-white"
          : "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
      }`}
    >
      {children}
    </button>
  );
}

// ======================= Select =======================
interface SelectContextProps {
  value: string;
  setValue: (value: string) => void;
}
const SelectContext = createContext<SelectContextProps | undefined>(undefined);

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}
export function Select({ value, onValueChange, children }: SelectProps) {
  const [internalValue, setInternalValue] = useState(value);
  const setValue = (v: string) => {
    setInternalValue(v);
    onValueChange(v);
  };
  return (
    <SelectContext.Provider value={{ value: internalValue, setValue }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps {
  children: ReactNode;
  className?: string;
}
export const SelectTrigger: FC<SelectTriggerProps> = ({ children, className }) => (
  <div className={`border border-gray-300 rounded-md p-2 cursor-pointer ${className}`}>{children}</div>
);

interface SelectValueProps {
  placeholder?: string;
}
export const SelectValue: FC<SelectValueProps> = ({ placeholder }) => <span>{placeholder}</span>;

interface SelectContentProps {
  children: ReactNode;
}
export const SelectContent: FC<SelectContentProps> = ({ children }) => (
  <div className="mt-1 border border-gray-300 rounded-md bg-green-50 dark:bg-gray-700 shadow-lg">{children}</div>
);

interface SelectItemProps {
  value: string;
  children: ReactNode;
}
export const SelectItem: FC<SelectItemProps> = ({ value, children }) => {
  const context = useContext(SelectContext);
  if (!context) return null;
  return (
    <div
      onClick={() => context.setValue(value)}
      className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer ${context.value === value ? 'font-semibold' : ''}`}
    >
      {children}
    </div>
  );
};

// ======================= Avatar =======================

interface AvatarProps {
  children: ReactNode;
  className?: string;
}

export function Avatar({ className = "", children }: AvatarProps) {
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200 ${className}`}
    >
      {children}
    </div>
  );
}

interface AvatarImageProps {
  src?: string; // make optional
  alt?: string;
}

export function AvatarImage({ src, alt = "" }: AvatarImageProps) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

interface AvatarFallbackProps {
  children: ReactNode;
}

export function AvatarFallback({ children }: AvatarFallbackProps) {
  return (
    <span className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-600 text-sm font-medium">
      {children}
    </span>
  );
}
