import * as React from 'react';

export interface IGanttViewControlProps {
  name?: string;
  ganttStartDate: Date;
  ganttEndDate: Date;
  currentDate: Date;
  expandDetails: boolean;
  data: Array<GanttRow>;
}

type GanttRow = {
  id: string;
  name: string;
  assigned: string | null;
  startDate: Date | null;
  endDate: Date | null;
  rowType: string | null;
  progress: number | null;
  parentId: string;
  level: number | null;
  milestones: Array<GanttRow>;
}

const COLUMN_DAYS = 7; 
const DAY_TIME_RATIO = 1/1000/60/60/24;
const TIME_COLUMN_RATIO = DAY_TIME_RATIO/COLUMN_DAYS;
const COLUMN_WIDTH = 30;

export class GanttViewControl extends React.Component<IGanttViewControlProps> {
  /*
  initiateState(): GanttViewControlState {return ({n: 0})};
  state: GanttViewControlState = this.initiateState();
  */
  constructor(props: IGanttViewControlProps) {
    super(props);
    // Don't call this.setState() here!
    //this.state = { counter: 0 };
  }

  /**
   * Takes the parameters and orders by parent child it and adds a level
   * @returns an ordered list of gantt rows
   */
  orderGanttRows = () : Array<GanttRow> => {
    const stack: Array<GanttRow> = [];
    const result: Array<GanttRow> = [];
    this.props.data.filter(row => {return row.name != "val" && row.parentId == ""}).reverse().forEach(row => {
      row.level = 0;
      stack.push(row);
    });
    while (stack.length > 0){
      const currentRow: GanttRow = stack.pop() || {id:'', name:'', startDate: null, endDate: null, assigned:null, rowType: null, progress: null, parentId: "", level: null, milestones: []};
      result.push(currentRow);
      this.props.data.filter(row => {return row.name != "val" && row.parentId == currentRow.id}).reverse().forEach(row => {
        if(row.rowType == "milestone"){
          currentRow.milestones.push(row);
        }else{
          row.level = (currentRow.level || 0)+1;
          stack.push(row);
        }
      });
    }
    return result;
  }

  calculateNewGanttEndDate = (): Date =>{
    const weeks = Math.ceil((Number(this.props.ganttEndDate) - Number(this.props.ganttStartDate))*TIME_COLUMN_RATIO);
    return new Date(Number(this.props.ganttStartDate) + weeks/TIME_COLUMN_RATIO);
  }

  calculateStartX = (date: Date | null) =>{
    const newGanttEndDate:Date = this.calculateNewGanttEndDate();
    if(!date || date>newGanttEndDate){
      return -1;
    }
    if(date<=this.props.ganttStartDate){
      return 0;
    }
    return Math.ceil((Number(date) - Number(this.props.ganttStartDate))*TIME_COLUMN_RATIO*COLUMN_WIDTH);
  }

  calculateEndWidth = (startDate: Date | null, endDate: Date | null ) =>{
    const newGanttEndDate:Date = this.calculateNewGanttEndDate();
    console.log('startDate', startDate, newGanttEndDate, !startDate || startDate > newGanttEndDate)
    console.log('endDate', endDate, this.props.ganttStartDate, !endDate || endDate < this.props.ganttStartDate)
    if(!startDate || !endDate || startDate > newGanttEndDate || endDate < this.props.ganttStartDate){
      console.log('no start');
      return -1;
    }
    if(startDate < this.props.ganttStartDate){
      startDate = this.props.ganttStartDate;
    }
    if(endDate > newGanttEndDate){
      endDate = newGanttEndDate;
    }
    return Math.ceil((Number(endDate) - Number(startDate))*TIME_COLUMN_RATIO*COLUMN_WIDTH);
    //return 10;
  }

