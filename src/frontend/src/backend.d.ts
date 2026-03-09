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
    country: string;
    ageRange: string;
    userId: string;
    name: string;
    email: string;
    gender: string;
    timestamp: bigint;
}
export interface backendInterface {
    getAllSignupsSorted(): Promise<Array<Signup>>;
    getAllSignupsSortedByEmail(): Promise<Array<Signup>>;
    getSignupByEmail(email: string): Promise<Signup | null>;
    getSignupCount(): Promise<bigint>;
    getSignupCountForCountry(country: string): Promise<bigint>;
    getSignups(): Promise<Array<Signup>>;
    isEmailRegistered(email: string): Promise<boolean>;
    submitProfile(email: string, ageRange: string, country: string, gender: string): Promise<string>;
    submitSignup(name: string, email: string): Promise<string>;
}
