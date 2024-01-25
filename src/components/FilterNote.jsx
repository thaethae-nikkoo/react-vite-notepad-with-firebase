export default function FilterTodo() {
  return (
    <>
      <div className="flex bg-transparent my-2 justify-start space-x-6 items-center">
        <span className="text-primary">
          Filtery By <i className="bi bi-calendar-month"></i> :
        </span>

        <div className="flex space-x-2 my-2 bg-white shadow-md justify-around items-center border border-1 py-1 px-2 rounded-lg ">
          <input
            type="month"
            className="outline-none bg-transparent border-0 border-bottom-2 py-1 rounded-lg"
          />
        </div>
      </div>
    </>
  );
}
