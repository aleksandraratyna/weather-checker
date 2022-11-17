const fetch = require('node-fetch');

const processWeatherData = async data => {
    const sorted = [...data].sort((a, b) => {
        if (Number(b.temperatura) > Number(a.temperatura)) {
            return 1;
        }

        if (Number(a.temperatura) > Number(b.temperatura)) {
            return -1;
        }

        return 0;
    });

  //Wersja Kuby
    const {
        stacja: station,
        temperatura: temperature,
    } = sorted[0];

    console.log(`Najwyższa temperatura: ${temperature}°C jest aktualnie w mieście ${station}.`);

    //Moja wersja bez destrukturyzacji
    // console.log(`Najwyższa temperatura jest w mieście ${sorted[0].stacja} i wynosi ${sorted[0].temperatura}°C.`);

    //Zadanie 1 - destrukturyzacja
    // const {
    //     stacja,
    //     temperatura,
    // } = sorted[sorted.length - 1];

    // console.log(`Najniższa temperatura: ${temperatura}°C jest aktualnie w mieście ${stacja}.`);

    //Zadanie 1 - bez destrukturyzacji
    console.log(`Najniższa temperatura jest w mieście ${sorted[sorted.length - 1].stacja} i wynosi ${sorted[sorted.length - 1].temperatura}°C.`);

  //Zadanie 2
    for (const city of sorted) {
        console.log(city.stacja);
    }
};

const findWarmestPlaceInPoland = async () => {
   try {

       const res = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
       const data = await res.json();
       await processWeatherData(data);

   } catch(error) {
        console.log('Error has occurred :(', error);
    };
}

findWarmestPlaceInPoland();