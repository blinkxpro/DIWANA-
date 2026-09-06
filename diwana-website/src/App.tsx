import { useState, useEffect, useCallback, useRef } from 'react'
import { playlist } from './data/playlist'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

const dialogues = [
  "Namaskar yatriyon, DIWANA bus mein aapka swagat hai.",
  "Aaj hum safar karenge Bharat ke sabse jeevant aur vyast shahron mein se ek — Mumbai ka.",
  "Mumbai… sapnon ka shehar, jahan har din hazaron log apne naye sapnon ke saath aate hain.",
  "Yeh shehar Arabian Sea ke kinare basa hua hai aur Maharashtra ki rajdhani hai.",
  "Mumbai ko Bharat ki arthik aur manoranjan ki rajdhani ke roop mein bhi jana jata hai.",
  "Hamari yatra ke dauran aapko Mumbai ki sadkon, imaraton aur mashhoor jagahon ki ek khoobsurat jhalak dekhne ko milegi.",
  "Sabse pehle hum chalenge Mumbai ki pehchan mani jane wali ek aitihasik jagah — Gateway of India ki taraf.",
  "Gateway of India Arabian Sea ke kinare sthit Mumbai ka ek prasiddh smarak hai.",
  "Iske theek paas aapko dikhai dega Taj Mahal Palace Hotel, jo Mumbai ki sabse pehchanne yogya imaraton mein se ek hai.",
  "Ab hamari bus aage badh rahi hai Marine Drive ki taraf.",
  "Marine Drive ko Mumbai ki khoobsurat samudri sadak ke roop mein jana jata hai.",
  "Shaam ke samay yahan ki roshni aur samundar ka nazara behad khoobsurat dikhai deta hai.",
  "Aage aapko dikhai dega Girgaon Chowpatty, jahan Mumbai ki samundar kinare wali zindagi ko kareeb se mehsoos kiya ja sakta hai.",
  "Ab hum Mumbai ke ek mahatvapurn aitihasik ilaake ki taraf badh rahe hain — Chhatrapati Shivaji Maharaj Terminus.",
  "Yeh Mumbai ki sabse prasiddh aitihasik imaraton mein se ek hai aur iski vaastukala behad shandaar hai.",
  "Hum aage badhte hue Dadar ki taraf ja rahe hain.",
  "Dadar Mumbai ke mahatvapurn vyavsayik aur transportation areas mein se ek hai.",
  "Ab hamari yatra humein Bandra ki taraf le ja rahi hai.",
  "Bandra apne samundar kinare ke nazaron, cafes aur modern city life ke liye prasiddh hai.",
  "Yahan aapko Mumbai ka mashhoor Bandra-Worli Sea Link bhi dekhne ko milega.",
  "Ab bus aage badh rahi hai Juhu ki taraf.",
  "Juhu Beach Mumbai ke sabse popular samudra taton mein se ek hai.",
  "Mumbai sirf badi imaraton aur vyast sadkon ka shehar nahi hai.",
  "Yahan aapko purane bazaar, aitihasik imaratein, samundar, cinema aur alag-alag sanskritiyon ka khoobsurat mel dekhne ko milta hai.",
  "Mumbai ki sabse khaas baat hai iski raftaar.",
  "Yeh shehar din ho ya raat, hamesha chalta hua dikhai deta hai.",
  "Aur shayad isi wajah se Mumbai ko sapnon ka shehar kaha jata hai.",
  "DIWANA ke saath Mumbai ki is chhoti si yatra mein shamil hone ke liye dhanyavaad.",
  "Apni seat par aaram se baithiye, khidki se bahar dekhiye…",
  "Kyunki Mumbai ki kahani sirf jagahon mein nahi…",
  "Balki iski har sadak, har station aur har chehre mein chhupi hai.",
  "DIWANA ke saath aapka safar yahin khatam nahi hota…",
  "Mumbai abhi baaki hai. 🚍🌆",
]

