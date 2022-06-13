import { Entity, Column, OneToMany} from "typeorm"
import { Character_Series } from "./Character_Series"

@Entity({name: 'tbl__serie', schema: 'marvel'})
export class Serie{
  
  @Column({primary: true})
  name: string

  @Column({nullable: true})
  resourceUri: string

  @OneToMany(() => Character_Series, character_series => character_series.serie)
  characters: Character_Series[]
}