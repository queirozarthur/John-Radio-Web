// Aguarda o documento HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do player no HTML pelos seus IDs
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');

    // Define os ícones de Play e Pause para facilitar a troca
    const playIcon = '<i class="fas fa-play"></i>';
    const pauseIcon = '<i class="fas fa-pause"></i>';

    // !!! IMPORTANTE: COLOQUE A URL DO SEU STREAMING AQUI !!!
    const streamURL = 'https://stm10.conectastreaming.com:7150/stream';

    // Configura a URL do streaming no elemento de áudio
    audioPlayer.src = streamURL;

    // --- A MÁGICA ACONTECE AQUI ---
    // Função para tocar ou pausar a música e alternar o ícone
    function togglePlayPause() {
        // Verifica se o áudio está pausado ou se já terminou
        if (audioPlayer.paused || audioPlayer.ended) {
            // Se estiver pausado, toca a música
            audioPlayer.play().catch(error => console.error("Erro ao tentar tocar o áudio:", error));
            // E troca o ícone do botão para o de PAUSE
            playPauseBtn.innerHTML = pauseIcon;
        } else {
            // Se estiver tocando, pausa a música
            audioPlayer.pause();
            // E troca o ícone do botão de volta para o de PLAY
            playPauseBtn.innerHTML = playIcon;
        }
    }

    // Função para ajustar o volume
    function setVolume() {
        // O volume do HTML audio vai de 0.0 a 1.0
        // O slider vai de 0 a 100, por isso dividimos por 100
        audioPlayer.volume = volumeSlider.value / 100;
    }

    // Adiciona "escutadores" de eventos para acionar as funções
    // Quando o botão de play/pause for clicado, chama a função togglePlayPause
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    // Quando a barrinha de volume for arrastada, chama a função setVolume
    volumeSlider.addEventListener('input', setVolume);

    // Ajusta o volume inicial assim que a página carrega
    setVolume();
});