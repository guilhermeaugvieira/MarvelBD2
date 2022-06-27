import { Entity, ManyToOne, Column} from "typeorm"
import { EntityBase } from "./Base"
import { Character } from "./Character"
import { Event } from "./Event"

@Entity({name: 'character_events', schema: 'marvel'})
export class Character_Events extends EntityBase{

  @Column({primary: true})
  id: string

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