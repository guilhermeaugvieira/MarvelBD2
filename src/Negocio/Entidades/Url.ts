import { Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm"
import { Character } from "./Character"
import { Comic } from "./Comic"
import { Event } from "./Event"
import { Serie } from "./Serie"
import { Url_Character } from "./Url_Character"
import { Url_Comic } from "./Url_Comic"
import { Url_Event } from "./Url_Event"
import { Url_Serie } from "./Url_Serie"

@Entity({name: 'url', schema: 'marvel'})
export class Url{
  
  @Column({primary: true})
  id: string
  
  @Column({nullable: false})
  type: string

  @Column({nullable: false})
  url: string

  @OneToMany(() => Url_Serie, urlSerie => urlSerie.serie)
  series?: Url_Serie[]

  @OneToMany(() => Url_Comic, urlComic => urlComic.comic)
  comics?: Url_Comic[]

  @OneToMany(() => Url_Event, urlEvent => urlEvent.event)
  events?: Url_Event[]

  @OneToMany(() => Url_Character, urlCharacter => urlCharacter.character)
  characters?: Url_Character[]

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}