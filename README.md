<h1 align="center">
  <p>Adopet -  doação e adoção de pets</p>
 
<img alt="Static Badge Nodejs" src="https://img.shields.io/badge/18.17.1-%23339933?style=for-the-badge&logo=Node.js&label=Node.js&link=https%3A%2F%2Fnodejs.org%2Fen%2Fblog%2Frelease%2Fv18.17.1"> <img alt="Static Badge Sequelize" src="https://img.shields.io/badge/9.6.7-%2352B0E7?style=for-the-badge&logo=Sequelize&label=Sequelize&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fnpm%2Fv%2F9.6.7%3FactiveTab%3Dreadme"> <img alt="Static Badge Angular" src="https://img.shields.io/badge/16.2.0-%230F0F11?style=for-the-badge&logo=Angular&label=Angular&link=https%3A%2F%2Fangular.io%2F"> <img alt="Static Badge TypeScript" src="https://img.shields.io/badge/9.6.7-%233178C6?style=for-the-badge&logo=TypeScript&label=TypeScript&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fnpm%2Fv%2F9.6.7%3FactiveTab%3Dreadme"> <img alt="Static Badge npm" src="https://img.shields.io/badge/9.6.7-%23CB3837?style=for-the-badge&logo=npm&label=npm&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fnpm%2Fv%2F9.6.7%3FactiveTab%3Dreadme"> <img alt="Static Badge" src="https://img.shields.io/badge/8.0.33-%234479A1?style=for-the-badge&logo=mysql&label=mysql&link=https%3A%2F%2Fdev.mysql.com%2Fdoc%2Frelnotes%2Fmysql%2F8.0%2Fen%2Fnews-8-0-33.html">
 <img alt="Static Badge" src="https://img.shields.io/badge/MIT-red?style=for-the-badge&label=license">

<h2>Descrição do Projeto</h2>
<p>Projeto full-stack de uma plataforma de adoção e doação de pets. O usuário pode criar uma conta na intenção de doar ou de adotar um pet. O usuário que irá doar o pet pode cadastra-lo no sistema, não tendo limite para pets cadastrados.

Todos os pets disponíveis para adoção ficam visíveis para os usuários que possuem uma conta para adotar um pet, não tendo limite para pets adotados. Eles podem enviar uma mensagem para a pessoa que está doando o pet, que será avaliada por ela e decidirá se aceita ou não doar para a pessoa interessada.

</p>

<h1>:hammer: Funcionalidades do projeto</h1>
 <ul> 
 <li><code>CRUD pet: </code>Cadastrar, listar, editar e excluir pet.</li>
 <li><code>CRUD Usuario: </code>Cadastrar, visualizar os dados, editar os dados e exclusão da conta.</li>
 <li><code>Listagem paginada dos pets: </code>Os usuários que tem conta para adotar pet(s) podem visualizar todos os pets que ainda não foram adotados. Já os usuários que tem conta para doar pet(s), podem visualizar todos os seus pets que foram cadastrados.</li>
  <li><code>Sistema de filtragem de mensagens: </code>As mensagens enviadas pelo usuário que quer adotar e as mensagens recebidas pelo usuário que está doando são listadas e paginadas e podem ser filtradas por nome do pet, nome de usuário, ordem crescente ou decrescente e por status da adoção.</li>
 <li><code>Sistema de segurança: </code>Após se autenticar com as credenciais (email e senha), é armazenado no localstorage um token JWT que será utilizado em todas as requisições que necessitam de validação de usuário e também para fazer as validações das regras de negócio</li>
 </ul>

 <img src="https://github.com/matheus1629/alura-challenge-front-end-5edicao/assets/89110918/0fcc9733-457d-4376-b22d-0ee962f2271a" width="600" height="336"/>
