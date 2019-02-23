let base_url ="https://api.football-data.org/v2/";
const token = '5bc97521e19d46ea8cfddc40cfbdfde7';
const laliga = 2014;
const bundes = 2002;

let laliga_standing = `${base_url}competitions/${laliga}/standings`;
let bundes_standing = `${base_url}competitions/${bundes}/standings`;
let teamDetail = `${base_url}teams/`;

let fetchApi = url => {
  return fetch(url, {
    method: "get",
    mode: "cors",
    headers: {
      'X-Auth-Token': token
    }
  });
}

function status (response) {
    if (response.status !== 200) {
        console.log('Error : ' + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json (response) { 
    return response.json();
}

function error (error) {
    console.log('Error : ' + error);
}

function getStandings(league) {
    if ('caches' in window) {
    caches.match(league).then(function (response) {
      if (response) {
        response.json().then(function (data) {
            showStandings(data);
        });
      }
    });
  }

  fetchApi(league)
    .then(status)
    .then(json)
    .then(function(data) {
        showStandings(data);
    })
    .catch(error);
}

function getTeam(team) {
    if ('caches' in window) {
    caches.match(team).then(function (response) {
      if (response) {
        response.json().then(function (data) {
            showTeam(data);
        });
      }
    });
  }

  fetchApi(team)
    .then(status)
    .then(json)
    .then(function(data) {
        showTeam(data);
        
        let btnSave = document.getElementById("btnSave");
        let btnDelete = document.getElementById("btnDelete");
        
        checkData(data.id).then((msg) => {
          btnSave.style.display = "none";
          btnDelete.style.display = "block";
        }).catch((msg) => {
          btnSave.style.display = "block";
          btnDelete.style.display = "none";
         });
      
        btnSave.onclick = function () {
            addFavorite(data);
            btnSave.style.display = "none";
            btnDelete.style.display = "block";
        };
        
        btnDelete.onclick = function () {
            deleteFavorite(data.id);
            btnSave.style.display = "block";
            btnDelete.style.display = "none";
        }
    })
    .catch(error);
}

function showStandings(data){
    var standingsHTML = '';

    data.standings[0].table.forEach(function(dt) {
      standingsHTML += `
                <td>${dt.position}</td>
                <td><a href="team.html?id=${dt.team.id}">${dt.team.name}</a></td>
                <td>${dt.playedGames}</td>
                <td>${dt.won}</td>
                <td>${dt.draw}</td>
                <td>${dt.lost}</td>
                <td><b>${dt.points}</b></td>
              </tr>
          `;
    });
    document.getElementById("standings").innerHTML = standingsHTML;
}

function showTeam(data){
    var teamHTML = '';

    teamHTML += `<img src=${data.crestUrl.replace(/^http:\/\//i, 'https://')} align="center" width="150" height="150" class="responsive-img center"><br>
                  <h5>${data.name}</h5>
                  <center>
                  <button class="btn red waves-effect waves-light" id="btnDelete"><i class="material-icons left">delete</i>Delete from favorite</button>
                  <button class="btn indigo waves-effect waves-light" id="btnSave"><i class="material-icons left">add</i>Add to favorite</button>
                  </center>
                  <br>
                <br> `;
    
    teamHTML += `<table class="responsive-table highlight" width=500>
                            <thead class="indigo lighten-4">
                              <tr>
                                <td>Name</td>
                                <td>Position</td>
                                <td>Nationality</td>
                              </tr>
                            </thead>
                            <tbody>`;
                
    data.squad.forEach(function(dt) {
      teamHTML += `
              <tr>
                <td>${dt.name}</td>
                <td>${dt.position}</td>
                <td>${dt.nationality}</td>
              </tr>
          `;
    });
    
    teamHTML += `</tbody></table>`;
    
    document.getElementById("teamInfo").innerHTML = teamHTML;
}

function getFavoritTeam() {
  var dbData = getFavData();
  dbData.then(function (data) {
    
   var timBodyHtml = '';
   data.forEach(function(team) {
       timBodyHtml +=`
            <div>
              <img src=${team.crestUrl.replace(/^http:\/\//i, 'https://')} alt="" class="responsive-img" width="220"><br>
              <a href="team.html?id=${team.id}"><b>${team.name}</b></a>
            </div><br><br>`;
   });
   document.getElementById("favoriteBody").innerHTML = timBodyHtml;                  
  });
  
}