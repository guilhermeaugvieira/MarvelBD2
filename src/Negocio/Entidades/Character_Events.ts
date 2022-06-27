import { Entity, ManyToOne, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Character } from "./Character"
import { Event } from "./Event"

@Entity({name: 'character_events', schema: 'marvel'})
export class Character_Events{

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

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}