export const fetch_flights = async value => {
  const response = await fetch('flights.json');
  const { flights } = await response.json();
  return filter(flights, value);
};

export const filter = (flights, value) => {
  const airport_filter = value.toLowerCase();
  return flights.filter(x => x.airport.toLowerCase().includes(airport_filter));
};
