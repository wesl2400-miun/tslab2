import type { CourseInfo } from "../interface/CourseInfo.ts";
import { Course } from "../model/Course.ts";

// Tillåtna kurskoder
const codes: string[] = [
  'dt207g', 
  'dt003g',
  'dt211g',
  'dt084g',
  'dt200g',
  'dt208g',
  'dt068g'
] as const;

// Tillåtna kursnamn
const names: string[] = [
  'backend-baserad webbutveckling',
  'frontend-baserad webbutveckling',
  'databaser',
  'webbanvändbarhet',
  'grafisk teknik för webb',
  'introduktion till programmering i javascript',
  'programmering i typescript'
] as const;

// Tillåtna kursprogressioner
const progs: string[] = [
  'a', 
  'b', 
  'c'
] as const;

// Validera den kurs som matas in av användaren
export const valCourse = (
  code: string,
  name: string,
  progression: string,
  syllabus: string
): CourseInfo | null => {
  try { 
    new URL(syllabus); 
  } catch(err) { 
    return null; 
  }
  const valid: boolean = codes.includes(
    code.toLowerCase()) 
    && names.includes(
      name.toLowerCase())
    && progs.includes(
      progression.toLowerCase());
  if (valid) return new Course(code, 
    name, progression, syllabus);
  else return null;
}