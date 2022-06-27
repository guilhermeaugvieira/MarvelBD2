import { Entity, Column, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Character_Events } from "./Character_Events"
import { Url } from "./Url"

@Entity({name: 'event', schema: 'marvel'})
export class Event{
  
  @Column({primary: true})
  id: number

  @Column({nullable: false, name: 'resource_uri'})
  resourceUri: string

  @Column({nullable: false})
  title: string

  @Column({nullable: true})
  description?: string

  @OneToMany(() => Url, url => url.event)
  urls: Url[]

  @Column({nullable: false})
  modified: Date

  @Column({nullable: false})
  start: Date

  @Column({nullable: false})
  end: Date

  @OneToOne(() => Event, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn({name: 'next_event'})
  nextEvent: Event

  @OneToOne(() => Event, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn({name: 'previous_event'})
  previousEvent: Event

  @OneToMany(() => Character_Events, character_event => character_event.character)
  characters: Character_Events[]

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date

}