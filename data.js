 const corona_url = 'https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData/';
    async function getData() {
        //Data request
        const response = await fetch(corona_url);
        const data = await response.json();
        const {confirmed, deaths, recovered,id, date, infectionSourceCountry, healthCareDistrict, infectionSource} = data;

        //Data allocatio
        let districts = {
            ahvenanmaa: 0,
            etelä_karjala: 0, //etelä-karjala
            etelä_pohjanmaa: 0, //Etelä-Pohjanmaa
            etelä_savo: 0, //etelä-savo
            helsinki_uusimaa: 0,  //Helsinki
            itä_savo: 0, //Etelä-Savo
            kainuu: 0, //kainuu
            kanta_häme: 0, //kanta-häme
            keski_pohjanmaa: 0, //keski-pohjanmaa
            keski_suomi: 0, //keski-suomi
            kymenlaakso: 0, //kymenlaakso
            lappi: 0, // lappi
            länsi_pohja: 0, //länsipohja
            pirkanmaa: 0, //pirkanmaa
            pohjois_karjala: 0, //pohjois-karjala
            pohjois_pohjanmaa: 0, //pohjois-pohjanmaa
            pohjois_savo: 0, //pohjois-savo
            päijät_häme: 0, //päijät-häme
            satakunta: 0, //satakunta
            vaasa: 0, //vaasa
            varsinais_suomi: 0, //varsinais-suomi
            no_district: 0, // No district selected in api end-point
        } 
        
        let deathsTotal = data.deaths.length;
        let confirmedTotal = data.confirmed.length
        let recoveredTotal = data.recovered.length;
        let district = data.deaths[0].healthCareDistrict;

        for(let i in data.confirmed) {
            
            if(data.confirmed[i].healthCareDistrict === "Ahvenanmaa"){
                districts.ahvenanmaa++;
                
             };
            if(data.confirmed[i].healthCareDistrict === "Etelä-Karjala"){
               districts.etelä_karjala++;
               
            };
            if(data.confirmed[i].healthCareDistrict === "Etelä-Pohjanmaa"){
               districts.etelä_pohjanmaa++;
               
            };
            if(data.confirmed[i].healthCareDistrict === "Etelä-Savo"){
               districts.etelä_savo++;
               
            };
            if(data.confirmed[i].healthCareDistrict === "HUS"){
               districts.helsinki_uusimaa++;
               
            };
            if(data.confirmed[i].healthCareDistrict === "Itä-Savo"){
                districts.itä_savo++;
                
             };
             if(data.confirmed[i].healthCareDistrict === "Kainuu"){
                districts.kainuu++;
                
             };
             if(data.confirmed[i].healthCareDistrict === "Kanta-Häme"){
                districts.kanta_häme++;
                
             };
             if(data.confirmed[i].healthCareDistrict === "Keski-Pohjanmaa"){ 
                districts.keski_pohjanmaa++;
                
             };
             if(data.confirmed[i].healthCareDistrict === "Keski-Suomi"){
                districts.keski_suomi++;
                
             };
             if(data.confirmed[i].healthCareDistrict === "Kymenlaakso"){
                districts.kymenlaakso++;
                
             };
             if(data.confirmed[i].healthCareDistrict === "Lappi"){
                districts.lappi++;
                
             };
             if(data.confirmed[i].healthCareDistrict === "Länsi-Pohja"){
                districts.länsi_pohja++;
                
             };
            if(data.confirmed[i].healthCareDistrict === "Pirkanmaa"){
               districts.pirkanmaa++;
               
            };
            if(data.confirmed[i].healthCareDistrict === "Pohjois-Karjala"){
                districts.pohjois_karjala++;
               
             };
             if(data.confirmed[i].healthCareDistrict === "Pohjois-Pohjanmaa"){
                districts.pohjois_pohjanmaa++;
               
             };
             if(data.confirmed[i].healthCareDistrict === "Pohjois-Savo"){
                districts.pohjois_savo++;
               
             };
             if(data.confirmed[i].healthCareDistrict === "Päijät-Häme"){
                districts.päijät_häme++;
               
             };
             if(data.confirmed[i].healthCareDistrict === "Satakunta"){
                districts.satakunta++;
               
             };
            if(data.confirmed[i].healthCareDistrict === "Vaasa"){
                districts.vaasa++;
                
             };
             if(data.confirmed[i].healthCareDistrict === "Varsinais-Suomi"){
                districts.varsinais_suomi++;
               
             };
             if(data.confirmed[i].healthCareDistrict === null){
                districts.no_district++;
               
             };
        }
        document.getElementById("helsinki").innerText = districts.helsinki_uusimaa;
        document.getElementById("helsinki").innerText = districts.helsinki_uusimaa;
        document.getElementById("helsinki").innerText = districts.helsinki_uusimaa;
        document.getElementById("helsinki").innerText = districts.helsinki_uusimaa;
        document.getElementById("helsinki").innerText = districts.helsinki_uusimaa;
        document.getElementById("helsinki").innerText = districts.helsinki_uusimaa;
        document.getElementById("helsinki").innerText = districts.helsinki_uusimaa;
        document.getElementById("helsinki").innerText = districts.helsinki_uusimaa;
        document.getElementById("helsinki").innerText = districts.helsinki_uusimaa;
        document.getElementById("helsinki").innerText = districts.helsinki_uusimaa;
        document.getElementById("helsinki").innerText = districts.helsinki_uusimaa;
        document.getElementById("total").innerText = confirmedTotal;
        document.getElementById("deaths").innerText = deathsTotal;
        document.getElementById("recovered").innerText = recoveredTotal;
        document.getElementById("district").innerHTML = district;
    }
    getData();    
    

