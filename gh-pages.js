const ghpages = require('gh-pages'); 

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/anInsignificantHuman/hivetrack.git', 
        user: {
            name: 'anInsignificantHuman'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)