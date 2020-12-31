import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("college_info_college_name_uindex", ["collegeName"], { unique: true })
@Index("college_info_id_uindex", ["id"], { unique: true })
@Entity({ 
  name: "college_info", 
  schema: "student_grade_management" 
})
export class CollegeInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    name: "college_name",
    comment: "学院名称",
    length: 30
  })
  collegeName: string;

  @Column({
    type: "varchar",
    name: "major_id_list",
    comment: "学院下专业列表",
    length: 30,
  })
  majorIdList: string;
}
