export default function formatRussianPhone(phone: string | number): string {
    let digits = String(phone).replace(/\D/g, '')
    if (digits.startsWith('8')) digits = '7' + digits.slice(1)

    if (!digits.startsWith('7')) digits = '7' + digits.slice(1)
    digits = digits.slice(0, 11)

    return digits.replace(
        /^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/,
        '$1 ($2) $3-$4-$5'
    )
}
