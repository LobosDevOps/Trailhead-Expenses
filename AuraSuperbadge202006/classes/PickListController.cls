/**
 * Picklist common class
 */
public with sharing class PickListController {

    /**
     * get picklist By Schema
     */
    @AuraEnabled(cacheable=true)
    public static List<Option> getPickListValuesBySchema(String objectType, String selectedField, String addOption){
        List<Option> options = new List<Option>();
        Boolean isSelectedSetting = false;
        if (!String.isBlank(addOption)) {
            options.add(new Option(addOption,addOption, true));
            isSelectedSetting = true;
        }
        Schema.SObjectType sobject_type = Schema.getGlobalDescribe().get(objectType);
        Schema.DescribeSObjectResult sobject_describe = sobject_type.getDescribe();
        Map<String, Schema.SObjectField> field_map = sobject_describe.fields.getMap();
        List<Schema.PicklistEntry> pick_list_values = field_map.get(selectedField).getDescribe().getPickListValues();
        for (Schema.PicklistEntry a : pick_list_values) {
            options.add(new Option(a.getLabel(),a.getValue(),isSelectedSetting? false: a.defaultvalue ));
        }
        return options; 
    }   
    
    
    public class ComboboxResult {
        @AuraEnabled 
        public List<Option> options{get;set;}
        @AuraEnabled 
        public String selected{get;set;}

        public ComboboxResult(List<Option> options, String selected){
            this.options = options;
            this.selected = selected;
        }
    }

    public class Option {
        @AuraEnabled 
        public String label{get;set;}
        @AuraEnabled 
        public String value{get;set;}
        // @AuraEnabled 
        // public Boolean selected{get;set;}

        public Option(String label,String value, Boolean selected){
            this.label = label;
            this.value = value;
            // this.selected = selected;
        }
    }

    /**
     * get picklist By SObject Data
     */
    public static ComboboxResult getPickListValuesByData(Map<String, String> objMap, String addOption){
        List<Option> options = new List<Option>();
        String selected = '';
        if (!String.isBlank(addOption)) {
            options.add(new Option(addOption,addOption, true));
            selected = addOption;
        }

        Integer index = 0;
        for(String key: objMap.keySet()){
            if(String.isBlank(selected) && index == 0 ){
                selected = objMap.get(key);
            }
            options.add(new Option(objMap.get(key),key,false));
            index++;
        }
        return new ComboboxResult(options, selected);
    }    

    //Util method
    // @isTest
    // private static void testgetPicklistValuesByRecordType() 
    // {
    //    Test.setMock(HttpCalloutMock.class, new PicklistHttpCalloutMockImpl());
    //     String values=getPicklistValuesByRecordType('sobject__c','sfield__c','recordtypeId');   
    //     System.assert(values != null);        
    // } 
    // public class PicklistHttpCalloutMockImpl implements HttpCalloutMock {
    //     public HTTPResponse respond(HTTPRequest req) {
    //         HttpResponse response = new HttpResponse();
    //         response.setHeader('Content-Type', 'application/json');
    //         response.setBody('{"controllerValues":{},"defaultValue":null,
    //             "eTag":"286429c9590492df72874bfb8fd0c5c7",
    //             "url":"/services/data/v43.0/ui-api/object-info/sobject__c/picklist-values/recordtypeId/sfield__c",
    //             "values":[{"attributes":null,"label":"lbl1","validFor":[],"value":"1"},
    //                     {"attributes":null,"label":"lbl2","validFor":[],"value":"2"},
    //                     {"attributes":null,"label":"lbl3","validFor":[],"value":"3"}]}');
    //         response.setStatusCode(200);
    //         return response;
    //     }
    // }

    // public static Map<String, String> getPicklistValuesByRecordType
    //     (String objectType, String fieldName, String recordTypeId) {
    //     //https://bugcoder.it/?p=38
    //     // must set the endPoint
       
    //     //Endpoint
    //     String endpoint = URL.getSalesforceBaseUrl().toExternalForm();
    //     endpoint += '/services/data/v41.0';
    //     endpoint += '/ui-api/object-info/{0}/picklist-values/{1}/{2}';
    //     endpoint = String.format(endpoint, new String[]{ objectType, recordTypeId, fieldName });
    //     EncodingUtil.urlEncode(endpoint,'UTF-8');
        
    //     //HTTP Request send
    //     HttpRequest req = new HttpRequest();
    //     req.setHeader('Authorization', 'OAuth ' + UserInfo.getSessionId()); 
    //     req.setEndpoint(endpoint);
    //     req.setMethod('GET');
    //     Http http = new Http();
    //     HTTPResponse res = http.send(req);
        
    //     //Parse response
    //     Map<String,String> result = new Map<String,String>();
    //     Map<String,Object> root = (Map<String,Object>) JSON.deserializeUntyped(res.getBody());
    //     if(!root.containsKey('values')){ 
    //         return result; 
    //     }
    //     List<Object> pValues = (List<Object>)root.get('values');
    //     for(Object pValue : pValues){
    //         Map<String,Object> pValueMap = (Map<String,Object>)pValue;
    //         result.put((String)pValueMap.get('value'), (String)pValueMap.get('label'));
    //         System.debug(result);
    //     }
        
    //     return result;
    // }
}