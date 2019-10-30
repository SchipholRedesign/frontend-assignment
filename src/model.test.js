import { create_search } from './model';

test.each`
  value     | calls
  ${''}     | ${0}
  ${'1'}    | ${0}
  ${'12'}   | ${0}
  ${'123'}  | ${1}
  ${'1234'} | ${1}
`(
  'display flights when at least three characters',
  async ({ value, calls }) => {
    const render = jest.fn();
    const fetch_flights = async () => [];
    const search = create_search(fetch_flights);
    await search(value, render);
    expect(render.mock.calls.length).toBe(calls);
  }
);
