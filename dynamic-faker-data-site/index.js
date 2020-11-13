import faker from 'dynamic-fake-data';

const inputJSON = {
    id: "uuid",
    name: "faker.name.findName",
    comments: "number"
  };
console.log(faker(inputJSON));
