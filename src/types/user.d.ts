export interface User {
    uuid: string;
    email: string;
    contact: string;
    profile: {
        first_name: string;
        last_name: string;
        profile: string;
    };
}