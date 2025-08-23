import type { NewUser } from '@/types/authTypes.ts'
import api from '@/services/axios.ts'

export async function registerUser(newUser: NewUser) {
    const formData = new FormData();

    formData.append("username", newUser.username);
    formData.append("password", newUser.password1);
    formData.append("repeat_password", newUser.password2);
    formData.append("first_name", newUser.first_name);
    formData.append("last_name", newUser.last_name);
    formData.append("patronymic_name", newUser.patronymicName);
    formData.append("phone_number", newUser.phoneNumber);
    formData.append("email", newUser.email);
    formData.append("gender", newUser.gender);
    formData.append("birth_date", newUser.birthDate);
    formData.append("diagnosis_date", newUser.diagnosisDate);
    formData.append("diabetes_type", newUser.diabetesType);
    formData.append("treatment_type", newUser.treatmentType);
    formData.append("remember", String(newUser.remember));
    formData.append("agreed_with_privacy", String(newUser.agreedWithPolicy));

    if (newUser.imageFile) {
        formData.append("image", newUser.imageFile);
    }

    const response = await api.post(
        'auth_service/register/',
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )

    return response
}
