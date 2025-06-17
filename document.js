document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile (para versão responsiva)
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header .container').appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav ul');
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Carregar itens do cardápio
    loadMenuItems('entradas');
    
    // Event listeners para os botões de categoria
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadMenuItems(this.dataset.category);
        });
    });
    
    // Formulário de reserva
    const reservaForm = document.getElementById('reserva-form');
    if (reservaForm) {
        reservaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            fetch('php/reservas.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Reserva realizada com sucesso!');
                    reservaForm.reset();
                } else {
                    alert('Erro ao fazer reserva: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Erro ao conectar com o servidor');
            });
        });
    }
    
    // Formulário de contato
    const contatoForm = document.getElementById('contato-form');
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            fetch('php/contato.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Mensagem enviada com sucesso!');
                    contatoForm.reset();
                } else {
                    alert('Erro ao enviar mensagem: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Erro ao conectar com o servidor');
            });
        });
    }
    
    // Suavizar rolagem para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se aberto
                const nav = document.querySelector('nav ul');
                if (window.getComputedStyle(nav).display === 'flex') {
                    nav.style.display = 'none';
                }
            }
        });
    });
});

function loadMenuItems(category) {
    // Em um projeto real, isso viria de uma API ou banco de dados
    // Aqui estamos usando dados mockados
    const menuItems = {
        entradas: [
            { nome: "Bruschetta", descricao: "Pão italiano grelhado com tomate fresco, manjericão e azeite", preco: 18.90, imagem: "images/bruschetta.jpg" },
            { nome: "Carpaccio", descricao: "Finas fatias de carne crua com rúcula e parmesão", preco: 32.50, imagem: "images/carpaccio.jpg" }
        ],
        principais: [
            { nome: "Risoto de Funghi", descricao: "Risoto cremoso com cogumelos frescos e trufa", preco: 58.90, imagem: "images/risoto.jpg" },
            { nome: "Filé Mignon", descricao: "Filé mignon grelhado com molho de vinho tinto", preco: 72.50, imagem: "images/file.jpg" }
        ],
        sobremesas: [
            { nome: "Tiramisu", descricao: "Clássico italiano com café e mascarpone", preco: 22.90, imagem: "images/tiramisu.jpg" },
            { nome: "Crème Brûlée", descricao: "Sobremesa francesa com açúcar caramelizado", preco: 24.50, imagem: "images/creme.jpg" }
        ],
        bebidas: [
            { nome: "Vinho Tinto", descricao: "Casa - Seleção do sommelier", preco: 35.90, imagem: "images/vinho.jpg" },
            { nome: "Coquetel Especial", descricao: "Drink exclusivo do bartender", preco: 28.50, imagem: "images/drink.jpg" }
        ]
    };
    
    const itemsContainer = document.getElementById('menu-items');
    itemsContainer.innerHTML = '';
    
    menuItems[category].forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('menu-item');
        itemElement.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="menu-item-content">
                <h3>${item.nome}</h3>
                <p>${item.descricao}</p>
                <div class="price">R$ ${item.preco.toFixed(2)}</div>
            </div>
        `;
        itemsContainer.appendChild(itemElement);
    });
}