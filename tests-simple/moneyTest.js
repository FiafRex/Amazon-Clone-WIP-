import { formatCurreny } from "../scripts/utils/money.js";


console.log("Test suite: formatCurrency");

console.log("TC-1: Cents to Dollars");
if(formatCurreny(2095)==='20.95'){
  console.log("Passed");
} else {
  console.log("Failed");
}

console.log("TC-2: Work with 0");
if(formatCurreny(0)==='0.00')
{
  console.log("Passed");
}
else
{
  console.log("Failed");
}

console.log("TC-3: Round up to nearest cent");
if(formatCurreny(2000.5)==='20.01')
{
  console.log("Passed");
}
else
{
  console.log("Failed");
}