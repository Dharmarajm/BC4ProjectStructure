import { Pipe, PipeTransform } from '@angular/core';
//import { DatePipe } from '@angular/common'

@Pipe({
  name: 'groupby'
})
export class GroupbyPipe implements PipeTransform {
  
  constructor(/*private datePipe: DatePipe*/) {}

  transform(collection: Array<any>, property: string = 'created_at'): Array<any> {
    if(!collection) {
        return null;
    }
    const gc = collection.reduce((previous, current)=> {
      console.log(previous, current)
        if(!previous[current[property]]) {
            previous[current[property]] = [];
        }
            
            previous[current[property]].push(current);
            console.log(previous[current[property]])
        return previous;
    }, {});

    return Object.keys(gc).map(date =>({created_at: date, events: gc[date]}))

}
}
