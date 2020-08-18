var search_button = document.getElementById('search-button');
        search_button.addEventListener('click',function(){
            var search_box = document.getElementById('search-box').value;

            fetch(`https://api.lyrics.ovh/suggest/${search_box}`)
            .then(res => res.json())
            .then(data =>{
                const songDetails = document.querySelector('.song-details');
                //console.log(songDetails);
                for(i=0;i<10;i++){
                    const song = data.data[i];
                    console.log(song);
                    const songTitle = data.data[i].title;
                    const artistName = data.data[i].artist.name;
                    console.log(artistName);
                    
                    //updating the UI
                    // const para = document.querySelector('.song-details');
                    // let newPara = document.createElement('p');
                    // newPara.innerHTML = `<p class="author lead"><strong>${songTitle}</strong> Album by <span>${song.artist.name}</span> <button onclick="getLyric('${artistName}', '${songTitle}')" id="songsLyric" class="btn btn-success">Get Lyrics</button></p>`;
                    // para.appendChild(newPara);    


                    const para = document.querySelector('#song-details');
                    let newPara = document.createElement('div');
                    newPara.innerHTML = `<div class="single-result row align-items-center my-3 p-3"><div class="col-md-9"><img src="${song.artist.picture_small}" alt="Artist Image NA"><h3 class="lyrics-name">${songTitle}</h3><p class="author lead">Album by <span>${song.artist.name}</span></p></div><div class="col-md-3 text-md-right text-center"><a href="#"<button onclick="getLyric('${artistName}', '${songTitle}')" id="songsLyric" class="btn btn-success">Get Lyrics</button></a> </div></div>`
                    para.appendChild(newPara);
                }        
        })

    })
    const getLyric = (artistName, songTitle) =>{
        fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
        .then(response => response.json())
        .then(song => {

            //udate the UI
            if(song.lyrics === undefined){
                song.lyrics = 'Lyrics not found';
            }



            const lyrics = document.querySelector('#test');
            let newLyric = document.createElement('div');
            newLyric.innerHTML = `<div id="songsLyric" class="single-lyrics text-center"><button class="btn go-back">&lsaquo;</button><h2 class="text-success mb-4">${songTitle}</h2><pre class="lyric text-white">${song.lyrics}</pre></div>`
            lyrics.appendChild(newLyric);
            console.log(song.lyrics);
            
        })
    }