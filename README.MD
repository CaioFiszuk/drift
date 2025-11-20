# Drift — Aplicativo de Produtividade Inteligente

## Drift é um aplicativo de produtividade projetado para pessoas com personalidade Perceiving (MBTI) — usuários que preferem flexibilidade, espontaneidade e um fluxo de trabalho não rígido.

## O objetivo do Drift é oferecer uma experiência simples, inteligente e adaptável para ajudar o usuário a realizar suas tarefas sem se sentir preso a sistemas tradicionais.

### **Diferenciais**
- Interface extremamente simples e direta
- Sistema baseado em humor do usuário (“good mood” e “bad mood”)
- Lógica inteligente de exibição de tasks usando Day.js
- Tarefas recorrentes configuráveis (diária, semanal, quinzenal, fixa etc.)
- Notificações automáticas para tarefas com data fixa
- Dashboard minimalista para visualizar, organizar e concluir tarefas
- Backend completo com Node.js, Express e MongoDB
- Autenticação e CRUD de tarefas

### Tecnologias Utilizadas
#### Frontend
- React JS
- React Icons
- SweetAlert2
- Day.js
- CSS customizado
- React Router
- Axios

#### Backend
- Node.js
- Express
- MongoDB + Mongoose
- Autenticação usando tokens
- Controllers organizados

### Funcionalidades
#### Sistema de Tarefas
As tarefas possuem os seguintes modos de frequência:
- Diária
- Diária com exceção
- Semanal
- Quinzenal
- Data fixa
- Data fixa adiável

O sistema filtra automaticamente:

- Apenas as tarefas do dia
- Tarefas de humor (good/bad)

#### Sistema de Humor

O usuário pode alternar entre dois modos:

- Good Mood → Exibe todas as tarefas

- Bad Mood → Exibe apenas tarefas selecionadas como “pesadas demais no dia ruim”

Cada mood afeta a visualização, mas não altera o conteúdo da base de dados.

#### Notificações Inteligentes

Um sistema automático busca de hora em hora as tarefas fixas do usuário e exibe um alerta lembrando a proximidade da data.

- Executado via setInterval
- Usa SweetAlert2
- Seleciona uma tarefa aleatória
- Calcula dias restantes para a data
- Evita notificar datas já passadas

#### Autenticação

- Registro de usuário com validação de nome (somente letras)
- Login via token
- Proteção de rotas
- Cada usuário acessa apenas suas próprias tarefas

#### Backend com Node.js

Endpoints principais:

`
  POST /signup
  POST /signin
  GET  /tasks
  POST /tasks
  PATCH  /tasks/:taskId
  DELETE /tasks/:taskId
  GET /tasks/fixed
  GET /tasks/mood
  PATCH /tasks/:taskId/status
`

### Lógica de Exibição de Tarefas

Uma função filtra as tarefas do dia:

```
Javascript

export function getTasksForToday(tasks) {
  const today = dayjs();
  const dayOfWeek = today.day();
  const startOfYear = dayjs().startOf('year');
  const weekNumber = Math.floor(today.diff(startOfYear, 'day') / 7) + 1;

  return tasks.filter(task => {
    switch (task.frequency?.mode) {
      case "diaria":
        return true;

      case "diaria com exceção":
        return !task.exceptDays?.includes(dayOfWeek);

      case "semanal":
        return task.daysOfWeek?.includes(dayOfWeek);

      case "quinzenal":
        return weekNumber % 2 === 0 && task.daysOfWeek?.includes(dayOfWeek);

      case "data fixa":
      case "data fixa adiavel":
        return dayjs(task.dueDate).isSame(today, 'day');

      default:
        return false;
    }
  });
}

### Telas Principais

#### Página inicial

- Botões de humor
- Tabela de tarefas
- Botões “Começar” e “Concluir”
- Cores indicativas de status

#### Login / Registro

Com validação de nome, e visual limpo.

#### Navegação interna

- Rota protegida
- Dashboard limpo e direto

### Notificações de Tarefas Fixas

Rodam automaticamente a cada X segundos (no projeto atual: 10s apenas para testes).

Trecho principal:

```
Javascript

useEffect(() => {
  const interval = setInterval(async () => {
    const fixedTasks = await getFixedTasks();
    if (!fixedTasks.length) return;

    const randomTask = fixedTasks[Math.floor(Math.random() * fixedTasks.length)];

    const due = new Date(randomTask.frequency.dueDate);
    const today = new Date();
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) return;

    Swal.fire({
      title: 'Lembrete!',
      text: `${randomTask.title} daqui há ${diff} dias`,
      confirmButtonText: 'OK'
    });

  }, 3600000); // recomendado: 1h

  return () => clearInterval(interval);
}, []);
```

### Como rodar o projeto

#### Frontend

`
  cd drift
  npm install
  npm run dev
`

#### Backend

`
  cd backend
  npm install
  npm run dev
`

### Biblioteca de terceiros

Este software utiliza as seguintes bibliotecas open source:

- React.js — Licença MIT

- Node.js — Licença MIT

- dayJs — Licença MIT

- React-Modal — Licença MIT

### Licença

Este software é proprietário. O uso está restrito ao comprador/licenciado autorizado.

Não é permitida a redistribuição, cópia ou modificação sem autorização prévia.

Para licenciamento comercial, entre em contato: [caiolopes871@gmail.com]