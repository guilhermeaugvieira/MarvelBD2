import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Character } from "./Character"
import { Event } from "./Event"

@Entity({name: 'tbl__character_events', schema: 'marvel'})
export class Character_Events{

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Character, character => character.events)
  character: Character

  @ManyToOne(() => Event, event => event.characters)
  event: Event
}