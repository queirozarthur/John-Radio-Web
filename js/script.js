document.addEventListener('DOMContentLoaded', () => {
    // --- SELEÇÃO DOS ELEMENTOS ---
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const muteBtn = document.getElementById('mute-btn');
    const volDownBtn = document.getElementById('vol-down-btn');
    const volUpBtn = document.getElementById('vol-up-btn');
    
    // Elementos do visualizador
    const canvas = document.getElementById('visualizer');
    const canvasCtx = canvas.getContext('2d');

    const playIcon = '<i class="fas fa-play"></i>';
    const pauseIcon = '<i class="fas fa-pause"></i>';
    const volumeUpIcon = '<i class="fas fa-volume-up"></i>';
    const volumeMuteIcon = '<i class="fas fa-volume-mute"></i>';

    // --- CONFIGURAÇÃO DO STREAMING ---
    const streamURL = 'STREAM_URL';
    audioPlayer.src = streamURL;
    audioPlayer.volume = 0.8;

    
    let audioContext;
    let analyser;

    function setupAudioContext() {
        if (audioContext) return; // Inicializa apenas uma vez
        
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(audioPlayer);
        analyser = audioContext.createAnalyser();
        
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        analyser.fftSize = 128;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        renderFrame();

        function renderFrame() {
            requestAnimationFrame(renderFrame); // Cria um loop
            analyser.getByteFrequencyData(dataArray);

            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;
                
                canvasCtx.fillStyle = '#ffc107'; // Cor amarela
                canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                
                x += barWidth + 1; // Espaço entre as barras
            }
        }
    }

    
    function togglePlayPause() {
        if (!audioContext) {
            setupAudioContext(); // Inicializa o visualizador no primeiro play
        }

        if (audioPlayer.paused || audioPlayer.ended) {
            audioPlayer.play().catch(error => console.error("Erro ao tentar tocar o áudio:", error));
            playPauseBtn.innerHTML = pauseIcon;
        } else {
            audioPlayer.pause();
            playPauseBtn.innerHTML = playIcon;
        }
    }

    function increaseVolume() {
        if (audioPlayer.volume < 1.0) audioPlayer.volume = Math.min(1.0, audioPlayer.volume + 0.1);
    }

    function decreaseVolume() {
        if (audioPlayer.volume > 0.0) audioPlayer.volume = Math.max(0.0, audioPlayer.volume - 0.1);
    }

    function toggleMute() {
        audioPlayer.muted = !audioPlayer.muted;
        muteBtn.innerHTML = audioPlayer.muted ? volumeMuteIcon : volumeUpIcon;
    }

    
    playPauseBtn.addEventListener('click', togglePlayPause);
    volUpBtn.addEventListener('click', increaseVolume);
    volDownBtn.addEventListener('click', decreaseVolume);
    muteBtn.addEventListener('click', toggleMute);

    const modal = document.getElementById('privacy-modal');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.querySelector('.close-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const contentPanels = document.querySelectorAll('.content-panel');

    function showTab(tabName) {
        contentPanels.forEach(panel => panel.classList.remove('active'));
        tabBtns.forEach(btn => btn.classList.remove('active'));

        const targetPanel = document.getElementById(tabName + '-content');
        const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
        
        if (targetPanel && targetBtn) {
            targetPanel.classList.add('active');
            targetBtn.classList.add('active');
            location.hash = tabName;
        }
    }

    function openModal(initialTab = 'politica') {
        if (modal) {
            modal.style.display = 'block';
            showTab(initialTab);
        }
    }

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    }

    if (openModalBtn) {
        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const initialTab = e.target.hash.substring(1) || 'politica';
            openModal(initialTab);
        });
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal();
        }
    });

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            showTab(tabName);
        });
    });

    window.addEventListener('load', () => {
        const currentHash = location.hash.substring(1);
        if (currentHash === 'politica' || currentHash === 'termos') {
            openModal(currentHash);
        }
    });
});
