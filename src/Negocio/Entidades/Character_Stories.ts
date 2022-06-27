import { Entity, ManyToOne, Column} from "typeorm"
import { EntityBase } from "./Base"
import { Character } from "./Character"
import { Story } from "./Story"

@Entity({name: 'character_stories', schema: 'marvel'})
export class Character_Stories extends EntityBase{

  @Column({primary: true})
  id: string

  @ManyToOne(() => Character, character => character.stories,{
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  character: Character

  @ManyToOne(() => Story, story => story.characters,{
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  story: Story
}