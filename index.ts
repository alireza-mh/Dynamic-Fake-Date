const faker = require("faker");

/* TODO make object value not string make it understand something else */
const inputJSON = {
  id: "uuid",
  name: "faker.name.findName",
  comments: "number"
};

function generateFakeFromJSON(input): Object {
  const outputObject = {};
  for (const [key, value] of Object.entries(input)) {
    outputObject[key.toString()] = fakeTypeGenerator(value as string);
  }
  return outputObject;
}

function fakeTypeGenerator(type: string) {
  const isFakeApi: boolean = type.includes("faker");
  if (isFakeApi) {
    const fakerMethods = type.split(".");
    /* make sure fake is on first entery */
    if (fakerMethods[0] === "faker") {
      fakerMethods.shift(); /* remove faker */
      const FMLength = fakerMethods.length;
      return fakerMethods.reduce((augFunc, currenItem, index) => {
        if (index === FMLength - 1) {
          return augFunc[handleLastMethod(currenItem)](
            handleCurlyBraces(currenItem)
          );
        }
        return augFunc[currenItem];
      }, faker);
    }
  }
}

function handleLastMethod(methodStr: string) {
  const hasParanteses = methodStr.includes("(");
  if (hasParanteses) {
    const methodName: string = methodStr.split("(")[0];
    return methodName;
  }
  return methodStr;
}
function handleCurlyBraces(methodStr: string) {
  const hasCurly: boolean = methodStr.includes("(");
  if (hasCurly) {
    const argument: string = methodStr.split("(")[1].split(")")[0];
    if (argument) {
      const isObject: boolean = argument.includes("{");
      if (isObject) {
        try {
          return JSON.parse(argument.replace(/\'/g, '"'));
        } catch (e) {
          console.log(e);
          throw Error("not well formated argument");
        }
      }
      /* TODO support multiple argument */
      if (Number(argument)) {
        return Number(argument);
      }
    }
  }
  return "";
}
console.log(
  "Test cases",
  generateFakeFromJSON({
    name: "faker.random.number(600)",
    name2: "faker.name.findName"
  })
);
