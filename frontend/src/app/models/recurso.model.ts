// esse arquivo faz algo parecido com o que o pydantic faz no python, garante que o front não vai receber nenhuma entrada fora do tipo desejado
export interface Recurso {
    id: number | null;
    titulo: string;
    descricao: string;
    tipo: string;
    link: string;
    tags: string[];
}

export interface RecursoCreate {
    titulo: string;
    descricao: string;
    tipo: string;
    link: string;
    tags: string[];
}

export interface SmartAssistRequest {
    titulo: string;
    tipo: string;
}

export interface SmartAssistResponse {
    descricao: string;
    tags: string[];
}