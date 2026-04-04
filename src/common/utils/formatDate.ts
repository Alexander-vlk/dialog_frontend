export default function (isoString: string): string {
    /*Отформатировать дату из полного ISO-формата в формат DD.MM.YYYY*/
    if (!isoString) return '';
    const date: Date = new Date(isoString);
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC'
    }).format(date);
}
