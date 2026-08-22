export interface QuestionInterface {
    id: number,
    created_at: string,
    name: string,
    survey_id: number, //* connection to the survey
    position: number //* maybe not needed
}
