import type { Settings } from '../../types'

interface ControlsProps {
  settings: Settings
  onToggle: (key: keyof Settings) => void
  onUpdate: <K extends keyof Settings>(key: K, value: Settings[K]) => void
  onFullscreen: () => void
  showSettings: boolean
  onToggleSettings: () => void
  hidden: boolean
}

export default function Controls({
  settings,
  onToggle,
  onUpdate,
  onFullscreen,
  showSettings,
  onToggleSettings,
  hidden,
}: ControlsProps) {
  return (
    <>
      <div className={`controls-bar ${hidden ? 'hidden' : ''}`} role="toolbar" aria-label="Bus controls">
        <button
          className={`control-btn ${settings.rain ? 'active' : ''}`}
          onClick={() => onToggle('rain')}
          aria-label="Toggle rain"
          title="Rain (R)"
        >
          🌧
        </button>
        <button
          className={`control-btn ${settings.filmGrain ? 'active' : ''}`}
          onClick={() => onToggle('filmGrain')}
          aria-label="Toggle film grain"
          title="Film Grain"
        >
          🎞
        </button>
        <button
          className={`control-btn ${settings.analogMode ? 'active' : ''}`}
          onClick={() => onToggle('analogMode')}
          aria-label="Toggle analog mode"
          title="Analog (A)"
        >
          📺
        </button>
        <button
          className={`control-btn ${showSettings ? 'active' : ''}`}
          onClick={onToggleSettings}
          aria-label="Settings"
          title="Settings"
        >
          ⚙
        </button>
        <button
          className="control-btn"
          onClick={onFullscreen}
          aria-label="Toggle fullscreen"
          title="Fullscreen (F)"
        >
          ⛶
        </button>
      </div>

      <div className={`settings-panel ${!showSettings ? 'hidden' : ''}`} role="dialog" aria-label="Settings">
        <div className="settings-title">Settings</div>
        <div className="setting-row">
          <span className="setting-label">Rain</span>
          <button
            className={`setting-toggle ${settings.rain ? 'on' : ''}`}
            onClick={() => onToggle('rain')}
            aria-label="Toggle rain"
          />
        </div>
        <div className="setting-row">
          <span className="setting-label">Film Grain</span>
          <button
            className={`setting-toggle ${settings.filmGrain ? 'on' : ''}`}
            onClick={() => onToggle('filmGrain')}
            aria-label="Toggle film grain"
          />
        </div>
        <div className="setting-row">
          <span className="setting-label">Analog Mode</span>
          <button
            className={`setting-toggle ${settings.analogMode ? 'on' : ''}`}
            onClick={() => onToggle('analogMode')}
            aria-label="Toggle analog mode"
          />
        </div>
        <div className="setting-row">
          <span className="setting-label">Reduced Motion</span>
          <button
            className={`setting-toggle ${settings.reducedMotion ? 'on' : ''}`}
            onClick={() => onToggle('reducedMotion')}
            aria-label="Toggle reduced motion"
          />
        </div>
        <div className="setting-row">
          <span className="setting-label">Ambient Sound</span>
          <button
            className={`setting-toggle ${settings.ambientSound ? 'on' : ''}`}
            onClick={() => onToggle('ambientSound')}
            aria-label="Toggle ambient sound"
          />
        </div>
        <div className="setting-row">
          <span className="setting-label">SFX</span>
          <button
            className={`setting-toggle ${settings.sfx ? 'on' : ''}`}
            onClick={() => onToggle('sfx')}
            aria-label="Toggle sound effects"
          />
        </div>
      </div>
    </>
  )
}
