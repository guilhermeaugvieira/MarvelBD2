import { Entity, Column} from "typeorm"

@Entity({name: 'image', schema: 'marvel'})
export class Image{
  
  @Column({primary: true})
  id: number
  
  @Column({nullable: false})
  path: string

  @Column({nullable: false})
  extension: string
}