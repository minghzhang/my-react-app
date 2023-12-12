import React, {useEffect, useState} from 'react';
import axios from "axios";

const BookItem = ({book, setFilterBooks}) => {

    const [EditFormVisible, setEditFormVisible] = useState(false);

    const [currentBook, setCurrentBook] = useState(book);

    function handleEdit() {
        setEditFormVisible(true);
    }

    function handleNameChange(e) {
        setCurrentBook({
            ...currentBook,
            "name": e.target.value,
        })
    }

    function handleAuthorChange(e) {
        setCurrentBook({
            ...currentBook,
            "author": e.target.value,
        })
    }

    async function handleUpdate() {
        let response = await axios.put("http://127.0.0.1:8080/api/books/" + book.id, currentBook);
        setEditFormVisible(false);
        axios.get("http://127.0.0.1:8080/api/books")
            .then(response => {
                setFilterBooks(response.data);
            }).catch(error => {
            console.error("Error fetching data: ", error);
        })
    }

    async function handleDelete() {
        let response = await axios.delete("http://127.0.0.1:8080/api/books/" + book.id);
        console.log("handleDelete success");
        axios.get("http://127.0.0.1:8080/api/books")
            .then(response => {
                setFilterBooks(response.data);
            }).catch(error => {
            console.error("Error fetching data: ", error);
        })
    }


    return (
        <>
            <tr>
                <td>{book.id}</td>
                <td>{EditFormVisible ? <input value={currentBook.name} onChange={handleNameChange}/> : book.name}</td>
                <td>{EditFormVisible ?
                    <input value={currentBook.author} onChange={handleAuthorChange}/> : book.author}</td>
                <td>
                    {EditFormVisible ? <button onClick={handleUpdate}>Update</button> :
                        <>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </>
                    }
                </td>
            </tr>
        </>
    );
};


const BookTable = ({books, setFilterBooks}) => {

    const rows = books.map((book) => <BookItem key={book.id} book={book}
                                               setFilterBooks={setFilterBooks}/>);
    return (
        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Author</th>
                <th>Operation</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    );
}

const AddBooks = ({books, setFilterBooks}) => {

    const [FormVisible, setFormVisible] = useState(false);
    const [bookForAdd, setBookForAdd] = useState({"name": "", "author": ""})

    function handleAddBooks() {
        setFormVisible(true);
    }

    async function handleSubmitAddingBooks() {
        setFormVisible(false);

        try {
            const response = await axios.post('http://127.0.0.1:8080/api/books', bookForAdd);
            axios.get("http://127.0.0.1:8080/api/books")
                .then(response => {
                    setFilterBooks(response.data);
                    setBookForAdd({"name": "", "author": ""});
                }).catch(error => {
                console.error("Error fetching data: ", error);
            })

        } catch (error) {
            console.error("addBooks error", error)
        }


    }

    function handleNameChange(e) {
        setBookForAdd({
            ...bookForAdd,
            "name": e.target.value
        });
    }

    function handleAuthorChange(e) {
        setBookForAdd({
            ...bookForAdd,
            "author": e.target.value
        });
    }

    return (
        <>
            <button onClick={handleAddBooks}>Add Books</button>
            {FormVisible && (
                <form>
                    <label>Name:
                        <input type="text" value={bookForAdd.name} onChange={handleNameChange} placeholder="book name"/>
                    </label>
                    <label>Author:
                        <input type="text" value={bookForAdd.author} onChange={handleAuthorChange}
                               placeholder="book author"/>
                    </label>
                    <button onClick={handleSubmitAddingBooks}>Submit</button>
                </form>
            )}
        </>
    );
}

const SearchBar = ({nameFilterText, setNameFilterText, books, setFilterBooks}) => {
    function handleQuery(e) {
        axios.get("http://127.0.0.1:8080/api/books")
            .then(response => {
                setFilterBooks(response.data);
            }).catch(error => {
            console.error("Error fetching data: ", error);
        })
    }

    function handleNameTextChange(e) {
        setNameFilterText(e.target.value);
    }

    return (
        <>
            <input type="text" value={nameFilterText} onChange={handleNameTextChange}
                   placeholder="book name for search"/>
            <button onClick={handleQuery}>Query</button>
        </>
    );
}

export default function BookManager() {
    const [nameFilterText, setNameFilterTExt] = useState('');
    const [books, setBooks] = useState([]);
    const [filterBooks, setFitlerBooks] = useState([]);


    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            const response = await axios.get("http://127.0.0.1:8080/api/books");
            if (isMounted) {
                setBooks(response.data);
                let filteredBooks = response.data.filter(book => book.name.toLowerCase().indexOf(nameFilterText.toLowerCase()) != -1);
                setFitlerBooks(filteredBooks);
            }
        }

        fetchData();
        return () => {
            isMounted = false;
        }

    }, [nameFilterText]);


    return (
        <>
            <SearchBar nameFilterText={nameFilterText} setNameFilterText={setNameFilterTExt} books={books}
                       setFilterBooks={setFitlerBooks}/>
            <AddBooks setFilterBooks={setFitlerBooks} books={books}/>
            <BookTable books={filterBooks} setFilterBooks={setFitlerBooks}/>
        </>
    );
}