import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to create image paths that respect the basePath configuration
export function getImagePath(imagePath: string): string {
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/nasdaq' : '';
  
  // Ensure the path starts with a slash
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  return `${basePath}${normalizedPath}`;
}
