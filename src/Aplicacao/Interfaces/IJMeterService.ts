interface IJMeterService{
  aplicarTeste(limit: number): Promise<Object>;
}

export { IJMeterService }