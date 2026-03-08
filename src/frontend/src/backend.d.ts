import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Signup {
    name: string;
    email: string;
    timestamp: bigint;
}
export interface backendInterface {
    getAllSignupsSorted(): Promise<Array<Signup>>;
    getAllSignupsSortedByEmail(): Promise<Array<Signup>>;
    getSignups(): Promise<Array<Signup>>;
    isEmailRegistered(email: string): Promise<boolean>;
    submitSignup(name: string, email: string): Promise<string>;
}
