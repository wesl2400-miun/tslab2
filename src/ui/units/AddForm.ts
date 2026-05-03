import { Courses } from "../../logic/feature/Courses.ts";
import type { CourseInfo } from "../../logic/interface/CourseInfo.ts";
import { valCourse } from "../../logic/utils/valCourse.ts";
import { CourseList } from "./CourseList.ts";

// Hanterar logiken bakom formuläret
export class AddForm {
  private courses: Courses;
  private msgNode: HTMLElement;
  private courseList : CourseList;
  
  constructor(
    courses: Courses,
    msgNode: HTMLElement,
    list: HTMLElement) {
    this.courses = courses;
    this.msgNode = msgNode;
    this.courseList = 
      new CourseList(list);
    this.courseList.update(
      this.courses);
  }

  // Koppla händelselyssnaren till de angivna interaktiva element
  public wireAddBtn = (
    codeInp: HTMLInputElement,
    nameInp: HTMLInputElement,
    progInp: HTMLInputElement,
    syllInp: HTMLInputElement,
    addBtn: HTMLInputElement,
  ): void => {
    this.wireInps([codeInp, nameInp,
      progInp, syllInp]);
    addBtn.addEventListener(
      'click', (event) => {
      event.preventDefault();
      const course: CourseInfo | null = valCourse(
      codeInp.value, nameInp.value, 
      progInp.value, syllInp.value);
      this.addCourse(course);
    });
  }

  // Lägg till en kurs i kurslistan när lägg-till-knappen trycks
  private addCourse = (
    course: CourseInfo | null): void => {
      const mess: string = 
        this.courses.add(course);
      const color: string = 
        mess.includes('FEL:') 
        ? '#731010': '#13590e';
      this.msgNode.style.color = color;
      this.msgNode.textContent = mess;
      this.courseList.update(
        this.courses);
  }

  // Nollställs meddelanden när något av inmatningsfält fokuseras
  private wireInps = (
    inputs: HTMLInputElement[]): void => {
    inputs.forEach(input =>{
      input.addEventListener('focus', () => {
        this.msgNode.innerHTML = '';
      })
    });
  }
}