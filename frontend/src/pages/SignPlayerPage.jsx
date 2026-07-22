import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const FALLBACK_EMOJIS = {
  i: '🧍',
  you: '👉',
  he: '👨',
  she: '👩',
  we: '👥',
  they: '👥',
  me: '🧍',
  my: '🙋',
  your: '👉',
  it: '📦',
  this: '👇',
  that: '👉',
  what: '❓',
  where: '📍',
  why: '🤔',
  who: '🙋',
  how: '🤷',
  when: '⏰',
  yes: '✅',
  no: '❌',
  not: '🚫',
  good: '👍',
  bad: '👎',
  happy: '😊',
  sad: '😢',
  love: '❤️',
  like: '👍',
  want: '🙏',
  need: '🙏',
  help: '🆘',
  please: '🙏',
  thank: '🙏',
  thanks: '🙏',
  sorry: '😔',
  hello: '👋',
  hi: '👋',
  bye: '👋',
  goodbye: '👋',
  day: '📅',
  night: '🌙',
  today: '📅',
  tomorrow: '🔜',
  morning: '🌅',
  time: '⏰',
  hour: '🕐',
  hours: '🕐',
  minute: '⏱️',
  year: '📆',
  week: '🗓️',
  home: '🏠',
  school: '🏫',
  work: '💼',
  money: '💰',
  food: '🍽️',
  eat: '🍽️',
  drink: '🥤',
  water: '💧',
  sleep: '😴',
  walk: '🚶',
  run: '🏃',
  go: '🚶',
  come: '👋',
  stop: '✋',
  see: '👀',
  look: '👀',
  hear: '👂',
  listen: '👂',
  talk: '🗣️',
  speak: '🗣️',
  say: '🗣️',
  know: '🧠',
  think: '🤔',
  believe: '🙏',
  feel: '💭',
  make: '🛠️',
  give: '🎁',
  take: '✋',
  get: '🤲',
  find: '🔍',
  open: '🔓',
  close: '🔒',
  big: '📏',
  small: '🤏',
  hot: '🔥',
  cold: '❄️',
  fast: '⚡',
  slow: '🐢',
  new: '✨',
  old: '👴',
  young: '👶',
  friend: '🧑‍🤝‍🧑',
  family: '👨‍👩‍👧',
  people: '🧑‍🤝‍🧑',
  man: '👨',
  woman: '👩',
  child: '🧒',
  book: '📖',
  question: '❓',
  questions: '❓',
  answer: '💬',
  learn: '📚',
  teach: '👩‍🏫',
  student: '🎓',
  english: '🇬🇧',
  world: '🌍',
  life: '⏳',
  success: '🏆',
  free: '🆓',
  music: '🎵',
  phone: '📱',
  computer: '💻',
  car: '🚗',
  house: '🏠',
  door: '🚪',
  name: '🏷️',
  level: '📊',
  number: '🔢',
  one: '1️⃣',
  two: '2️⃣',
  three: '3️⃣',
  four: '4️⃣',
  five: '5️⃣',
  correct: '✅',
  wrong: '❌',
  easy: '😌',
  hard: '💪',
  different: '🔄',
  same: '🟰',
  more: '➕',
  less: '➖',
  all: '💯',
  every: '🔁',
  only: '☝️',
  very: '‼️',
  much: '📈',
  better: '⬆️',
  best: '🏅',
  the: '👉',
  a: '1️⃣',
  an: '1️⃣',
  of: '🔗',
  to: '➡️',
  in: '📥',
  on: '🔛',
  for: '🎯',
  with: '🤝',
  as: '➕',
  at: '📍',
  by: '👤',
  is: '✅',
  are: '✅',
  was: '⏮️',
  were: '⏮️',
  be: '🔷',
  been: '🔷',
  being: '🔷',
  have: '✋',
  has: '✋',
  had: '✋',
  do: '🔨',
  does: '🔨',
  did: '🔨',
  can: '💪',
  could: '💪',
  will: '🔮',
  would: '🔮',
  should: '⚠️',
  must: '❗',
  may: '🤞',
  might: '🤞',
  few: '🤏',
  going: '🚶',
  out: '🚪',
  about: '💭',
  each: '👉',
  example: '💡',
  test: '📝',
  skill: '🎯',
  grammar: '📖',
  vocabulary: '📚',
  point: '⭐',
  end: '🏁',
  begin: '▶️',
  short: '⏳',
  general: '🌐',
  longer: '➕',
  internet: '🌐',
  minutes: '⏱️',
  quickly: '⚡',
  faster: '⚡',
  sentence: '📝',
  natural: '🍃',
  verb: '🔤',
  word: '🔤',
  words: '🔤',
  sound: '🔊',
  understand: '🧠',
  mistake: '❌',
  subscribe: '🔔',
  video: '🎥',
  link: '🔗',
  description: '📄',
  apply: '✍️',
  online: '💻',
  program: '📋',
  loud: '📢',
  skills: '🎯',
  carefully: '🔍',
  becomes: '🔄',
  speech: '🗣️',
  native: '🏠',
  speaker: '🗣️',
  however: '🔄',
  slightly: '➖',
  first: '1️⃣',
  emphasize: '‼️',
  action: '🎬',
  brother: '👨',
  sister: '👩',
  interesting: '🤩',
  change: '🔄',
  order: '📋',
  often: '🔁',
  add: '➕',
  emphasis: '‼️',
  pronunciation: '🗣️',
  effect: '💥',
  brings: '📦',
  overview: '🔎',
  comprehensive: '📚',
  resources: '🗂️',
  available: '✅',
  result: '📊',
  precise: '🎯',
  current: '⏱️',
  comments: '💬',
  difficult: '😖',
  enjoyed: '😊',
  channel: '📺',
  expert: '🎓',
  teachers: '👩‍🏫',
  submit: '📤',
  application: '📄',
  group: '👥',
  private: '🔒',
  recorded: '🎬',
  classes: '🏫',
  schedule: '🗓️',
  ten: '🔟',
  twenty: '2️⃣0️⃣',
  percent: '💯',
}

