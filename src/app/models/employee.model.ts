export interface Employee {
    firstName: string;
    lastName: string;
    email: string;
    _links: {
        self: {
            href: string;
        },
        employee: {
            href: string;
        },
        benefits: {
            href: string;
        },
        department: {
            href: string;
        }
    }
}