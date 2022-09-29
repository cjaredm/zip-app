import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  select
} from '@keystone-6/core/fields';

export const Student = list({
  fields: {
    label: text({ui: {itemView: {fieldMode: 'read'}}}),
    lastname: text({ validation: { isRequired: true } }),
    firstname: text({ validation: { isRequired: true } }),
    gender: select({
      options: [
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' },
      ],
      defaultValue: 'MALE',
    }),
    families: relationship({
      ref: 'Family.students',
      many: true
    }),
    group: relationship({
      ref: 'Group.students',
    }),
  },
  hooks: {
    resolveInput: async ({resolvedData, item = {}}) => {
      const lastname = resolvedData?.lastname || item?.lastname;
      const gender = resolvedData?.gender || item?.gender;
      return {
        ...resolvedData,
        label: `${lastname}: ${gender}`,
      }
    }
  }
});
