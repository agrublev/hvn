module.exports = {
    prettyPainting: () => {
        console.log(`
,--.::::::::::::::::::::::::::::::::::::....:::::::
    )::::::::::::::::::::::::::::::::..      ..::::
  _'-. _:::::::::::::::::::::::::::..   ,--.   ..::
 (    ) ),--.::::::::::::::::::::::.   (    )   .::
             )-._::::::::::::::::::..   \`--'   ..::
_________________):::::::::::::::::::..      ..::::
:\\\\\\\\\\:\\\\\\:\\:\\\\\\::::::::::::::::::::::::....:::::::
::\`\\\`\\:::\`::\\\\\`\\:: Aaaah. Much better :) ::::::::::
:::\\\\\\\`:_o/ :\`\\\\\`::::::::::::::::::::::::::::::::::
!:!:!:!: (; !:!:!:!:!:!:!:!:!:!:!:!:!:!:!:!:!:!:!:!
!!!!!!!! /\\ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
|!|!|!|!|!|!|!|!|!|!|!|!|!|!|!|!|!|!|!|!|!|!|!|!|!|
|||||||||||||||||||||||||||||||||||||||||||||||||||
I|I|I|I|I|I|I|I|I|I|I|I|I|I|I|I|I|I|I|I|I|I|I|I|I|I
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII   `);


        var i = 0;  // dots counter
        let cleanInt = setInterval(function () {
            process.stdout.clearLine();  // clear current text
            process.stdout.cursorTo(0);  // move cursor to beginning of line
            i = (i + 1) % 4;
            var dots = new Array(i + 1).join(".");
            process.stdout.write("We're so excited to have you" + dots);  // write text
        }, 300);

        setTimeout(function () {
            clearInterval(cleanInt);
            clear();
            figlet.text('hvn', {
                font: "Three Point",
                horizontalLayout: 'default',
                verticalLayout: 'default'
            }, function (err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(chalk.yellow(data));
            });
        }, 5000);

    }
};


//
//     figlet.textSync("hvn", {font: font, horizontalLayout: "full"})
// );
// console.log(
//     chalk.yellow(
//         figlet.text("hvn", {font: "Thorned", horizontalLayout: "full"})
//     )
// );

// figlet.fonts(function (err, fonts) {
//     Object.keys(fonts).forEach(async function (font) {
//
//
//        await figlet.text('hvn', {
//             font: fonts[font],
//             horizontalLayout: 'default',
//             verticalLayout: 'default'
//         }, async function (err, data) {
//             if (err) {
//                 console.log('Something went wrong...');
//                 console.dir(err);
//                 return;
//             }
//             console.log(data);
//            console.log('-0---------');
//            console.log('-0---------');
//            console.log('-0---------');
//            console.log('-0---------');
//            console.log(fonts[font]);
//            console.log('-0---------');
//         });
//         // chalk.yellow(
//         //     figlet.textSync("hvn", {font: font, horizontalLayout: "full"})
//         // );
//     });
// });