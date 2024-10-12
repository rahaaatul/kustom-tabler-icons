const fs = require('fs');

const originalData = JSON.parse(fs.readFileSync('temp/tabler-icons.json', 'utf8'));

const newData = { icons: [] };

let count = 0;
let uniCode = 59905;

const getAttributes = (iconName, paths) => {
    if (iconName.includes('-filled')) {
        return paths.map(() => ({ fill: 'rgb(198, 192, 184)' }));
    }
    return [{}];
};

Object.entries(originalData).forEach(([iconName, paths]) => {
    const attrs = getAttributes(iconName, paths);

    const iconData = {
        icon: {
            paths,
            attrs,
            tags: [iconName],
        },
        attrs,
        properties: {
            name: iconName,
            code: uniCode + count,
        },
    };

    newData.icons.push(iconData);

    count += 1;
});

fs.writeFileSync('temp/tabler-icons.json', JSON.stringify(newData, null, 2));

console.log('Processed JSON and saved successfully.');
