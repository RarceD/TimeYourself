
export interface VisualizerDayDto {
    id: number,
    person: string
}
export interface VisualizerMonthDto {
    days: VisualizerDayDto[]
}
export interface VisualizerDto {
    months: VisualizerMonthDto[]
}