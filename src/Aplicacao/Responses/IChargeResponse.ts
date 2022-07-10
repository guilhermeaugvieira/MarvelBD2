interface IURL{
  id: string
  type: string
  url: string
}

interface IImage{
  id: string
  path: string
  extension: string
}

interface IComics{
  id: number
  resourceURI: string
}

interface IStory{
  id: number
  type: string
  resourceUri: string
}

interface IEvent{
  id: number
  resourceUri: string
}

interface ISerie{
  id: number
  resourceUri: string
}

interface IChargeResponse {
  id: number,
  name: string,
  description: string,
  modified?: Date,
  resourceURI: string,
  urls?: IURL[],
  thumbnail: string,
  comics: IComics[],
  stories: IStory[],
  events: IEvent[],
  series: ISerie[],
}

export { 
  IChargeResponse, 
  ISerie, 
  IEvent, 
  IStory, 
  IComics, 
  IImage, 
  IURL
}