async function main() {
    console.log('Start');
    console.log('#'.repeat(100));
}

main()
    .then(data => {
        console.log('#'.repeat(100));
        console.log('Done');
    })
    .catch(e => console.error(e));


