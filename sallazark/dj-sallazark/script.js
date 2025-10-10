document.addEventListener('DOMContentLoaded', () => {
    // Lógica para o menu hamburger (mobile)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Lógica para alternar o texto do release no Presskit
    const releaseControls = document.querySelector('.release-controls');
    if (releaseControls) {
        const releaseButtons = releaseControls.querySelectorAll('.btn-release');
        const releaseTexts = document.querySelectorAll('.release-text');

        releaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                releaseButtons.forEach(btn => btn.classList.remove('active'));
                releaseTexts.forEach(text => text.classList.remove('active'));
                button.classList.add('active');
                document.getElementById(button.dataset.target)?.classList.add('active');
            });
        });
    }

    // Lógica para alternar as galerias de fotos
    const galeriaControls = document.querySelector('.galeria-controls');
    if (galeriaControls) {
        const galeriaButtons = galeriaControls.querySelectorAll('.btn-galeria');
        const galeriaGrids = document.querySelectorAll('.galeria-grid');
        const loadMoreButtons = document.querySelectorAll('.galeria-load-more');

        galeriaButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Desativa todos os botões e galerias
                galeriaButtons.forEach(btn => btn.classList.remove('active'));
                galeriaGrids.forEach(grid => grid.classList.remove('active'));
                loadMoreButtons.forEach(btn => btn.classList.remove('active'));

                // Ativa o botão clicado e a galeria correspondente
                button.classList.add('active');
                const targetGrid = document.getElementById(button.dataset.target);
                if (targetGrid) {
                    targetGrid.classList.add('active');
                    // Mostra o botão "carregar mais" correspondente
                    const targetLoadMore = document.getElementById(`load-more-${targetGrid.id.split('-')[1]}`);
                    if (targetLoadMore) {
                        targetLoadMore.classList.add('active');
                    }
                }
            });
        });

        // Lógica para o botão "Exibir mais fotos"
        loadMoreButtons.forEach(container => {
            const button = container.querySelector('button');
            button.addEventListener('click', () => {
                const gridId = `galeria-${container.id.split('-')[2]}`;
                document.getElementById(gridId)?.classList.add('show-all');
                container.style.display = 'none'; // Esconde o botão depois de clicado
            });
        });
    }

    // Lógica para o botão "Exibir mais vídeos" na seção Gigs
    const loadMoreGigsContainer = document.getElementById('load-more-gigs');
    if (loadMoreGigsContainer) {
        const button = loadMoreGigsContainer.querySelector('button');
        button.addEventListener('click', () => {
            const grid = document.getElementById('gigs-grid');
            grid?.classList.add('show-all');
            loadMoreGigsContainer.style.display = 'none'; // Esconde o botão depois de clicado
        });
    }

    // Lógica para o botão "Exibir mais fotos" na seção Fotos Presskit
    const loadMoreFotosPresskitButton = document.getElementById('load-more-fotos-presskit');
    if (loadMoreFotosPresskitButton) {
        loadMoreFotosPresskitButton.addEventListener('click', () => {
            const grid = document.getElementById('fotos-presskit-grid');
            grid?.classList.add('show-all');
            loadMoreFotosPresskitButton.style.display = 'none'; // Esconde o botão depois de clicado
        });
    }

});