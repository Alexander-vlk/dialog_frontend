export type MealData = {
    user: number,
    calories: number,
    proteins: number,
    carbs: number,
    fats: number,
    eaten_at: string,
}
export type GlucoseData = {
    id?: number,
    user: number,
    value: number,
    measured_at: string,
}

export type PaginatedResponse<T> = {
    count: number,
    next: string | null,
    previous: string | null,
    results: T[],
}
