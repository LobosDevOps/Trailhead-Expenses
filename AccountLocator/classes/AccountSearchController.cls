/*
// delete sample data from Trailhead Playground
delete [ SELECT Id FROM Account WHERE BillingCity = 'San Francisco' ];
// create new test data
List<Account> accounts = new List<Account>{
    new Account(
        Name = 'Marriott Marquis',
        BillingStreet = '780 Mission St',
        BillingCity = 'San Francisco',
        BillingState = 'CA',
        BillingPostalCode = '94103',
        Phone = '(415) 896-1600',
        Website = 'www.marriott.com'
    ),
    new Account(
        Name = 'Hilton Union Square',
        BillingStreet = '333 O Farrell St',
        BillingCity = 'San Francisco',
        BillingState = 'CA',
        BillingPostalCode = '94102',
        Phone = '(415) 771-1400',
        Website = 'www.hilton.com'
    ),
    new Account(
        Name = 'Hyatt',
        BillingStreet = '5 Embarcadero Center',
        BillingCity = 'San Francisco',
        BillingState = 'CA',
        BillingPostalCode = '94111',
        Phone = '(415) 788-1234',
        Website = 'www.hyatt.com'
    )
};
insert accounts;
*/
public with sharing class AccountSearchController {
    @AuraEnabled
    public static List<Account> searchAccounts( String searchTerm ) {
        List<Account> accounts = new List<Account>();
        if ( String.isNotBlank( searchTerm ) ) {
            List<List<SObject>> searchResults = [
                FIND :searchTerm
                RETURNING Account(
                    Id, Name, Phone, Website,
                    BillingStreet, BillingCity,
                    BillingState, BillingPostalCode
                    ORDER BY Name
                    LIMIT 10
                )
            ];
            accounts = searchResults[0];
        }
System.debug(accounts.size());
        return accounts;
    }
}