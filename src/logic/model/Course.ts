import type { CourseInfo } from "../interface/CourseInfo.ts";

// Modellklassen för kursen, följer Courseinfo strukuren
export class Course implements CourseInfo {
  public code: string;
  public name: string;
  public progression: string;
  public syllabus: string;

  constructor(
    code: string, 
    name: string, 
    progression: string, 
    syllabus: string) {
      this.code = code;
      this.name = name;
      this.progression = progression;
      this.syllabus = syllabus;
    }
}