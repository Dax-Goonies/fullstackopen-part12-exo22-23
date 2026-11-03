// mongo-init.js
db = db.getSiblingDB('bloglist')

db.users.insertOne({
  username: 'testuser',
  name: 'Test User',
  // bcrypt hash of "testpass", generated separately
  passwordHash: '$2b$10$yourPrecomputedHashHere'
})

db.blogs.insertOne({
  title: 'Containers',
  author: 'Matti Luukkainen',
  url: 'https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-containers',
  likes: 2
})

db.blogs.insertOne({
  title: 'Reverse proxy',
  author: 'Wikipedia',
  url: 'https://en.wikipedia.org/wiki/Reverse_proxy',
  likes: 0
})

db.blogs.insertOne({
  title: 'Royal Assassin',
  author: 'Robin Hobb',
  url: 'https://robinhobbelderlings.fandom.com/wiki/Royal_Assassin',
  likes: 1
})