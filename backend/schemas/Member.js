import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  select
} from '@keystone-6/core/fields';

export const Member = list({
  fields: {
    label: text({ui: {itemView: {fieldMode: 'read'}}}),
    firstname: text({ validation: { isRequired: true } }),
    relation: select({
      options: [
        { label: 'Father', value: 'FATHER' },
        { label: 'Mother', value: 'MOTHER' },
        { label: 'Child', value: 'CHILD' },
      ],
      defaultValue: 'CHILD',
    }),
    year_of_birth: text({validation: { length: {min: 4, max: 4}}}),
    interests: text({ui: {displayMode: 'textarea'}}),
    family: relationship({
      ref: 'Family.members'
    }),
  },

  hooks: {
    resolveInput: async ({resolvedData, item}) => {
      const relation = resolvedData?.relation || item?.relation;
      const firstname = resolvedData?.firstname || item?.firstname;
      return {
        ...resolvedData,
        label: `${relation}: ${firstname}`,
      }
    },
  }
});
