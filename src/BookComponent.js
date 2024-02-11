import MenuBookIcon from "@mui/icons-material/MenuBook";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";

const BookComponent = ({
  title,
  author,
  description,
  cover,
  addedBook,
  addBook,
}) => {
  console.log(title, author, description, cover, addedBook, addBook);
  return (
    <div>
      {!addedBook ? (
        <div
          className="input-group"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <button
            className="myIcon"
            onClick={() => addBook(title, author, description, cover)}
          >
            <MenuBookIcon></MenuBookIcon>
          </button>
        </div>
      ) : (
        <div
          className="myLibrary input-group"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <LibraryAddCheckIcon></LibraryAddCheckIcon>
        </div>
      )}

      <img src={cover} alt="Book Cover" />
      <div className="book-details" style={{ marginTop: "28px" }}>
        <h2>{title}</h2>
        <p style={{ fontSize: "20px", color: "#6d7fcc" }}>Author: {author}</p>
        <p style={{ fontSize: "20px", fontWeight: 500, color: "#6d7fcc" }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default BookComponent;
