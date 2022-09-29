import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';

export const Zone = list({
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    families: relationship({
      ref: 'Family.zone',
    }),
  },
});
