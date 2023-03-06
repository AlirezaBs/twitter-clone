import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'text in tweet',
      type: 'string',
    }),
    defineField({
      name: 'blockTweet',
      title: 'Block Tweet',
      description: 'ADMIT Controls: Toggle if Tweet is deemed inappropriate',
      type: 'boolean',
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),
    defineField({
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Tweet image',
      type: 'string',
    }),
  ],
})
