
export interface VisualizerDayDto {
    id: number,
    people: string[]
}
export interface VisualizerMonthDto {
    id: number,
    days: VisualizerDayDto[]
}
export interface VisualizerDto {
    months: VisualizerMonthDto[],
    id: number
}