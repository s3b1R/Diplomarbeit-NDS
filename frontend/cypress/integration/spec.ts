describe('Frontend', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('start page should load empty', () => {
    cy.contains('noch kein Nutzer');
    cy.contains('noch kein PI');
  });

  it('should create new user', () => {
    cy.get('[ng-reflect-router-link="./user"]').click();
    cy.get('[data-cy=newUserName]').click();
    cy.get('[data-cy=newUserName]').type('John');
    cy.get('[data-cy=clearNewUserName]').click();
    cy.get('[data-cy=newUserName]').click();
    cy.get('[data-cy=newUserName]').type('John Snow');
    cy.get('[data-cy="saveNewUser"] > .mat-button-wrapper').click();
    cy.get('.success');
    cy.wait(500);
    cy.contains('John Snow');
  });

  it('should edit a user name', () => {
    cy.get('[ng-reflect-router-link="./user"]').click();
    cy.get('[data-cy="editUser"]').click();
    cy.get('.mat-select-arrow').click();
    cy.contains('John Snow').click();
    cy.get('[data-cy=clearEditName]').click();
    cy.get('.mat-select-arrow').click();
    cy.contains('John Snow').click();
    cy.get('[data-cy=editName]').clear();
    cy.get('[data-cy=editName]').type('John Snowli');
    cy.get('[data-cy="saveUser"] > .mat-button-wrapper').click();
    cy.get('.success');
    cy.contains('John Snowli');
  });


  it('should delete a user', () => {
    cy.get('[ng-reflect-router-link="./user"]').click();
    cy.get('[data-cy="editUser"]').click();
    cy.get('.mat-select-arrow').click();
    cy.contains('John Snowli').click();
    cy.get('[data-cy=clearEditName]').click();
    cy.get('.mat-select-arrow').click();
    cy.contains('John Snowli').click();
    cy.get('[data-cy="deleteUser"] > .mat-button-wrapper').click();
    cy.get('[data-cy=selYes]').click();
    cy.get('.success');
    cy.contains('noch kein Nutzer');
  });

  it('should recreate new user', () => {
    cy.get('[ng-reflect-router-link="./user"]').click();
    cy.get('[data-cy=newUserName]').click();
    cy.get('[data-cy=newUserName]').type('Jon Snow');
    cy.get('[data-cy="saveNewUser"] > .mat-button-wrapper').click();
  });

  it('should create new Pi', () => {
    cy.get('[ng-reflect-router-link="./pi"]').click();
    cy.get('[data-cy=shortName]').click();
    cy.get('[data-cy=shortName]').type('2206');
    cy.get('[data-cy=clear]').click();
    cy.get('[data-cy=shortName]').type('2106');
    cy.get('[data-cy=startDate]').type('01/04/2021');
    cy.get('[data-cy=endDate]').type('09/06/2021');
    cy.get('[data-cy=sprintCount]').click();
    cy.get('[data-cy=sprintCount]').type('6');
    cy.get('[data-cy=save]').click();
    cy.get('.success');
    cy.contains('PI 2106');
  });

  it('should edit a PI', () => {
    cy.get('[ng-reflect-router-link="./pi"]').click();
    cy.get('[data-cy="editPi"]').click();
    cy.get('[data-cy="piToChange"]').click();
    cy.contains('2106').click();
    cy.get('[data-cy=newSprintCount]').clear();
    cy.get('[data-cy=newSprintCount]').type('5');
    cy.get('[data-cy=newSprint1start]').type('01/04/2021');
    cy.get('[data-cy=newSprint1end]').type('13/04/2021');
    cy.get('[data-cy=newSprint2start]').type('14/04/2021');
    cy.get('[data-cy=newSprint2end]').type('27/04/2021');
    cy.get('[data-cy=newSprint3start]').type('28/04/2021');
    cy.get('[data-cy=newSprint3end]').type('11/05/2021');
    cy.get('[data-cy=newSprint4start]').type('12/05/2021');
    cy.get('[data-cy=newSprint4end]').type('25/05/2021');
    cy.get('[data-cy=newSprint5start]').type('26/05/2021');
    cy.get('[data-cy=newSprint5end]').type('09/06/2021');
    cy.get('[data-cy=updatePi]').click();
    cy.get('.success');
    cy.contains('PI 2106');
  });

  it('should create another new Pi', () => {
    cy.get('[ng-reflect-router-link="./pi"]').click();
    cy.get('[data-cy=shortName]').click();
    cy.get('[data-cy=shortName]').type('2206');
    cy.get('[data-cy=startDate]').type('01/04/2021');
    cy.get('[data-cy=endDate]').type('09/06/2021');
    cy.get('[data-cy=sprintCount]').click();
    cy.get('[data-cy=sprintCount]').type('5');
    cy.get('[data-cy=save]').click();
    cy.get('.success');
    cy.contains('PI 2206');
  });

  it('should delete a Pi', () => {
    cy.get('[ng-reflect-router-link="./pi"]').click();
    cy.get('[data-cy="editPi"]').click();
    cy.get('[data-cy="piToChange"]').click();
    cy.contains('2206').click();
    cy.get('[data-cy=delPi]').click();
    cy.get('[data-cy=selYes]').click();
    cy.get('.success');
    cy.contains('PI 2106');
  });

  it('should create a third new Pi', () => {
    cy.get('[ng-reflect-router-link="./pi"]').click();
    cy.get('[data-cy=shortName]').click();
    cy.get('[data-cy=shortName]').type('2103');
    cy.get('[data-cy=startDate]').type('01/04/2021');
    cy.get('[data-cy=endDate]').type('09/06/2021');
    cy.get('[data-cy=sprintCount]').click();
    cy.get('[data-cy=sprintCount]').type('6');
    cy.get('[data-cy=save]').click();
    cy.get('.success');
    cy.contains('PI 2106');
  });

  it('should change the shown PI in comparison view', () => {
    cy.get('[data-cy="selector"]').click();
    cy.contains('2103').click();
    cy.contains('PI 2103');
  });

  it('should create new single day capacity for user', () => {
    cy.get('[ng-reflect-router-link="./capaview"]').click();
    cy.get('[data-cy="datepicker"] > .mat-button-wrapper').click();
    cy.get('.mat-calendar-period-button > .mat-button-wrapper').click();
    cy.get('.mat-calendar-period-button > .mat-button-wrapper').click();
    cy.get('.mat-calendar-content').contains('2021').click();
    cy.get('.mat-calendar-content').contains('APR').click();
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(2)').click().clear().type('.7');
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(3)').click().clear().type('0 , 8');
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(2)').click().clear().type(' .5').blur();
    cy.reload();
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(2)').should('contain', '0.5');
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(3)').should('contain', '0.8');
    cy.visit('/');
    cy.get('.capa:nth-child(3)').should('contain', '1.3');
    cy.get('.difference:nth-child(5)').should('contain', '1.3');
  });

  it('should create capacity for user in a date range', () => {
    cy.get('[ng-reflect-router-link="./capaview"]').click();
    cy.get('[data-cy=mass]').click();
    cy.get('[data-cy="userSelect"]').click();
    cy.contains('Jon Snow').click();
    cy.get('.mat-datepicker-toggle-default-icon').click();
    cy.get('.mat-calendar-period-button > .mat-button-wrapper').click();
    cy.contains('2021').click();
    cy.contains('APR').click();
    cy.get('.ng-star-inserted:nth-child(1) > .mat-calendar-body-cell:nth-child(2) > .mat-calendar-body-cell-content').click();
    cy.get('.ng-star-inserted:nth-child(1) > .mat-calendar-body-cell:nth-child(2) > .mat-calendar-body-cell-content').click();
    cy.get('[data-cy=capa]').click();
    cy.get('[data-cy=capa]').type('0.5');
    cy.get('[data-cy=clear]').click();
    cy.get('[data-cy=capa]').click();
    cy.get('[data-cy=capa]').clear();
    cy.get('[data-cy=capa]').type('1');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);
    cy.visit('/');
    cy.get('.capa:nth-child(3)').should('contain', '1.8');
    cy.get('.difference:nth-child(5)').should('contain', '1.8');
  });

  it('should import workload csv', () => {
    cy.get('[ng-reflect-router-link="./occupancy"]').click();
    cy.get('[data-cy="import"]').click();
    cy.get('[data-cy="file"]').click();
    cy.get('[data-cy="file"]').attachFile('testcsv.csv');
    cy.get('[data-cy="upload"]').click();
    cy.get('.success');
    cy.get('.load:nth-child(8)').should('contain', '6.5');
    cy.get('.difference:nth-child(9)').should('contain', '-6.5');
  });

  it('should colorize delta bigger as -0.9 in red', () => {
    cy.get('[ng-reflect-router-link="./capaview"]').click();
    cy.get('[data-cy="datepicker"] > .mat-button-wrapper').click();
    cy.get('.mat-calendar-period-button > .mat-button-wrapper').click();
    cy.get('.mat-calendar-period-button > .mat-button-wrapper').click();
    cy.get('.mat-calendar-content').contains('2021').click();
    cy.get('.mat-calendar-content').contains('APR').click();
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(3)').click().clear().type('.1');
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(15)').click().clear().type('.5');
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(16)').click().clear().type('1');
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(17)').click().clear().type('1');
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(20)').click().clear().type('1');
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(21)').click().clear().type('1');
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(22)').click().clear().type('1').blur();
    cy.visit('/');
    cy.get('.difference:nth-child(5)').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    cy.get('.difference:nth-child(9)').should('have.css', 'background-color', 'rgb(255, 144, 142)');
  });

  it('should colorize delta bigger as +0.9 in green', () => {
    cy.get('[ng-reflect-router-link="./capaview"]').click();
    cy.get('[data-cy="datepicker"] > .mat-button-wrapper').click();
    cy.get('.mat-calendar-period-button > .mat-button-wrapper').click();
    cy.get('.mat-calendar-period-button > .mat-button-wrapper').click();
    cy.get('.mat-calendar-content').contains('2021').click();
    cy.get('.mat-calendar-content').contains('APR').click();
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(3)').click().clear().type('1');
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(6)').click().clear().type('0.9');
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(23)').click().clear().type('1');
    cy.get('.ng-star-inserted > .ng-star-inserted:nth-child(24)').click().clear().type('1').blur();

    cy.visit('/');
    cy.get('.difference:nth-child(5)').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    cy.get('.difference:nth-child(9)').should('have.css', 'background-color', 'rgb(138, 255, 149)');
  });

});

