import { Entity, Column, OneToMany} from "typeorm"
import { Character_Events } from "./Character_Events"

@Entity({name: 'tbl__event', schema: 'marvel'})
export class Event{
  
  @Column({primary: true})
  name: string

  @Column({nullable: true})
  resourceUri: string

  @OneToMany(() => Character_Events, character_event => character_event.character)
  characters: Character_Events[]

}