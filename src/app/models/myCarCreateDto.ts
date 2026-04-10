// remove to separate file
export interface MyCarCreateDto {
  model: string;
  color: string;
  date: Date;
  price: number;
  details: string;
  image: string;
  type: string;
}

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5104/api'
};