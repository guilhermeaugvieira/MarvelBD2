interface ICargaService{
  aplicarCarga(page: number): Promise<Object>;
}

export { ICargaService }