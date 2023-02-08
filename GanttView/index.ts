import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { GanttViewControl, IGanttViewControlProps } from "./GanttViewControl";
import * as React from "react";



export class GanttView implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        var records = context.parameters.records;
        console.log('columns', records.columns, context.parameters.records.columns.length);
        const props: IGanttViewControlProps = { 
            name: 'Hello, World!',
            ganttStartDate: context.parameters.ganttStartDate.raw || new Date(),
            ganttEndDate: context.parameters.ganttEndDate.raw || new Date(),
            currentDate: context.parameters.currentDate.raw || new Date(),
            expandDetails: context.parameters.expandDetails.raw,
            data: records.sortedRecordIds.map((sortedRowID, i) => {
                var inputRow = records.records[sortedRowID];
                return {
                    id: inputRow.getFormattedValue('id'),
                    name: inputRow.getFormattedValue('name'),
                    assigned: inputRow.getFormattedValue('assigned'),
                    startDate: new Date(Date.parse(inputRow.getFormattedValue('startDate'))) || new Date(),
                    endDate: new Date(Date.parse(inputRow.getFormattedValue('endDate'))) || new Date(),
                    rowType: inputRow.getFormattedValue('rowType'),
                    progress: parseFloat(inputRow.getFormattedValue('progress')),
                    parentId: inputRow.getFormattedValue('parentId') ? inputRow.getFormattedValue('parentId') : "",
                    level: null,
                    milestones:[],
                };
            })
        };


        return React.createElement(
            GanttViewControl, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
