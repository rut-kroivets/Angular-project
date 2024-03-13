import { Category } from "./category.model";
import { Lecturer } from "./lecturer.model";

export class Course{

    id: number;
    name: string;
    category: Category;
    countOfLessons: number;
    dateOfStart: Date;
    syllabus: string[];
    study:Study;
    lecturer: Lecturer;
    image: string;
}

export enum Study
{
    Online,
    Offline,
    Hybrid
}