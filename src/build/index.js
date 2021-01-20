let list = [
	'./js',
	'./css',
	'./posts',
	'./lib'
];

list.forEach(item => {
	name = item.replace(/^\.\//, '');
	console.log('START BUILD '+name);
	require(item);
	console.log('END   BUILD '+name);
})