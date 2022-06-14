import { Entity, Column} from "typeorm"

@Entity({name: 'image', schema: 'marvel'})
export class Image{
  
  @Column({primary: true})
  path: string

  @Column({nullable: true})
  extension: string
}