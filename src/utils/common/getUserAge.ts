export default function(birthDateString: string) {
    // Получить возраст пользователя на основе его даты рождения
    const today = new Date()
    const birthDate = new Date(birthDateString)

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }

    return age
}
