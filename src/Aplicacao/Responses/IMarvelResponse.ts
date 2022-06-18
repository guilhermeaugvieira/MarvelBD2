interface ISeriesSummary{
  resourceURI: string,
  name: number,
}

interface ISeriesList{
  available: string,
  returned: number,
  collectionURI: string,
  items: ISeriesSummary[]
}

interface IEventSummary{
  resourceURI: string,
  name: number,
}

interface IEventList{
  available: string,
  returned: number,
  collectionURI: string,
  items: IEventSummary[]
}

interface IStorySummary{
  resourceURI: string,
  name: number,
  type: string
}

interface IStoryList{
  available: string,
  returned: number,
  collectionURI: string,
  items: IStorySummary
}

interface IComicSummary{
  resourceURI: string,
  name: string,
}

interface IComicList{
  available: number,
  returned: number,
  collectionURI: string,
  items: IComicSummary[]
}

interface IImage{
  path: string,
  extension: string
}

interface IURL{
  type: string,
  url: string,
}

interface ICharacter{
  id: number,
  name: string,
  description?: string,
  modified: Date,
  resourceURI: string,
  urls: IURL[],
  thumbnail: IImage,
  comics: IComicList,
  stories: IStoryList,
  events: IEventList,
  series: ISeriesList
}

interface ICharacterDataContainer{
  offset: number,
  limit: number,
  total: number,
  count: number,
  results: ICharacter[]
}

interface IMarvelResponse{
  code: number
  status: string,
  copiryght: string,
  attributionText: string,
  attributionHTML: string,
  data:ICharacterDataContainer,
  etag: string
}

export { 
  IMarvelResponse,
  ICharacterDataContainer,
  ICharacter,
  IURL,
  IImage,
  IComicList,
  IComicSummary,
  IStoryList,
  IStorySummary,
  IEventList,
  IEventSummary,
  ISeriesList,
  ISeriesSummary
}