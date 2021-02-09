<p align="center">
<img src="https://drive.google.com/uc?id=1hD9ohoKfZxoKnxYRK7XH8VeNKihLW5tJ" width="200"/>
</p>

# MQTT.JS Auto Exec

Programa para execução de comandos recebidos por protocolo MQTT.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8bd6cf220f4945418908d881361e60d2)](https://app.codacy.com/gh/leonardopn/mqtt-automation-js?utm_source=github.com&utm_medium=referral&utm_content=leonardopn/mqtt-automation-js&utm_campaign=Badge_Grade)
![](https://img.shields.io/badge/version-v0.1.0-green)
[![(Version)](https://img.shields.io/badge/license-GNU%20GPL%20version%203-green.svg?style=flat-square)](https://github.com/leonardopn/mqtt-automation-js/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/leonardopn/mqtt-automation-js)](https://github.com/leonardopn/mqtt-automation-js/issues)
[![GitHub forks](https://img.shields.io/github/forks/leonardopn/mqtt-automation-js)](https://github.com/leonardopn/mqtt-automation-js/network)

##

### O quê é?
O programa tem como intuíto fornecer uma interface gráfica que se comunica com o broker MQTT para recebimento de comandos que serão executados. Foi construído utilizando um frontend React + Electron e um backend Node. A concepção deste programa surgiu para automatizar operações rotineiras da minha vida. Eu realizo a integração do meu servidor MQTT com uma Alexa, e por isso, consigo executar comandos remotamente falando por exemplo: "Alexa, abrir calculadora". Porém, contanto que o programa se conecte com um broker MQTT, fica a cargo do usuário como serão enviados os comandos pelo broker.

### Funcionamento
O funcionamento é simples e não necessáriamente precisa ser feito nessa ordem, mas aconselho a fazer da seguinte forma:

1º Vá nas configurações do programa e coloque os dados do servidor MQTT que o programa deve se conectar. Se a conexão estiver estabelecida seu programa já está apto a receber comandos

2º Para o programa ter o quê executar, é preciso criar comandos. Para isso, vá no menu de comandos e crie um comando dando nome (igual a mensagem recebida por MQTT) e o comandos que será executado.

3º Tendo a conexão com o broker MQTT e pelo menos um comando, seu programa já está apto a funcionar.


### Imagens do funcionamento

#### Tela de comandos
<img src="https://drive.google.com/uc?id=15j-gLOVq4Rw4o5VyTAVazVzglIUy0ZyJ" />

#### Tela de configurações
<img src="https://drive.google.com/uc?id=13JqncT2SvhR0e2fv3h4TCZg8jhfV5j1z" />

#### Tela dos logs
<img src="https://drive.google.com/uc?id=1pllVJPY2TeZ8uDU6n73XGGUo-BsiABt6" />

#### Fechando o APP
<img src="https://drive.google.com/uc?id=1lOOrPP8NGQuJ0MoEColGDOoKbO9_nE1U" />

## Instalação

```Windows:``` Ainda sem instalador.

```Linux:``` Ainda sem instalador.

```MAC:``` Ainda sem instalador.

## Meta

<center><b>-=Leonardo Petta do Nascimento=-</b></center></br> 

Facebook: [@leonardo.petta.nascimento](https://www.facebook.com/leonardo.petta.nascimento)</br> 
Email: leonardocps9@protonmail.com
</br> 
Linkedin: [Leonardo Petta Do Nascimento](https://www.linkedin.com/in/leonardo-petta-do-nascimento-75674015b/)

Site pessoal: [leonardopetta.tech](https://leonardopetta.tech)

Distribuído sob a licença ```GNU GPL version v3``` . Consulte [```LICENCE```](https://github.com/leonardopn/mqtt-automation-js/blob/master/LICENSE) para obter mais informações.

---

