import { Entity, Column, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Character_Stories } from "./Character_Stories"
import { Comic } from "./Comic"

@Entity({name: 'story', schema: 'marvel'})
export class Story{
  
  @Column({primary: true})
  id: number
  
  @Column({nullable: false})
  type: string

  @Column({nullable: false, name: 'resource_uri'})
  resourceUri: string

  @Column({nullable: false})
  title: string

  @Column({nullable: true})
  description?: string

  @Column({nullable: false})
  modified: Date

  @OneToOne(() => Comic, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn({name: 'original_issue'})
  originalIssue: Comic

  @OneToMany(() => Character_Stories, character_stories => character_stories.story)
  characters: Character_Stories[]

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}