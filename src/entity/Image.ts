import { Entity, Column} from "typeorm"

@Entity({name: 'tbl__image', schema: 'marvel'})
export class Image{
  
  @Column({primary: true})
  path: string

  @Column({nullable: true})
  extension: string
}