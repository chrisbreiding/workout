import _ from 'lodash'

let voices = []
const getVoices = () => {
  voices = speechSynthesis.getVoices().filter((voice) => !/Google/.test(voice.name))
  // _(voices).map('name').chunk(5).each((voices) => console.log(voices.join()))
}
const getVoice = (name) => _.find(voices, { name })
speechSynthesis.onvoiceschanged = getVoices
getVoices()

class Sound {
  constructor (options = {}) {
    this.options = options
    const text = options.text || 'd'
    const voices = this.options.voices || []

    this.utterance = new SpeechSynthesisUtterance(' ')
    let voice
    let voiceIndex = 0
    while (voiceIndex < voices.length && !voice) {
      voice = getVoice(voices[voiceIndex++])
    }
    this.utterance.voice = voice
    this.utterance.pitch = 1.5
    this.utterance.rate = 1.5
    this.utterance.onend = () => this.utterance.text = text

    // on iOS, needs to be spoken on user action or it won't
    // when we play it after time's up
    speechSynthesis.speak(this.utterance)
  }

  play () {
    if (!this._stopped) {
      if (this.options.repeat) {
        this.utterance.onend = this.play.bind(this)
      }
      speechSynthesis.speak(this.utterance)
    }
  }

  stop () {
    speechSynthesis.cancel()
    this._stopped = true
  }
}

export default Sound
