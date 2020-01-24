#!/usr/bin/env node

const yargs = require("yargs");
const readline = require("readline");
const fs = require("fs");

const options = yargs.usage("Usage: -n <name>").option("p", {
  alias: "path",
  demandOption: true
}).argv;

const calculate = (args) =>  {
	let postfixStack = [];
	
	for (let arg of args) {
		if (parseInt(arg)) {
			postfixStack.push(parseInt(arg));
		} else {
      const firstElement = postfixStack.pop();
      const secondElement = postfixStack.pop();

      switch (arg) {
        case "-":
          postfixStack.push(secondElement - firstElement);
          break;
        case "+":
          postfixStack.push(secondElement + firstElement);
          break;
        case "*":
          postfixStack.push(secondElement * firstElement);
          break;
        case "/":
          postfixStack.push(secondElement / firstElement);
          break;
      }
		}
	}

  return postfixStack.pop();
}

const readFile = (options) => {
	const readLine = readline.createInterface({
    input: fs.createReadStream(options)
	});
	
	readLine.on("line", (line) => {
		// regex that checks if item is non digit
		const isAlphabet = /[a-zA-z]/;

		if (isAlphabet.test(line)) {
			readLine.close();
		} else {
			const data = line.split(" ");
			const results = calculate(data);

			console.log(results);
		}
	});
}

readFile(options.p)
