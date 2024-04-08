# PredictWeather Rainfall Intensity API

Este projeto implementa uma aplicação que interage com a API Community IoT Device (CIoTD) para recuperar medições instantâneas de intensidade de chuva de sensores fabricados pela PredictWeather. A aplicação filtra e coleta dados apenas de dispositivos capazes de medir a intensidade da chuva utilizando o comando get_rainfall_intensity.

## Visão Geral

A API fornece um meio de acessar dados de intensidade de chuva em IoT registrados na plataforma CIoTD.

## Sobre a Aplicação

Foi criada utilizando o design patter MVC (Model-View-Controller) para o auxílio na tomada de decisões da indústria agrária, permitindo que exista facilidade na sua manutenção e novas implementações caso necessário.

A principio a API apenas se conecta a sensores de uma fabricante e que executam apenas um comando específico, porém em versões futuras terá capacidade de se conectar a outras fabricantes e trazer dados de diferentes comandos de sensores.

## Funcionalidades

 - Cadastrar usuário
 - Logar e autenticar usuário
 - Detalhar usuário
 - Excluir usuário logado
 - Listar dispositivos PredictWeather com leitura de Intensidade de chuvas
 - Trazer as medições colhidas por estes dispositivos

## Requisitos 

Para utilizar esta aplicação, certifique-se de ter o seguinte instalado:

- Node.js
- npm (Node Package Manager)

## Instalação

1 - Clonar o repositório:

Execute o comando no terminal

SSH
```bash
git clone git@github.com:muriloma/Desafio-Backend.git
```
HTTPS
```bash
git clone https://github.com/muriloma/Desafio-Backend.git
```

2 - Navegue até o diretório do projeto:

```bash
cd Desafio-Backend
```
3 - Instale as dependências:
```bash
npm install
```
4 - Configure as variáveis de ambiente:

Existe um arquivo na raiz do projeto, `.env.example` com todas as variáveis de ambiente utilizadas na aplicação.

Para utilizar, deve renomear o arquivo para `.env` e alterar o valor das variáveis de acordo com sua necessidade.

## Uso

Para iniciar a aplicação, execute o comando no terminal:

```bash
npm run dev
```
## Endpoints

### Usuário

#### Cadastrar usuário: 
`POST` `/user`

Esse endpoint cria o usuário através dos dados de `username` e `password` passados no corpo da requisição

##### Entrada
```json
{
    "username": "seu_username",
    "password": "seu_password",
}
```

#### Logar usuário: 
`POST` `/user/login`

Esse endpoint loga o usuário através dos dados de `username` e `password` passados no corpo da requisição

##### Entrada
```json
{
    "username": "seu_username",
    "password": "seu_password",
}
```
#### - Para os próximos endpoints é necessário que o usuário esteja logado 

#### Detalhar usuário: 
`GET` `/user`

Esse endpoint traz os dados do usuário logado

##### Saída
```json
{
    "username": "seu_username",
    "password": "seu_password",
}
```

#### Excluir usuário: 
`DELETE` `/user`

Esse endpoint exclui o usuário logado

### Dispositivo

#### Listar dispositivos: 
`GET` `/device/list`

Esse endpoint lista todos os dispositivos da fabricante PredictWeather que captam as medidas de intesidade de chuva através do comando `get_rainfall_intensity` 

##### Saída
```json
[
    {
        "identifier": "device001",
        "description": "Dispositivo de medição de chuva externo",
        "manufacturer": "PredictWeather",
        "url": "https://example.com/device001",
        "commands": [
            {
                "operation": "get_rainfall_intensity",
                "description": "Obtém a intensidade da chuva atual",
                "command": {
                    "command": "get_rainfall_intensity",
                    "parameters": []
                },
                "result": "Intensidade da chuva em mm/h",
                "format": "string"
            }
        ]
    },{
        "identifier": "device002",
        "description": "Estação meteorológica completa",
        "manufacturer": "PredictWeather",
        "url": "https://example.com/device002",
        "commands": [
            {
                "operation": "get_rainfall_intensity",
                "description": "Obtém a intensidade da chuva atual",
                "command": {
                    "command": "get_rainfall_intensity",
                    "parameters": []
                },
                "result": "Intensidade da chuva em mm/h",
                "format": "string"
            },
            {
                "operation": "get_temperature",
                "description": "Obtém a temperatura atual",
                "command": {
                    "command": "get_temperature",
                    "parameters": []
                },
                "result": "Temperatura em graus Celsius",
                "format": "string"
            }
        ]
    }
]
```

#### Realiza medições: 
`GET` `/device/measurement`

Esse endpoint lista todas as medidas de intensidade de chuva realizadas pelos dispositivos da fabricante PredictWeather.

##### Saída
```json
[
    {
        "device": "device001",
        "measurement": "25"
    },{
        "device": "device002",
        "measurement": "28"
    }
]
```