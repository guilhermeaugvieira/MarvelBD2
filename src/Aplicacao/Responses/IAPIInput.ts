interface BaseInput{
  totalResultados: number,
  numeroPagina: number,
  nomePersonagem?: string
}

interface PersonagemInput extends BaseInput{
  idPersonagem?: number,
  nomeQuadrinho?: string,
  nomeEvento?: string,
  nomeSerie?: string,
  nomeHistoria?: string 
}

interface EventoInput extends BaseInput{
  idEvento?: number
  nomeEvento?: string,
}

interface QuadrinhoInput extends BaseInput{
  idQuadrinho?: number
  nomeQuadrinho?: string,
  nomeCriador?: string,
}

interface SerieInput extends BaseInput{
  idSerie?: number
  nomeSerie?: string,
}

interface HistoriaInput extends BaseInput{
  idHistoria?: number,
  nomeHistoria?: string,
  nomeQuadrinho?: string,
}

export { PersonagemInput, EventoInput, QuadrinhoInput, SerieInput, HistoriaInput };