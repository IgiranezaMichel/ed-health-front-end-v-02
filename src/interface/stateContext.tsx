export interface IState{
    current:any,
    update:(data:any)=>void,
    refresh:()=>void
}