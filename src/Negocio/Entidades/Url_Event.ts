import { Entity, ManyToOne, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Event } from "./Event"
import { Url } from "./Url"

@Entity({name: 'url_event', schema: 'marvel'})
export class Url_Event{

  @Column({primary: true})
  id: string

  @ManyToOne(() => Event, event => event.urls, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  event: Event

  @ManyToOne(() => Url, url => url.events, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  url: Url

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}