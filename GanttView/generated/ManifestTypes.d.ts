/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    ganttStartDate: ComponentFramework.PropertyTypes.DateTimeProperty;
    ganttEndDate: ComponentFramework.PropertyTypes.DateTimeProperty;
    currentDate: ComponentFramework.PropertyTypes.DateTimeProperty;
    expandDetails: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    records: ComponentFramework.PropertyTypes.DataSet;
}
export interface IOutputs {
}
