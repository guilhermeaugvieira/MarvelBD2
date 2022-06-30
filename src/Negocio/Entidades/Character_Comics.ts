import { Entity, ManyToOne, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Character } from "./Character"
import { Comic } from "./Comic"

@Entity({name: 'character_comics', schema: 'marvel'})
export class Character_Comics{

  @Column({primary: true})
  id: string

  @ManyToOne(() => Character, character => character.comics, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  character: Character

  @ManyToOne(() => Comic, comic => comic.characters, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  comic: Comic

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}