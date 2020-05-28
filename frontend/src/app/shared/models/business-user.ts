export class BusinessUser {
    constructor(
        public businessName: string,
        public address: string,
        public phoneNumber: string,
        public email: string,
        public password: string,
        public confirmPassword: string,
        public firstname: string,
        public lastname: string,
        public affiliation: string,
    ){}
}
