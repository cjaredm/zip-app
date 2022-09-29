import { config } from '@keystone-6/core';
import { lists } from './schema';
import 'dotenv/config';

import { withAuth, session } from './auth';

export default withAuth(
  config({
    // @ts-ignore
    server: {
      cors: {
        origin: [`${process.env.FRONTEND_URL}`],
        credentials: true,
      },
    },
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
);
