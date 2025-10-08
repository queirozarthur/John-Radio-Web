// Aguarda o documento HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do player no HTML pelos seus IDs
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');

    // Define os ícones de Play e Pause para facilitar a troca
    const playIcon = '<i class="fas fa-play"></i>';
    const pauseIcon = '<i class="fas fa-pause"></i>';

    // !!! VERIFIQUE SE SUA URL DE STREAMING ESTÁ CORRETA AQUI !!!
    const streamURL = 'https://stm10.conectastreaming.com:7150/stream';

    // Configura a URL do streaming no elemento de áudio
    audioPlayer.src = streamURL;

    // Função para tocar ou pausar a música e alternar o ícone
    function togglePlayPause() {
        if (audioPlayer.paused || audioPlayer.ended) {
            audioPlayer.play().catch(error => console.error("Erro ao tentar tocar o áudio:", error));
            playPauseBtn.innerHTML = pauseIcon;
        } else {
            audioPlayer.pause();
            playPauseBtn.innerHTML = playIcon;
        }
    }

    // Função para ajustar o volume
    function setVolume() {
        audioPlayer.volume = volumeSlider.value / 100;
    }

    // Adiciona o "escutador" para o botão de play/pause
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    // ================== A CORREÇÃO ESTÁ AQUI ==================
    // Para garantir máxima compatibilidade em celulares, ouvimos os dois eventos:
    // 'input' (dispara enquanto arrasta) e 'change' (dispara quando solta).
    // Esta é a solução definitiva para o problema no celular.
    volumeSlider.addEventListener('input', setVolume);
    volumeSlider.addEventListener('change', setVolume);
    // ==========================================================

    // Ajusta o volume inicial assim que a página carrega
    setVolume();
});