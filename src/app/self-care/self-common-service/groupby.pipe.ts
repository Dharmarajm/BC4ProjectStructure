import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupby'
})
export class GroupbyPipe implements PipeTransform {

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
        return previous;
    }, {});
    console.log(gc)
    return Object.keys(gc).map(date => ({ created_at: date, events: gc[date] }));
  }  

}
