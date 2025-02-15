describe("Customer Portal Tests", () => {
      // DASHBOARD
      it.skip("should test overall functionality of the Dashboard in Customer Portal", () => {
            const email = "wavowe2492@chapsmail.com";
            const password = "Fz8HZUIkYf"

            let declinedRequestCount;
            let acceptedRequestCount;
            let initiatedRequestCount;
            let arrivedRequestCount;
            let completedRequestCount;
            let cancelledRequestCount;
            let companionCount;
            let seniorCount;
            let instantBookingCount = 0;

            // LOGIN FLOW 
            cy.visit("https://businesssdev.gtcare.ca");
            cy.get("input#Username.form-control").type(email);
            cy.get("input#Password.form-control").type(password);
            cy.get("button.btn.btn-primary.block.full-width.m-b").click();

            cy.wait(3500); // wait for the site to fully load
            cy.url().should('include', 'SysAdmin');

            cy.contains(".nav-label", "Report").click();
            cy.get("li.active").find("a").contains("Instant Booking(Admin)").click();

            cy.wait(3500);

            // REJECTED REQUEST FLOW
            cy.get('#rejectedRequestBtn').click();

            cy.wait(4500);
            
            cy.get('#rejectedServiceRequestBody')
            .then(($tableBody) => {
            if ($tableBody.find('td.text-center.font-bold').length > 0) {
                  cy.log('No rows in the table.');
                  declinedRequestCount = 0; 
                  cy.log(`Row count: ${declinedRequestCount}`);
            } else {
                  // Count the rows in the table
                  declinedRequestCount = $tableBody.find('tr').length;
                  cy.log(`Row count: ${declinedRequestCount}`);
            }
            cy.wrap(declinedRequestCount).as('declinedRequestCount');
            instantBookingCount += declinedRequestCount;
            cy.log(`Instant Booking Count: ${instantBookingCount}`);
            });

            // ACCEPTED REQUEST FLOW
            cy.get('#requestAcceptedbBtn').click();

            cy.wait(4500);

            cy.get('#acceptedServiceRequestTableBody')
            .then(($tableBody) => {
            if ($tableBody.find('td.text-center.font-bold').length > 0) {
                  cy.log('No rows in the table.');
                  acceptedRequestCount = 0; 
                  cy.log(`Row count: ${acceptedRequestCount}`);
            } else {
                  // Count the rows in the table
                  acceptedRequestCount = $tableBody.find('tr').length;
                  cy.log(`Row count: ${acceptedRequestCount}`);
            }
            cy.wrap(acceptedRequestCount).as('acceptedRequestCount');
            instantBookingCount += acceptedRequestCount;
            cy.log(`Instant Booking Count: ${instantBookingCount}`);
            });

             
            // INITIATED REQUEST FLOW
            cy.get('#initiatedRequestBtn').click();

            cy.wait(4500);

            cy.get('#initiatedServiceRequestTableBody')
            .then(($tableBody) => {
            if ($tableBody.find('td.text-center.font-bold').length > 0) {
                  cy.log('No rows in the table.');
                  initiatedRequestCount = 0; 
                  cy.log(`Row count: ${initiatedRequestCount}`);
            } else {
                  // Count the rows in the table
                  initiatedRequestCount = $tableBody.find('tr').length;
                  cy.log(`Row count: ${initiatedRequestCount}`);
            }
            cy.wrap(initiatedRequestCount).as('initiatedRequestCount');
            instantBookingCount += initiatedRequestCount;
            cy.log(`Instant Booking Count: ${instantBookingCount}`);
            });

            // ARRIVED REQUEST FLOW
            cy.get('#clockInArrivedRequestBtn').click();

            cy.wait(4500);

            cy.get('#arrivedClockinServiceRequestBody')
            .then(($tableBody) => {
                  if ($tableBody.find('td.text-center.font-bold').length > 0) {
                        cy.log('No rows in the table.');
                        arrivedRequestCount = 0; 
                        cy.log(`Row count: ${arrivedRequestCount}`);
                  } else {
                        // Count the rows in the table
                        arrivedRequestCount = $tableBody.find('tr').length;
                        cy.log(`Row count: ${arrivedRequestCount}`);
                  }
                  cy.wrap(arrivedRequestCount).as('arrivedRequestCount');
                  instantBookingCount += arrivedRequestCount;
                  cy.log(`Instant Booking Count: ${instantBookingCount}`);
            });



            // COMPLETED REQUEST FLOW
            cy.get('#completedRequestBtn').click();

            cy.wait(4500);

            cy.get('#serviceRequestCompletedClockOutBody')
            .then(($tableBody) => {
            if ($tableBody.find('td.text-center.font-bold').length > 0) {
                  cy.log('No rows in the table.');
                  completedRequestCount = 0; 
                  cy.log(`Row count: ${completedRequestCount}`);
            } else {
                  // Count the rows in the table
                  completedRequestCount = $tableBody.find('tr').length;
                  cy.log(`Row count: ${completedRequestCount}`);
            }
            cy.wrap(completedRequestCount).as('completedRequestCount');
            instantBookingCount += completedRequestCount;
            cy.log(`Instant Booking Count: ${instantBookingCount}`);
            });




            // CANCELLED REQUEST FLOW
            cy.get('#cancelledRequestsBtn').click();

            cy.wait(4500);

            cy.get('#cancelledServiceRequestTable')
            .then(($tableBody) => {
            if ($tableBody.find('td.text-center.font-bold').length > 0) {
                  cy.log('No rows in the table.');
                  cancelledRequestCount = 0; 
                  cy.log(`Row count: ${cancelledRequestCount}`);
                  cy.wrap(cancelledRequestCount).as('cancelledRequestCount');
            } else {
                  // Count the rows in the table
                  cancelledRequestCount = $tableBody.find('tr').length;
                  cy.log(`Row count: ${cancelledRequestCount}`);
                  cancelledRequestCount = 0;
                  cy.wrap(cancelledRequestCount).as('cancelledRequestCount');
                  instantBookingCount += cancelledRequestCount;
                  cy.log(`Instant Booking Count: ${instantBookingCount}`);
            }
            });

            cy.contains(".nav-label", "Admin").click();
            cy.get("li.active").find("a").contains("Companions").click();

            cy.wait(4500);

            cy.get('.ibox-footer')
            .eq(0)
            .find('button[name="Detail"]')
            .click();

            // cy.get('#btnCloseModal').click({force:true});
            cy.get('button').contains('Close').click();
            cy.wait(2000);
            cy.log('Close the modal');
            cy.wait(4000);

            cy.log('Detail View working... ');


            cy.get('#listCount').invoke('text').then((text) => {
                  const count = parseInt(text.match(/\d+/)[0], 10);  
                  companionCount = count;
                  cy.log(`Extracted count: ${companionCount}`);
            });

      
            cy.get("li.active").find("a").contains("Seniors/Clients").click();

            cy.wait(4500);

            cy.get('table#seniorList tbody')
            .then(($tableBody) => {
            if ($tableBody.find('td.text-center.font-bold').length > 0) {
                  cy.log('No rows in the table.');
                  seniorCount = 0; 
                  cy.log(`Row count: ${seniorCount}`);
            } else {
                  // Count the rows in the table
                  seniorCount = $tableBody.find('tr').length;
                  cy.log(`Row count: ${seniorCount}`);
            }
            });


            cy.contains(".nav-label", "Dashboard").click();
            cy.get("li.active").find("a").contains("Home").click();
            cy.wait(4500);

            cy.get("#completedReq") 
            .invoke('text')
            .should('not.be.empty')                    
            .then((text) => {                   
                  const value = parseInt(text); 
                  cy.log(`Text content: "${text}"`);
                  expect(value).to.equal(completedRequestCount);    
            });



            cy.get("#pendingReq") 
            .invoke('text')
            .should('not.be.empty')                    
            .then((text) => {                   
                  const value = parseInt(text); 
                  cy.log(`Text content: "${text}"`);
                  expect(value).to.equal(initiatedRequestCount);    
            });

            cy.get("#acceptedReq") 
            .invoke('text')
            .should('not.be.empty')                    
            .then((text) => {                   
                  const value = parseInt(text); 
                  cy.log(`Text content: "${text}"`);
                  expect(value).to.equal(acceptedRequestCount);    
            });


            cy.get("#arrivedReq") 
            .invoke('text')
            .should('not.be.empty')                    
            .then((text) => {                   
                  const value = parseInt(text); 
                  cy.log(`Text content: "${text}"`);
                  expect(value).to.equal(arrivedRequestCount);    
            });


            cy.get("#declinedReq") 
            .invoke('text')
            .should('not.be.empty')                    
            .then((text) => {                   
                  const value = parseInt(text); 
                  cy.log(`Text content: "${text}"`);
                  expect(value).to.equal(declinedRequestCount);    
            });

            cy.get("#cancelledReq") 
            .invoke('text')
            .should('not.be.empty')                    
            .then((text) => {                   
                  const value = parseInt(text); 
                  cy.log(`Text content: "${text}"`);
                  expect(value).to.equal(cancelledRequestCount);    
            });

            cy.get("#companioncount") 
            .invoke('text')
            .should('not.be.empty')                    
            .then((text) => {                   
                  const value = parseInt(text); 
                  cy.log(`Text content: "${text}"`);
                  expect(value).to.equal(companionCount);    
            });

            cy.get("#seniorcount") 
            .invoke('text')
            .should('not.be.empty')                    
            .then((text) => {                   
                  const value = parseInt(text); 
                  cy.log(`Text content: "${text}"`);
                  expect(value).to.equal(seniorCount);    
            });

            // instantBookingCount = initiatedRequestCount + acceptedRequestCount + arrivedRequestCount + completedRequestCount + cancelledRequestCount + declinedRequestCount;

            cy.wait(2500);

            cy.log(`instantBookingCount: "${instantBookingCount}"`);
            cy.wait(2500);

            cy.get("#sheduledbooking") 
            .invoke('text')
            .should('not.be.empty')                    
            .then((text) => {                   
                  const value = parseInt(text); 
                  cy.log(`Text content: "${text}"`);
                  cy.log(`instantBookingCount: "${instantBookingCount}"`);
                  expect(value).to.equal(instantBookingCount);    
            });


      });


      // ADMIN
      it.skip("should test the overall functionality of the admin", () => {
            const email = "wavowe2492@chapsmail.com";
            const password = "Fz8HZUIkYf"
            // LOGIN FLOW 
            cy.visit("https://businesssdev.gtcare.ca");
            cy.get("input#Username.form-control").type(email);
            cy.get("input#Password.form-control").type(password);
            cy.get("button.btn.btn-primary.block.full-width.m-b").click();

            cy.wait(3500); // wait for the site to fully load
            cy.url().should('include', 'SysAdmin');

            cy.contains(".nav-label", "Admin").click();
            cy.get("li.active").find("a").contains("Companions").click();

            cy.wait(8500);

            cy.get('.ibox-footer')
            .eq(0)
            .find('button[name="Detail"]')
            .click();

            // cy.get('#btnCloseModal').click({force:true});
            cy.get('button').contains('Close').click();
            cy.wait(2000);
            cy.log('Close the modal');
            cy.wait(4000);

            cy.log('Detail View working... ');

            cy.get("li.active").find("a").contains("Seniors/Clients").click();

            cy.wait(4500);

            cy.get('#btnAddSenior').click();

            cy.wait(5000);
            cy.get('input#FirstName').type('Customer');
            cy.wait(5000);
            cy.get('input#LastName').type('Peter');
            cy.get('input#PreferredName').type('Test');
            cy.get('input#MiddleName').type('Jim');
            cy.get('input#Interest').type('Test Interest');
            cy.get('textarea#SpecialNote').type('Special Note');
            cy.get('select#ResidentID').select(1);
            cy.get('input#RoomNumber').type('452');
            cy.get('input#PhoneNumber').type('08012345622');
            cy.get('select#SenCountryID').select('Nigeria');
            cy.wait(5000);
            cy.get('select#SenCityID').select('Ikeja');
            cy.get('input#SeniorPostalCode').type('123446');

            cy.wait(4500);
            cy.get('input#ContactPersonFirstName').type('David');
            cy.get('input#ContactPersonLastName').type('Success');
            cy.get('input#ContactPersonEmail.form-control').eq(0).type(' contactperson@gmail.com',{force: true});
            cy.get('input#ContactPersonNumber').type('08123456744');
            cy.get('select#CountryID').select('Nigeria');
            cy.get('select#CityID').select('Ikeja');
            cy.get('input#ContactPersonPostalCode').type('231674');


            cy.wait(3500);
            cy.get('#btnSave').click()


            cy.wait(9500);
            cy.get('button').contains('ok').click();
            cy.wait(3500);

            cy.get('table#seniorList tbody')
            .then(($tableBody) => {

                  cy.get('tr') 
                  .contains('td', 'Customer') 
                  .parent() 
                  .find('button.btn-xs.btn-primary') 
                  .click(); 

            })

            cy.wait(3500);
            cy.get('input#FirstName').clear().type('CustomerUpdate');
            cy.get('input#LastName').type('Peter');
            cy.get('input#PreferredName').type('Test');
            cy.get('input#MiddleName').type('Jim');
            cy.get('input#Interest').type('Test Interest');
            cy.get('textarea#SpecialNote').type('Special Note');
            cy.get('select#ResidentID').select(1);
            cy.get('input#RoomNumber').type('452');
            cy.get('input#PhoneNumber').type('08012345622');
            cy.get('select#SenCountryID').select('Nigeria');
            cy.get('select#SenCityID').select('Ikeja');
            cy.get('input#SeniorPostalCode').type('123446');

            cy.wait(4500);
            cy.get('input#ContactPersonFirstName').type('David');
            cy.get('input#ContactPersonLastName').type('Success');
            cy.get('input#ContactPersonEmail.form-control').eq(0).clear({force: true}).type(' contactperson@gmail.com',{force: true});
            cy.get('input#ContactPersonNumber').type('08123456744');
            cy.get('select#CountryID').select('Nigeria');
            cy.get('select#CityID').select('Ikeja');
            cy.get('input#ContactPersonPostalCode').type('231674');

            cy.get('button').contains('Update').click();
            cy.wait(1500);
            cy.get('button').contains('ok').click();
            cy.wait(1500);

            cy.get('table#seniorList tbody')
            .then(($tableBody) => {

                  cy.get('tr') 
                  .contains('td', 'CustomerUpdate') 
                  .parent() 
                  .find('button.btn-xs.btn-danger') 
                  .click(); 
                  cy.wait(1000);
                  cy.get('button').contains('confirm').click();

            });

            cy.wait(2500);
            cy.get('button').contains('ok').click();

            cy.wait(2500);


      });

      // BOOKING
      it.skip("should test the overall functionality of the Booking section", () => {
            const email = "wavowe2492@chapsmail.com";
            const password = "Fz8HZUIkYf"
            // LOGIN FLOW 
            cy.visit("https://businesssdev.gtcare.ca");
            cy.get("input#Username.form-control").type(email);
            cy.get("input#Password.form-control").type(password);
            cy.get("button.btn.btn-primary.block.full-width.m-b").click();

            cy.wait(3500); // wait for the site to fully load
            cy.url().should('include', 'SysAdmin');

            cy.contains(".nav-label", "Booking").click();
            cy.get("li.active").find("a").contains("Instant Booking").click();

            cy.wait(5500);

            // cy.get('select#SeniorID').select('Oreoluwa Senior');
            cy.get('select#SeniorID').select(1, {force:true});
            cy.log('Select the appropriate date and time.');
            const now = new Date();
            now.setMinutes(now.getMinutes() + 5); // Add 5 minutes

            // Format Date as YYYY-MM-DD
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2 digits
            const day = now.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            // Format Time as HHmmAM/PM in 24-hour format
            let hours = now.getHours().toString().padStart(2, '0');
            let minutes = now.getMinutes().toString().padStart(2, '0');
            // const period = hours >= 12 ? 'PM' : 'AM';
            let formattedTime = `${hours}:${minutes}`; 



            // Fill in the time

            // cy.get('input#ServiceStartDateTime').eq(0).invoke('val', '2025-01-31').trigger('change');
            // Fill in the date
            cy.get('input#ServiceStartDateTime')
            .eq(0)
            .invoke('val', formattedDate)
            .trigger('change');
            cy.wait(8000);

            // cy.get('input#ServiceStartDateTime').type('1801{tab}2025');
            cy.get('select#CompanionID').select(1, {force:true});
            cy.wait(2000);
            // cy.get('input#ServiceNumberOfHoursExtendedshow').type('1300PM');
            cy.wait(2000);
            cy.get('input#ServiceStartTime')
            .clear()
            .type(formattedTime);
            cy.wait(2000);
            cy.get('tbody#NewcompanionName').scrollIntoView().should('be.visible');


            cy.get('#NoOfHours').select(1);

            cy.log('Select the list of services');
            cy.wait(12000);

            cy.wait(5000);

            cy.get('textarea#IntroText').type('Service Description');

            cy.get('button#btnAddCompanion').click();

            cy.wait(5000);
            cy.get('button').contains('ok').click();
            cy.wait(2000);

            cy.get("li.active").find("a").contains("Post A Shift").click();
            cy.get('input#DateCompanionIsNeeded').invoke('val', formattedDate)
            .trigger('change');
            cy.wait(8000);

            now.setMinutes(now.getMinutes() + 5);
            hours = now.getHours().toString().padStart(2, '0'); // 24-hour format (00-23)
            minutes = now.getMinutes().toString().padStart(2, '0');
            formattedTime = `${hours}:${minutes}`; 


            cy.get('input#ServiceStartTime').type(formattedTime);

            cy.get('select#NumberOfHours').select(1);
            cy.get('ul#select2-ListOfServices-container').click();
            cy.get('span.select2-search').click();
            cy.get('textarea#ServiceExpectation').type('Good Delivery');

            cy.get('button').contains('Post Shift').click();


            cy.wait(5000);
            cy.get('button').contains('ok').click();
            cy.wait(2000);


            


      }); 

      

      // REPORT
      it.skip('should test for the overall functionality of the Report Section', () => {
            const email = "wavowe2492@chapsmail.com";
            const password = "Fz8HZUIkYf"
            let companionAvailabilityCount = 0;
            let companionBillingReportCount = 0;
            // LOGIN FLOW 
            cy.visit("https://businesssdev.gtcare.ca");
            cy.get("input#Username.form-control").type(email);
            cy.get("input#Password.form-control").type(password);
            cy.get("button.btn.btn-primary.block.full-width.m-b").click();

            cy.wait(3500); // wait for the site to fully load
            cy.url().should('include', 'SysAdmin');

            cy.contains(".nav-label", "Report").click();
            cy.get("li.active").find("a").contains("Companion Availability").click();

            cy.wait(4500);

            // cy.get('select#SeniorID').select('Oreoluwa Senior');
            cy.get('select#CompanionID').select(1);
            cy.get('#btnByName').click();
            cy.wait(4000);

            cy.get('#availabilityTable')
            .then(($tableBody) => {
                  if ($tableBody.find('td.text-center.font-bold').text().includes('No Comapnion Availability')) {
                        cy.log('No Companion Availability was found');
                  } else {
                        // Count the rows in the table
                        companionAvailabilityCount = $tableBody.find('tr').length;
                        cy.log(`Number of Availabilities: ${companionAvailabilityCount}`);
                  }
            });
            cy.wait(8000);
            cy.get('input#startDate').invoke('val', '2024-12-29').trigger('change');
            cy.get('input#endDate').invoke('val', '2025-01-29').trigger('change');
            cy.wait(2000);
            cy.get('#btnSearchDate').click();

            cy.wait(4000);

            cy.get('#availabilityTable')
            .then(($tableBody) => {
                  if ($tableBody.find('td.text-center.font-bold').text().includes('No Comapnion Availability')) {
                        cy.log('No Companion Availability was found');
                  } else {
                        // Count the rows in the table
                        companionAvailabilityCount = $tableBody.find('tr').length;
                        cy.log(`Number of Availabilities: ${companionAvailabilityCount}`);
                  }
            });

            cy.wait(5000);
            cy.get("li.active").find("a").contains("Companion Billing Report").click();
            cy.wait(8000);
            cy.get('select#Senior').select(1);
            // cy.get('select#CompanionID').select(1);
            cy.get('input#startDate').invoke('val', '2024-12-29').trigger('change');
            cy.get('input#endDate').invoke('val', '2025-01-29').trigger('change');

            cy.wait(2000);
            cy.get('button#btnSave').click();

            cy.wait(5000);
            cy.get('#serviceCategoryList')
            .then(($tableBody) => {
                  if ($tableBody.find('td.text-center').text().includes('No records found')) {
                        cy.log('No Companion Billing Report was found');
                  } else {
                        // Count the rows in the table
                        companionBillingReportCount = $tableBody.find('tr').length;
                        cy.log(`Number of Billing Report: ${companionBillingReportCount}`);
                  }
            });
            cy.wait(5000);





      });

      // SETTINGS
      it.skip('should test for the overall functionality of the Settings Section', () => {
            const email = "wavowe2492@chapsmail.com";
            const password = "Fz8HZUIkYf"


            // LOGIN FLOW 
            cy.visit("https://businesssdev.gtcare.ca");
            cy.get("input#Username.form-control").type(email);
            cy.get("input#Password.form-control").type(password);
            cy.get("button.btn.btn-primary.block.full-width.m-b").click();

            cy.wait(3500); // wait for the site to fully load
            cy.url().should('include', 'SysAdmin');

            cy.contains(".nav-label", "Settings").click();
            cy.get("li.active").find("a").contains("Add New Customer Admin").click();

            cy.wait(7500);

            cy.get('#btnAddCustomerAdmin').click();
            cy.wait(2500);
            cy.get('input#FirstName').type('Test');
            cy.get('input#LastName').type('Doe');
            cy.get('input#Email').type('testdoe@gmail.com');
            cy.wait(2500);
            cy.get('#btnSave').click();
            cy.wait(5000);
            cy.get('button').contains('ok').click();
      });
      
});
