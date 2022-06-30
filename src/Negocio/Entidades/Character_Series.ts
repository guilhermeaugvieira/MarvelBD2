import { Entity, ManyToOne, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Character } from "./Character"
import { Serie } from "./Serie"

@Entity({name: 'character_series', schema: 'marvel'})
export class Character_Series{

  @Column({primary: true})
  id: string

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

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}