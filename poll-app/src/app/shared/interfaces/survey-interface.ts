export interface SurveyInterface {
  id: number;
  creat_at: string; 
  name: string;
  category: string; //todo check if an array for more categorys
  description: string;
  expires_at: string | number;
  published: string;
}
