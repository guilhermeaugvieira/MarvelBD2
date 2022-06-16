import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Character } from "./Character"
import { Serie } from "./Serie"

@Entity({name: 'character_series', schema: 'marvel'})
export class Character_Series{

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Character, character => character.series,{
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  character: Character

  @ManyToOne(() => Serie, serie => serie.characters,{
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  serie: Serie
}