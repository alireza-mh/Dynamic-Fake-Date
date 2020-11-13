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
/**
 * @function fakeTypeGenerator
 * @description generate fake info according to provided typw
 * @param type {string} what type to fake
 */
function fakeTypeGenerator(type: string) {
  const isFakeApi: boolean = type.includes("faker");
  if (isFakeApi) {
    const fakerMethods = type.split(".");
    /* make sure fake is on first entery */
    if (fakerMethods[0] === "faker") {
      fakerMethods.shift(); /* remove faker */
      const FMLength = fakerMethods.length;
      return fakerMethods.reduce((augFunc, currenItem, index) => {
        /* run faker api dynamicly and call argument in last element */
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
/**
 * @function handleLastMethod
 * @description extract last method string (get srt before paranteces) 
 * @param methodStr {string} last method string
 */
function handleLastMethod(methodStr: string) {
  const hasParanteses = methodStr.includes("(");
  if (hasParanteses) {
    const methodName: string = methodStr.split("(")[0];
    return methodName;
  }
  return methodStr;
}
/**
 * @function handleCurlyBraces
 * @description find out which kind of argument has been pass to the function(last string)
 * @param methodStr 
 */
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

export default generateFakeFromJSON;