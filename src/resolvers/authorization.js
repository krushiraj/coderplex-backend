import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { loggedInUser }) =>
  loggedInUser ? skip : new ForbiddenError('Not authenticated as user.');

export const isSelfDeleteAuth = combineResolvers(
  isAuthenticated,
  (parent, { id }, { loggedInUser }) =>
    id === loggedInUser.id
      ? skip
      : new ForbiddenError('Not authorized as admin.'),
)

// export const isMessageOwner = async (
//   parent,
//   { id },
//   { models, me },
// ) => {
//   const message = await models.Message.findById(id, { raw: true });

//   if (message.userId !== me.id) {
//     throw new ForbiddenError('Not authenticated as owner.');
//   }

//   return skip
// }
