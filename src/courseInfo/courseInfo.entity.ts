import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("course_info_course_code_uindex", ["courseCode"], { unique: true })
@Index("course_info_id_uindex", ["id"], { unique: true })
@Entity({ 
  name: "course_info", 
  schema: "student_grade_management" 
})
export class CourseInfo {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: "varchar", 
    name: "course_code", 
    comment: "课程代码", 
    length: 20 
  })
  courseCode: string;

  @Column({
    type: "varchar",
    name: "course_name",
    nullable: true,
    comment: "课程名称",
    length: 20,
  })
  courseName: string | null;

  @Column({
    type: "varchar",
    name: "course_material",
    comment: "课程教材",
    length: 20,
  })
  courseMaterial: string;

  @Column({
    type: "int",
    name: "examine_type",
    comment: "考核⽅式(0：考核，1:考试)",
    default: () => "'0'",
  })
  examineType: number;

  @Column({
    type: "varchar",
    name: "teacher_id_list",
    comment: "教师列表",
    length: 30,
  })
  teacherIdList: string;

  @Column({ 
    type: "varchar", 
    name: "course_credit", 
    comment: "学分", 
    length: 10 
  })
  courseCredit: string;

  @Column({
    type: "int",
    name: "college_id",
    comment: "课程开设学院id",
    default: () => "'0'",
  })
  collegeId: number;
}
