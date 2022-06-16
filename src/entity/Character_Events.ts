import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Character } from "./Character"
import { Event } from "./Event"

@Entity({name: 'character_events', schema: 'marvel'})
export class Character_Events{

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Character, character => character.events,{
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  character: Character

  @ManyToOne(() => Event, event => event.characters,{
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  event: Event
}