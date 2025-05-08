# 🚀 MongoDB Benchmark

This project performs a **performance benchmark** focused on simulating a realistic database environment using **MongoDB**.

---

## 📂 Database Structure

The database was modeled to simulate a vehicle and traffic fine management system. Collections and their respective fields are described below:

### 📁 Collections

- **marca** (brand)
  - `_id`
  - `nome` (name)

- **cor** (color)
  - `_id`
  - `nome` (name)

- **modelo** (model)
  - `_id`
  - `nome` (name)
  - `marca_id` (brand reference)

- **estado** (state)
  - `_id`
  - `sigla` (abbreviation)
  - `nome` (name)

- **cidade** (city)
  - `_id`
  - `nome` (name)
  - `estado_id` (state reference)

- **agente** (agent)
  - `_id`
  - `matricula` (registration number)
  - `nome` (name)
  - `contratacao` (hiring date)

- **infracao** (violation)
  - `_id`
  - `descricao` (description)
  - `valor` (fine amount)
  - `pontos` (penalty points)

- **proprietario** (owner)
  - `_id`
  - `nome` (name)
  - `cidade_id` (city reference)
  - `sexo` (gender)
  - `cpf` (tax ID)
  - `endereco` (embedded object with:)
    - `logradouro` (street)
    - `numero` (number)
    - `complemento` (complement)
    - `bairro` (neighborhood)
    - `cep` (postal code)

- **veiculo** (vehicle)
  - `_id`
  - `modelo_id` (model reference)
  - `proprietario_id` (owner reference)
  - `cor_id` (color reference)
  - `placa` (license plate)
  - `cadastro` (registration date)

- **multa** (fine)
  - `_id`
  - `agente_id` (agent reference)
  - `veiculo_id` (vehicle reference)
  - `cidade_id` (city reference)
  - `infracao_id` (violation reference)
  - `lancamento` (record number)
  - `data_multa` (fine date)
  - `hora` (time)
  - `local_multa` (fine location)

---

## 📊 Documents per Collection

| Collection     | Number of Documents |
|----------------|---------------------|
| marca          | 20          16      |
| cor            | 30          20      |
| modelo         | 10          30      |
| estado         | 27                  |
| cidade         | 54                  |
| agente         | 15                  |
| infracao       | 50          40      |
| proprietario   | 5000        4000    |
| veiculo        | 10000       9000    |
| multa          | 1000                |

---

## 🧪 Benchmark Goal

- Evaluate query performance with multiple levels of relationships.
- Test embedded documents (e.g., owner’s address).
- Observe MongoDB behavior with moderate data volume.
- Simulate a real-world traffic system environment.

---

## ⚙️ Tools Used

- **MongoDB** (version X.X.X)
- **MongoDB Compass / Shell / Driver**
- [Include any other tools you used]

---

## 📌 Notes

- All data used in this benchmark is artificially generated and intended for academic and testing purposes only.
- The data model balances simplicity and enough complexity for meaningful performance tests.

---

## 📁 Scripts and Data

> [Optional] You can include a link or instructions to access your data generation or insertion scripts here.

---

## ✍️ Author

**Vinícius Cruz Cassemira**  
Developer • Software Development Student - Fatec Jaú  
[LinkedIn](https://www.linkedin.com/in/your-username) • [GitHub](https://github.com/your-username)

---
