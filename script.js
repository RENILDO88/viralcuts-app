document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DA PÁGINA INICIAL (index.html) ---
    const uploadBox = document.getElementById('upload-box');
    if (uploadBox) {
        // ... (Todo o código da página inicial permanece aqui como antes)
    }

    // --- LÓGICA DO FAQ (Funciona em qualquer página) ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        // ... (Todo o código do FAQ permanece aqui como antes)
    }

    // --- LÓGICA DA PÁGINA DE EDIÇÃO (editing.html) ---
    const editorContainer = document.querySelector('.editor-container');
    if (editorContainer) {
        const clipItems = document.querySelectorAll('.clip-item');
        const mainVideoPlayer = document.getElementById('main-video-player');

        // Garante que o vídeo tenha controles e possa ser clicado
        if (mainVideoPlayer) {
            mainVideoPlayer.controls = true; // Garante que os controles nativos apareçam

            // Função para tocar ou pausar o vídeo
            const togglePlay = () => {
                if (mainVideoPlayer.paused) {
                    mainVideoPlayer.play();
                } else {
                    mainVideoPlayer.pause();
                }
            };

            // Adiciona o evento de clique ao próprio vídeo
            mainVideoPlayer.addEventListener('click', togglePlay);
        }

        // Lógica para trocar de clipe
        clipItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove a classe 'active' de todos os itens
                clipItems.forEach(i => i.classList.remove('active'));

                // Adiciona a classe 'active' ao item clicado
                item.classList.add('active');

                // Pega a imagem e o link do vídeo do item clicado
                const newPoster = item.dataset.poster;
                const newVideoSrc = item.dataset.videoSrc;

                // Atualiza o poster e o source do vídeo principal
                if (mainVideoPlayer) {
                    mainVideoPlayer.poster = newPoster;
                    mainVideoPlayer.src = newVideoSrc;
                    mainVideoPlayer.play(); // Toca o novo vídeo automaticamente
                }
            });
        });

        // Lógica para os botões de ferramentas (simulação)
        const styleOptions = document.getElementById('style-options');
        if (styleOptions) {
            const styleButtons = styleOptions.querySelectorAll('.style-btn');
            styleButtons.forEach(button => {
                button.addEventListener('click', () => {
                    styleButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        }
    }
});
// Nota: O código completo das seções da página inicial e do FAQ das respostas anteriores
// deve estar presente neste arquivo para que tudo funcione. A estrutura com `if(elemento)`
// garante que não haja erros quando você navega entre as páginas.
