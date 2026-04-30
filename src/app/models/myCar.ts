
export interface MyCarInfo {
  id: number;
  model: string;
  color: string;
  date: Date;
  price: number;
  details: string;
  image: string;
 //type: string;
   vehicleTypeId: number;
}






export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5104/api'
};