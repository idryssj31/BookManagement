describe('Page de gestion des livres', () => {
    beforeEach(() => {
        cy.request('DELETE', 'http://localhost:8081/api/books');
    });

    it('devrait afficher le titre, le bouton et la liste des livres', () => {
        cy.request('POST', 'http://localhost:8081/api/books', {
            name: 'Les Misérables',
            author: 'Victor Hugo'
        });
        cy.request('POST', 'http://localhost:8081/api/books', {
            name: 'Hamlet',
            author: 'William Shakespeare'
        });

        cy.visit('http://localhost:8081/books');
        cy.contains('Gestion des livres').should('be.visible');
        cy.contains('Supprimer tous les livres').should('be.visible');
        cy.get('ul').find('li').should('have.length', 2);
        cy.contains('Les Misérables — Victor Hugo').should('be.visible');
        cy.contains('Hamlet — William Shakespeare').should('be.visible');
    });
});