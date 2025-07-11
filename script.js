document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DA PÁGINA INICIAL (index.html) ---
    const uploadBox = document.getElementById('upload-box');
    if (uploadBox) {
        // ... (Toda a lógica da página inicial permanece a mesma)
        const SIMULATION_SPEED_MS = 100;
        const videoUploadInput = document.getElementById('video-upload-input');
        const uploadButton = document.getElementById('upload-button');
        const uploadProgress = document.getElementById('upload-progress');

        function handleFileUpload(file) {
            if (!file) return;
            if (uploadBox) uploadBox.style.display = 'none';
            if (uploadProgress) {
                uploadProgress.classList.remove('hidden');
                uploadProgress.style.display = 'block';
            }
            const videoFileName = document.getElementById('video-file-name');
            if (videoFileName) videoFileName.textContent = `(${file.name})`;
            simulateAIAnalysis();
        }

        uploadButton.addEventListener('click', (e) => { e.stopPropagation(); videoUploadInput.click(); });
        uploadBox.addEventListener('click', () => { videoUploadInput.click(); });
        uploadBox.addEventListener('dragover', (e) => { e.preventDefault(); uploadBox.style.borderColor = 'var(--primary-purple)'; });
        uploadBox.addEventListener('dragleave', () => { uploadBox.style.borderColor = '#3f3f46'; });
        uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = '#3f3f46';
            if (e.dataTransfer.files.length > 0) handleFileUpload(e.dataTransfer.files[0]);
        });
        videoUploadInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) handleFileUpload(e.target.files[0]);
        });

        function simulateAIAnalysis() {
            const progressBar = document.getElementById('progress');
            const statusText = document.getElementById('ai-status-text');
            if (!progressBar || !statusText) return;
            const statusMessages = ["Analisando áudio...", "Identificando cenas...", "Calculando potencial viral...", "Gerando clipes..."];
            let messageIndex = 0;
            statusText.textContent = statusMessages[messageIndex];
            let width = 0;
            const interval = setInterval(() => {
                width += 10;
                progressBar.style.width = width + '%';
                if (width % 25 === 0 && width < 100) { messageIndex++; statusText.textContent = statusMessages[messageIndex]; }
                if (width >= 100) {
                    clearInterval(interval);
                    statusText.textContent = "Análise concluída!";
                    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000); 
                }
            }, SIMULATION_SPEED_MS);
        }

        const showcaseCards = document.querySelectorAll('.showcase-card');
        showcaseCards.forEach(card => {
            const video = card.querySelector('video');
            if(video) {
                card.addEventListener('mouseover', () => { video.play().catch(e => {}); });
                card.addEventListener('mouseout', () => { video.pause(); video.currentTime = 0; });
            }
        });
    }

    // --- LÓGICA DO FAQ (Funciona em qualquer página) ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const questionButton = item.querySelector('.faq-question');
            questionButton.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const isActive = item.classList.contains('active');
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    }
                });
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }

    // --- LÓGICA DA PÁGINA DE EDIÇÃO (editing.html) ---
    const editorContainer = document.querySelector('.editor-container');
    if (editorContainer) {
        const clipItems = document.querySelectorAll('.clip-item');
        const mainVideoPlayer = document.getElementById('main-video-player');
        const styleOptions = document.getElementById('style-options');
        const addTextBtn = document.getElementById('add-text-btn');
        const addLogoBtn = document.getElementById('add-logo-btn');
        const addMusicBtn = document.getElementById('add-music-btn');

        if (mainVideoPlayer) {
            mainVideoPlayer.src = "https://assets.mixkit.co/videos/preview/mixkit-business-people-in-a-meeting-2215-large.mp4";
            mainVideoPlayer.play();
        }

        clipItems.forEach(item => {
            item.addEventListener('click', () => {
                clipItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                const newPoster = item.querySelector('img').src;
                if (mainVideoPlayer) {
                    mainVideoPlayer.poster = newPoster;
                    mainVideoPlayer.play();
                }
            });
        });

        if (styleOptions) {
            const styleButtons = styleOptions.querySelectorAll('.style-btn');
            styleButtons.forEach(button => {
                button.addEventListener('click', () => {
                    styleButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        }
        
        // LÓGICA ATUALIZADA PARA ADICIONAR TEXTO ARRASTÁVEL
        if (addTextBtn) {
            addTextBtn.addEventListener('click', () => {
                const videoWrapper = document.getElementById('video-player-wrapper');
                // Evita adicionar múltiplos textos
                if (videoWrapper.querySelector('.draggable-text')) {
                    alert("Você já adicionou um texto. Edite ou remova o existente.");
                    return;
                }
                
                const textElement = document.createElement('div');
                textElement.textContent = 'Edite este texto!';
                textElement.className = 'draggable-text';
                textElement.contentEditable = true;
                videoWrapper.appendChild(textElement);

                makeElementDraggable(textElement);
            });
        }

        // NOVA FUNÇÃO PARA TORNAR O ELEMENTO ARRASTÁVEL
        function makeElementDraggable(element) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

            element.onmousedown = dragMouseDown;

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // Pega a posição inicial do cursor
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // Chama a função sempre que o cursor se mover
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // Calcula a nova posição do cursor
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // Define a nova posição do elemento
                element.style.top = (element.offsetTop - pos2) + "px";
                element.style.left = (element.offsetLeft - pos1) + "px";
            }

            function closeDragElement() {
                // Para de mover quando o botão do mouse é solto
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
        
        if (addLogoBtn) addLogoBtn.addEventListener('click', () => alert("Função 'Adicionar Logo' seria ativada aqui."));
        if (addMusicBtn) addMusicBtn.addEventListener('click', () => alert("Função 'Escolher Música' seria ativada aqui."));
    }
});
