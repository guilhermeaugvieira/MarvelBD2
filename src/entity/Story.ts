import { Entity, Column, OneToMany} from "typeorm"
import { Character_Stories } from "./Character_Stories"

@Entity({name: 'story', schema: 'marvel'})
export class Story{
  
  @Column({primary: true})
  id: number
  
  @Column({nullable: false})
  name: string
  
  @Column({nullable: false})
  type: string

  @Column({nullable: false})
  resourceUri: string

  @OneToMany(() => Character_Stories, character_stories => character_stories.story)
  characters: Character_Stories[]
}