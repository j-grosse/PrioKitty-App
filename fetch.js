function fetchImage() {
    let image = document.getElementById('cat-image');
    fetch('https://api.thecatapi.com/v1/images/search')
      .then((resp) => resp.json())
      .then((json) => (image.src = json[0].url));
  }
  
//   function fetchInfo() {
//     fetch('https://catfact.ninja/facts')
//     // fetch('https://api.thecatapi.com/v1/images/search')
//     .then((resp) => resp.json())
//       .then((json) => renderInfo(json.data));
//   }
  
//   function renderInfo(facts){
//     let infoText = document.getElementById("info-text")
//     facts.map(fact => {
//       const p = document.createElement('p')
//       p.setAttribute("id", "actual-fact")
//       fetchImage.json
//       p.innerHTML = fact.fact
//       infoText.appendChild(p)
//     })
//   }
  
//   function btnClick() {
//     let button = document.getElementById('new-cat-btn');
//     button.addEventListener('click', fetchImage);
//   }
  
  document.addEventListener('DOMContentLoaded', () => {
    fetchImage();
    // fetchInfo();
    // btnClick();
  });
  
  //   if (res.ok) {
  //     console.log('SUCCESS');
  //   } else {
  //     console.log('Not Successful');
  //   }
  // })
  // .then((data) => console.log(data))
  // .catch((error) => console.log('ERROR'));
  
  // };
  
  // "https://swapi.dev/api/" + searchCategory + "/?search=" + searchQuery;
  // 'https://open.nrw/api/3/action/package_search?facet.field==["vornamen"]';
  // 'https://open.nrw/api/3/action/package_search?facet.field=[\"' +
  // searchQuery +
  // '\"]';
  // https://open.nrw/api/3/action/package_search?facet.field=%20[%22vornamen%22]
