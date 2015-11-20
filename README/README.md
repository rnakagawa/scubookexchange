Ryan Khodi
Leland Wong
Tyler Selewicz
Ryan Nakagawa
SCU Book Exchange Milestone
Final Vision
        SCUBookExchange is intended to provide Santa Clara University students with an easy and user-friendly way to buy and sell used books. It will be a mobile and responsive web service that will utilize technologies ranging from Twitter Bootstrap to Amazon’s Product Advertising API. 


Users will be able to search for a book using its title or its ISBN number. Results will be displayed in a manner similar to Amazon’s results page. After selecting the book, users will then sort through a list of all students trying to sell that book and contact the seller. Our application will send the seller a notification email who will then initiate contact the potential buyer and arrange a meeting to finalize the deal. Similar to Craigslist.com, our web service will not handle the actual transaction.


Users trying to list a book for sale will navigate to the appropriate page and will be asked to input the isbn of the book they are trying to sell, the condition, their asking price, as well as their SCU email. They will then request a verification code, which the system will send using Mandrill service to the email address they provided. The potential seller then inputs that verification code in the web form which the system then checks against its records. If the two codes match, the system will create an entry in a MySQL database on the backend. The seller will also use this verification code in addition to their email address to remove the book from the system once it has been sold. However, if a book has not been sold within two weeks of its post date, it will automatically be removed from the database. 


Front End UI:
        Almost all of the front end css and html code has been written. Essentially the main thing left to do is just integrate with the php and database so that the html is dynamically changed by the data that we receive back from the database, this will be done in the stage where we link up the front end interface with the back end. Additional changes that need to be made to the html and stylesheet will also be made as we see fit. In addition, we will continually be working on making the user interface as friendly of an environment as possible. 


Backend Database Integration
        The system relies on a MySQL database on the backend to hold a record of all books currently listed for sale. Each entry records basic information about the book including ISBN, title, and author, as well as a post date, the verification code linked to the record, and the email associated with the seller. The system makes JavaScript calls from the front end to run PHP scripts on the backend that will retrieve the list of sellers from the database once the buyer has selected the book they are looking for. A time to die script will ensure that no record lives longer than two weeks in order to reduce system load and create optimal response times. 
        
Amazon Product Advertising API
        To get results for a user’s search we are using the Amazon Product Advertising API. We use the ItemLookup function to search for a specific ISBN number and the ItemSearch function to find results by Title. We have written PHP functions to execute both of these search functions. Our PHP functions take in the search parameters that the user enters into the text fields on the search page, and they return a string of XML that defines the results which is then used for populating the database. Our search functions are completely functional and can return valid results, but they still need to be integrated with the front end UI and the backend database.  


Email Client
        To ensure the security of our application’s users, we will be sending verification codes via email to an @scu.edu email account before posts to SCUBookExchange are finalized.  The same will be done when the user wishes to take down an existing post.  Aside from verification codes, sellers on SCUBookExchange will be notified when a buyer is interested in making a transaction.  In this case, the email received by the seller would contain the email address of the potential buyer so that they may continue interacting through a third party email client.


We are utilizing the Mandrill API to handle all of our emailing.  Mandrill is a reliable, scalable, and secure delivery API for transactional emails from websites and applications.  In our testing with Mandrill, the service has maintained a 100% deliverability rating which gives us confidence in their API.  Users will receive their emails from scubookexchange@gmail.com.  


What is left to be done?
With most of our work on the individual components completed, we are nearing the final stages of our project where we will have to integrate our individual pieces into a single cohesive service. We must integrate the Amazon ItemSearch into both the section where a seller tries to post a book and also when a user is searching for a book to buy. The email client needs to be integrated to send the seller the verification code as well send the seller a notification that a buyer has contacted them. 
Furthermore, the three separate web pages must efficiently pass the user from the initial search to the book results page, and then to the list of sellers for a particular book. The JavaScript must be removed from the HTML files and stored as separate scripts to hide our implementation from the public eye. Our source code can be found in the link below.




Link to the GitHub Repo
