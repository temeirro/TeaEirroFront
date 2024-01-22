export interface ITea {
    id: number;
    name: string;
    description: string;
    price: number;
    ingredients: string;
    images: ITeaImage[] | null;
    typeId: number;
    originId: number;
    originName: string;
}

export interface ITeaImage {
    id: number;
    name: string;
    teaId: number;
}