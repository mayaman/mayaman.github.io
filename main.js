// *~*~*~*~*~*~*~*~* varANTS *~*~*~*~*~*~*~*~* //
var TITLE_SUFFIX = ' ~ Maya Man'

// *~*~*~*~*~*~*~*~* VARIABLES *~*~*~*~*~*~*~*~* //
var isMobile = isMobile();

// *~*~*~*~*~*~*~*~* MAIN *~*~*~*~*~*~*~*~* //
function initMain() {
    document.title = document.title + TITLE_SUFFIX;
    var annoucementLink = document.getElementById('annoucement');
    annoucementLink.href = data.announcement.link;

    var annoucementText = document.createElement('span');
    annoucementText.innerText = data.announcement.title + data.announcement.title + data.announcement.title + data.announcement.title + data.announcement.title + data.announcement.title + data.announcement.title + data.announcement.title + data.announcement.title;
    annoucementLink.appendChild(annoucementText);

    var mainContainer = document.getElementById('main');
    for (var [projectPath, projectData] of Object.entries(data.projects)) {
        var images = projectData.images;
        var imageIndicies = projectData.mainImageIndices;
        var numImages = imageIndicies.length;
        for (var i = 0; i < numImages; i++) {
            var entry = document.createElement('div');
            entry.classList.add('entry');

            var link = document.createElement('a');
            link.href = '/' + projectPath + '/';

            var image = new Image();
            var currentImage = images[imageIndicies[i]];
            image.src = 'assets/projects/' + projectPath + '/' + currentImage.path;
            image.alt = currentImage.alt;
            link.appendChild(image);
            entry.appendChild(link);
            mainContainer.appendChild(entry);
        }
    }

    data.other.forEach((thing) => {
        var entry = document.createElement('div');
        entry.classList.add('entry');

        var link = document.createElement('a');
        link.href = thing.link;
        link.target = '_blank';
        link.innerText = thing.title;

        var image = new Image();
        image.src = '/assets/other/' + thing.image;
        image.alt = thing.title;
        link.appendChild(image);


        entry.appendChild(link);
        mainContainer.appendChild(entry);
    })

    placeEntries();
}

function placeEntries() { // Causing spacing issues on mobile
    var entries = document.getElementsByClassName('entry');
    var minWidth = 75;
    var widthScale = 250;

    if (isMobile) {
        minWidth = 50;
        widthScale = 100;
    }


    var numCols = 5;
    var colInterval = window.innerWidth / numCols;
    var colCounter = 0;

    for (var e = 0; e < entries.length; e++) {
        var currentEntry = entries[e];
        var newWidth = (Math.random() * widthScale) + minWidth;
        currentEntry.style.width = newWidth + 'px';

        var offset = 0;
        if (colCounter == (numCols - 1)) {
            offset = newWidth + 40;
        }

        if (isMobile) {
            var randomLeft = Math.floor(Math.random() * (window.innerWidth - newWidth - 40)); // window.innerWidth
            currentEntry.style.left = randomLeft + 'px';
        } else {
            var randomLeft = Math.floor(Math.random() * (colInterval - offset)) + (colCounter * colInterval); // window.innerWidth
            currentEntry.style.left = randomLeft + 'px';
        }

        var randomTop = Math.floor(Math.random() * (window.innerHeight - newWidth));
        currentEntry.style.top = randomTop + 'px';

        colCounter = (colCounter + 1) % (numCols);
    }
    window.scrollTo(0, 0);
}

window.onresize = () => {
    placeEntries();
}

// *~*~*~*~*~*~*~*~* INDEX *~*~*~*~*~*~*~*~* //
function initIndex() {
    document.title = 'INDEX' + TITLE_SUFFIX;

    for (var [projectPath, projectData] of Object.entries(data.projects)) {
        var entry = document.createElement('div');
        entry.classList.add('entry-index');

        var imageLink = document.createElement('a');
        imageLink.href = '/' + projectPath + '/';
        var image = new Image();
        image.src = '/assets/projects/' + projectPath + '/' + projectData.images[projectData.thumbnailImageIndex].path;
        image.alt = projectData.images[projectData.thumbnailImageIndex].alt;
        image.classList.add('index-image');
        imageLink.appendChild(image);
        entry.appendChild(imageLink);


        var link = document.createElement('a');
        link.href = '/' + projectPath + '/';
        link.innerText = projectData.title;
        link.classList.add('index-title');

        entry.appendChild(link);
        document.getElementById('project-list').appendChild(entry);
    }

    data.other.forEach((thing) => {
        var entry = document.createElement('div');
        entry.classList.add('entry-index');

        var imageLink = document.createElement('a');
        imageLink.href = thing.link;
        imageLink.target = '_blank';

        var image = new Image();
        image.src = '/assets/other/' + thing.image;
        image.alt = thing.title;
        image.classList.add('index-image');
        imageLink.appendChild(image);
        entry.appendChild(imageLink);

        var link = document.createElement('a');
        link.href = thing.link;
        link.target = '_blank';
        link.innerText = thing.title;
        link.classList.add('index-title');

        entry.appendChild(link);
        document.getElementById('other-list').appendChild(entry);
    })
}

