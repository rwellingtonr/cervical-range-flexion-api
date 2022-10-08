# servical-range-flexion-api

## Como Executar

```bash
# clone o repositório
git clone

## Instalação de Dependências
cd ... && cp .env.example .env && yarn

## Rodar testes (opcional)
yarn test

## Execução em modo de desenvolvimento (opcional)
yarn dev

## Execução em produção
yarn build && pm2 start ecosystem.config.js
```

## REF

<https://serialport.io/docs/api-serialport>
<https://fazerlab.wordpress.com/2017/10/09/monitor-temperatura-e-umidade-com-arduino-e-nodejs/>

flexāo é o eixo Y
lateral é o eixo

## Tecnologias

|  Biblioteca  |          Descrição           |
| :----------: | :--------------------------: |
|   Express    |          Framework           |
|    Prisma    |  ORM para o banco de dados   |
|    SQLite    |  Banco de dados relacional   |
|    NodeJS    | Ambiente de desenvolvimento  |
|  socket.io   |          WebSocket           |
| jsonwebtoken |                              |
|    morgan    |          logs REST           |
|    log4js    |         logs gerais          |
|  serialport  | Conexão serial com o arduino |
|              |                              |
|              |                              |
|              |                              |
|              |                              |
|              |                              |
|              |                              |
|              |                              |
|              |                              |
|              |                              |
|              |                              |
|              |                              |

## Porta Serial

|     De - Para      |    Eventos    |                      Açāo                      |
| :----------------: | :-----------: | :--------------------------------------------: |
| Arduino - Servidor |     tare      |               Fim da calibraçāo                |
| Servidor - Arduino |    flexion    |    Averígua o movimento do eixo Y em flexāo    |
| Servidor - Arduino | lateral-left  | Movimento do eixo X em flexāo laterar esquerda |
| Servidor - Arduino | lateral-right | Movimento do eixo X em flexāo laterar direita  |
| Arduino - Servidor |      end      |               Coleta finalizada                |
| Arduino - Servidor |     data      |                Dados da coleta                 |

## Eventos WebSocket

|     Evento      | Enviado/Recebido |                 Descrição                  |
| :-------------: | :--------------: | :----------------------------------------: |
|     result      |     Enviado      |       Envia os resultados da medição       |
|   end-process   |     recebido     |            Finaliza o processo             |
|      start      |     recebido     |      inicia o processo de averiguação      |
|     status      |     Enviado      |      Envia o estado atual do Arduino       |
|     status      |     Recebido     | Verifica o estado da conexão com o Arduino |
| connect-arduino |     Recebido     |             Conecta o Arduino              |
|      abort      |     Recebido     | Cancela o processo de análise do paciente  |
|     message     |     Enviado      |     Mensagens informativas ao sistema      |
