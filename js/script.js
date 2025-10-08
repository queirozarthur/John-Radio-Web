// Espera o documento HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do player no HTML
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const playIcon = '<i class="fas fa-play"></i>';
    const pauseIcon = '<i class="fas fa-pause"></i>';

    // !!! IMPORTANTE: COLOQUE A URL DO SEU STREAMING AQUI !!!
    const streamURL = 'https://player.conectastreaming.com/player-web/7150';

    // Configura a URL do streaming no elemento de áudio
    audioPlayer.src = streamURL;

    // Função para tocar ou pausar a música
    function togglePlayPause() {
        if (audioPlayer.paused || audioPlayer.ended) {
            // Tenta tocar o áudio. O .catch() é para evitar erros no console caso o play seja bloqueado.
            audioPlayer.play().catch(error => console.error("Erro ao tentar tocar o áudio:", error));
            playPauseBtn.innerHTML = pauseIcon;
        } else {
            audioPlayer.pause();
            playPauseBtn.innerHTML = playIcon;
        }
    }

    // Função para ajustar o volume
    function setVolume() {
        // O volume do HTML audio vai de 0.0 a 1.0
        // O slider vai de 0 a 100, por isso dividimos por 100
        audioPlayer.volume = volumeSlider.value / 100;
    }

    // Adiciona "escutadores" de eventos nos botões
    playPauseBtn.addEventListener('click', togglePlayPause);
    volumeSlider.addEventListener('input', setVolume);

    // Ajusta o volume inicial assim que a página carrega
    setVolume();

});