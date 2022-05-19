import loginModel from "../pages/loginModel.json"
import dataUser from "../fixtures/data.json"

describe("Login user", () => {

    //negative
    it("Login with invalid email", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataUser.user.invalidEmail)
        cy.get(loginModel.password).type(dataUser.user.pass)
        cy.get(loginModel.logInBtn).click();

        cy.get('.el-form-item__error').should('contain', 'The email field must be a valid email')
        cy.get('.el-form-item__error').should('have.css', 'color', 'rgb(187, 57, 22)')
        cy.get("button[type='submit']").should('have.css', 'background-color', 'rgb(62, 139, 117)')
    })

    it("Login with invalid pass", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataUser.user.email)
        cy.get(loginModel.password).type(dataUser.user.invalidPass)
        cy.get(loginModel.logInBtn).click();

        cy.get("span[class='el-form-item__error']").should('contain', 'Oops! Your email/password combination is incorrect')
        cy.get('.el-form-item__error').should('have.css', 'color', 'rgb(187, 57, 22)')
        cy.get("button[type='submit']").should('have.css', 'background-color', 'rgb(78, 174, 147)')
    })

    it("Login with pass less than 5 characters", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataUser.user.email)
        cy.get(loginModel.password).type(dataUser.user.invalidPass4char)
        cy.get(loginModel.logInBtn).click();

        cy.get("span[class='el-form-item__error el-form-item-error--top']").should('contain', 'The password field must be at least 5 characters')
        cy.get('.el-form-item__error').should('have.css', 'color', 'rgb(187, 57, 22)')
        cy.get("button[type='submit']").should('have.css', 'background-color', 'rgb(78, 174, 147)')
    })

    it("Login without pass", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataUser.user.email)
        cy.get(loginModel.logInBtn).click();

        cy.get("span[class='el-form-item__error el-form-item-error--top']").should('contain', 'The password field is required')
        cy.get('.el-form-item__error').should('have.css', 'color', 'rgb(187, 57, 22)')
        cy.get("button[type='submit']").should('have.css', 'background-color', 'rgb(62, 139, 117)')
    })

    it("Login without email", () => {
        cy.visit("/login")
        cy.get(loginModel.password).type(dataUser.user.pass)
        cy.get(loginModel.logInBtn).click();

        cy.get("span[class='el-form-item__error el-form-item-error--top']").should('contain', 'The email field is required')
        cy.get('.el-form-item__error').should('have.css', 'color', 'rgb(187, 57, 22)')
        cy.get("button[type='submit']").should('have.css', 'background-color', 'rgb(62, 139, 117)')
    })

    it("Login without data", () => {
        cy.visit("/login")
        cy.get(loginModel.logInBtn).click();

        cy.get("span[class='el-form-item__error el-form-item-error--top']").should('contain', 'The email field is required')
        cy.get("span[class='el-form-item__error el-form-item-error--top']").should('contain', 'The password field is required')
        cy.get('.el-form-item__error').should('have.css', 'color', 'rgb(187, 57, 22)')
        cy.get("button[type='submit']").should('have.css', 'background-color', 'rgb(62, 139, 117)')
    })

    it("Login user, forgot pass non exist email", () => {
        cy.visit("/login")
        cy.get(loginModel.forgotPass).click();
        cy.get(loginModel.email).type(dataUser.user.nonExistEmail)
        cy.get(loginModel.logInBtn).click();

        cy.get("div[class='el-message__group'] > p").should('contain', 'Error in sending mail! Please check mail address and try again')
        cy.get('.el-form-item__error').should('have.css', 'color', 'rgb(187, 57, 22)')
        cy.get('h1').should('contain', 'Request password reset')
        cy.get("button[type='submit']").should('have.css', 'background-color', 'rgb(78, 174, 147)')
    })

    it("Login user, forgot pass invalid email", () => {
        cy.visit("/login")
        cy.get(loginModel.forgotPass).click();
        cy.get(loginModel.email).type(dataUser.user.invalidEmail)
        cy.get(loginModel.logInBtn).click();

        cy.get("span[class='el-form-item__error el-form-item-error--top']").should('contain', 'The email field must be a valid email')
        cy.get('.el-form-item__error').should('have.css', 'color', 'rgb(187, 57, 22)')
        cy.get('h1').should('contain', 'Request password reset')
        cy.get("button[type='submit']").should('have.css', 'background-color', 'rgb(62, 139, 117)')
    })

    //positive
    it("Login with valid credentials", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataUser.user.email)
        cy.get(loginModel.password).type(dataUser.user.pass)
        cy.get(loginModel.logInBtn).click();
    })

    it("Login user, forgot pass", () => {
        cy.visit("/login")
        cy.get(loginModel.forgotPass).click();
        cy.get(loginModel.email).type(dataUser.user.email)
        cy.get(loginModel.logInBtn).click();

        cy.get("div[class='el-message__group'] > p").should('contain', 'Password reset email sent, please check your inbox !')
        cy.get('.el-form-item__error').should('have.css', 'color', 'rgb(187, 57, 22)')
        cy.get("button[type='submit']").should('have.css', 'background-color', 'rgb(78, 174, 147)')
    })
})
