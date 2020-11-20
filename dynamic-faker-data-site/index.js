import faker from 'dynamic-fake-data';

const inputJSON = {
    id: "random.uuid",
    name: "faker.name.findName",
    comments: "number"
  };

  function submitForm(e){
    var textArea = document.getElementById("schemaInput");
    console.log(textArea.value);
    var output = document.querySelector(".faker-form pre");
    var fakerOutput = JSON.stringify(faker(textArea.value));
    output.innerHTML = fakerOutput;
   }

   window.submitForm = submitForm;