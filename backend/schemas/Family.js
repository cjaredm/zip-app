import { list } from '@keystone-6/core';
import {
  text,
  select,
  relationship,
  checkbox
} from '@keystone-6/core/fields';

export const Family = list({
  fields: {
    label: text({ui: {itemView: {fieldMode: 'read'}}}),
    lastname: text({ validation: { isRequired: true } }),
    status: select({
      options: [
        { label: 'New Lead', value: 'NEW_LEAD' },
        { label: 'Previous Host', value: 'PREVIOUS_HOST' },
        { label: 'Called', value: 'CALLED' },
        { label: 'Texted', value: 'TEXTED' },
        { label: 'Emailed', value: 'EMAILED' },
        { label: 'No Room / Try Later', value: 'NO_ROOM_TRY_LATER' },
        { label: 'No Children / College Only', value: 'NO_CHILDREN_COLLEGE_ONLY' },
        { label: 'Not Right Now', value: 'NOT_RIGHT_NOW' },
        { label: 'Hosting', value: 'HOSTING' },
        { label: 'Cannot Host', value: 'CANNOT_HOST' },
        { label: 'Do Not Contact', value: 'DO_NOT_CONTACT' },
      ],
      defaultValue: 'NEW_LEAD',
    }),

    primary_phone: text(),
    secondary_phone: text(),
    primary_email: text(),
    secondary_email: text(),

    zone: relationship({ref: 'Zone.families'}),
    address: text({ validation: { isRequired: true } }),
    city: text({ validation: { isRequired: true } }),
    state: text({ validation: { isRequired: true, length: {min: 2, max: 2} } }),
    zip: text({ validation: { isRequired: true, length: {min: 5, max: 5} } }),

    preference: select({
      options: [
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' },
        { label: 'Either', value: 'EITHER' },
      ],
      defaultValue: 'MALE',
    }),
    members: relationship({
      ref: 'Member.family',
      many: true
    }),
    students: relationship({
      ref: 'Student.families',
      many: true
    }),
    groups: relationship({
      ref: 'Group.families',
      many: true
    }),

    smoking: checkbox(),
    pets: text(),
    referral: text({ui: {displayMode: 'textarea'}}),
    student_survey: text({ui: {displayMode: 'textarea'}}),
    notes: text({ui: {displayMode: 'textarea'}}),
  },
  ui: {
    // itemView: {
    //   defaultFieldMode: 'read',
    // }
  },
  hooks: {
    resolveInput: async ({resolvedData, item, context }) => {
      const lastname = resolvedData?.lastname || item?.lastname;
      const zoneId = resolvedData?.zoneId || item?.zoneId;
      const zone = await context.query.Zone.findOne({where: {id: zoneId}, query: 'id name'},);
      return {
        ...resolvedData,
        label: `${lastname}: ${zone.name}`,
      }
    }
  }
});
