import { Observable } from "rxjs";


/**
 * Interface for authentication components and classes
 */
export interface IAuth {
    /**
     * signature for logging in users
     * @param email - email string
     * @param password - password string
     */
    loginUser(email: string, password: string): Observable<any>;
}