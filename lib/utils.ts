import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper functions for the application

// Generic hackathon image to use when no image is provided
export const GENERIC_HACKATHON_IMAGE = '/images/generic-hackathon.png';

// Simplified array with just one image to reduce resource usage
export const GENERIC_HACKATHON_IMAGES = [
  '/images/generic-hackathon.png'
];

export function getRandomHackathonImage(): string {
  return GENERIC_HACKATHON_IMAGES[Math.floor(Math.random() * GENERIC_HACKATHON_IMAGES.length)];
}
