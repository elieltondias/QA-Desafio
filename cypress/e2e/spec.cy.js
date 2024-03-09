describe('seu_barriga', () =>{

  let n = 1;

  while (n < 20) {
    n++;

  it('cadastro', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')
    
    // Cadastro
    cy.contains('Novo usuário?').should('be.visible');
    cy.get(':nth-child(2) > a').click();

    cy.get('#nome').should('exist');
    cy.get('#email').should('exist');
    cy.get('#senha').should('exist');

    // Geração de e-mail e senha randomico
    const userData = {
      nome: `${Math.random().toString(36).substring(2, 7)}`,
      email: `${Math.random().toString(36).substring(2, 7)}@gmail.com`,
      senha: `${Math.random().toString(36).substring(2, 7)}`,
    };

    cy.get('#nome').type(userData.nome);
    cy.get('#email').type(userData.email);
    cy.get('#senha').type(userData.senha);


    cy.contains('Cadastrar').should('be.visible');
    cy.get('.btn').click();

})

  it('login e funcionalidades', () => {

    const userData = {
      nome: `${Math.random().toString(36).substring(2, 7)}`,
    };

      cy.visit('https://seubarriga.wcaquino.me/login')
      cy.contains('Login').should('be.visible');

      cy.get('#email').should('exist');
      cy.get('#senha').should('exist');

      cy.get('#email').type('teste_cadastro@gmail.com');
      cy.get('#senha').type('teste_cadastro{enter}');

      cy.contains('Contas').should('be.visible')
      cy.get('.dropdown-toggle').click();
      cy.get('.dropdown-menu > :nth-child(1) > a').click();

      cy.get('#nome').type('Imoveis{enter}')

      // Criar Movimentação
      cy.contains('Criar Movimentação').should('be.visible')
      cy.get(':nth-child(3) > a').click();

      cy.get('#data_transacao').type('01/01/2011');
      cy.get('#data_pagamento').type('01/01/2011');
      cy.get('#descricao').type(userData.nome);
      cy.get('#interessado').type(userData.nome);
      cy.get('#valor').type('99999');
      cy.get('#status_pago').click().type('{enter}')

      // Verificar Movimentação no extrato (RESUMO MENSAL)
      cy.visit('https://seubarriga.wcaquino.me/extrato')
      cy.get('#mes').select('Janeiro');
      cy.get('#ano').select('2011');
      cy.get('.btn').click();

      // Listar as Contas
      cy.get('.dropdown-toggle').click();
      cy.get('.dropdown-menu > :nth-child(2) > a').click();

      // Logout
      cy.get(':nth-child(5) > a').click();

  })
}

})