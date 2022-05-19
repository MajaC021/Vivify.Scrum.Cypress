import loginModel from "../pages/loginModel.json"
import boards from "../pages/boards.json"
import dataBoard from "../fixtures/data.json"

describe("create organization", () => {

    beforeEach("Login user", () => {
        cy.visit("/login")

        cy.get(loginModel.email).type(dataBoard.user.email)
        cy.get(loginModel.password).type(dataBoard.user.pass)
        cy.get(loginModel.logInBtn).click();

    });

    //positive
    it("Add new board", () => {

        cy.get(boards.addNewBoardBtnDropdown).eq(1).click({ force: true });
        cy.get(boards.addBoardBtn).eq(1).click();
        cy.get(boards.inputBoardName).eq(1).type(dataBoard.board.brdName)
        cy.get(boards.nextBtn).click();
        cy.get(boards.checkScrumRb).click();
        cy.get(boards.nextBtn).click();
        cy.get(boards.nextBtn).click();
        cy.get(boards.nextBtn).click();
        cy.get(boards.nextBtn).click();

        cy.get('h2').should('contain', 'Backlog')
    })

    it("Check board exist", () => {


        cy.get("ul[class='vs-c-list vs-c-list--boards']").should('contain', dataBoard.board.brdName)
    })

    it("Config board", () => {
        cy.get(boards.activeBoard).eq(0).click();
        cy.get(boards.editBoard).eq(8).click();

        cy.get('h2').should('contain', 'Backlog')
    })

    it("Edit board name", () => {
        cy.get(boards.activeBoard).eq(0).click();
        cy.get(boards.editBoard).eq(8).click();
        cy.get(boards.edinBrdName).eq(0).type(dataBoard.board.editBrdName);
        cy.get(boards.saveUpdate).eq(0).click()

        cy.get('.el-message').should('contain', 'Successfully updated the Board Basic Info.')
    })

    it.only("Delete board", () => {
        cy.get(boards.activeBoard).eq(0).click();
        cy.get(boards.editBoard).eq(8).click({ force: true });
        cy.get(boards.deleteBoard).click()
        cy.get(boards.confirmDeleteBrd).click()

        cy.get('.vs-c-organization-boards').should('not.have.value', dataBoard.board.editBrdName)
    })

})