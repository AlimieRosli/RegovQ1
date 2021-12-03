import { Component } from '@angular/core';
import { FactorialTable } from '../model/factorial-table';

declare const BigInt: typeof Number;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	targetNum: number = 100;
	factorialNum: number = 0;
	sum: number = 0;
	factorialTables: FactorialTable[] = [];

	constructor() { }

	ngOnInit(): void {
		// this.factorialNum = this.factorial(this.targetNum);
		this.calculate();
	}

	factorial(input: number): number {
		if (input < 0) {
			return -1;
		}
		else if (input == 0) {
			return 1;
		}
		else {
			return (input * this.factorial(input - 1));
		}
	}

	calculate() {
		this.factorialTables = [];

		let i = 1;
		while (i <= this.targetNum) {

			let nbv = BigInt(this.factorial(i));
			let subData = new FactorialTable(i, nbv, this.sumDigit(nbv));
			this.factorialTables.push(subData);
			i++;
		}

		// this.factorialNum = this.factorial(this.targetNum);
		// console.log('normal :', BigInt(this.factorialNum).toString());
		// console.log('ori :', this.factorialNum);
		// console.log('fixed :', this.toFixed(this.factorialNum));
	}

	sumDigit(input: number): number {
		let value = input,
			sum = value
				.toString()
				.split('')
				.map(Number)
				.reduce(function (a, b) {
					return a + b;
				}, 0);

		return sum;
	}

	toFixed(input: any) {
		if (Math.abs(input) < 1.0) {
			var e = parseInt(input.toString().split('e-')[1]);
			if (e) {
				input *= Math.pow(10, e - 1);
				input = '0.' + (new Array(e)).join('0') + input.toString().substring(2);
			}
		} else {
			var e = parseInt(input.toString().split('+')[1]);
			if (e > 20) {
				e -= 20;
				input /= Math.pow(10, e);
				input += (new Array(e + 1)).join('0');
			}
		}
		return input;
	}
}
