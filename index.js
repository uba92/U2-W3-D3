// https://striveschool-api.herokuapp.com/books
console.log('It works')

// const myURL = 'https://striveschool-api.herokuapp.com/books'

const chartArray = []

const key = 'chart'

// recupero i libri che ho salvato in localStorage e li uso per riempire il carrello all'avvio della pagina
const startChart = JSON.parse(localStorage.getItem(key))
console.log('carrello', startChart)

const fillChart = function (arr) {
  const chartList = document.getElementById('chart-list')
  for (let i = 0; i < arr.length; i++) {
    const listItem = document.createElement('div')
    listItem.innerHTML = `
      <p>${arr[i].title}</p>
    `

    chartList.appendChild(listItem)
  }
}

const getBook = function () {
  fetch('https://striveschool-api.herokuapp.com/books')
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nella response dal server!')
      }
    })
    .then((books) => {
      console.log(books)
      const booksRow = document.getElementById('books-row')
      books.forEach((book) => {
        const newCol = document.createElement('div')
        newCol.classList.add('col', 'col-12', 'col-md-6', 'col-lg-4')
        newCol.innerHTML = `
            <div class="card h-100">
                <img src="${book.img}" class="card-img-top h-75" alt="cover">
                <div class="card-body bg-dark d-flex flex-column justify-content-between">
                    <h5 class="card-title text-light">${book.title}</h5>
                    <p class="card-text text-light">$ ${book.price}</p>
                    <div class="d-flex justify-content-between" id="button-container">
                        <button class="btn btn-primary">BUY NOW </button>
                        <button class="btn btn-primary">DISCARD</button>
                    </div>
                    
                </div>
            </div>
        `

        booksRow.appendChild(newCol)

        const discardButton = newCol.querySelector(
          '#button-container button:nth-of-type(2)'
        )

        discardButton.addEventListener('click', () => {
          newCol.remove()
        })

        const buyButton = newCol.querySelector(
          '#button-container button:nth-of-type(1)'
        )

        buyButton.addEventListener('click', () => {
          const rowList = document.getElementById('chart-list')
          const newItem = document.createElement('div')
          newItem.innerHTML = `
            <p>${book.title}</p>
          `

          chartArray.push(book)

          localStorage.setItem(key, JSON.stringify(chartArray))

          console.log('Item Chart: ', chartArray)
          rowList.appendChild(newItem)

          alert('Item has added to chart')
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

getBook()
fillChart(startChart)
