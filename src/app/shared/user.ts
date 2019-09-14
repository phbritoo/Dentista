//Provavelmente teremos no futuro criar uma interface de dentista e outra de protético
// Por enquanto esta inteface está setada para o dentista
// A interface protético está usando uma interface user na pasta services, temos
// que ver isso depois

export interface User {
  nome?: string;
  cpf?: string;
  cro?: string;
  data?: string;
  telefone?: string;
  email?: string;
  senha?: string;
  criadoEm?: number;
  isDentista?: boolean;
}
