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

	// Check if there is data asd
	if (!data) {
		return null;
	}

	// Seperate values
	const { confirmed, deaths, recovered } = data;

	// Data allocatio
	const deathsTotal = deaths.length;
	const confirmedTotal = confirmed.length;
	const recoveredTotal = recovered.length;
	const district = deaths[0].healthCareDistrict;

	const districts = confirmed.reduce((acc, { healthCareDistrict }) => {
		acc[healthCareDistrict]
			? acc[healthCareDistrict]++
			: (acc[healthCareDistrict] = 1);
		return acc;
	}, {} as { [name: string]: number });

	const KAIKKI_ALUEET_APISTA = ['HUS', 'Pohjois Pohajanmaa', 'Mäntsälä']; // + monta muuta
	KAIKKI_ALUEET_APISTA.forEach(alue => {
		if (!districts[alue]) districts[alue] = 0;
	});

	// Display data
	// Tohon arrayhin voi vaa lisää nimen ja se näyttää mitä siel on tapahtunu
	const displayedDistricts = ['HUS'];
	const districtsContainer = document.getElementById('districts');
	displayedDistricts.forEach(districtName => {
		const element = document.createElement('p');
		const cases = districts[districtName];
		element.innerText = `${districtName}: ${cases} cases`;
		districtsContainer.appendChild(element);
	});

	// Nöäistä en tienny niin jätin
	document.getElementById('district').innerHTML = district;
	document.getElementById('total').innerText += confirmedTotal;
	document.getElementById('deaths').innerText += deathsTotal;
	document.getElementById('recovered').innerText += recoveredTotal;
}

getData();
