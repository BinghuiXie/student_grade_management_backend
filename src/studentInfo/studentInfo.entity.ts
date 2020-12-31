import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("student_info_id_uindex", ["id"], { unique: true })
@Index("student_info_student_id_uindex", ["studentId"], { unique: true })
@Entity({ 
  name: "student_info", 
  schema: "student_grade_management" 
})
export class StudentInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    name: "student_id",
    unique: true,
    comment: "学号(也做学生登录用户名)",
    length: 9,
  })
  studentId: string;

  @Column({ 
    type: "varchar", 
    name: "password", 
    length: 20 
  })
  password: string;

  @Column({ 
    type: "varchar", 
    name: "name", 
    length: 20 
  
  })
  name: string;

  @Column("int", {
    name: "gender",
    comment: "性别：男 => 0 女 => 1",
    default: () => "'0'",
  })
  gender: number;

  @Column({ 
    type: "varchar", 
    name: "nation", 
    comment: "民族", 
    length: 10 
  })
  nation: string;

  @Column({
    type: "int",
    name: "college_id",
    comment: "学院id",
    default: () => "'0'",
  })
  collegeId: number;

  @Column({ 
    type: "int", 
    name: "major_id", 
    comment: "专业id", 
    default: () => "'0'" 
  })
  majorId: number;

  @Column({ 
    type: "int", 
    name: "year", 
    comment: "入学年份", 
    default: () => "'2020'" 
  })
  year: number;

  @Column({ 
    type: "varchar", 
    name: "class", 
    comment: "班级", 
    length: 7 
  })
  class: string;
}
