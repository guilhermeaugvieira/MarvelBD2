import { Entity, Column, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Double } from "typeorm"
import { Character_Comics } from "./Character_Comics"
import { Comic_Creators } from "./Comic_Creators"
import { Story } from "./Story"
import { Url } from "./Url"
import { Url_Comic } from "./Url_Comic"

@Entity({name:'comic', schema: 'marvel'})
export class Comic{
  
  @Column({primary: true})
  id: number
  
  @Column({nullable: false, name: 'resource_uri'})
  resourceUri: string

  @Column({nullable: false, name: 'digital_id'})
  digitalId: number

  @Column({nullable: false})
  title: string

  @Column({nullable: false, type: 'float', name: 'issue_number'})
  issueNumber: number

  @Column({nullable: true, name: 'variant_description'})
  variantDescription?: string

  @Column({nullable: true})
  description?: string

  @Column({nullable: true})
  modified?: Date

  @Column({nullable: false})
  isbn: string

  @Column({nullable: false})
  upc: string

  @Column({nullable: false, name: 'diamond_code'})
  diamondCode: string

  @Column({nullable: false})
  ean: string

  @Column({nullable: false})
  issn: string

  @Column({nullable: false})
  format: string

  @Column({nullable: false, name: 'page_count'})
  pageCount: number

  @OneToMany(() => Url_Comic, urlComic => urlComic.comic)
  urls: Url_Comic[]

  @Column({nullable: false})
  thumbnail: string

  @OneToMany(() => Comic_Creators, comicCreators => comicCreators.comic)
  creators: Comic_Creators[]

  @OneToMany(() => Character_Comics, character_comics => character_comics.comic)
  characters: Character_Comics[]

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date

  @OneToMany(() => Story, story => story.originalIssue)
  stories: Story[]
}