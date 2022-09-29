import { list } from '@keystone-6/core';
import {
  text,
  password,
  checkbox,
} from '@keystone-6/core/fields';

const isAdmin = () => ({session}) => session?.data?.isAdmin;

export const User = list({
  access: {
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  ui: {
    hideCreate: (args) => !isAdmin(args),
    hideDelete: (args) => !isAdmin(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    isAdmin: checkbox(),
    password: password({ validation: { isRequired: true } }),
  },
});