// *~*~*~*~*~*~*~*~* INFO *~*~*~*~*~*~*~*~* //
function initInfo() {
    document.title = 'INFO' + TITLE_SUFFIX;

    var navContainer = document.getElementById('nav-container');
    addCloseNav(navContainer);
}

// *~*~*~*~*~*~*~*~* PROJECT *~*~*~*~*~*~*~*~* //
var vimeoString1 = '<div style="padding:62.5% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/'; // 56 padding before
var vimeoString2 = '?title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:99.5%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>'

var youtubeString1 = '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/';
var youtubeString2 = '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

function initProject(projectPath) {
    var projectData = data.projects[projectPath];
    document.title = projectData.title.toUpperCase() + TITLE_SUFFIX;

    var navContainer = document.getElementById('nav-container');
    addCloseNav(navContainer);

    var projectContainer = document.createElement('div');
    projectContainer.id = projectPath;
    projectContainer.classList.add('copy-container');

    var title = document.createElement('h1');
    title.innerText = projectData.title;
    title.classList.add('text-L');
    projectContainer.appendChild(title);

    var linkData = projectData.link;
    if (linkData) {
        var link = document.createElement('a');
        link.href = linkData.url;
        link.innerText = linkData.text; // get rid of http
        link.target = "_blank";
        projectContainer.appendChild(link);
    }

    // Description
    var description = document.createElement('div');
    description.innerHTML = projectData.description;
    description.classList.add('project-description');
    projectContainer.appendChild(description);

    // Video
    var videoData = projectData.videos;
    if (videoData) {
        videoData.forEach((video) => {
            var videoElt = document.createElement('div');
            if (video.platform == 'vimeo') {
                videoElt.innerHTML = vimeoString1 + video.id + vimeoString2;
            } else if (video.platform == 'youtube') {
                videoElt.innerHTML = youtubeString1 + video.id + youtubeString2;
            }
            videoElt.classList.add('project-video');
            projectContainer.appendChild(videoElt);
        });
    }

    // Images
    projectData.images.forEach((imageData) => {
        var image = new Image();
        image.src = '/assets/projects/' + projectPath + '/' + imageData.path;
        image.alt = imageData.alt;
        image.classList.add('project-image');
        projectContainer.appendChild(image);
    });

    // Writing
    var writingData = projectData.writing;
    if (writingData) {
        var writing = document.createElement('div');
        writing.classList.add('project-description');
        var writingTitle = document.createElement('div');
        writingTitle.innerText = 'WRITING';
        writing.appendChild(writingTitle);

        var writingBody = document.createElement('div');
        var numWritingEntries = writingData.length;
        for (var i = 0; i < numWritingEntries; i++) {
            var currentWriting = writingData[i];
            var link = document.createElement('a');
            link.href = currentWriting.url;
            link.innerText = currentWriting.title;
            link.target = "_blank";
            writingBody.appendChild(link);
            if (i != numWritingEntries - 1) {
                writingBody.innerHTML = writingBody.innerHTML + ', ';
            }
        }
        writing.appendChild(writingBody);
        projectContainer.appendChild(writing);
    }

    // Press/Awards
    var pressData = projectData.press;
    if (pressData) {
        var press = document.createElement('div');
        press.classList.add('project-description');
        var pressTitle = document.createElement('div');
        pressTitle.innerText = 'PRESS/RECOGNITION';
        press.appendChild(pressTitle);

        var pressBody = document.createElement('div');
        var numPressEntries = pressData.length;
        for (var i = 0; i < numPressEntries; i++) {
            var currentPress = pressData[i];
            var link = document.createElement('a');
            link.href = currentPress.url;
            link.innerText = currentPress.title;
            link.target = "_blank";
            pressBody.appendChild(link);
            if (i != numPressEntries - 1) {
                pressBody.innerHTML = pressBody.innerHTML + ', ';
            }
        }
        press.appendChild(pressBody);
        projectContainer.appendChild(press);
    }

    document.getElementsByClassName('container')[0].appendChild(projectContainer);
}

// *~*~*~*~*~*~*~*~* HELPER *~*~*~*~*~*~*~*~* //
var closeNavHTML = '<div class="nav-link"> <a href="javascript:window.history.back()">CLOSE</a></div>';

function addCloseNav(elt) {
    elt.innerHTML = closeNavHTML;
}

function isMobile() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function isMobivarabvar() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

