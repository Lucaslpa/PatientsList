export async function getPatients(page) {
  const Patients = await fetch(
    `https://randomuser.me/api/?page=${page}&results=50&seed=abc`
  )
    .then((response) => response.json())
    .then((json) => json.results);

  return Patients;
}

export async function getPatient(PatientUUID) {
  let page = 1;
  let Patient = null;
  while (!Patient && page < 6) {
    const Patients = await getPatients(page);
    const filtredPatient = Patients.filter(
      (patient) => patient.login.uuid === PatientUUID
    );
    if (filtredPatient.length === 0) {
      page++;
    }
    Patient = filtredPatient[0];
  }
  return Patient;
}
export async function getPatientByGender(Patients) {
  const filtredPatients = Patients.filter(
    (patient) => patient.gender === gender
  );

  return filtredPatients;
}

function verifySearch(search, patient) {
  const searchToLowerCase = search.toLowerCase();
  const verifyNationality =
    patient.location.country.toLowerCase() === searchToLowerCase;
  const verifyFirstName =
    patient.name.first.toLowerCase() === searchToLowerCase;
  const verifyLastName = patient.name.last.toLowerCase() === searchToLowerCase;

  if (verifyFirstName || verifyLastName || verifyNationality) {
    return true;
  }
}

export async function getPatientByNationalityOrName(search) {
  let page = 1;
  const filtredPatients = [];
  while (page < 6) {
    const Patients = await getPatients(page);
    Patients.forEach((patient) => {
      const VerifyOK = verifySearch(search, patient);
      if (VerifyOK) {
        filtredPatients.push(patient);
      }
    });
    page++;
  }
  return filtredPatients;
}
