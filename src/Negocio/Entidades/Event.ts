import { Entity, Column, OneToMany} from "typeorm"
import { Character_Events } from "./Character_Events"

@Entity({name: 'event', schema: 'marvel'})
export class Event{
  
  @Column({primary: true})
  id: number
  
  @Column({nullable: false})
  name: string

  @Column({nullable: false})
  resourceUri: string

  @OneToMany(() => Character_Events, character_event => character_event.character)
  characters: Character_Events[]

}