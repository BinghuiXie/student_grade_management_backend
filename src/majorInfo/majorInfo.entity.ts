import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("major_info_id_uindex", ["id"], { unique: true })
@Index("major_info_major_name_uindex", ["majorName"], { unique: true })
@Entity({ 
  name: "major_info", 
  schema: "student_grade_management" 
})
export class MajorInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    name: "major_name",
    unique: true,
    comment: "专业名称",
    length: 20,
  })
  majorName: string;

  @Column({
    type: "varchar",
    name: "college_id",
    comment: "开设学院id",
    default: () => "'0'",
  })
  collegeId: number;
}
