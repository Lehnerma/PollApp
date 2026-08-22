export interface OptionInterface {
    id: number,
    created_at: string,
    name: string,
    position: number,
    question_id: number, //* verlinkung zur question 
    vote_count: number,
}
