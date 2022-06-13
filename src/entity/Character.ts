import { Entity, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Url } from "./Url"
import { Image } from "./Image"
import { Serie } from "./Serie"
import { Character_Comics } from "./Character_Comics"
import { Character_Stories } from "./Character_Stories"
import { Character_Events } from "./Character_Events"
import { Character_Series } from "./Character_Series"

@Entity({name: 'tbl__character', schema: 'marvel'})
export class Character {

    @Column({primary: true})
    id: number

    @Column({nullable: true})
    name: string

    @Column({nullable: true})
    description: string

    @Column({nullable: true})
    modified: Date

    @Column({nullable: true})
    resourceURI: string

    @OneToMany(() => Url, url => url.character)
    urls: Url[]

    @OneToOne(() => Image)
    @JoinColumn()
    thumbnail: Image

    @OneToMany(() => Character_Comics, character_comics => character_comics.character)
    comics: Character_Comics[]

    @OneToMany(() => Character_Stories, character_stories => character_stories.character)
    stories: Character_Stories[]

    @OneToMany(() => Character_Events, character_events  => character_events.character)
    events: Character_Events[]

    @OneToMany(() => Character_Series, character_series => character_series.character)
    series: Character_Series[]
}
