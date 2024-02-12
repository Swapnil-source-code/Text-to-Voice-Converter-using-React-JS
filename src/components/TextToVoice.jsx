import { useState, useEffect } from 'react';
import './TextToVoice-style.css'
import play_image from '../assets/images/play.png'



const TextToVoice = () => {
  
  const [speech, setSpeech] = useState(new SpeechSynthesisUtterance());
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);

  useEffect(() => {
    const handleVoicesChanged = () => {
      setVoices(window.speechSynthesis.getVoices());
      setSpeech((prevSpeech) => {
        const newSpeech = new SpeechSynthesisUtterance(prevSpeech.text);
        newSpeech.voice = voices[selectedVoice] || voices[0];
        return newSpeech;
      });
    };

    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, [voices, selectedVoice]);

  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value);
    setSpeech((prevSpeech) => {
      const newSpeech = new SpeechSynthesisUtterance(prevSpeech.text);
      newSpeech.voice = voices[e.target.value];
      return newSpeech;
    });
  };

  const handleSpeak = () => {
    const text = document.querySelector('textarea').value;
    setSpeech((prevSpeech) => {
      const newSpeech = new SpeechSynthesisUtterance(text);
      newSpeech.voice = voices[selectedVoice] || voices[0];
      return newSpeech;
    });
    window.speechSynthesis.speak(speech);
  };
  
  return (
    <>
      <div className="hero">
        <h1>Text to Speech <span>Converter</span></h1>
        <textarea placeholder="Write anything here..." defaultValue={""} />
          
        <div className="row">
          <select id='select' onChange={handleVoiceChange}>
            {voices.map((voice, i) => (
              <option key={i} value={i}>
                {voice.name}
              </option>
            ))}
          </select>
            <button onClick={handleSpeak}><img src={play_image} alt="playicon" />Listen</button>
        </div>
        
      </div>
    </>
  )
}

export default TextToVoice