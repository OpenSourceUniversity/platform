=============
User’s Manual
=============

**Open Source University Platform**
*Alpha Release*

What is OSU DApp
================

The OSU DApp bridges the gap between businesses and education through the blockchain. It helps all skills and certificates along with the professional experience to be stored and verified immutably by the blockchain technology.

Learners are able to verify their skills and expertise which will lead to increasing the chances for presenting professional opportunities which are most relevant to the candidate knowledge and interests. 

Businesses can source talented candidates and be certain that all the skills and experiences which are verified are really gained. Companies can publish job positions and accept candidates. 

Academy can publish courses and issue certificates. Every certificate has own set of skills and can be verified even if the certificate is issued before the creation of the platform (OSU DApp).

------------
Requirements
------------

OSU DApp: a web-based decentralized application using blockchain and IPFS technologies which have been used for immutable verification of skills, certificates, and experiences. Alpha release design is compatible for visualization on PC, laptop and mobile devices. All of the functionality is available for the end users. At that point is required to create wallet via OSU platform and to set your active profile.

It’s preferable to use Google Chrome browser for maximum user experience (meanwhile we are actively working for compatibility with most used browsers).

In the next version of the documentation, it will be created also a compatibility sheet for most used web browsers.

Setting up an account
=====================

There will be several steps which will describe the creation and initial setting up of an account. All the needed information is described in the sections below.

--------------------------
Create a brand new account
--------------------------

By creating OSU DApp account the user has access to all the functionality on the platform. When the user lands for the first time on the platform he needs to create new wallet by clicking on ``New wallet`` button.

Next step is to input email address and then click on ``Set my email`` which will proceed with requesting a passphrase which needs to be filled in by the user. After agree with Terms & Conditions and click on ``Create my wallet`` button.

The next step is to show the auto-generated seed which can recover the address and it’s really important to be stored in a secure manner by the user. There is also a possibility for downloading the seed phrase by clicking on ``Download seed phrase`` button (*OSUniSeedPhrase.txt* file was generated).

After click ``Continue`` button the user has to reproduce the order of all words in the seed phrase and after that wallet public address will appear. If the user made a mistake and select the wrong word he can undo the selection by clicking on the already selected word.

After clicking on ``Continue`` button the wallet was successfully created and following dialog appears on the screen. When the user see already generated public ethereum address he’s allowed to click on ``Create my account`` and he will be automatically redirected to create profile view, where every user can set his active account type. Once the active type is set all the functionality of the platform is going to be unlocked. The active type could be Academy, Learner or Business, and the platform allows to easily switch the active profile by going to ``Account Settings`` secondary menu or by the top right dropdown menu on the screen.

-------------------------------------------------
Logging to users account which is already created
-------------------------------------------------

If the user already has an account on the OSU DApp the passphrase can be filled in and after click on ``Access my wallet`` the account will be opened. If still the account couldn't be open by the passphrase the wallet should be recovered.  This functionality only allows the user to open his wallet **without losing any information** already stored into it.

--------------------
Restore user account
--------------------

In case of forgotten passphrase already generated wallet can be restored by the seed (number of random words which are generated during the creation of the wallet). As it was already mentioned in the previous section this seed could be already downloaded into *OSUniSeedPhrase.txt* file and the only action which needs to be taken is to open the file and copy the words as it is in the empty field.

After clicking on ``Continue`` button the user will be asked to fill in the new passphrase. Than by click on ``Recover my wallet`` profile will be open and will contain all the information which is already imported to it.

----------------
Account Settings
----------------

After the creation of new wallet on the platform every user needs to decide and set as what type of player wants to operate on the platform (Learner, Business or Academy). When specific type is selected all required information (marked with ``*``) needs to be filled in and by clicking on ``Save Profile Settings`` all data if correct has been stored in OSU BDN.

Data which needs to be filled in depending on the profile type:

- Learner
    - Full name (**required**)
    - Current position 
    - Your specialization 
    - About
    - Make my profile public
      *This option is turned on by default which means that you’ll be able to be reached out via direct messaging through the platform from other users (all types of users).*
      *If the option is turned off you could be found in the lists with all learners on the platform but the only public information will be your wallet address. Everyone who wants to reach you out needs to have explicit permission by you (with permission the other user will see also your personal information).*
    - Email (**required**)
    - Phone number
    - My website *If there is it needs to be provided with **http(s)://** at the beginning.*
    - Country
    - Upload your avatar
- Academy
    - Academy name (**required**)
    - Academy website (**required**)
    - Email (**required**)
    - Country
    - About
    - Upload academy logo
- Business
    - Company name (**required**)
    - Official website (**required**)
    - Email (**required**)
    - Country
    - About
    - Upload logo

After successful save of the profile message ``Successfully saved!`` appears.

OSU DApp functionality is designed in such a way that after selecting the type of user it has been set as active account type and the rest of the functionality is directly related to it.

For example, if the active profile is set to Learner the menu ‘Explore’ will list functions for interaction with academia and businesses.

