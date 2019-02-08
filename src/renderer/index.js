import 'menu-bar-component';
import 'db-viewer-component';
import './component/custom-dialog/CustomDialog.js';
import './component/table-dialog-component/TableDialogComponent.js';
import './component/welcome-dialog/WelcomeDialog.js';
import './style.css';
import './component/choose-db-dialog/ChooseDBDialog.js';

if (IS_ELECTRON) {
  import('./component/db-connection-dialog/DbConnectionDialog.js');
}

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('../service-worker.js')
//     .then(() => console.log('Service Worker Registered'));
// }

const types = [
  'int', 'string'
];

document.addEventListener('DOMContentLoaded', () => {
  const dbViewer = document.querySelector('db-viewer');
  const createTableBtn = document.querySelector('.create_table');
  // const createRelationBtn = document.querySelector('.create_relation');
  const tableDialogElem = document.querySelector('table-dialog');
  const welcomeDialog = document.querySelector('welcome-dialog');
  const mainContainer = document.querySelector('.main_container');

  tableDialogElem.types = types;

  let currentSchema = {tables: []};

  function setSchema(schema) {
    currentSchema = JSON.parse(JSON.stringify(schema));
    dbViewer.schema = schema;
  }

  dbViewer.addEventListener('tableDblClick', (event) => {
    tableDialogElem.open(currentSchema, event.detail).then((result) => {
      setSchema(result);
    });
  });

  dbViewer.addEventListener('click', (event) => {
    // const cord = getDbDesignerClickCords(event);
  });


  dbViewer.addEventListener('tableMove', (event) => {
    const table = currentSchema.tables.find((table) => table.name === event.detail.name);
    if (table.pos == null) {
      table.pos = {};
    }
    table.pos.x = event.detail.pos.x;
    table.pos.y = event.detail.pos.y;
  });

  createTableBtn.addEventListener('click', () => {
    tableDialogElem.open(currentSchema).then((result) => {
      if (result) {
        setSchema(result);
      }
    });
  });

  if (IS_ELECTRON) {
    import('./el-menu').then((module) => {
      module.default(() => currentSchema, setSchema);
    });
  } else {
    import('./menu').then((module) => {
      module.default(() => currentSchema, setSchema);
    });
  }
  mainContainer.style.display = 'none';
  welcomeDialog.getSchema().then((schema) => {
    mainContainer.style.display = 'grid';
    setSchema(schema);
  });
});
