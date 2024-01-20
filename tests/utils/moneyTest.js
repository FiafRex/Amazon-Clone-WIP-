import { formatCurreny } from "../../scripts/utils/money.js";

describe('Test Suite: formatCurrency', () =>{
   it('convert cents to dollars', ()=>{
    expect(formatCurreny(2095)).toEqual('20.95');
   });
   it('works with 0', ()=>{
    expect(formatCurreny(0)).toEqual('0.00');
   });
   it('rounds to nearest cent',()=>{
    expect(formatCurreny(2000.5)).toEqual('20.01');
   });
});
