import { Column, Entity, Index } from "typeorm";

@Index("student_grade_id_uindex", ["id"], { unique: true })
@Entity({ 
  name: "student_grade", 
  schema: "student_grade_management" 
})
export class StudentGrade {
  @Column({
    type: "int", 
    primary: true, 
    name: "id", 
    default: () => "'0'" 
  })
  id: number;

  @Column({ 
    type: "varchar", 
    name: "student_id", 
    length: 9 
  })
  studentId: string;

  @Column({ 
    type: "int", 
    name: "normal_grade", 
    default: () => "'0'" 
  })
  normalGrade: number;

  @Column({ 
    type: "int", 
    name: "makeup_grade", 
    default: () => "'0'" 
  })
  makeupGrade: number;

  @Column({ 
    type: "int", 
    name: "reset_grade", 
    default: () => "'0'" 
  })
  resetGrade: number;

  @Column({ 
    type: "int", 
    name: "course_id", 
    default: () => "'0'" 
  })
  courseId: number;
}
