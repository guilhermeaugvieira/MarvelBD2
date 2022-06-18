import { Entity, Column, OneToMany } from "typeorm"
import { Character_Comics } from "./Character_Comics"

@Entity({name:'comic', schema: 'marvel'})
export class Comic{
  
  @Column({primary: true})
  id: number
  
  @Column({nullable: false})
  reourceURI: string

  @Column({nullable: false})
  name: string

  @OneToMany(() => Character_Comics, character_comics => character_comics.comic)
  characters: Character_Comics[]
}