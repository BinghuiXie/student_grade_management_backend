export interface IUserRequest {
    id: string;
    password: string;
}

export enum UserIdentity {
    TEACHER,
    STUDENT,
    ADMIN
}