let path = require('path');
let fs = require('fs');
let fm = require('front-matter');

let resolve = (...link) => path.resolve(process.cwd(), ...link)

let blogsPath = resolve('blog');

let blogs = fs.readdirSync(blogsPath)
	.map(blog => [ blog.replace(/\.mdx?$/, ''), fm(fs.readFileSync(resolve(blogsPath, blog), 'utf8')).attributes]);

if(!fs.existsSync(resolve('.build', 'data'))) fs.mkdirSync(resolve('.build', 'data'));

fs.writeFileSync(resolve('.build', 'data', 'posts.json'), JSON.stringify(Object.fromEntries(blogs)));
