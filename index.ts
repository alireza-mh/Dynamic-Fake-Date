const faker = require("faker");

/* TODO make object value not string make it understand something else */
const inputJSON = { id: "uuid", name: "faker.name.findName", comments: "number" };

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
            if(index === FMLength - 1) return augFunc[currenItem]();
            return augFunc[currenItem]
        }, faker)
    }
  }
}

console.log('----', generateFakeFromJSON({name: 'faker.name.findName', name2: 'faker.name.findName'}))