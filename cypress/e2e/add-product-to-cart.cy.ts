describe('Add product to cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shoud be able to navigate to the product page and add it to the cart', () => {
    cy.get('a[href^="/product/"]').first().click()

    cy.url().should('include', '/product/')

    cy.contains('Adicionar ao carrinho', {
      matchCase: false,
    }).click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicatted products on cart', () => {
    cy.get('a[href^="/product/"]').first().click()

    cy.url().should('include', '/product/')

    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('shoult be able to search for a product and add it to the cart', () => {
    cy.searchByQuery('moletom')

    cy.get('a[href^="/product/"]').first().click()

    cy.url().should('include', '/product/')

    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })
})
