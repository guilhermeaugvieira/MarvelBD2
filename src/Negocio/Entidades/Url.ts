import { Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Character } from "./Character"
import { Comic } from "./Comic"
import { Event } from "./Event"
import { Serie } from "./Serie"

@Entity({name: 'url', schema: 'marvel'})
export class Url{
  
  @Column({primary: true})
  id: string
  
  @Column({nullable: false})
  type: string

  @Column({nullable: false})
  url: string

  @ManyToOne(() => Character, character => character.urls,{
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  character?: Character

  @ManyToOne(() => Comic, comic => comic.urls,{
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  comic?: Comic

  @ManyToOne(() => Event, event => event.urls,{
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  event?: Event

  @ManyToOne(() => Serie, serie => serie.urls,{
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  serie?: Serie

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}