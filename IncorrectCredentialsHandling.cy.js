describe("Incorrect Credential Handling", () => {

    // Test case for System Admin login
    it("should test log in as System Admin", () => {
        cy.visit("https://portal.gtcare.ca");
        cy.get("input#Username.form-control").type("developer@gtcare.ca");
        cy.get("input#Password.form-control").type("developer_12344");
        cy.get("button.btn.btn-primary.block.full-width.m-b").click();
        cy.get('span.text-primary.font-bold').should('be.visible');
        cy.get('span.text-primary.font-bold').should('contain', 'Invalid username or password');

        cy.url().should('include', '/'); 

    });

    // Test case for Companion login
    it("should test log in as Companion", () => {
        cy.visit("https://portal.gtcare.ca");
        cy.get("input#Username.form-control").type("oreoluwaakintibu@gmail.com");
        cy.get("input#Password.form-control").type("Oreoluwa@1237444");
        cy.get("button.btn.btn-primary.block.full-width.m-b").click();
        
        cy.get('span.text-primary.font-bold').should('be.visible');
        cy.get('span.text-primary.font-bold').should('contain', 'Invalid username or password');
        // Verify the site remains the same
        cy.url().should('include', '/'); 
    });

    // Test case for Customer Admin login 
    it("should test log in as Customer Admin", () => {
        cy.visit("https://portal.gtcare.ca");
        
        cy.get("input#Username.form-control").type("customerAdmin@example.com"); 
        cy.get("input#Password.form-control").type("password123"); 
        cy.get("button.btn.btn-primary.block.full-width.m-b").click();

        cy.get('span.text-primary.font-bold').should('be.visible');
        cy.get('span.text-primary.font-bold').should('contain', 'An error occur, user browser information or location cannot be verified');

        cy.url().should('include', '/'); 


    });



});
