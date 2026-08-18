export interface SurveyInterface {
    id: number,
    creat_at: string, // todo check if string is correct
    name: string,
    category: string, //todo check if an array for more categorys
    description: string,
    expires_at: string,
    published: string
}
