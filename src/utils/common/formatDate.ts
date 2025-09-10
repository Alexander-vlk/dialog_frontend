export default function(dateString: string): string {
    // Форматирует дату под формат, например, "20 сентября 2000"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date)
}
