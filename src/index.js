import './index.scss';
import { create_view } from './view';
import { fetch_flights } from './api';
import { create_search } from './model';

const search = create_search(fetch_flights);
create_view(search);
