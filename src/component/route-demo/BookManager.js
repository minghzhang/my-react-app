import React, {useEffect, useState} from 'react';
import axios from "axios";

const BookItem = ({book, refreshList}) => {

    const [editFormVisible, setEditFormVisible] = useState(false);
    const [currentBook, setCurrentBook] = useState(book);
    const [originalBook, setOriginalBook] = useState(book);

    function handleEdit() {
        setOriginalBook({...currentBook})
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
        await axios.put("http://127.0.0.1:8080/api/books/" + book.id, currentBook);
        setEditFormVisible(false);
        refreshList();
    }

    function handleCancel() {
        setCurrentBook({...originalBook})
        setEditFormVisible(false);
    }

    async function handleDelete() {
        await axios.delete("http://127.0.0.1:8080/api/books/" + book.id);
        refreshList();
    }


    return (
        <>
            <tr>
                <td>{book.id}</td>
                <td>{editFormVisible ? <input value={currentBook.name} onChange={handleNameChange}/> : book.name}</td>
                <td>{editFormVisible ?
                    <input value={currentBook.author} onChange={handleAuthorChange}/> : book.author}</td>
                <td>
                    {editFormVisible ?
                        <>
                            <button onClick={handleUpdate}>Update</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </>
                        :
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


const BookTable = ({books, freshList}) => {

    const rows = books.map((book) => <BookItem key={book.id} book={book}
                                               refreshList={freshList}/>);
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

const AddBooks = ({refreshList}) => {

    const [FormVisible, setFormVisible] = useState(false);
    const [bookForAdd, setBookForAdd] = useState({"name": "", "author": ""})

    function handleAddBooks() {
        setFormVisible(true);
    }

    async function handleSubmitAddingBooks() {
        setFormVisible(false);
        try {
            await axios.post('http://127.0.0.1:8080/api/books', bookForAdd);
            refreshList();
            setBookForAdd({"name": "", "author": ""});
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

const SearchBar = ({nameFilterText, setNameFilterText, refreshList}) => {
    function handleQuery(e) {
        refreshList();
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
    const [nameFilterText, setNameFilterText] = useState('');
    const [filterBooks, setFitlerBooks] = useState([]);

    const refreshList = async () => {
        try {
            console.log("invoking refreshList begin");
            const response = await axios.get("http://127.0.0.1:8080/api/books");
            console.log("invoking refreshList end");
            setFitlerBooks(response.data.filter(book => book.name.toLowerCase().includes(nameFilterText)));
        } catch (error) {
            console.error("Error freshList: ", error);
        }
    }


    useEffect(() => {
        console.log("invoke useEffect begin");
        refreshList();
        console.log("invoke useEffect end");
    }, []);


    return (
        <>
            <SearchBar nameFilterText={nameFilterText} setNameFilterText={setNameFilterText} refreshList={refreshList}/>
            <AddBooks refreshList={refreshList}/>
            <BookTable books={filterBooks} freshList={refreshList}/>
        </>
    );
}