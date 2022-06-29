import { Entity, ManyToOne, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Character } from "./Character"
import { Url } from "./Url"

@Entity({name: 'url_character', schema: 'marvel'})
export class Url_Character{

  @Column({primary: true})
  id: string

  @ManyToOne(() => Character, character => character.urls, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  character: Character

  @ManyToOne(() => Url, url => url.characters, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  url: Url

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}