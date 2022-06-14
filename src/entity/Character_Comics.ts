import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Character } from "./Character"
import { Comic } from "./Comic"

@Entity({name: 'character_comics', schema: 'marvel'})
export class Character_Comics{

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Character, character => character.comics)
  character: Character

  @ManyToOne(() => Comic, comic => comic.characters)
  comic: Comic
}