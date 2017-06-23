En aquest moment tenim el model de les rutines sense dades vinculades. Hem hagut de fer-ho així perquè me cal reforçar els fonaments amb React i perquè aquesta part de l'aplicació és un tant complexa.

Anem a seguir amb el text "Thinking in React" del tutorial oficial.

Aleshores seguim amb la lectura i a veure quins canvis van apareguent.

En aquest moment cal definir un model de dades per a l'Estat. Aquesta part, de moment sols concernirà a les dades de les Rutines... vejam, tractem de plasmar en paraules el que necessitem:

Per a cada client volem poder guardar una llista de rutines, que alhora són llistes d'exercicis ordenats i amb valors possiblement comentats, modificats o personalitzats.

Això vol dir que l'estat que necessitem guardar seràn els valors introduïts per l'usuari al formulari:

{
    nom_de_la_rutina: "",
    client: "",
    grup_muscular: "",
    data_inici: {  
      dia: "",
      mes: "",
      any: "",
    },
    data_fi: {    
      dia: "",
      mes: "",
      any: "",
    },
    llista_exercicis: [{
      exercici: "",
      repeticions: "",
      series: "",
      descans: "",
      minuts: "",
      tipus: ""
    }],
    descripcio: ""
}
