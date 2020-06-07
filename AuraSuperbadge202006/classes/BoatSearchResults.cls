public with sharing class BoatSearchResults {
    final static String ALL_TYPES = 'All Types';

    @AuraEnabled(cacheable=true)
    public static PickListController.ComboboxResult getBoattypes() {
        List<BoatType__c> boatTypeList = [SELECT Id, Name FROM BoatType__c];
        Map<String, String> boatTypeMap = new Map<String, String>();
        for(BoatType__c bt: boatTypeList){
            boatTypeMap.put(bt.Id, bt.Name);
        }
        PickListController.ComboboxResult comRst = PickListController.getPickListValuesByData(boatTypeMap, ALL_TYPES);
        System.debug(comRst);
        return comRst;
    }

    @AuraEnabled
    public static List<Boat__c> searchBoatResults(String boatType) {
        System.debug(boatType);
        String sql = 'SELECT Id, Name , BoatType__c, BoatType__r.Name, Contact__c, Contact__r.Name, Description__c, ';
        sql += ' Geolocation__Latitude__s, Geolocation__Longitude__s, Length__c, Picture__c, Price__c, Year_Built__c ';
        sql += ' FROM Boat__c';
        if(boatType != ALL_TYPES){
            sql += ' Where BoatType__c = \'' + boatType + '\'';
        }
        sql += ' Order by Name';
        return Database.query(sql);
    }

    // public static List<PickListController.Option> getBoattypes() {
    //     List<BoatType__c> boatTypeList = [SELECT Id, Name FROM BoatType__c];
    //     Map<String, String> boatTypeMap = new Map<String, String>();
    //     for(BoatType__c bt: boatTypeList){
    //         boatTypeMap.put(bt.Id, bt.Name);
    //     }
    //     return PickListController.getPickListValuesByData(boatTypeMap, 'All Types');
    // }
}
