
export interface MyCar {
  id: number;
  model: string;
  color: string;
  date: Date;
  price: number;
  details: string;
  image: string;
}


export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5104/api'
};