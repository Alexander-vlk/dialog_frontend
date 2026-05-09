export default function getAgePostfix(age: number): string {
    // Получить правильное окончание для слова "год" в зависимости от возраста
    const lastDigit = age % 10
    const lastTwoDigits = age % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return 'лет'
    }

    switch (lastDigit) {
        case 1:
            return 'год'
        case 2:
        case 3:
        case 4:
            return 'года'
        default:
            return 'лет'
    }
}