From the menu above it appears that when the user is of type Learner on the OSU DApp platform it will be possible to browse courses and upload already gained certificates to request verification by the issuers. 

As a learner, every user also can browse through all published job positions on the platform and to apply for the selected once.

----------
My Profile
----------

Users can find ``My Profile`` from the Menu in the top right corner of the screen or in the secondary menu.

On ``My Profile`` user can see all related to him information in regard of personal details, uploaded certificates, gained skills and which of them are verified in OSU DApp.

Certificate state:

- **self-validated**
- **verified**
- **rejected**

If the user uploads a profile picture. It will be uploaded to IPFS instead of saving it in OSU BDN database.

----------------
Deposit/Withdraw
----------------

Users can find ``Deposit/Withdraw`` functionality from profile manure in the right top corner on the screen.

``Deposit/Withdraw`` view displays the eth address of active OSU DApp account to which can be transferred ethereum, EDU tokens or any kind of cryptocurrency on ethereum blockchain.

Withdraw functionality allows transfer of ether or EDU tokens to another account. Only eth address of the beneficent and the amount needs to be specified before the transaction.

Current ETH and EDU balance is displayed on the right side of the screen along with transaction history, which lists all previous transactions.

When the user wants to send ETH or EDU to another wallet, he needs to fill in the needed information for address and amount and after that to click on ``Submit Withdraw`` button.

On the next step dialog appears which unlocks the wallet to be able to complete withdraw transaction. There is also option to set the gas price for the transaction in **Gwei**.

After filling in the passphrase and clicking on ``Confirm unlock`` button the following successful message appears on the screen.

On the ``Deposit`` tab the user can copy the wallet public address or to retrieve the private key by clicking on ``Show Private Key`` button. After every transaction there is an history which lists the most basic information about it.

On the right side of every transaction listed in the transaction history section can be found button for more details. After clicking on it the user can get information about the type of currency which was transferred, amount, date of transfer and ethereum wallets involved in in the transaction.

-----------------
LinkedIn contacts
-----------------

This is an option which allows learners which are already onboarded to share with their LinkedIn connections about OSU DApp and to invite them to join, verify their skills and experiences which can be proved whenever they are required.

Uploading learners connections will lead to bonuses in sense of EDU tokens and upgrading the user account to PRO.

Navigating OSU DApp
===================

Once the user creates a wallet and set the active profile on the platform he is ready to navigate through all the functionality in the alpha release.
Depending on the active profile type ``Explore`` menu displays functionality related to the other profile types.

Content of the ``Explore`` menu depending on active profile type:

- Learner
    - Academia -> *list all the academies on the platform*
    - Browse courses -> *list all the courses*
    - Learners -> *list of all learner profiles*
    - My certificates -> *list users certificates*
    - Businesses -> *list of all business profiles*
    - Browse jobs -> *list of all job openings*
    - Job Applications -> *list containing all job applications of active user*
- Academy
    - Learners -> *list of all learner profiles*
    - Add courses -> *add new course*
    - Certificates verification -> *list all requested for verification certificates*
    - Businesses -> *list all businesses*
    - Browse jobs -> *browse all open job positions*
- Business
    - Academia -> *list all the academies on the platform*
    - Browse courses -> *list all the courses*
    - My certificates -> *list users certificates*
    - Certificates verification -> *list all requested for verification certificates*
    - Learners -> *list of all learner profiles*
    - Browse jobs -> *list of all job openings*
    - Add job positions -> *add a new job opening*
    - Job Applications -> *list containing all job applications of active user*

Profiles
========

-------
Learner
-------

On the home page, the active user can add a new certificate, see all uploaded certificates and their status (validated, verified or rejected).

Users can see featured courses and job positions along with browsing through all the records for available courses and jobs in the database on OSU BDN.

When the user clicks on ``Explore all courses`` or ``Explore all Jobs`` respectively will get a list with paginated courses or job positions and advanced search and filter mechanisms related to the presented type of data.

If a specific course is found and the user clicks on it all the needed information will be presented along with information for the MOOK where the course is available, tutor which can be academy or individual, available languages, description, and skills which will be gained after taking it.

The user can click on ``Show course`` button to be redirected to the source where the course is offered or to click on ``Register certificate`` to upload already gained certificate related to it.

On the page which shows more details about the course can be found also short description of the course along with the skills which will be gained (it’s not obligatory to have specific). On the right side of the screen can be checked the industry, tutor, language and the unique course code.

Add new certificate could be done by fill-in following required information:
- Choose File -> *upload a digital copy of the certificate*
- Course title -> *title of the course which respectively will be a title of the certificate*
- Industries -> *to which industry this course is classified*
- Skills -> *skills which are gained during the course*
- Academy title ->  *title of the academy or tutor which issuing the course*
- Academy site -> *website of the issuer*

Right after uploading the certificate it appears in the profile with status ``self-validated``.

Learner can open every of his certificates at any time.

One of the features related to the certificates is that verification of certificate can be requested by multiple authorities only by clicking on ``Verify Certificate`` and enter the ethereum wallet of the verifier along with the type of the verifier (can be academy or business).

