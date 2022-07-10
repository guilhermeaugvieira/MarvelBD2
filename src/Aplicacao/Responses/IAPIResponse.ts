interface IBaseResponse <TData>{
  page: number,
  totalPages: number,
  totalResults: number,
  limit: number,
  data: TData[]
}

interface ICharacterData extends ICharacterModelResponse{
  comics: IExtendedComicModelResponse[],
  events: IEventModelResponse[],
  series: ISerieModelResponse[],
  stories: IStoryModelResponse[],
};

interface ICharacterModelResponse{
  id: number,
  name: string,
  description: string,
  modified?: Date,
  resourceUri: string,
  thumbnail: string,
}

interface IExtendedComicModelResponse extends IComicModelResponse{
  creators: ICreatorModelResponse[]
}

interface IComicModelResponse{
  id: number,
  resourceUri: string,
  digitalId: number,
  title: string,
  issueNumber: number,
  variantDescription?: string,
  description?: string,
  modified?: Date,
  isbn: string,
  upc: string,
  diamondCode: string,
  ean: string,
  issn: string,
  format: string,
  pageCount: number,
  thumbnail: string,
}

interface ICreatorModelResponse{
  id: number,
  name: string,
  resourceUri: string,
  role: string,
}

interface IEventModelResponse{
  id: number,
  resourceUri: string,
  title: string,
  description?: string,
  modified?: Date,
  start?: Date,
  end?: Date,
}

interface ISerieModelResponse{
  id: number,
  resourceUri: string,
  title: string,
  description?: string,
  startYear: number,
  endYear: number,
  modified?: Date,
}

interface IStoryModelResponse{
  id: number,
  type: string,
  resourceUri: string,
  title: string,
  description?: string,
  modified?: Date,
}

interface IComicData extends IComicModelResponse{
  characters: ICharacterModelResponse[],
  creators: ICreatorModelResponse[],
  stories: IStoryModelResponse[]
}

interface IEventData extends IEventModelResponse{
  characters: ICharacterModelResponse[],
  nextEvent?: IEventModelResponse,
  previousEvent?: IEventModelResponse,
}

interface ISerieData extends ISerieModelResponse{
  characters: ICharacterModelResponse[],
  nextSerie?: ISerieModelResponse,
  previounsSerie?: ISerieModelResponse,
}

interface IStoryData extends IStoryModelResponse{
  characters: ICharacterModelResponse[],
  originalIssue: IComicModelResponse,
}

export { 
  IBaseResponse, 
  ICharacterData, 
  ICreatorModelResponse, 
  IStoryModelResponse,
  IExtendedComicModelResponse,
  IEventModelResponse,
  ISerieModelResponse,
  ICharacterModelResponse,
  IComicData,
  IEventData,
  ISerieData,
  IStoryData
};