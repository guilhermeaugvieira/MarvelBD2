import { Entity, Column, OneToMany } from "typeorm"
import { Character_Comics } from "./Character_Comics"

@Entity({name:'comic', schema: 'marvel'})
export class Comic{
  
  @Column({nullable: true})
  reourceURI: string

  @Column({primary: true})
  name: string

  @OneToMany(() => Character_Comics, character_comics => character_comics.comic)
  characters: Character_Comics[]
}