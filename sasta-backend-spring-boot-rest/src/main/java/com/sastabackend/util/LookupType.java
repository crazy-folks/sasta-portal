package com.sastabackend.util;

/**
 * Created by SARVA on 04/Nov/2015.
 */
public enum LookupType {
    AuditBlocks(1),
    AuditDistricts(2),
    AuditState(3),
    Bank(4),
    BloodGroups(5),
    Communities(6),
    Countries(7),
    Departments(8),
    Districts(9),
    FinancialYear(10),
    Grades(11),
    ImageTypes(12),
    Qualifications(13),
    Rounds(14),
    States(15),
    VillagePanchayats(16),
    None(17);
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
