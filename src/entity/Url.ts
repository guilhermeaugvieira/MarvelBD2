import { Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Character } from "./Character"

@Entity({name: 'url', schema: 'marvel'})
export class Url{
  
  @Column({primary: true})
  id: string
  
  @Column({nullable: false})
  type: string

  @Column({nullable: false})
  url: string

  @ManyToOne(() => Character, character => character.urls,{
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  character: Character
}