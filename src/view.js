const search_form = window.document.getElementById('flight-search-form');
const search_input = window.document.getElementById('flight-search-input');
const search_empty = window.document.getElementById('flight-search-empty');
const search_table = window.document.getElementById('flight-search-table');
const search_table_tbody = search_table.children[1];

const on_submit = (ev, do_search) => {
  ev.preventDefault();
  do_search();
};

const on_keyup = (_, do_search) => {
  do_search();
};

const render_cell = text => {
  const td = document.createElement('td');
  td.innerText = text;
  return td;
};

const render_row = x => {
  const tr = document.createElement('tr');
  tr.appendChild(render_cell(x.flightIdentifier));
  tr.appendChild(render_cell(x.flightNumber));
  tr.appendChild(render_cell(x.airport));
  tr.appendChild(render_cell(x.expectedTime));
  tr.appendChild(render_cell(x.originalTime));
  tr.appendChild(render_cell(x.score));
  return tr;
};

const render_table = flights => {
  search_table.className = 'rw-table';
  search_empty.className = 'rw-table hidden';
  search_table_tbody.innerHTML = '';
  flights.forEach(x => search_table_tbody.appendChild(render_row(x)));
};

const render_empty = () => {
  search_table.className = 'rw-table hidden';
  search_empty.className = 'rw-table';
};

const render = flights => {
  if (flights.length) {
    render_table(flights);
  } else {
    render_empty();
  }
};

export const create_view = search => {
  const do_search = () => {
    window.setTimeout(() => search(search_input.value, render));
  };
  search_form.addEventListener('submit', ev => on_submit(ev, do_search));
  search_form.addEventListener('keyup', ev => on_keyup(ev, do_search));
};
