import { Entity, ManyToOne, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Character } from "./Character"
import { Story } from "./Story"

@Entity({name: 'character_stories', schema: 'marvel'})
export class Character_Stories{

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

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}