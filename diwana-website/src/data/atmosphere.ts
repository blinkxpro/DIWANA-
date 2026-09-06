import type { TimeOfDay } from '../types'

export interface AtmosphereConfig {
  label: string
  icon: string
  overlayClass: string
  busBrightness: number
  busSaturation: number
  busContrast: number
}

export const timeConfig: Record<TimeOfDay, AtmosphereConfig> = {
  morning: {
    label: 'सुबह',
    icon: '🌅',
    overlayClass: 'time-morning',
    busBrightness: 1.1,
    busSaturation: 0.95,
    busContrast: 1.05,
  },
  afternoon: {
    label: 'दोपहर',
    icon: '☀️',
    overlayClass: 'time-afternoon',
    busBrightness: 1.15,
    busSaturation: 1.0,
    busContrast: 1.1,
  },
  sunset: {
    label: 'शाम',
    icon: '🌇',
    overlayClass: 'time-sunset',
    busBrightness: 0.95,
    busSaturation: 1.1,
    busContrast: 1.05,
  },
  evening: {
    label: 'रात से पहले',
    icon: '🌆',
    overlayClass: 'time-evening',
    busBrightness: 0.75,
    busSaturation: 0.85,
    busContrast: 1.1,
  },
  night: {
    label: 'रात',
    icon: '🌙',
    overlayClass: 'time-night',
    busBrightness: 0.5,
    busSaturation: 0.7,
    busContrast: 1.2,
  },
}

export const timeOrder: TimeOfDay[] = ['morning', 'afternoon', 'sunset', 'evening', 'night']
