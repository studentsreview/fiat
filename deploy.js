const ghpages = require('gh-pages')

// eslint-disable-next-line @typescript-eslint/no-empty-function
ghpages.publish(
	'out',
	{
		history: false,
		dotfiles: true,
		user: {
			email: '41898282+github-actions[bot]@users.noreply.github.com',
		},
	},
	console.error
)
