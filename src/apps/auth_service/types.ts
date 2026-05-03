export type AppUser = {
    id: number,
    username: string,
    email: string | null,
    last_name: string,
    first_name: string,
    patronymic_name: string,
    imageUrl: string | null,
    gender: string,
    height: number | null,
    birthDate: string | null,
    diagnosisDate: string | null,
    phoneNumber: string,
}
