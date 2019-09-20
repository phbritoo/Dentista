export interface Pedido {

  id?: string;
  userId?: string;
  // nomeDentista?: string; // implementar quando conseguir dar o get do nome na collection
  emailProtetico?: string;
  tipoProtese?: string;
  subTipoProtese?: string;
  criadoEm?: number;
  picture?: string;
  observacao?: string;
  status?: string;
}
