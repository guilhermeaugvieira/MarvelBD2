import { Entity, Column, ManyToOne} from "typeorm"
import { EntityBase } from "./Base"
import { Character } from "./Character"
import { Comic } from "./Comic"
import { Event } from "./Event"
import { Serie } from "./Serie"

@Entity({name: 'url', schema: 'marvel'})
export class Url extends EntityBase{
  
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
}