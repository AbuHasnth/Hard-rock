const searchSongs = ()=>{
    const searchSongs = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/:${searchSongs}`;
    fetch(url)
    .then(res => res.json())
    .then(data => display(data.data))
    
}
const display = song =>{
    const songContainer= document.getElementById('songContainer');
    songContainer.innerHTML= " ";
    song.forEach(song => {
        const songDiv  = document.createElement('div');
        songDiv.className= 'search-result col-md-8 mx-auto py-4';
        songDiv.innerHTML= `
                <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
                </audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                <button onclick ="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
                </div>
        
        `
        songContainer.appendChild(songDiv);
        //    console.log(song)
    });
}

const getLyrics = (artist,title)=>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyric(data.lyrics))
}

const displayLyric = lyric=>{
    const LyricsDiv= document.getElementById('LyricsDiv');
    const p= document.createElement('p');
    p.innerText = lyric;
    LyricsDiv.appendChild(p); 
}