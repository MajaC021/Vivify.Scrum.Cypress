import loginModel from "../pages/loginModel.json"
import organizations from "../pages/organizations.json"
import dataOrg from "../fixtures/data.json"

describe("create organization", () => {

    beforeEach("Login user", () => {
        cy.visit("/login")

        cy.get(loginModel.email).type(dataOrg.user.email)
        cy.get(loginModel.password).type(dataOrg.user.pass)
        cy.get(loginModel.logInBtn).click();
       
      });

     //positive
     it("Add new org", () => {
      
        cy.get(organizations.addNewOrgBtnDropdown).eq(1).click({force: true});
        cy.get(organizations.addOrganizationBtn).eq(0).click();
        cy.get(organizations.inputNameOrg).type(dataOrg.org.orgName)
        cy.get(organizations.nextBtn).click();
        cy.get(organizations.createBtn).click();


        cy.get('.vs-c-sidebar-info').should('contain', 'Collapse sidebar')
    })

    it("Check org in active org", () => {
      

        cy.get(".vs-c-my-organizations-item-wrapper").should('contain', dataOrg.org.orgName)
    })

    it("Edit org with new org name", () => {
      
        cy.get(organizations.editOrg).eq(0).click();
        cy.get(organizations.changeOrgName).clear()
        cy.get(organizations.changeOrgName).type(dataUser.org.editOrgName)
        cy.get(organizations.checkEditedOrg).click();
        
        cy.get("h2[class='vs-c-my-organization__title']").should('contain', dataUser.org.editOrgName)
    })


    it("Arhive org", () => {
      
        cy.get(organizations.arhiveOrgBtn).eq(0).click({force: true});
        cy.get(organizations.saveConfirmBtn).click();

        cy.get("div[class='vs-c-my-organization organization-list-item']").should('have.css', 'opacity', '1')

    })

    it("Delete arhived org", () => {
      
        cy.get(organizations.orgFromArhived).eq(0).click();
        cy.get(organizations.deleteArhivedOrg).eq(1).click()
        cy.get(organizations.confirmPassDeleteOrg).type(dataUser.user.pass)
        cy.get(organizations.saveConfirmBtn).click()

        cy.get("[class='vs-c-my-organizations-item-wrapper']").should('contain', 'Add new Organization')
    })

    it("Delete org", () => {
      
        cy.get(organizations.clickOrg).eq(0).click();
        cy.get(organizations.noticeOkClose).click()
        cy.get(organizations.clickConfig).click()
        cy.get(organizations.deleteOrg).eq(5).click()
        cy.get(organizations.confirmPassDeleteOrg).type(dataUser.user.pass)
        cy.get(organizations.saveConfirmBtn).click()

        cy.get("h2[class='vs-c-my-organization__title']").should('contain', 'Add new Organization')
    })

    //negative
    it("Edit org without name", () => {
      
        cy.get(organizations.editOrg).click();
        cy.get(organizations.changeOrgName).clear()
        cy.get(organizations.checkEditedOrg).click();
        
        cy.get("h2[class='vs-c-my-organization__title']").should('contain', dataUser.org.editOrgName)
    })

    it("Add new org without name", () => {
      
        cy.get(organizations.addNewOrgBtnDropdown).eq(1).click({force: true});
        cy.get(organizations.addOrganizationBtn).eq(0).click();

        cy.get('.is-disabled').should('be.disabled')
    })
})