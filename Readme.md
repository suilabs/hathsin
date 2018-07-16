# Hathsin

GraphQL API layer on top of Mongo to serve Projects data to Elantris.

## Guides

### How to add new fields to the schema
In order to add a new field to some model follow this steps

1. Add new field to the relevant model in `docs/api.graphql`
    1. Add the field to all the input models as well
2. Add the new field into model schema (mongoose schema) in `src/model`
3. In case adding any query or mutation to `api.graphql` modify the correspondent file in `src/api/`

