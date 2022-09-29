import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  select
} from '@keystone-6/core/fields';

export const Group = list({
  fields: {
    label: text({ui: {itemView: {fieldMode: 'read'}}}),
    name: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    status: select({
      options: [
        { label: 'Pending', value: 'PENDING' },
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Archived', value: 'ARCHIVED' },
      ],
      defaultValue: 'PENDING',
    }),
    families: relationship({
      ref: 'Family.groups',
      many: true
    }),
    students: relationship({
      ref: 'Student.group',
      many: true
    }),
  },
  hooks: {
    resolveInput: async ({resolvedData, item = {}}) => {
      const name = resolvedData?.name || item?.name;
      const status = resolvedData?.status || item?.status;
      return {
        ...resolvedData,
        label: `${name}: ${status}`,
      }
    }
  }
});
