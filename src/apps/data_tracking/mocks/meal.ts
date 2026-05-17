import type {MealData} from "@/apps/data_tracking/types.ts";

export const mealMock: Array<MealData> = [
    {
        user: 1,
        calories: 2000,
        proteins: 70,
        carbs: 120,
        fats: 40,
        eaten_at: '2026-04-15T13:45:30+02:00',
    },
    {
        user: 1,
        calories: 3000,
        proteins: 50,
        carbs: 122,
        fats: 41,
        eaten_at: '2026-04-14T13:45:30+02:00',
    },
    {
        user: 1,
        calories: 2230,
        proteins: 64,
        carbs: 101,
        fats: 33,
        eaten_at: '2026-04-13T13:45:30+02:00',
    },
    {
        user: 1,
        calories: 1670,
        proteins: 66,
        carbs: 121,
        fats: 40,
        eaten_at: '2026-04-12T13:45:30+02:00',
    },
    {
        user: 1,
        calories: 2007,
        proteins: 89,
        carbs: 117,
        fats: 47,
        eaten_at: '2026-04-11T13:45:30+02:00',
    },
    {
        user: 1,
        calories: 1234,
        proteins: 50,
        carbs: 100,
        fats: 46,
        eaten_at: '2026-04-10T13:45:30+02:00',
    },
    {
        user: 1,
        calories: 2054,
        proteins: 79,
        carbs: 110,
        fats: 10,
        eaten_at: '2026-04-09T13:45:30+02:00',
    },
] as const
export const averageMealMock: MealData = {
    user: 1,
    calories: 2054,
    proteins: 79,
    carbs: 110,
    fats: 22,
    eaten_at: '',
}
