import { Entity, ManyToOne, Column} from "typeorm"
import { Character } from "./Character"
import { Comic } from "./Comic"

@Entity({name: 'character_comics', schema: 'marvel'})
export class Character_Comics{

  @Column({primary: true})
  id: string

  @ManyToOne(() => Character, character => character.comics, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  character: Character

  @ManyToOne(() => Comic, comic => comic.characters, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  comic: Comic
}