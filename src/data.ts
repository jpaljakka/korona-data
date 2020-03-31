interface Case {
	id: string;
	date: string;
	healthCareDistrict?: string;
	infectionSourceCountry?: string;
	infectionSource?: number;
}

interface CoronaData {
	confirmed: Case[];
	deaths: Case[];
	recovered: Case[];
}

const corona_url =
	'https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData/';

async function getData() {
	// Data request
	const data: CoronaData = await fetch(corona_url)
		.then(res => res.json())
		.catch(() => null);

	// Check if there is data 
	if (!data) {
		return null;
	}

	// Seperate values
	const { confirmed, deaths, recovered } = data;
	
	// Districts
	const total_districts = confirmed.reduce((acc, { healthCareDistrict }) => {
		healthCareDistrict = healthCareDistrict || "Tuntematon" 
        acc[healthCareDistrict] ? acc[healthCareDistrict]++ : (acc[healthCareDistrict] = 1);
		return acc;
	  }, {} as { [name: string]: number });

	const district_zero =  ['Ahvenanmaa','Etelä-Karjala','Etelä-Pohjanmaa','Etelä-Savo','HUS','Itä-Savo','Kainuu','Kanta-Häme', 'Keski-Pohjanmaa','Keski-Suomi','Kymenlaakso','Lappi','Länsi-Pohja','Pirkanmaa','Pohjois-Karjala','Pohjois-Pohjanmaa','Pohjois-Savo', 'Päijät-Häme', 'Satakunta', 'Vaasa', 'Varsinais-Suomi', 'Tuntematon']; 
	district_zero.forEach(alue => {
		if (!total_districts[alue]) total_districts[alue] = 0;
	});

	// Display districts data
	const displayedDistricts = district_zero;
	const districtsContainer = document.getElementById('patient_district');

	displayedDistricts.forEach(districtName => {
		const element = document.createElement('p');
		const dist = total_districts[districtName];
		element.classList.add('confirmed');
		element.innerText = `${districtName}: ${dist} Patients`;
		districtsContainer.appendChild(element);
	});

	// Deaths
	const total_deaths = deaths.reduce((acc, { healthCareDistrict }) => {
		acc[healthCareDistrict]
			? acc[healthCareDistrict]++
			: (acc[healthCareDistrict] = 1);
		return acc;
	}, {} as { [name: string]: number });

	const deathsContainer = document.getElementById('death_district');
	const displayedDeaths = Object.keys(total_deaths); 
	displayedDeaths.forEach(districtDeath => {
		const element = document.createElement('p');
		const death = total_deaths[districtDeath];
		element.classList.add('deaths');
		element.innerText = `${districtDeath}: ${death} Patients`;
		deathsContainer.appendChild(element);
	});	

	// Recover
	const total_recovers = recovered.reduce((acc, { healthCareDistrict }) => {
		acc[healthCareDistrict]
			? acc[healthCareDistrict]++
			: (acc[healthCareDistrict] = 1);
		return acc;
	}, {} as { [name: string]: number });

	const recoversContainer = document.getElementById('recovers_district');
	const displayedRecovers = Object.keys(total_recovers);
	displayedRecovers.forEach(districtRecover => {
		const element = document.createElement('p');
		const recov = total_recovers[districtRecover];
			element.classList.add('recovers');
			element.innerText = `${districtRecover}: ${recov} Patients`;
			recoversContainer.appendChild(element);
	});	

	//Timeline, displaying amount of cases day by day
	const date_time = confirmed.reduce((acc, { date }) => {
		acc[date]
			? acc[date]++
			: (acc[date] = 1);
		return acc;
	}, {} as { [name: string]: number });
	console.table(date_time);

	// Data allocation
	document.getElementById('total_patients').innerText +=  data.confirmed.length;
	document.getElementById('total_deaths').innerText +=  data.deaths.length;
	document.getElementById('total_recovered').innerText += data.recovered.length; 
}

getData();
