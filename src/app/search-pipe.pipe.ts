import { Iitems } from './Interfaces/Iitems';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
  standalone: true
})
export class SearchPipePipe implements PipeTransform {

 transform(items:Iitems[],serchterm:string): any[] {
    return items.filter((item)=> item.name.toLocaleLowerCase().includes(serchterm.toLocaleLowerCase()));
  
  }

}