function SignPlayerPage() {
  const location = useLocation()
  const signs = location.state?.signs || []
  const transcript = location.state?.transcript || ''
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (currentIndex >= signs.length) { setPlaying(false); return }
    const timer = setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
    }, 3000)
    return () => clearTimeout(timer)
  }, [currentIndex, playing])

  const handlePlay = () => {
    if (currentIndex >= signs.length - 1) { setCurrentIndex(0) }
    setPlaying(true)
  }
  const currentSign = signs[currentIndex]
  const videoUrl = currentSign?.video_url || null
  const fallbackEmoji = currentSign?.word ? FALLBACK_EMOJIS[currentSign.word] : null

  return (
    <div style={{ minHeight: '100vh', background: '#f5f4ff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <h2 style={{ color: '#6C63FF', marginBottom: '0.5rem' }}>Sign Language Player</h2>
      <p style={{ color: '#888', marginBottom: '1.5rem', maxWidth: '700px', textAlign: 'center', fontSize: '0.85rem' }}>{transcript}</p>

      {/* Sign Box */}
      <div style={{ width: '300px', height: '300px', background: '#fff', borderRadius: '20px', border: '2px solid #6C63FF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', overflow: 'hidden' }}>
        {videoUrl ? (
          <video key={videoUrl} autoPlay loop muted={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => e.target.style.display = 'none'}>
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : fallbackEmoji ? (
          <div style={{ fontSize: '5rem' }}>{fallbackEmoji}</div>
        ) : (
          <div style={{ fontSize: '2rem', color: '#ccc' }}>—</div>
        )}
      </div>

      <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6C63FF', marginBottom: '0.3rem' }}>
        {currentSign?.word || '—'}
      </div>

      <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
        {currentIndex} / {signs.length} signs
      </p>

      <div style={{ width: '300px', height: '6px', background: '#e0e0e0', borderRadius: '999px', marginBottom: '1.5rem' }}>
        <div style={{ height: '100%', borderRadius: '999px', background: '#6C63FF', width: `${(currentIndex / signs.length) * 100}%`, transition: 'width 0.3s ease' }} />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '2rem' }}>
        <button onClick={handlePlay} style={{ background: '#6C63FF', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: '600' }}>
          {playing ? '▶ Playing...' : '▶ Play Signs'}
        </button>
        <button onClick={() => setPlaying(false)} style={{ background: '#fff', color: '#6C63FF', border: '1.5px solid #6C63FF', padding: '0.75rem 1.5rem', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: '600' }}>
          ⏸ Pause
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '800px' }}>
        {signs.map((item, i) => (
          <div key={i} onClick={() => { setCurrentIndex(i); setPlaying(false) }}
            style={{ background: i === currentIndex ? '#6C63FF' : '#fff', border: '1.5px solid #6C63FF', borderRadius: '8px', padding: '0.3rem 0.7rem', cursor: 'pointer', transition: 'all 0.2s' }}>
            <div style={{ color: i === currentIndex ? '#fff' : '#6C63FF', fontSize: '0.8rem', fontWeight: '600' }}>{item.word}</div>
          </div>
        ))}
      </div>

      <a href="/" style={{ marginTop: '2rem', color: '#6C63FF', textDecoration: 'none', fontWeight: '500' }}>← Convert another video</a>
    </div>
  )
}

export default SignPlayerPage
