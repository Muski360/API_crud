# API de controle de Alunos e Professores

## - API RESTful com métodos GET, POST, PUT, DELETE (CRUD) -

### Base URL

- http://localhost:3000/

### Estrutura dos dados

A API utiliza um arquivo contatos.json como base de dados local.

---

### Coleções Disponíveis

#### **Alunos**
- Endpoint: `/contatos/alunos`
    - Retorna Nome e Telefone do aluno.
    
#### **Professores**
- Endpoint: `/contatos/professores`
    - Retorna Nome e Telefone do professor.

# Endpoints

## 1. Listar todos os contatos de um grupo

### Requisição

```http
GET /contatos/:grupo
```

### Exemplo

```http
GET /contatos/alunos
```

### Resposta de sucesso

```json
[
  {
    "nome": "Maria Rian",
    "telefone": "191919191919"
  },
  {
    "nome": "Lorenzo Kaio",
    "telefone": "6666666666"
  }
]
```

### Erro

```json
{
  "error": "Grupo não encontrado"
}
```

---

## 2. Adicionar um novo contato

### Requisição

```http
POST /contatos/:grupo
```

### Exemplo

```http
POST /contatos/professores
Content-Type: application/json
```

### Body

```json
{
  "nome": "Ana Paula",
  "telefone": "11999999999"
}
```

### Resposta de sucesso

```json
{
  "message": "Contato adicionado com sucesso!",
  "contato": {
    "nome": "Ana Paula",
    "telefone": "11999999999"
  }
}
```

### Erros possíveis

#### Grupo não encontrado

```json
{
  "error": "Grupo não encontrado"
}
```

#### Campos obrigatórios ausentes

```json
{
  "error": "Nome e telefone são obrigatórios"
}
```

---

## 3. Atualizar um contato por índice

### Requisição

```http
PUT /contatos/:grupo/:index
```

### Exemplo

```http
PUT /contatos/alunos/0
```

### Body

```json
{
  "nome": "Maria Clara",
  "telefone": "11888888888"
}
```

### Resposta de sucesso

```json
{
  "message": "Contato atualizado com sucesso!",
  "contato": {
    "nome": "Maria Clara",
    "telefone": "11888888888"
  }
}
```

### Erros possíveis

#### Grupo não encontrado

```json
{
  "error": "Grupo não encontrado"
}
```

#### Contato não encontrado

```json
{
  "error": "Contato não encontrado"
}
```

#### Campos obrigatórios ausentes

```json
{
  "error": "Nome e telefone são obrigatórios"
}
```

---

## 4. Remover um contato por índice

### Requisição

```http
DELETE /contatos/:grupo/:index
```

### Exemplo

```http
DELETE /contatos/professores/0
```

### Resposta de sucesso

```json
{
  "message": "Contato removido com sucesso!",
  "contato": {
    "nome": "Murilo Dovigo",
    "telefone": "999999999999"
  }
}
```

### Erros possíveis

#### Grupo não encontrado

```json
{
  "error": "Grupo não encontrado"
}
```

#### Contato não encontrado

```json
{
  "error": "Contato não encontrado"
}
```