import {createServer} from 'miragejs';
import * as listOne from '../assets/json/CONTENTLISTINGPAGE-PAGE1.json';
import * as listTwo from '../assets/json/CONTENTLISTINGPAGE-PAGE2.json';
import * as listThree from '../assets/json/CONTENTLISTINGPAGE-PAGE3.json';

export default function API() {
  if (window.server) {
    server.shutdown();
  }

  window.server = createServer({
    routes() {
      this.get('/api/movies/:page', (schema, request) => {
        let page = request.params.page;
        switch (page) {
          case '1':
            return listOne?.default?.page;
          case '2':
            return listTwo?.default?.page;
          case '3':
            return listThree?.default?.page;
          default:
            return null;
        }
      });
    },
  });
}
