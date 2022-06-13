import { Entity, Column, ManyToOne, OneToMany} from "typeorm"
import { Character } from "./Character"

@Entity({name: 'tbl__url', schema: 'marvel'})
export class Url{
  
  @Column({
    nullable: true,
  })
  type: string

  @Column({primary: true})
  url: string

  @ManyToOne(() => Character, character => character.urls)
  character: Character
}