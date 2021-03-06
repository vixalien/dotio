let path = require('path');
let fs = require('fs');
let fm = require('front-matter');

let resolve = (...link) => path.resolve(process.cwd(), ...link)

let projectsPath = resolve('projects');

let projects = fs.readdirSync(projectsPath)
	.map(project => [ project.replace(/\.mdx?$/, ''), fm(fs.readFileSync(resolve(projectsPath, project), 'utf8')).attributes]);

if(!fs.existsSync(resolve('.build', 'data'))) fs.mkdirSync(resolve('.build', 'data'));

fs.writeFileSync(resolve('.build', 'data', 'projects.json'), JSON.stringify(Object.fromEntries(projects)));
