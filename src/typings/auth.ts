import { GenderEnum, UserType } from "./general";

export type LoginResponse = {
    accessToken: string;
    message: string;
    user: {
        createdAt: string;
        email: string;
        gender: GenderEnum;
        role: UserType
    }
};