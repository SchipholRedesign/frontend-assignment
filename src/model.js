export const create_search = (fetch_flights) => {
  return async (value, render) => {
    if (value.length < 3) return;
    const flights = await fetch_flights(value);
    render(flights);
  };
};
