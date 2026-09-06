import { useState, useEffect } from 'react'
import type { Settings } from '../types'

const DEFAULT_SETTINGS: Settings = {
  rain: false,
  filmGrain: true,
  analogMode: false,
  reducedMotion: false,
  ambientSound: true,
  sfx: true,
  masterVolume: 70,
  ambientVolume: 50,
  sfxVolume: 80,
  fullscreen: false,
}

function loadSettings(): Settings {
  try {
    const saved = localStorage.getItem('diwana-settings')
    if (saved) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
    }
  } catch { /* ignore */ }
  return DEFAULT_SETTINGS
}

export function useAmbientMode() {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  useEffect(() => {
    localStorage.setItem('diwana-settings', JSON.stringify(settings))
  }, [settings])

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const toggleSetting = (key: keyof Settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      updateSetting('reducedMotion', true)
    }
  }, [])

  return { settings, updateSetting, toggleSetting }
}
