(function () {
  // write your code here

  const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
  const INDEX_URL = BASE_URL + '/api/v1/users'
  const data = [] // 因為 data 不應該是會變動的固定資料，所以用 const

  const dataPanel = document.querySelector('#data-panel')


  axios.get(INDEX_URL)
    .then((response) => {
      // console.log(response.data.results)
      data.push(...response.data.results) //展開運算子...把陣列元素展開
      displayDataList(data)
    })
    .catch((err) => console.log(err))


  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      // console.log(POSTER_URL + item.image)
      htmlContent += `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2">
          <div class="card mb-2">
            <img class="card-img-top friend-img" src="${item.avatar}" data-target="#show-friend-modal" data-toggle="modal" data-id="${item.id}" style="cursor:pointer" alt="Card image cap" >
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
            </div>
          </div>
        </div>
      `
      dataPanel.innerHTML = htmlContent
    })

    dataPanel.addEventListener('click', (event) => {
      if (event.target.matches('.friend-img')) {
        //dataset
        console.log(event.target.dataset.id)

        //get detail
        showFriend(event.target.dataset.id)
      }
    })
  }


  const modalTitle = document.querySelector('#show-friend-title')
  const modalImage = document.getElementById('show-friend-image')
  // const modalDate = document.getElementById('show-friend-date')
  const modalDescription = document.getElementById('show-friend-description')

  function showFriend(id) {

    let htmlContent = ''
    const url = INDEX_URL + '/' + id
    axios.get(url)
      .then((response) => {
        const data = response.data
        console.log(data)

        // mutil condition mask
        const filterItems = ["id", "avatar", "name", "surname", "created_at"]
        Object.keys(data).forEach(function (key) {
          if (!filterItems.includes(key)) {
            console.log(key + ': ' + data[key])
            htmlContent += `<p>${key}: ${data[key]}</p>`
          }
        })

        let name = data['name'] + ' ' + data['surname']
        modalTitle.textContent = name
        modalImage.innerHTML = `
            <img class="card-img-top img-fluid" src="${data.avatar}" alt="Card image cap">
            `
        // modalDate.textContent = `release at: ${data.updated_at}`
        modalDescription.innerHTML = htmlContent
      })
      .catch((err) => console.log(err))
  }


  //dismiss click
  const dismiss = document.querySelector('#dismiss')
  dismiss.addEventListener('click', (event) => {
    console.log(event.target)
    modalTitle.textContent = ""
    modalDescription.innerHTML = ""
    modalImage.innerHTML = ""
  })




})()