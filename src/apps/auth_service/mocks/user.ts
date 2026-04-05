import type {AppUser} from "@/apps/auth_service/types.ts";

export const appUserMock: AppUser = {
    id: 777,
    username: 'admin_mock',
    email: 'admin@admin.com',
    last_name: 'Админов',
    first_name: 'Админ',
    patronymic_name: 'Админович',
    imageUrl: 'http://localhost:8300/src/assets/images/stub.png',
    gender: 'male',
    height: 200,
    birthDate: '2000-04-15',
    diabetesType: 1,
    diagnosisDate: '2026-04-15',
    treatmentType: 2,
    phoneNumber: '88005553535',
} as const
export const accessTokenMock: string = 'test_access_token_mock'
