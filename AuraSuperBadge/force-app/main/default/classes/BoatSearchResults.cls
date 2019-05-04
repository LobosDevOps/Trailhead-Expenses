//https://www.cnblogs.com/zero-zyq/p/10489626.html
public with sharing class BoatSearchResults {
    public list<Boat__c> Boats{get;set;}
    
    @AuraEnabled
    public static List<BoatType__c> getboattypes() {
        return [SELECT Name, Id FROM BoatType__c];
    }
    
    @AuraEnabled
    public static List<Boat__c> getBoats(string boatTypeId ) {
        String sql = 'SELECT id, BoatType__c,picture__c, name,contact__r.Name, ';
        sql += ' Geolocation__Latitude__s, Geolocation__Longitude__s ';
        sql += ' FROM Boat__c ';
        if( ! String.isBlank(boatTypeId)){
            sql += ' WHERE BoatType__c = \'' + boatTypeId + '\'';
        }
        System.debug('sql: ' + sql);
        list<Boat__c> boatList = Database.query(sql);
        System.debug('boatList: ' + boatList);
        return boatList;
    }
}