import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deltaPipe'
})
export class DeltaCapaLoad implements PipeTransform{

  transform(capa, load): any {
    return (capa - load).toFixed(1);
  }
}
