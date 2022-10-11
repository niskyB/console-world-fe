export interface AttributeType {
    id: string;
    name: string;
}


export interface GetListWithCount<T> {
    count: number;
    data: T[];
}

export interface SelectionFieldValues<T> {
    label: any;
    value: T;
    isSelect?: boolean;
}
