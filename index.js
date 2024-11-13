// https://striveschool-api.herokuapp.com/books
console.log('It works')

// const myURL = 'https://striveschool-api.herokuapp.com/books'

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
                <img src="${book.img}" class="card-img-top" alt="cover">
                <div class="card-body bg-dark d-flex flex-column justify-content-between">
                    <h5 class="card-title text-light">${book.title}</h5>
                    <p class="card-text text-light">$ ${book.price}</p>
                    <div class="d-flex justify-content-between" id="button-container">
                        <button class="btn btn-primary">BUY NOW </button>
                        <button class="btn btn-primary discard">DISCARD</button>
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
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

getBook()
