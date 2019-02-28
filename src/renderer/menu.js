import {
  download
} from './download.js';
import fileOpenSetup from './file_open_setup.js';
import fromViewToDbSchema from './generation/psql/fromViewToDbSchema.js';

const config = {
  items: [{
      id: 'file',
      title: 'File',
      items: [{
          id: 'new',
          title: 'New Schema'
        },
        {
          id: 'open',
          title: 'Open Schema'
        },
        {
          id: 'downloadSchema',
          title: 'Download'
        }
      ]
    }, {
      title: 'Operations',
      items: [{
        id: 'genDbSchemaFromView',
        title: 'Generate DB schema from view'
      }]
    },
    {
      id: 'help',
      title: 'Help',
      items: [{
        id: 'about',
        title: 'About'
      }]
    }
  ],
  rightItems: [{
      id: 'gitHub',
      title: 'GitHub'
    },
    {
      id: 'downloadApp',
      title: 'Download'
    }
  ]
};

export default function setup(getCurrentSchema, setSchema) {
  const menuBarElem = document.querySelector('menu-bar');
  const fileOpenElem = document.getElementById('file_open');

  fileOpenSetup(fileOpenElem, setSchema);

  menuBarElem.addEventListener('select', async (event) => {
    switch (event.detail) {
      case 'new':
        if (getCurrentSchema().tables.length > 0) {
          if (window.confirm('Do you want to create a new schema? All the unsaved progress will be lost.')) {
            const chooseDbDialog = document.querySelector('choose-db-dialog');
            const dbType = await chooseDbDialog.getDbType();
            if (dbType != null) {
              setSchema({tables: [], dbType});
            }
          }
        }
        break;
      case 'open':
        fileOpenElem.click();
        break;
      case 'downloadSchema':
        download(JSON.stringify(getCurrentSchema()), 'schema.json', 'application/json');
        break;
      case 'genDbSchemaFromView':
        download(fromViewToDbSchema(getCurrentSchema()), 'schema.sql', 'text/plain');
        break;
      case 'genViewFromDbSchema':
        fileOpenElem.click();
        break;
      case 'gitHub':
        {
          const win = window.open('https://github.com/ayeressian/db_designer_pwa', '_blank');
          win.focus();
          break;
        }
      case 'downloadApp':
        break;
    }
  });

  menuBarElem.config = config;
}
