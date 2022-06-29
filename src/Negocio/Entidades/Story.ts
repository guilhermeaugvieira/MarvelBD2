import { Entity, Column, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm"
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

  @Column({nullable: true})
  modified?: Date

  @ManyToOne(() => Comic, comic => comic.stories, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  originalIssue: Comic

  @OneToMany(() => Character_Stories, character_stories => character_stories.story)
  characters: Character_Stories[]

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}