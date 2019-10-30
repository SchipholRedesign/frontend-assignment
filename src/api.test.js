import { filter } from './api';

const flights = [
  {
    airport: 'San Francisco'
  },
  {
    airport: 'Santiago Com'
  },
  {
    airport: 'London Gatwick'
  },
  {
    airport: 'London Heathrow'
  }
];

test.each`
 value    | count
 ${'lon'} | ${2}
 ${'GAT'} | ${1}
 ${'Hea'} | ${1}
 ${'SCO'} | ${1}
 ${'AAA'} | ${0}
`('display all flight information where the destination matches', ({value, count}) => {
  const filtered_flights = filter(flights, value);
  expect(filtered_flights.length).toBe(count);
});
