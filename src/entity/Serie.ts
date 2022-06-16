import { Entity, Column, OneToMany} from "typeorm"
import { Character_Series } from "./Character_Series"

@Entity({name: 'serie', schema: 'marvel'})
export class Serie{
  
  @Column({primary: true})
  id: number
  
  @Column({nullable: false})
  name: string

  @Column({nullable: false})
  resourceUri: string

  @OneToMany(() => Character_Series, character_series => character_series.serie)
  characters: Character_Series[]
}