On the other side, verifier will get immediate notification that verification was requested.

Right after verification or reject of a certificate the learner who owns it will receive immediate notification. If one certificate needs to be verified by multiple verifiers the certificate still will show that it’s verified even if only one verifier approved it.

The minimal requirement one certificate to be shown as verified is at least one verifier to approve it.

Right after sending verification request following message appears on top of the modal ``Verification requested``.

After the verification the colors has been changed from orange (**self-validated**) to green (**verified**). The same thing is happening also with the skills gained in the verified certificates.

All verified skills will be represented in a green color in the platform. (the orange skills are coming from self-validated certificates)

If the user wants to see the digital representation of the issued certificate it can happen by clicking on ``View certificate file`` button on the top right corner of the certificate view.

Notifications are used for indicating events for certificates and also job applications. When learner apply for a job position gets notification of it and also if he is approved for a position.

Notifications are designed in such a way to show the user which notification is not checked and also to redirect to a specific job application or certificate.

--------
Business
--------

When the active profile type is set to business the home page will be changed to list only the job positions which have been issued by the business.

Business profile basically uses all the functionality in the Alpha release except the one for adding courses. In the ``Explore`` menu for businesses is allowed to add certificates, which means that for example companies having ISO certification can upload their certificate and request verification by the authority. By ``My certificates`` option user can add the certificate (explained in section **Learner**)

Business will be able to verify certificates via ``Certificate verification`` option which is explained in section **Academy**

``Brows jobs`` functionality allows businesses to list and search among all courses on the platform. Filtering of the jobs can be made by industries and also can be searched for a specific job by title or keyword.

``Add job positions`` allow the user to post a new job on the platform. Add position page has the following fields:

- Position name (**required**) -> *title of the job position*
- Location (**required**) -> *Specific location or Remote*
- Salary -> *it can be filled in with the currency symbol*
- Overview (**required**) -> *general information about the job*
- Skills (**required**) -> *skills which are needed*
- Description (**required**) -> *detailed info about the job*
- Industries (**required**) -> *it will help for filter jobs*
- Offer closes -> *expiration date*
- Required experience
- Working hours (**required**) -> *hours on a weekly bases*
- Languages -> *if required for the position*

After click on ``Submit`` button and all required fields are filled in correctly the new job position will appear in the business profile.

The last option in ``Explore`` menu which is available for business profiles is ``Job Applications`` page. All applicants for job positions posted by the business profile will be listed on that page.

Every single one of candidates can be approved or rejected for a listed position in ``Applied for`` column. Right after approving job application the learner will receive notification that he is approved to continue the interview process.

-------
Academy
-------

When users active account type is academy available options in ``Explore`` menu are:

- Learners -> *list all learner profiles*
- Add courses -> *add new course on the platform*
- Add Certificate -> *add certificates related to the academic institution (like certificates for business profile)*
- Certificates verification -> *functionality for verifying certificates*
- Businesses -> *list all business profiles*
- Browse jobs -> *list job openings*

Click on ``Explore`` -> Learners will give a list with all learners in alphabetical order and ``Show Profile`` can give you more details about specific learner (more details in section **Learners**). 

When the user open a specific profile there is a button ``Send Message`` below the profile picture. By this functionality, all users on the platform can send and receive messages.

All messages on the platform are encrypted and securely stored which makes the conversations between all users on the platform confidential. Every message appears instantly as a notification which helping users to respond faster.

On the chat screen every user can see his personal channels placed on the left side of the screen. All of the previous communication is stored and can be checked later on by him. On the right side of the screen is placed the profile of the current opponent with whom the user is chatting. This profile is applicable and will land the user to opponent’s ``My Profile`` view.

``Add courses`` functionality is available for academy profiles and contains following fields:
- Course title (**required**) -> *title of the course*
- Program title
- Tutor
- Industries (**required**) -> *related to the course subject*
- Skills (**required**) -> *skills gained during the course*
- Description -> *general information about the course*
- Url to your course -> *link to the source where the course is offered*
- Course duration in hours -> *overall duration of the course*

After submit successfully all filled in information about the course. New course has been created and added to the academy’s list of courses.

``Add certificate`` was already described in section **Learners**. There are no differences between the functionality of adding certificates for learners, businesses or academia, which makes it easier for the end users.

``Certificates verification`` functionality is the same for business and academy profiles on the platform.

Academy will be notified if learner requested verification of certificate through the platform. Notification system is designed in such a way for better user experience that the notification itself redirects to the page with requested for verification certificates.

On the left side of the screen, there is a list with all verified and not verified certificates by the academy. All not verified certificates can be double checked and verified one by one or by mass verification. If after checking the certificate there is not correct information into it the academy can reject this request.

All status changes of certificates will be send back also as notifications to the learners who own the certificates.

Additional functionality for the academy is to list all business profiles and job positions on the platform, which also can give accurate and up to date information about the employee marketplace, skills and qualifications which gain more popularity.
