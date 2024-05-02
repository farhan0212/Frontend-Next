import "./index.css";
import MovieList from "./components/MovieList";
// import AddMovieForm from "./components/AddMovieForm";



function App() {
  return (
    <div>
      <header className="flex justify-center mx-auto bg-slate-500">
        <h1 className="font-bold text-2xl py-3 tracking-widest">farhan ramadan</h1>
      </header>
      <MovieList />
      {/* <AddMovieForm onSubmit={handleSubmitForm} /> */}
    </div>
  );
}

export default App;
