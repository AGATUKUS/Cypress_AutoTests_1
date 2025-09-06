import * as data from "../helpers/default_data.json";
import * as main_page from "../locators/main_page.json";
import * as password_page from "../locators/recovery_password_page.json";
import * as result_page from "../locators/result_page.json"; 
describe('Проверка авторизации', function () {
    
    beforeEach ('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color','rgb(0, 85, 152)')// Проверка надписи забыли пароль на цвет
    });
        
    afterEach('Конец теста', function (){
    cy.get(result_page.close).should('be.visible');// Есть крестик и он виден для пользователя  
    });


   it('Верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login);// Ввел логин в поле логин
        cy.get(main_page.password).type(data.password); //Ввели верный пароль
        cy.get(main_page.login_button).click();// Нажал войти
        cy.get(result_page.title).contains('Авторизация прошла успешно').should('be.visible'); // Проверяю, что после авторизации вижу текст    
    })

       it('Верный пароль и неверный логин', function () {
        cy.get(main_page.email).type(data.login);// Ввел логин в поле логин
        cy.get(main_page.password).type(data.password+'1'); //Ввели неверный пароль
        cy.get(main_page.login_button).click();// Нажал войти
        cy.get(result_page.title).contains('Такого логина или пароля нет').should('be.visible'); // Проверяю, что после авторизации вижу текст    
    })

        it('Проверка валидации логина на @', function () {
        cy.get(main_page.email).type('germandolnikov.ru');// Ввел логин в поле логин без собачки
        cy.get(main_page.password).type(data.password); //Ввели верный пароль
        cy.get(main_page.login_button).click();// Нажал войти
        cy.get(result_page.title).contains('Нужно исправить проблему валидации').should('be.visible'); // Проверяю, что после авторизации вижу текст    
    })

        it('Проверка работы "Восстановить пароль"', function () {
        cy.get(main_page.fogot_pass_btn).click(); //Нажимаю восстановить пароль
        cy.get(password_page.email).type(data.login)// Ввел логин в поле E-mail
        cy.get(password_page.send_button).click();// Нажал отправить код
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');// Проверяю на совпадение текст
    })
    
        it('Проверка работы "Влияния литеры в почте"', function () {
        cy.get(main_page.email).type(data.login_Aa);// Ввел логин в поле логин
        cy.get(main_page.password).type(data.password); //Ввели верный пароль
        cy.get(main_page.login_button).click();// Нажал войти
        cy.get(result_page.title).contains('Авторизация прошла успешно').should('be.visible'); // Проверяю, что после авторизации вижу текст 
    })
})
