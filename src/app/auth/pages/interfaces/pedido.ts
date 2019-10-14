export interface Pedido {
  id?: string;
  idDentista?: string;
  // nomeDentista?: string; // implementar quando conseguir dar o get do nome na collection
  nomeProtetico?: string;
  nomePaciente?: string;
  tipoProtese?: string;
  subTipoProtese?: string;
  criadoEm?: number;
  picture?: string;
  observacao?: string;
  status?: string;
}
