export type TimeOfDay = 'morning' | 'afternoon' | 'sunset' | 'evening' | 'night'
export type Weather = 'clear' | 'cloudy' | 'rain' | 'heavy-rain'
export type LightMode = 'on' | 'dim' | 'off'

export interface Settings {
  rain: boolean
  filmGrain: boolean
  analogMode: boolean
  reducedMotion: boolean
  ambientSound: boolean
  sfx: boolean
  masterVolume: number
  ambientVolume: number
  sfxVolume: number
  fullscreen: boolean
}

export interface AppState {
  loaded: boolean
  entered: boolean
  timeOfDay: TimeOfDay
  weather: Weather
  lights: LightMode
  fanOn: boolean
  doorOpen: boolean
  settings: Settings
  showSettings: boolean
  showTicket: boolean
  nextStop: string
}
