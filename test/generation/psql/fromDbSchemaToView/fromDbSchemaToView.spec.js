import fromDbSchemaToView from '../../../../src/renderer/generation/psql/fromDbSchemaToView.js';
// import schema from './schema.json';
import schemaPsql from './schemaPsql.sql';
import chai from 'chai';

const expect = chai.expect;

describe('fromDbSchemaToView', function() {
  const result = fromDbSchemaToView(schemaPsql);
  console.log(result);
  it('should return correct result', function() {
    //  expect(result).to.equal(schemaPsql);
  });
});
