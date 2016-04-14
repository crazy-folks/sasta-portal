package com.sastabackend.util;

/**
 * Created by SARVA on 04/Nov/2015.
 */
public enum LookupType {
    AuditBlocks(1),
    AuditDistricts(2),
    AuditStates(3),
    Bank(4),
    BloodGroups(5),
    Communities(6),
    Countries(7),
    Departments(8),
    FinancialYear(9),
    Grades(10),
    ImageTypes(11),
    Qualifications(12),
    Rounds(13),
    VillagePanchayats(14),
    Users(15),
    UserGroups(16),
    DistrictsVillagePanchayats(17),
    None(18);
    int id;

    /**
     * Private Instance
     * @param i
     */
    private LookupType(int i){
        id = i;
    }

    public int getID(){
        return id;
    }

    /**
     * Check the Lookup Type Enum is empty or not
     * @return
     */
    public boolean IsEmpty(){
        return this.equals(LookupType.None);
    }

    /**
     * Compare enum with two different values
     * @param i
     * @return
     */
    public boolean Compare(int i){
        return id == i;
    }

    /**
     * Get Lookup Type by value
     * @param _id
     * @return - LookupType
     */
    public static LookupType GetValue(int _id)
    {
        LookupType[] As = LookupType.values();
        for(int i = 0; i < As.length; i++)
        {
            if(As[i].Compare(_id))
                return As[i];
        }
        return LookupType.None;
    }
}
