// IMC DATA
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];

  // Seleção de elementos
  const imcTable = document.querySelector("#imc-table")
  const imcNumber = document.querySelector("#imc-number span")
  const imcInfo = document.querySelector("#imc-info span")
  const calcContainer = document.querySelector("#calc-container")
  const resultContainer = document.querySelector("#result-container")

  const heightInput = document.querySelector("#height-input")
  const weightInput = document.querySelector("#weight-input")

  const calcButton = document.querySelector("#calc-btn")
  const cleanButton = document.querySelector("#clear-btn")
  const backButton = document.querySelector("#back-btn")



  // Functions
  function createTable(data){
    data.forEach((item) => {
        
        // criando a div e adicionando uma classe à ela
        const div = document.createElement("div")
        div.classList.add("table-data")

        //criando um elemento no html e dando ele um conteudo que vem do array "data"
        const classification = document.createElement("p")
        classification.innerText = item.classification

        const info = document.createElement("p")
        info.innerText = item.info

        const obesity = document.createElement("p")
        obesity.innerText = item.obesity

        div.appendChild(classification)
        div.appendChild(info)
        div.appendChild(obesity)

        imcTable.appendChild(div)

    });
  }

  function cleanInputs(){
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.className = "";
    imcInfo.className = "";
  }

  function showOrHideResults(){
   calcContainer.classList.toggle("hide");
   resultContainer.classList.toggle("hide");
  }

  function calcIMC(weight,height){
    const imc = (weight / (height*height)).toFixed(1)
    return imc
  }
  // Inicialização

  createTable(data)



  //Eventos

   cleanButton.addEventListener("click", (e) => {
    e.preventDefault();

    cleanInputs()
   })

   calcButton.addEventListener("click",(e) => {
    e.preventDefault();

    const weight = +weightInput.value.replace(",",".")
    const height = +heightInput.value.replace(",",".")


    if(!weight || !height) return;

    const imc = calcIMC(weight,height)

    let info;
    
    //for que percorre o array "data" e um if para verificar em qual imc o individuo pertence
    data.forEach((item) => {
      if(imc>=item.min && imc<=item.max){
        info = item.info
      }
      if(!info) return
    }) 

    imcNumber.innerText = imc
    imcInfo.innerText = info

    switch(info){
      case "Magreza":
        imcNumber.classList.add("low")
        imcInfo.classList.add("low")
        break;
      case "Normal":
        imcNumber.classList.add("good")
        imcInfo.classList.add("good")
        break;
      case "Sobrepeso":
        imcNumber.classList.add("low")
        imcInfo.classList.add("low")
        break;
      case "Obesidade":
        imcNumber.classList.add("medium")
        imcInfo.classList.add("medium")
        break;
      case "Obesidade grave":
        imcNumber.classList.add("high")
        imcInfo.classList.add("high")
        break;
    }


    showOrHideResults();
   })

   backButton.addEventListener("click",()=>{
    cleanInputs()
    showOrHideResults()
   })