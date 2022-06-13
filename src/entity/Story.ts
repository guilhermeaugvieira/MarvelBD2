import { Entity, Column, OneToMany} from "typeorm"
import { Character_Stories } from "./Character_Stories"

@Entity({name: 'tbl__story', schema: 'marvel'})
export class Story{
  
  @Column({primary: true})
  name: string
  
  @Column({nullable: true})
  type: string

  @Column({nullable: true})
  resourceUri: string

  @OneToMany(() => Character_Stories, character_stories => character_stories.story)
  characters: Character_Stories[]
}