
export interface VisualizerDayDto {
    id: number,
    person: string
}
export interface VisualizerMonthDto {
    id: number,
    days: VisualizerDayDto[]
}
export interface VisualizerDto {
    months: VisualizerMonthDto[]
}