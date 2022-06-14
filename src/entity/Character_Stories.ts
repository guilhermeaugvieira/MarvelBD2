import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Character } from "./Character"
import { Story } from "./Story"

@Entity({name: 'character_stories', schema: 'marvel'})
export class Character_Stories{

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Character, character => character.stories)
  character: Character

  @ManyToOne(() => Story, story => story.characters)
  story: Story
}