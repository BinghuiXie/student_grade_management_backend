import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("tacher_info_employee_id_uindex", ["employeeId"], { unique: true })
@Entity({ 
  name: "tacher_info", 
  schema: "student_grade_management" 
})
export class TeacherInfo {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: "varchar", 
    name: "employee_id", 
    length: 8 
  })
  employeeId: string;

  @Column({ 
    type: "varchar", 
    name: "password", 
    length: 20 
  })
  password: string;

  @Column({ 
    type: "varchar", 
    name: "name", 
    comment: "教师姓名\n", 
    length: 20 
  })
  name: string;

  @Column({
    type: "varchar",
    name: "mail",
    nullable: true,
    comment: "教师与邮箱",
    length: 30,
  })
  mail: string | null;

  @Column({ 
    type: "int", 
    name: "course_id", 
    default: () => "'0'" 
  })
  courseId: number;

  @Column({ 
    type: "varchar", 
    name: "phone", 
    length: 11 
  })
  phone: string;

  @Column({
    type: "varchar",
    name: "political_affiliation",
    nullable: true,
    comment: "政治面貌",
    length: 20,
  })
  politicalAffiliation: string | null;

  @Column({ 
    type: "int", 
    name: "gender", 
    default: () => "'0'" 
  })
  gender: number;
}