  /**
   * Creates the Gantt Table element.
   * @returns teh table elements with the gantt table in it.
   */
  GanttTable = ()=>{
    const noColumns = Math.ceil((Number(this.props.ganttEndDate) - Number(this.props.ganttStartDate))*TIME_COLUMN_RATIO);
    const dateArray = Array.from(Array(noColumns).keys());
    const currentDateX = this.props.currentDate<=this.props.ganttStartDate || this.props.currentDate > this.props.ganttEndDate ? -1 : this.calculateStartX(this.props.currentDate);//Math.ceil((Number(this.props.currentDate) - Number(this.props.ganttStartDate))*TIME_COLUMN_RATIO*COLUMN_WIDTH);
    return (
      <table className="gantt-view-table">
        <thead>
          <tr>
            {this.props.expandDetails && (<th>ID</th>)}
            <th style={{width:"200px"}}>Name</th>
            {this.props.expandDetails && (<th>Assinged</th>)}
            {this.props.expandDetails && (<th>Start Date</th>)}
            {this.props.expandDetails && (<th>End Date</th>)}
            {dateArray.map((count, i)=>{
              return(
                <th key={i} style={{width:COLUMN_WIDTH+"px", padding: "0px"}}>{i+1}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {this.orderGanttRows().map((row, i)=>{
            console.log('id', row.id);
            const rowLeftX = this.calculateStartX(row.startDate); //Math.ceil((Number(row.startDate) - Number(this.props.ganttStartDate))*TIME_COLUMN_RATIO*COLUMN_WIDTH);
            const rowWidth = this.calculateEndWidth(row.startDate, row.endDate);//Math.ceil((Number(row.endDate) - Number(row.startDate))*TIME_COLUMN_RATIO*COLUMN_WIDTH);
            const rowProgressWidth = rowWidth * (row.progress || 0)/100;
            console.log('rowLeftX', row.id, row.startDate, rowLeftX, rowWidth,currentDateX != -1 && rowWidth != -1);
            return (
              <tr key={i}>
                {this.props.expandDetails && (<td>{row.id}</td>)}
                <td style={{paddingLeft:15+(row.level || 0)*20+"px", width:"200px"}}>{row.name}</td>
                {this.props.expandDetails && (<td>{row.assigned}</td>)}
                {this.props.expandDetails && (<td>{row.startDate ? row.startDate.toLocaleDateString():''}</td>)}
                {this.props.expandDetails && (<td>{row.endDate ? row.endDate.toLocaleDateString(): ''}</td>)}

                {dateArray.map((count, i)=>{
                  if(i==0){
                    return(
                      <td key={i} className="gantt-bar-container" style={{padding: "0px"}}>
                        {rowLeftX != -1 && rowWidth != -1 ? 
                        <div>
                              <div style={{width:"20px"}}/>
                              <div className="progress-track" style={{left: rowLeftX+"px", width: rowWidth+"px"}} />
                              <div className="progress-bar" style={{left: rowLeftX+"px", width: rowProgressWidth+"px"}} />
                            </div> : null }
                        {row.milestones.map((milestone, mi)=>{
                          const milestoneRowLeftX = this.calculateStartX(milestone.startDate);//Math.ceil((Number(milestone.startDate) - Number(this.props.ganttStartDate))*TIME_COLUMN_RATIO*COLUMN_WIDTH);
                          const milestoneRowWidth = this.calculateEndWidth(milestone.startDate, milestone.endDate);//Math.ceil((Number(milestone.endDate) - Number(milestone.startDate))*TIME_COLUMN_RATIO*COLUMN_WIDTH);
                          
                          if(milestoneRowLeftX == -1 || rowWidth == -1){
                            return (<div  key={mi}/>);
                          }
                          
                          return(
                            <div key={mi}>
                              <div className="milestone_bar" style={{left: milestoneRowLeftX+"px", width: milestoneRowWidth+"px"}} />
                              <div className="milestone_ends start" style={{left: milestoneRowLeftX+"px"}} />
                              <div className="milestone_ends end" style={{left: milestoneRowLeftX+milestoneRowWidth+"px"}} />
                            </div>
                          )
                        })}
                        
                        {currentDateX != -1 ? <div className="currentdate" style={{left: currentDateX+"px"}}/> : null }
                      </td>
                    )
                  }else{
                    return(
                      <td key={i} style={{}}></td>
                    )
                  }
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  /**
   * Renders the the Gantt View element
   * @returns react node with the table element
   */
  public render(): React.ReactNode {
    console.log('children', this.props);
    return (
      <div style={{height:"100%", width:"100%", overflow:"auto", position: "relative"}}>
        {this.GanttTable()}
      </div>);
  }
}
