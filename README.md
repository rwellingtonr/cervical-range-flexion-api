# servical-range-flexion-api

## REF

<https://serialport.io/docs/api-serialport>
<https://fazerlab.wordpress.com/2017/10/09/monitor-temperatura-e-umidade-com-arduino-e-nodejs/>

flexāo é o eixo Y
lateral é o eixo

## Porta Serial

|     De - Para      |    Eventos    |                      Açāo                      |
| :----------------: | :-----------: | :--------------------------------------------: |
| Arduino - Servidor |     tare      |               Fim da calibraçāo                |
| Servidor - Arduino |    flexion    |    Averígua o movimento do eixo Y em flexāo    |
| Servidor - Arduino | lateral-left  | Movimento do eixo X em flexāo laterar esquerda |
| Servidor - Arduino | lateral-right | Movimento do eixo X em flexāo laterar direita  |
| Arduino - Servidor |      end      |               Coleta finalizada                |
| Arduino - Servidor |     data      |                Dados da coleta                 |
