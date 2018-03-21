import { Injectable } from '@angular/core';

@Injectable()
export class PhoneService {

  letters: string[] = ['0', '1', '2ABC', '3DEF', '4GHI', '5JKL', '6MNO', '7PQRS', '8TUV', '9WXYZ'];
  startIndexes: number[];

  constructor() { }

  getCount(phoneNum: string) {
    let total = 1;
    let i: number;
    const num: string[] = phoneNum.split('');
    for ( i = 0; i < num.length; i++ ) {
        total = total * this.letters[num[i]].length;
    }
    return total;
  }

  decodeNum(number, startElement, ind ) {
    if (ind < number.length) {
        const separator = (ind === 3 || ind === 6) ? ' ' : '';
        return this.decodeNum(number, Math.floor(startElement / (this.letters[number[ind]].length)), ++ind) + '' +
        separator +
        (this.letters[number[ind - 1]].split(''))[startElement % (this.letters[number[ind - 1]].length)];
    } else {
        return '';
    }
  }

  getPage(phoneNum: string, pagesize: number, page: number) {
    const num: string[] = phoneNum.split('').reverse();
    this.startIndexes = new Array(num.length);
    page = ( page - 1 < 0) ? 0 : page - 1;
    const resultPage: string[] = new Array();

    const totalCount = this.getCount(phoneNum);

    const iterations = (((pagesize * page) + pagesize) > totalCount) ?
        totalCount :
        ((pagesize * page) + pagesize);

    for (let i = pagesize * page; i < iterations; i++ ) {
        resultPage.push(this.decodeNum(num, i, 0));
    }

    return resultPage;
  }
}
