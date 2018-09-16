import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: true
})
export class SearchPipe implements PipeTransform {

  term: string;
  name: string;
  tag: string;

  transform(value: any, args?: any): any {
    
    if (value && args) {

      return value.filter(item => {

        this.term = args.fileName.toString().toLowerCase();
        this.name = item['fileName'].toString().toLowerCase();
        this.tag = item['tag'];
        this.tag = this.tag!=undefined?this.tag.toString().toLowerCase():"";

        let match = false;
        this.term.split(/(\s+)/).forEach(element => {
          if(element === " ")
          return;
          if((this.kmpSearch(element,this.name) > -1) || (this.kmpSearch(element,this.tag) > -1)){
            match = true;
            return true;
          }

        });

        return match;
      }).reverse();
    }
    else
      return value;
  }


  kmpSearch(pattern: string, text: string): number {
    if (pattern.length == 0 || text.length == 0)
      return -2;  // Immediate match
    
    // Compute longest suffix-prefix table
    let lsp: Array<number> = [0];  // Base case
    for (let i = 1; i < pattern.length; i++) {
      let j: number = lsp[i - 1];  // Start by assuming we're extending the previous LSP
      while (j > 0 && pattern.charAt(i) != pattern.charAt(j))
        j = lsp[j - 1];
      if (pattern.charAt(i) == pattern.charAt(j))
        j++;
      lsp.push(j);
    }
    
    // Walk through text string
    let j = 0;  // Number of chars matched in pattern
    for (let i = 0; i < text.length; i++) {
      while (j > 0 && text.charAt(i) != pattern.charAt(j))
        j = lsp[j - 1];  // Fall back in the pattern
      if (text.charAt(i) == pattern.charAt(j)) {
        j++;  // Next char matched, increment position
        if (j == pattern.length)
          return i - (j - 1);
      }
    }
    return -1;  // Not found
  }

}
