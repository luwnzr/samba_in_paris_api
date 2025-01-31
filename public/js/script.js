// Função para realizar o login
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao fazer login");
        return response.json();
    })
    .then(data => {
        if (data.message === "Login bem-sucedido!") {
            localStorage.setItem("user_id", data.user.id); // Armazena o ID do usuário
            window.location.href = "dashboard.html"; // Redireciona para a dashboard
        } else {
            alert("Credenciais inválidas!");
        }
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao fazer login. Tente novamente.");
    });
  });
  
  // Função para realizar o registro
  document.getElementById("registerForm")?.addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao cadastrar usuário");
        return response.json();
    })
    .then(data => {
        alert(data.message);
        window.location.href = "login.html"; // Redireciona para a página de login
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao cadastrar usuário. Tente novamente.");
    });
  });
  
  // Função para carregar a lista de usuários na dashboard
  function carregarUsuarios() {
    fetch("http://localhost:3000/users")
    .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar usuários");
        return response.json();
    })
    .then(data => {
        const userList = document.getElementById("userList");
        userList.innerHTML = ""; // Limpa a lista antes de adicionar
        data.forEach(user => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.innerHTML = `
                <strong>ID:</strong> ${user.id}<br>
                <strong>Usuário:</strong> ${user.username}
            `;
            userList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao carregar usuários.");
    });
  }
  
  // Verifica se estamos na página do dashboard e carrega os usuários
  if (window.location.pathname.includes("dashboard.html")) {
    carregarUsuarios();
  }