const stops = [
  'Dadar T.T. Bus Station',
  'Parel Bus Depot',
  'Wadala Bus Depot',
  'Kurla Bus Depot',
  'Bandra Bus Station',
  'Andheri Bus Station',
  'Borivali Bus Station',
  'Mulund Bus Depot',
  'Ghatkopar Bus Station',
  'Vikhroli Bus Station',
  'Powai Bus Station',
  'Santacruz Bus Station',
  'Goregaon Bus Station',
  'Malad Bus Station',
  'Kandivali Bus Station',
  'Bhayandar Bus Station',
  'Thane Station Bus Stop',
  'Navi Mumbai CBD Belapur',
  'Vashi Bus Station',
  'Panvel Bus Station',
]

export default function App() {
  const [theme, setTheme] = useState<'bus' | 'rain'>('bus')
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [onlineCount, setOnlineCount] = useState(1208)
  const [nextStop, setNextStop] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [trackName, setTrackName] = useState('Nostalgia Loading...')
  const [currentTrack, setCurrentTrack] = useState(0)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerReady = useRef(false)
  const [trackIdx, setTrackIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const progressBarRef = useRef<HTMLDivElement>(null)

  // Load YouTube IFrame API
  useEffect(() => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('yt-player', {
        height: '1',
        width: '1',
        playerVars: {
          playlist: playlist.map(p => p.id).join(','),
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          loop: 1,
        },
        events: {
          onReady: (e: any) => {
            playerReady.current = true
            updateTrackName(e.target)
          },
          onStateChange: (e: any) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true)
              updateTrackName(e.target)
            } else if (e.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false)
            } else if (e.data === window.YT.PlayerState.ENDED) {
              setTimeout(() => {
                const nextIdx = (trackIdx + 1) % playlist.length
                setTrackIdx(nextIdx)
                e.target.playVideoAt(nextIdx)
                setTimeout(() => updateTrackName(e.target), 1500)
              }, 500)
            }
          },
        },
      })
    }

    return () => {
      document.head.removeChild(tag)
    }
  }, [trackIdx])

  const updateTrackName = (player: any) => {
    try {
      const videoData = player.getVideoData()
      if (videoData && videoData.title) {
        setTrackName(videoData.title)
      }
    } catch { /* ignore */ }
  }

  const nextTrack = () => {
    if (!playerRef.current || !playerReady.current) return
    const nextIdx = (trackIdx + 1) % playlist.length
    setTrackIdx(nextIdx)
    playerRef.current.playVideoAt(nextIdx)
    setTimeout(() => updateTrackName(playerRef.current), 1500)
  }

  const prevTrack = () => {
    if (!playerRef.current || !playerReady.current) return
    const prevIdx = (trackIdx - 1 + playlist.length) % playlist.length
    setTrackIdx(prevIdx)
    playerRef.current.playVideoAt(prevIdx)
    setTimeout(() => updateTrackName(playerRef.current), 1500)
  }

  useEffect(() => {
    const i = setInterval(() => setDialogueIndex(p => (p + 1) % dialogues.length), 8000)
    return () => clearInterval(i)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!playerRef.current || !playerReady.current) return
      try {
        const time = playerRef.current.getCurrentTime()
        const dur = playerRef.current.getDuration()
        if (dur > 0) {
          setProgress((time / dur) * 100)
          setCurrentTime(formatTime(time))
          setDuration(formatTime(dur))
        }
      } catch { /* ignore */ }
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const i = setInterval(() => {
      setOnlineCount(p => p + Math.floor(Math.random() * 5) - 2)
    }, 8000)
    return () => clearInterval(i)
  }, [])

  const [stopIndex, setStopIndex] = useState(0)

  const handleNextStop = useCallback(() => {
    setNextStop(stops[stopIndex])
    setStopIndex((stopIndex + 1) % stops.length)
    setTimeout(() => setNextStop(''), 3000)
  }, [stopIndex])

  const togglePlay = () => {
    if (!playerRef.current || !playerReady.current) return
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !playerReady.current) return
    const bar = progressBarRef.current
    if (!bar) return
    const rect = bar.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    const dur = playerRef.current.getDuration()
    playerRef.current.seekTo(pct * dur, true)
    setProgress(pct * 100)
    setCurrentTime(formatTime(pct * dur))
  }

  const currentDialogue = dialogues[dialogueIndex]

  return (
    <div className={`app theme-${theme}`}>
      {/* Hidden YouTube Player */}
      <div ref={containerRef} style={{ position: 'fixed', bottom: 0, right: 0, width: 1, height: 1, opacity: 0.001, pointerEvents: 'none', zIndex: -10 }}>
        <div id="yt-player" />
      </div>

      {/* Background */}
      <div className="bg">
        <img src="/images/bus.png" alt="" className="bg-img" />
        <div className="bg-gradient" />
      </div>

      {/* Top Bar */}
      <header className="topbar">
        <div className="pill pill-green">
          <span className="green-dot" />
          <span>{onlineCount} online</span>
        </div>
        <div className="pill pill-support" onClick={() => setShowShare(true)}>
          ❤️ Support us
        </div>
      </header>

      {/* Title */}
      <div className="hero">
        <h1 className="hero-title">दीवाना<br/>सफ़र</h1>
        <p className="hero-sub">एक सफ़र, कुछ यादें...</p>
      </div>

      {/* Quote */}
      <div className="quote-box" onClick={() => setDialogueIndex(p => (p + 1) % dialogues.length)}>
        <p className="quote-text">"{currentDialogue}"</p>
        <p className="quote-author">🎙️ RAJU — Conductor</p>
      </div>

      {/* Bottom Actions */}
      <div className="bottom-actions">
        <button className="action-pill" onClick={() => setTheme(t => t === 'rain' ? 'bus' : 'rain')}>
          🌧️ Baarish?
        </button>
      </div>

      {/* Music Player */}
      <div className="player">
        <div className="player-top">
          <div className={`disc ${isPlaying ? 'spinning' : ''}`}>
            <div className="disc-inner">♫</div>
          </div>
          <div className="track-info">
            <div className="track-name">{trackName}</div>
            <div className="track-credits">DIWANA • Track {trackIdx + 1}/{playlist.length}</div>
          </div>
          <div className="player-actions">
            <button className="p-btn" onClick={prevTrack} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
            </button>
            <button className={`p-btn play-btn ${isPlaying ? 'active' : ''}`} onClick={togglePlay} aria-label="Play/Pause">
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            <button className="p-btn" onClick={nextTrack} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
            </button>
          </div>
        </div>
        <div className="progress-row">
          <span className="time">{currentTime}</span>
          <div className="progress-bar" ref={progressBarRef} onClick={handleSeek}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="time">{duration}</span>
        </div>
      </div>

      {/* Contact */}
      <div className="contact-bar">
        contact: blinkxpro@gmail.com
      </div>

      {/* Next Stop Popup */}
      {nextStop && (
        <div className="stop-popup">
          <span className="stop-label">NEXT STOP</span>
          <span className="stop-name">{nextStop}</span>
        </div>
      )}

      {/* Share/Support Modal */}
      {showShare && (
        <div className="modal-bg" onClick={() => setShowShare(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-x" onClick={() => setShowShare(false)}>✕</button>
            <div className="support-icon">❤️</div>
            <h2>Support the Platform to Stay Free FOREVER</h2>
            <p>Daily 1 Lac Viewers are coming here and WebServer costs are high to keep this website smooth. Please send any amount you wish. Thank you in advance! ❤️</p>
            <div className="qr-container">
              <img src="/images/qr.jpg" alt="UPI QR Code" className="qr-image" />
            </div>
            <a href="/images/qr.jpg" download="diwana-upi-qr.png" className="download-btn">
              ⬇ Download QR Code
            </a>
            <p className="modal-small">Save it and scan with any UPI app (GPay / PhonePe / Paytm)</p>
          </div>
        </div>
      )}
    </div>
  )
}
