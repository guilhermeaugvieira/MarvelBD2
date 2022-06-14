import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Character } from "./Character"
import { Serie } from "./Serie"

@Entity({name: 'character_series', schema: 'marvel'})
export class Character_Series{

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Character, character => character.series)
  character: Character

  @ManyToOne(() => Serie, serie => serie.characters)
  serie: Serie
}