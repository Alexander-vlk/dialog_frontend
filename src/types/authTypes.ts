export type UserLoginCredentials = {
    username: string,
    password: string,
    remember: boolean,
}

export type NewUser = {
    username: string,
    first_name: string,
    last_name: string,
    patronymicName: string,
    phoneNumber: string,
    email: string,
    gender: string,
    birthDate: string,
    diagnosisDate: string,
    diabetesType: string,
    treatmentType: string,
    imageUrl: string,
    password1: string,
    password2: string,
    remember: boolean,
    agreedWithPolicy: boolean,
}
