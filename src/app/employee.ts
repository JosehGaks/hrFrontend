export interface Employee {
    id:string;
    firstname:string;
    lastname:string;
    email:string;
    department:Department;
    benefits:Benefit[];
}

export interface Department {
    id:string;
    name:string;
    employees:Employee[];
}


export interface Benefit {
    id:string;
    name:string;
    employees:Employee[];
}