describe("Central de Atendimento ao Cliente TAT", () => {

  beforeEach(() =>{
    cy.visit("./src/index.html");

  })


  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it('Preenche os campos obrigatórios e envia o formulário', () =>{
    const longText = Cypress._.repeat('ashdjkahsdjkahsdjkasdkasdj', 20) //Loadash para repetir o texto

    cy.get('[name="firstName"]').type('Vinicius')
    cy.get('[name="lastName"]').type('Ramalho')
    cy.get('#email').type('teste@teste.com')
    cy.get('[name="open-text-area"]').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{
    cy.get('[name="firstName"]').type('Vinicius')
    cy.get('[name="lastName"]').type('Ramalho')
    cy.get('#email').type('testeteste.com')
    cy.get('[name="open-text-area"]').type('Lorem ipsum')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('valida se o campo de telefone está preenchido com valores numericos', () =>{
    cy.get('#phone')
      .type('abc')
      .should('be.empty')
    cy.get('#phone')
      .type('123')
      .should('have.value', '123')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
    cy.get('[name="firstName"]').type('Vinicius')
    cy.get('[name="lastName"]').type('Ramalho')
    cy.get('#email').type('teste@teste.com')
    cy.get('#phone-checkbox').check()
    cy.get('[name="open-text-area"]').type('Lorem ipsum')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
    cy.get('[name="firstName"]')
      .type('Vinicius')
      .should('have.value', 'Vinicius')
      .clear()
      .should('be.empty')



    cy.get('[name="lastName"]')
      .type('Ramalho')
      .should('have.value', 'Ramalho')
      .clear()
      .should('be.empty')

    cy.get('#email')
      .type('teste@teste.com')
      .should('have.value', 'teste@teste.com')
      .clear()
      .should('be.empty')

    cy.get('#phone')
      .type('123')
      .should('have.value', '123')
      .clear()
      .should('be.empty')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () =>{
    // const data = {
    //   nome: 'Vinicius',
    //   sobrenome: 'Ramalho',
    //   email: 'vinicius@teste.com'
    // } Os valores podem ser passados através de um objeto ou definido como padrão no comando persoanalizado

    cy.fillMandatoryFieldsAndSubmit(/*data*/)

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () =>{
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () =>{
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () =>{
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () =>{
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () =>{
    cy.get('input[type="radio"]')
      .each((typeOfService) =>{
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () =>{
    cy.get('input[type="checkbox"]')    
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')

    
  })

  it('seleciona um arquivo da pasta fixtures', () =>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .then(input =>{
        console.log(input)
        expect(input[0].files[0].name).to.be.equal('example.json')
      })

  })

  it('seleciona um arquivo simulando um drag-and-drop', () =>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .then(input =>{
        console.log(input)
        expect(input[0].files[0].name).to.be.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
    cy.fixture('example.json').as('exampleFile')
    cy.get('#file-upload')
      .selectFile('@exampleFile')
      .then(input =>{
        console.log(input)
        expect(input[0].files[0].name).to.be.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

});




